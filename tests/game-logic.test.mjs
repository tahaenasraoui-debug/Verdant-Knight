import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import * as gameLogic from '../game-logic.js';

const {
  SAVE_KEY,
  ELEMENTS,
  EL_KEYS,
  SKINS,
  HAIRCOL,
  QUESTS,
  freshState,
  validateSaveData,
  loadSave,
  saveState,
  isQuotaExceededError,
  statOf,
  totalLevel,
  unlockedTier,
  heroTitle,
  applyElementXP,
  rollRarity,
  makeSpecimen,
  mapLabelToElement,
  describeFindSource,
  classifyPixelsFallback,
} = gameLogic;

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function makeDraft(overrides = {}) {
  return {
    name: 'Rowan',
    pronouns: 'They/Them',
    cls: 'oak',
    skin: SKINS[2],
    hair: 1,
    hairColor: HAIRCOL[1],
    paint: 0,
    ...overrides,
  };
}

function makeSolidPixels(r, g, b, count = 16) {
  const data = new Uint8ClampedArray(count * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }
  return data;
}

test('mapLabelToElement maps ImageNet-1k nature labels accurately', () => {
  // Fungi, Moss & Lichen
  assert.equal(mapLabelToElement('agaric'), 'fungus');
  assert.equal(mapLabelToElement('bolete'), 'fungus');
  assert.equal(mapLabelToElement('earthstar'), 'fungus');
  assert.equal(mapLabelToElement('gyromitra'), 'fungus');
  assert.equal(mapLabelToElement('stinkhorn, carrion fungus'), 'fungus');
  assert.equal(mapLabelToElement('coral fungus'), 'fungus');
  assert.equal(mapLabelToElement('hen-of-the-woods, hen of the woods, Polyporus frondosus'), 'fungus');
  assert.equal(mapLabelToElement('moss'), 'fungus');
  assert.equal(mapLabelToElement('lichen'), 'fungus');

  // Bark & Timber
  assert.equal(mapLabelToElement('acorn'), 'bark');
  assert.equal(mapLabelToElement('pinecone'), 'bark');
  assert.equal(mapLabelToElement('pine cone'), 'bark');
  assert.equal(mapLabelToElement('buckeye, horse chestnut, conker'), 'bark');
  assert.equal(mapLabelToElement('oak tree trunk'), 'bark');
  assert.equal(mapLabelToElement('walking stick, stick insect'), 'bark');

  // Foliage & Needles
  assert.equal(mapLabelToElement('pine needle'), 'leaf');
  assert.equal(mapLabelToElement('fern frond'), 'leaf');
  assert.equal(mapLabelToElement('grasshopper, hopper'), 'leaf');
  assert.equal(mapLabelToElement('leaf beetle, chrysomelid'), 'leaf');
  assert.equal(mapLabelToElement('leafhopper'), 'leaf');

  // Stones & Minerals
  assert.equal(mapLabelToElement('coral reef'), 'stone');
  assert.equal(mapLabelToElement('sandbar, sand bar'), 'stone');
  assert.equal(mapLabelToElement('cliff, drop, drop-off'), 'stone');
  assert.equal(mapLabelToElement('granite boulder'), 'stone');
  assert.equal(mapLabelToElement('megalith'), 'stone');
  assert.equal(mapLabelToElement('volcano'), 'stone');

  // Flowers, Berries & Pollinators
  assert.equal(mapLabelToElement('daisy'), 'bloom');
  assert.equal(mapLabelToElement("yellow lady's slipper, yellow lady-slipper"), 'bloom');
  assert.equal(mapLabelToElement('hip, rose hip, rosehip'), 'bloom');
  assert.equal(mapLabelToElement('rapeseed'), 'bloom');
  assert.equal(mapLabelToElement('ladybug, ladybeetle, lady beetle, ladybird'), 'bloom');
  assert.equal(mapLabelToElement('monarch, monarch butterfly'), 'bloom');
  assert.equal(mapLabelToElement('strawberry'), 'bloom');
  assert.equal(mapLabelToElement('pot, flowerpot'), 'bloom');
});

test('mapLabelToElement avoids substring false positives and invalid inputs', () => {
  assert.equal(mapLabelToElement(''), null);
  assert.equal(mapLabelToElement('   '), null);
  assert.equal(mapLabelToElement(null), null);
  assert.equal(mapLabelToElement(undefined), null);
  assert.equal(mapLabelToElement('laptop computer'), null);
  assert.equal(mapLabelToElement('coffee mug'), null);
  assert.equal(mapLabelToElement('sandal'), null);
  assert.equal(mapLabelToElement('rocking chair'), null);
  assert.equal(mapLabelToElement('analog clock'), null);
  assert.equal(mapLabelToElement('pineapple'), null);
  assert.equal(mapLabelToElement('container ship'), null);
});

test('classifyPixelsFallback classifies dominant color palettes cleanly', () => {
  const zeroJitter = () => 0;
  assert.equal(classifyPixelsFallback(makeSolidPixels(30, 180, 50), zeroJitter), 'leaf');
  assert.equal(classifyPixelsFallback(makeSolidPixels(170, 170, 170), zeroJitter), 'stone');
  assert.equal(classifyPixelsFallback(makeSolidPixels(15, 10, 8), zeroJitter), 'bark');
  assert.equal(classifyPixelsFallback(makeSolidPixels(220, 40, 140), zeroJitter), 'bloom');
  assert.ok(EL_KEYS.includes(classifyPixelsFallback(new Uint8ClampedArray(0), zeroJitter)));
});

test('RPG stats, XP leveling, tier unlocks, titles, and quests work accurately', () => {
  const s = freshState(makeDraft({ cls: 'oak' }));
  assert.equal(totalLevel(s), 5);
  assert.equal(heroTitle(s), 'Greenhorn of the Glade');
  assert.equal(statOf(s, 'bark'), 25); // 10 base + 15 class bonus
  assert.equal(statOf(s, 'leaf'), 10);

  // Reach level 2 (100 XP) -> Tier I unlock (+4 bonus, auto-equipped) and +2 points
  const lv2 = applyElementXP(s, 'bark', 100);
  assert.equal(lv2.leveled, true);
  assert.equal(lv2.levelsGained, 1);
  assert.equal(lv2.newLevel, 2);
  assert.equal(lv2.newlyUnlockedTier, 1);
  assert.equal(s.points, 2);
  assert.equal(s.equipped.bark, 1);
  assert.equal(statOf(s, 'bark'), 10 + 3 + 15 + 4);

  // Multi-level jump from Lv 2 to Lv 4 (needs 200 + 300 = 500 XP)
  const lv4 = applyElementXP(s, 'bark', 500);
  assert.equal(lv4.leveled, true);
  assert.equal(lv4.levelsGained, 2);
  assert.equal(lv4.newLevel, 4);
  assert.equal(lv4.newlyUnlockedTier, 2);
  assert.equal(s.points, 6);
  assert.equal(s.equipped.bark, 2);
  assert.equal(unlockedTier(7), 3);

  // Verify title progression
  s.elements.leaf.level = 5;
  assert.equal(totalLevel(s), 12);
  assert.equal(heroTitle(s), 'Trailworn Adventurer');

  // Verify rarity and specimen creation deterministically
  assert.equal(rollRarity(() => 0.1).key, 'common');
  assert.equal(rollRarity(() => 0.75).key, 'uncommon');
  assert.equal(rollRarity(() => 0.95).key, 'rare');
  assert.equal(rollRarity(() => 0.99).key, 'legendary');

  const leg = makeSpecimen('bloom', { key: 'legendary', mult: 5 }, () => 0);
  assert.equal(leg.name, ELEMENTS.bloom.legend);
  assert.equal(leg.xp, 150);

  // Verify quest progress helper
  s.stats.finds = 1;
  s.finds.push({ el: 'bark', name: 'Test Bark', rarity: 'rare', xp: 75, thumb: null, date: 'Oct 9' });
  assert.equal(QUESTS.find((q) => q.id === 'q_first').prog(s), 1);
  assert.equal(QUESTS.find((q) => q.id === 'q_rare').prog(s), 1);
});

test('validateSaveData & loadSave accept valid saves and reject corrupted schemas', () => {
  const valid = freshState(makeDraft());
  valid.finds.push({
    el: 'leaf',
    name: 'Emerald Fern',
    rarity: 'common',
    xp: 35,
    thumb: 'data:image/jpeg;base64,/9j/4AAQ',
    date: 'Oct 9',
  });
  valid.stats.finds = 1;
  valid.stats.camFinds = 1;

  assert.ok(validateSaveData(valid));

  // Reject malformed payloads
  assert.equal(validateSaveData(null), null);
  assert.equal(validateSaveData([]), null);
  assert.equal(validateSaveData({ ...valid, v: 2 }), null);
  assert.equal(validateSaveData({ ...valid, name: '   ' }), null);
  assert.equal(validateSaveData({ ...valid, cls: 'paladin' }), null);
  assert.equal(validateSaveData({ ...valid, avatar: { ...valid.avatar, skin: 'red' } }), null);
  assert.equal(validateSaveData({ ...valid, avatar: { ...valid.avatar, hair: 99 } }), null);
  assert.equal(
    validateSaveData({ ...valid, elements: { ...valid.elements, bark: { xp: -1, level: 1 } } }),
    null
  );
  assert.equal(validateSaveData({ ...valid, equipped: { ...valid.equipped, bark: 4 } }), null);
  assert.equal(
    validateSaveData({
      ...valid,
      finds: [{ ...valid.finds[0], thumb: 'javascript:alert(1)' }],
    }),
    null
  );
  assert.equal(validateSaveData({ ...valid, muted: 'false' }), null);

  // loadSave handles JSON errors and schema errors cleanly
  const store = new Map();
  const mockStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
  };
  assert.equal(loadSave(mockStorage), null);

  store.set(SAVE_KEY, '{broken json');
  assert.equal(loadSave(mockStorage), null);

  store.set(SAVE_KEY, JSON.stringify({ v: 1, name: 'Bad' }));
  assert.equal(loadSave(mockStorage), null);

  store.set(SAVE_KEY, JSON.stringify(valid));
  assert.deepEqual(loadSave(mockStorage), valid);
});

test('saveState handles QuotaExceededError by pruning oldest thumbnails and notifying player', () => {
  const s = freshState(makeDraft());
  const bigThumb1 = 'data:image/jpeg;base64,' + 'A'.repeat(400);
  const bigThumb2 = 'data:image/jpeg;base64,' + 'B'.repeat(400);
  s.finds.push(
    { el: 'bark', name: 'Oldest Bark', rarity: 'common', xp: 30, thumb: bigThumb1, date: 'Oct 1' },
    { el: 'leaf', name: 'Foraged Leaf', rarity: 'common', xp: 32, thumb: null, date: 'Oct 2' },
    { el: 'bloom', name: 'Newest Daisy', rarity: 'rare', xp: 80, thumb: bigThumb2, date: 'Oct 3' }
  );

  const baselineBytes = JSON.stringify({
    ...s,
    finds: s.finds.map((f, idx) => (idx === 0 ? { ...f, thumb: null } : f)),
  }).length;

  const store = new Map();
  const notices = [];
  const quotaStorage = {
    setItem(key, val) {
      if (val.length > baselineBytes) {
        const err = new Error('Storage quota exceeded');
        err.name = 'QuotaExceededError';
        err.code = 22;
        throw err;
      }
      store.set(key, val);
    },
    getItem(key) {
      return store.get(key) ?? null;
    },
  };

  assert.equal(isQuotaExceededError({ name: 'QuotaExceededError' }), true);
  assert.equal(isQuotaExceededError({ name: 'NS_ERROR_DOM_QUOTA_REACHED' }), true);
  assert.equal(isQuotaExceededError({ code: 22 }), true);

  const res = saveState(s, quotaStorage, (n) => notices.push(n));
  assert.equal(res.ok, true);
  assert.equal(res.pruned, 1);
  assert.equal(s.finds[0].thumb, null);
  assert.equal(s.finds[2].thumb, bigThumb2);
  assert.deepEqual(notices, [{ type: 'pruned', pruned: 1 }]);
  assert.ok(loadSave(quotaStorage));

  // If quota is impossible even after pruning all thumbnails, preserve thumbnails and notify quota-full
  const zeroNotices = [];
  const impossibleStorage = {
    setItem() {
      const err = new Error('Quota full');
      err.name = 'QuotaExceededError';
      throw err;
    },
  };
  const failRes = saveState(s, impossibleStorage, (n) => zeroNotices.push(n));
  assert.equal(failRes.ok, false);
  assert.equal(failRes.pruned, 0);
  assert.equal(s.finds[2].thumb, bigThumb2);
  assert.equal(zeroNotices[0].type, 'quota-full');
});

test('describeFindSource distinguishes MobileNetV4 AI, color-heuristic fallback, and forage mode', () => {
  assert.match(describeFindSource(false, { method: 'forage' }), /Gathered by hand/);
  assert.match(
    describeFindSource(true, { method: 'ai', label: 'daisy', score: 0.914 }),
    /MobileNetV4 \(daisy · 91%\)/
  );
  assert.match(
    describeFindSource(true, { method: 'fallback', reason: 'unavailable' }),
    /color-heuristic fallback.*MobileNetV4/i
  );
  assert.match(
    describeFindSource(true, { method: 'fallback', reason: 'unmatched', topLabel: '<laptop>' }),
    /color-heuristic fallback.*&lt;laptop&gt;/i
  );
  assert.match(
    describeFindSource(true, { method: 'fallback', reason: 'error' }),
    /color-heuristic fallback.*MobileNetV4 inference failed/i
  );
});

test('offline app shell assets, manifest, service worker, and index.html script syntax are valid', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

  // Ensure no static top-level remote import remains (would break offline evaluation)
  assert.equal(/^\s*import\s+[^('"]*https?:\/\//m.test(indexHtml), false);
  assert.match(indexHtml, /await\s+import\(\s*['"]https:\/\/cdn\.jsdelivr\.net\/npm\/@huggingface\/transformers/);
  assert.match(indexHtml, /<link\s+rel="manifest"\s+href="manifest\.json">/);
  assert.match(indexHtml, /navigator\.serviceWorker\.register\(\s*['"]\.\/sw\.js['"]\s*\)/);

  // Verify every symbol imported from ./game-logic.js exists as an export
  const importMatch = indexHtml.match(/import\s*\{([\s\S]*?)\}\s*from\s*['"]\.\/game-logic\.js['"]/);
  assert.ok(importMatch, 'Expected named import from ./game-logic.js in index.html');
  const importedNames = importMatch[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split(/\s+as\s+/)[0].trim());
  for (const name of importedNames) {
    assert.ok(Object.hasOwn(gameLogic, name), `Missing export "${name}" in game-logic.js`);
  }

  // Extract inline module script and validate syntax with Node
  const scriptMatch = indexHtml.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, 'Expected <script type="module"> block in index.html');
  execFileSync(process.execPath, ['--input-type=module', '--check'], {
    input: scriptMatch[1],
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  // Verify manifest.json
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'manifest.json'), 'utf8'));
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.display, 'standalone');

  // Verify sw.js syntax and required shell assets
  const swPath = path.join(ROOT_DIR, 'sw.js');
  execFileSync(process.execPath, ['--check', swPath], { stdio: ['pipe', 'pipe', 'pipe'] });
  const swCode = fs.readFileSync(swPath, 'utf8');
  assert.match(swCode, /\.\/index\.html/);
  assert.match(swCode, /\.\/game-logic\.js/);
  assert.match(swCode, /\.\/manifest\.json/);
});
