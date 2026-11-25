/**
 * Pure RPG mechanics, persistence validation, and specimen classification helpers
 * for The Verdant Knight: Chronicles of the Realm.
 */

export const SAVE_KEY = 'verdantKnightSave_v1';

export const ELEMENTS = {
  bark: {
    key: 'bark',
    name: 'Bark & Timber',
    stat: 'DEF',
    icon: '🌳',
    color: '#b07a3e',
    gear: ['Bark Greaves', 'Ironwood Cuirass', 'Ancient Sylvan Plate'],
    gicon: ['🥾', '🪵', '🛡'],
    pre: ['Gnarled', 'Ironbark', 'Mossback', 'Split-Oak', 'Emberwood', 'Whorled', 'Storm-Splintered', 'Elder'],
    suf: ['Oak Heart', 'Pine Splinter', 'Cedar Bark', 'Root Twist', 'Timber Knot', 'Birch Curl', 'Hollow Log', 'Acorn Cap'],
    legend: 'Heart of the Old Grove',
  },
  leaf: {
    key: 'leaf',
    name: 'Foliage & Needles',
    stat: 'DEX',
    icon: '🍃',
    color: '#4caf50',
    gear: ['Leaf Wraps', 'Briar Hood', 'Wind-Runner Mantle'],
    gicon: ['🍂', '🌿', '🧥'],
    pre: ['Whisper', 'Silver', 'Dancing', 'Serrated', 'Duskwoven', 'Fleet', 'Emerald', 'Sighing'],
    suf: ['Fern', 'Pine Needle', 'Ivy Coil', 'Maple Blade', 'Nettle Tuft', 'Clover Sprig', 'Reed Flute', 'Willow Wand'],
    legend: 'The Last Leaf of Autumn Eternal',
  },
  stone: {
    key: 'stone',
    name: 'Stones & Minerals',
    stat: 'STR',
    icon: '🪨',
    color: '#9aa3ad',
    gear: ['Flint Dagger', 'Basalt Mace', 'Granite Greatsword'],
    gicon: ['🔪', '🔨', '🗡'],
    pre: ['Veined', 'Thunder', 'River-Worn', 'Obsidian', 'Graven', 'Ironvein', 'Slumbering', 'Starfall'],
    suf: ['Flint Shard', 'Granite Chunk', 'Quartz Chip', 'Basalt Core', 'Pebble Rune', 'Slate Plate', 'Geode Heart', 'Menhir Chip'],
    legend: 'The Mountain’s First Tooth',
  },
  bloom: {
    key: 'bloom',
    name: 'Flowers & Berries',
    stat: 'WIS',
    icon: '🌸',
    color: '#e06ba7',
    gear: ['Dandelion Charm', 'Amber Amulet', 'Bloom-Rune Circlet'],
    gicon: ['🌼', '📿', '👑'],
    pre: ['Sunfire', 'Moonpetal', 'Wild', 'Crimson', 'Gilded', 'Dewkiss', 'Humming', 'Twilight'],
    suf: ['Dandelion', 'Berry Cluster', 'Foxglove', 'Thistle Bloom', 'Clover Crown', 'Rosehip', 'Bluebell', 'Poppy Tear'],
    legend: 'Bloom of the First Morning',
  },
  fungus: {
    key: 'fungus',
    name: 'Fungi, Moss & Lichen',
    stat: 'END',
    icon: '🍄',
    color: '#8fbf6f',
    gear: ['Lichen Sash', 'Mycelium Shield', 'Spore-Mother Aegis'],
    gicon: ['🎗', '🛡', '⚜'],
    pre: ['Pale', 'Lantern', 'Velvet', 'Ancient', 'Speckled', 'Whispercap', 'Deepwood', 'Patient'],
    suf: ['Morel', 'Shelf Fungus', 'Lichen Rosette', 'Moss Ball', 'Puffball', 'Chanterelle', 'Turkey Tail', 'Ink Cap'],
    legend: 'The Spore-Mother’s Own Heart',
  },
};

export const EL_KEYS = Object.keys(ELEMENTS);
export const TIER_REQ = [2, 4, 7];
export const TIER_BONUS = [4, 8, 12];

export const CLASSES = {
  oak: {
    key: 'oak',
    name: 'Oak Sentinel',
    el: 'bark',
    item: 'Bark Shield',
    color: '#8a5a2b',
    desc: 'Rooted and unbowed. The forest’s wall. +15 DEF, starts with the Bark Shield.',
  },
  wind: {
    key: 'wind',
    name: 'Wind Strider',
    el: 'leaf',
    item: 'Leaf Cloak',
    color: '#4caf50',
    desc: 'Quick as a falling leaf, gone before it lands. +15 DEX, starts with the Leaf Cloak.',
  },
  earth: {
    key: 'earth',
    name: 'Earth Breaker',
    el: 'stone',
    item: 'Stone Gauntlet',
    color: '#9aa3ad',
    desc: 'Speaks softly, carries a mountain. +15 STR, starts with the Stone Gauntlet.',
  },
  wild: {
    key: 'wild',
    name: 'Wild Mystic',
    el: 'bloom',
    item: 'Seed Talisman',
    color: '#e06ba7',
    desc: 'Reads omens in petals and berries. +15 WIS, starts with the Seed Talisman.',
  },
  marrow: {
    key: 'marrow',
    name: 'Marrow Ward',
    el: 'fungus',
    item: 'Spore Belt',
    color: '#8fbf6f',
    desc: 'Endures what would fell an oak. +15 END, starts with the Spore Belt.',
  },
};

export const SKINS = ['#f6d7b8', '#eab98c', '#c98d5f', '#9c6b43', '#6f4a2f', '#4a3121'];
export const HAIRS = ['Braids', 'Wild Shag', 'Ponytail', 'Shorn'];
export const HAIRCOL = ['#241f1c', '#5a3a1e', '#8c5a2b', '#b8860b', '#a63d2a', '#c9c9c9'];
export const PAINTS = ['None', 'Mud Smear', 'Leaf Runic', 'Ash'];

export const RARITY = [
  { key: 'common', name: 'Common', w: 70, mult: 1 },
  { key: 'uncommon', name: 'Uncommon', w: 20, mult: 1.5 },
  { key: 'rare', name: 'Rare', w: 8, mult: 2.5 },
  { key: 'legendary', name: 'Legendary', w: 2, mult: 5 },
];
const RARITY_KEYS = new Set(RARITY.map((r) => r.key));

export const XP_NEXT = (lv) => lv * 100;

export const QUESTS = [
  {
    id: 'q_first',
    name: 'First Steps on the Trail',
    desc: 'Log your first specimen.',
    target: 1,
    prog: (s) => Math.min(s.stats.finds, 1),
    reward: { points: 2 },
    rtext: '+2 stat points',
  },
  {
    id: 'q_five',
    name: 'Handful of the Wild',
    desc: 'Log 5 specimens.',
    target: 5,
    prog: (s) => Math.min(s.stats.finds, 5),
    reward: { points: 2 },
    rtext: '+2 stat points',
  },
  {
    id: 'q_ten',
    name: 'Seasoned Forager',
    desc: 'Log 10 specimens.',
    target: 10,
    prog: (s) => Math.min(s.stats.finds, 10),
    reward: { points: 3 },
    rtext: '+3 stat points',
  },
  {
    id: 'q_all5',
    name: 'Five-Fold Attunement',
    desc: 'Log at least one specimen of each element.',
    target: 5,
    prog: (s) => EL_KEYS.filter((k) => s.finds.some((f) => f.el === k)).length,
    reward: { points: 3 },
    rtext: '+3 stat points',
  },
  {
    id: 'q_rare',
    name: 'Omen in the Undergrowth',
    desc: 'Find a Rare (or better) specimen.',
    target: 1,
    prog: (s) => Math.min(s.finds.filter((f) => f.rarity === 'rare' || f.rarity === 'legendary').length, 1),
    reward: { points: 2 },
    rtext: '+2 stat points',
  },
  {
    id: 'q_shutter',
    name: 'Eye of the Naturalist',
    desc: 'Log 5 specimens with the camera.',
    target: 5,
    prog: (s) => Math.min(s.stats.camFinds, 5),
    reward: { points: 2 },
    rtext: '+2 stat points',
  },
  {
    id: 'q_shutter10',
    name: 'Master Lens',
    desc: 'Log 10 specimens with the camera.',
    target: 10,
    prog: (s) => Math.min(s.stats.camFinds, 10),
    reward: { points: 3 },
    rtext: '+3 stat points',
  },
  {
    id: 'q_apex',
    name: 'Apex Attunement',
    desc: 'Reach element level 7 (Tier III gear) in any element.',
    target: 7,
    prog: (s) => Math.max(...EL_KEYS.map((k) => s.elements[k].level)),
    reward: { points: 3 },
    rtext: '+3 stat points',
  },
];

/* ---------------- General Utilities ---------------- */
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function isPlainObject(v) {
  return Boolean(v) && typeof v === 'object' && !Array.isArray(v);
}

/* ---------------- State & Persistence ---------------- */
export function freshState(draft) {
  const els = {};
  const alloc = {};
  const eq = {};
  EL_KEYS.forEach((k) => {
    els[k] = { xp: 0, level: 1 };
    alloc[k] = 0;
    eq[k] = 0;
  });
  return {
    v: 1,
    name: String(draft.name || '').trim(),
    pronouns: draft.pronouns,
    cls: draft.cls,
    avatar: {
      skin: draft.skin,
      hair: draft.hair,
      hairColor: draft.hairColor,
      paint: draft.paint,
    },
    elements: els,
    alloc,
    points: 0,
    equipped: eq,
    finds: [],
    questsClaimed: [],
    muted: false,
    seenUnlocks: [],
    stats: { finds: 0, camFinds: 0, forages: 0 },
  };
}

export function isQuotaExceededError(err) {
  if (!err) return false;
  return (
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    err.code === 22 ||
    err.code === 1014
  );
}

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

/**
 * Validates parsed save data against the v1 chronicle schema.
 * Returns the validated state object or null if malformed/corrupted.
 */
export function validateSaveData(data) {
  if (!isPlainObject(data)) return null;
  if (data.v !== 1) return null;
  if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 64) return null;
  if (typeof data.pronouns !== 'string' || !data.pronouns.trim()) return null;
  if (typeof data.cls !== 'string' || !Object.hasOwn(CLASSES, data.cls)) return null;

  if (!isPlainObject(data.avatar)) return null;
  const { skin, hair, hairColor, paint } = data.avatar;
  if (typeof skin !== 'string' || !HEX_COLOR_RE.test(skin)) return null;
  if (!Number.isInteger(hair) || hair < 0 || hair >= HAIRS.length) return null;
  if (typeof hairColor !== 'string' || !HEX_COLOR_RE.test(hairColor)) return null;
  if (!Number.isInteger(paint) || paint < 0 || paint >= PAINTS.length) return null;

  if (!isPlainObject(data.elements) || !isPlainObject(data.alloc) || !isPlainObject(data.equipped)) {
    return null;
  }
  for (const k of EL_KEYS) {
    const el = data.elements[k];
    if (!isPlainObject(el)) return null;
    if (!Number.isFinite(el.xp) || el.xp < 0) return null;
    if (!Number.isInteger(el.level) || el.level < 1) return null;

    if (!Number.isInteger(data.alloc[k]) || data.alloc[k] < 0) return null;
    if (!Number.isInteger(data.equipped[k]) || data.equipped[k] < 0 || data.equipped[k] > 3) return null;
  }

  if (!Number.isInteger(data.points) || data.points < 0) return null;
  if (typeof data.muted !== 'boolean') return null;

  if (!Array.isArray(data.finds)) return null;
  for (const f of data.finds) {
    if (!isPlainObject(f)) return null;
    if (typeof f.el !== 'string' || !EL_KEYS.includes(f.el)) return null;
    if (typeof f.name !== 'string' || !f.name.trim()) return null;
    if (typeof f.rarity !== 'string' || !RARITY_KEYS.has(f.rarity)) return null;
    if (!Number.isFinite(f.xp) || f.xp < 0) return null;
    if (f.thumb !== null && (typeof f.thumb !== 'string' || !f.thumb.startsWith('data:image/'))) {
      return null;
    }
    if (typeof f.date !== 'string') return null;
  }

  if (!Array.isArray(data.questsClaimed) || !data.questsClaimed.every((q) => typeof q === 'string')) {
    return null;
  }
  if (!Array.isArray(data.seenUnlocks) || !data.seenUnlocks.every((u) => typeof u === 'string')) {
    return null;
  }

  if (!isPlainObject(data.stats)) return null;
  const { finds, camFinds, forages } = data.stats;
  if (!Number.isInteger(finds) || finds < 0) return null;
  if (!Number.isInteger(camFinds) || camFinds < 0) return null;
  if (!Number.isInteger(forages) || forages < 0) return null;

  return data;
}

export function loadSave(storage) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) return null;
    return validateSaveData(JSON.parse(raw));
  } catch (e) {
    return null;
  }
}

/**
 * Serializes state to storage. On QuotaExceededError, prunes oldest specimen
 * thumbnails one at a time until persistence succeeds or none remain.
 */
export function saveState(state, storage, onNotice) {
  if (!state || !storage) return { ok: false, pruned: 0 };

  try {
    storage.setItem(SAVE_KEY, JSON.stringify(state));
    return { ok: true, pruned: 0 };
  } catch (err) {
    if (!isQuotaExceededError(err)) {
      onNotice?.({ type: 'error', error: err });
      return { ok: false, pruned: 0, error: err };
    }

    const originalThumbs = [];
    let pruned = 0;
    let lastErr = err;

    for (let i = 0; i < state.finds.length; i++) {
      const find = state.finds[i];
      if (!find || !find.thumb) continue;
      originalThumbs.push([i, find.thumb]);
      find.thumb = null;
      pruned++;

      try {
        storage.setItem(SAVE_KEY, JSON.stringify(state));
        onNotice?.({ type: 'pruned', pruned });
        return { ok: true, pruned };
      } catch (retryErr) {
        lastErr = retryErr;
        if (!isQuotaExceededError(retryErr)) {
          for (const [idx, thumb] of originalThumbs) {
            state.finds[idx].thumb = thumb;
          }
          onNotice?.({ type: 'error', error: retryErr });
          return { ok: false, pruned: 0, error: retryErr };
        }
      }
    }

    for (const [idx, thumb] of originalThumbs) {
      state.finds[idx].thumb = thumb;
    }
    onNotice?.({ type: 'quota-full', pruned: 0, error: lastErr });
    return { ok: false, pruned: 0, error: lastErr };
  }
}

/* ---------------- RPG Progression & Stats ---------------- */
export function statOf(state, elKey) {
  let v = 10 + (state.elements[elKey].level - 1) * 3 + state.alloc[elKey];
  if (CLASSES[state.cls].el === elKey) v += 15;
  v += TIER_BONUS[state.equipped[elKey] - 1] || 0;
  return v;
}

export function totalLevel(state) {
  return EL_KEYS.reduce((acc, k) => acc + state.elements[k].level, 0);
}

export function unlockedTier(lv) {
  return lv >= TIER_REQ[2] ? 3 : lv >= TIER_REQ[1] ? 2 : lv >= TIER_REQ[0] ? 1 : 0;
}

export function heroTitle(state) {
  const tl = totalLevel(state);
  if (tl >= 40) return 'Verdant Knight-Lord of the Realm';
  if (tl >= 30) return 'Elder Warden of the Wilds';
  if (tl >= 22) return 'Ranger of the Deep Green';
  if (tl >= 15) return 'Sworn Blade of the Grove';
  if (tl >= 10) return 'Trailworn Adventurer';
  return 'Greenhorn of the Glade';
}

export function applyElementXP(state, elKey, amt) {
  const st = state.elements[elKey];
  st.xp += amt;
  let levelsGained = 0;
  while (st.xp >= XP_NEXT(st.level)) {
    st.xp -= XP_NEXT(st.level);
    st.level++;
    levelsGained++;
    state.points += 2;
  }

  let newlyUnlockedTier = null;
  if (levelsGained > 0) {
    const maxT = unlockedTier(st.level);
    for (let t = 1; t <= maxT; t++) {
      const key = `${elKey}:${t}`;
      if (!state.seenUnlocks.includes(key)) {
        state.seenUnlocks.push(key);
        newlyUnlockedTier = t;
      }
    }
    if (maxT > 0 && state.equipped[elKey] < maxT) {
      state.equipped[elKey] = maxT;
    }
  }

  return {
    leveled: levelsGained > 0,
    levelsGained,
    newLevel: st.level,
    newlyUnlockedTier,
  };
}

export function rollRarity(rng = Math.random) {
  const roll = rng() * 100;
  let acc = 0;
  for (const r of RARITY) {
    acc += r.w;
    if (roll < acc) return r;
  }
  return RARITY[0];
}

export function makeSpecimen(elKey, rarity, rng = Math.random) {
  const e = ELEMENTS[elKey];
  const pickItem = (arr) => arr[Math.floor(rng() * arr.length)];
  const name = rarity.key === 'legendary' ? e.legend : `${pickItem(e.pre)} ${pickItem(e.suf)}`;
  const bonus = Math.floor(rng() * 16);
  const xp = Math.round((30 + bonus) * rarity.mult);
  return { name, xp };
}

/* ---------------- Vision Label Mapping & Color Fallback ---------------- */
// Ordered from most specific compound nature classes to broad categories so
// e.g. "hen-of-the-woods", "coral fungus", and "pine needle" are not shadowed
// by "wood", "coral reef", or "pine".
const LABEL_RULES = [
  [
    'fungus',
    /\b(?:agarics?|boletes?|earthstars?|gyromitras?|stinkhorns?|carrion fungus|coral fungus|hen[- ]of[- ]the[- ]woods|polyporus|grifola|mushrooms?|fung(?:us|i)|toadstools?|lichens?|moss(?:es)?|spores?|morels?|chanterelles?|puffballs?|truffles?|mycelium|bracket fungus)\b/i,
  ],
  [
    'leaf',
    /\b(?:pine\s?needles?|leaf(?:lets?|hoppers?|s)?|leaf beetles?|leaves|foliage|plants?|ferns?|fronds?|grass(?:es|hoppers?)?|lawns?|meadows?|herbs?|clovers?|iv(?:y|ies)|vines?|needles?|shrubs?|bushes|bush|hedges?|bamboos?|reeds?|cattails?|kelp|seaweeds?|sprouts?|seedlings?|saplings?|conifers?|evergreens?|cabbages?|broccoli|artichokes?|cardoons?|cucumbers?|zucchinis?|crickets?|mantis(?:es)?|dragonfl(?:y|ies)|damselfl(?:y|ies)|lacewings?|caterpillars?)\b/i,
  ],
  [
    'bark',
    /\b(?:acorns?|pine\s?cones?|buckeyes?|horse chestnuts?|conkers?|chestnuts?|walnuts?|hazelnuts?|ironwood|driftwood|firewood|redwood|woods?|woodlands?|trees?|trunks?|barks?|timbers?|logs?|branch(?:es)?|twigs?|stumps?|oaks?|pines?|cedars?|birch(?:es)?|willows?|maples?|beech(?:es)?|boughs?|roots?|walking\s?sticks?)\b/i,
  ],
  [
    'stone',
    /\b(?:stones?|rocks?|pebbles?|gravel|minerals?|boulders?|cliffs?|sand(?:bar|stone|s)?|slate|granite|flint|basalt|quartz|crystals?|geodes?|obsidian|marble|limestone|cobble(?:stone)?s?|megaliths?|cairns?|alps?|volcan(?:o|oes|ic)|promontor(?:y|ies)|headlands?|seashores?|lakesides?|lakeshores?|geysers?|coral reefs?|valleys?|fossils?)\b/i,
  ],
  [
    'bloom',
    /\b(?:dais(?:y|ies)|lady(?:'?s)?[- ]slippers?|ladyslippers?|rapeseed|rose\s?hips?|hip|sunflowers?|dandelions?|popp(?:y|ies)|tulips?|orchids?|roses?|lil(?:y|ies)|lotus(?:es)?|lavender|iris(?:es)?|marigolds?|hibiscus|thistles?|bluebells?|foxgloves?|violets?|peon(?:y|ies)|daffodils?|magnolias?|chrysanthemums?|flowers?|wildflowers?|flowerpots?|petals?|blooms?|blossoms?|bouquets?|(?:straw|black|blue|rasp|cran|elder|mul)?berr(?:y|ies)|pomegranates?|figs?|ladybugs?|ladybeetles?|lady beetles?|ladybirds?|monarchs?|butterfl(?:y|ies)|admirals?|ringlets?|lycaenids?|bees?|honeybees?|bumblebees?)\b/i,
  ],
];

export function mapLabelToElement(label) {
  if (typeof label !== 'string' || !label.trim()) return null;
  for (const [elKey, pattern] of LABEL_RULES) {
    if (pattern.test(label)) return elKey;
  }
  return null;
}

export function describeFindSource(byCamera, classification) {
  if (!byCamera) {
    return 'Gathered by hand along the trail.';
  }
  if (classification && classification.method === 'ai') {
    const label = esc(classification.label);
    const pct = Number.isFinite(classification.score)
      ? ` · ${Math.round(classification.score * 100)}%`
      : '';
    return `Analyzed on-device by MobileNetV4 (${label}${pct}).`;
  }
  if (classification && classification.reason === 'unmatched') {
    const top = classification.topLabel ? ` (top guess: "${esc(classification.topLabel)}")` : '';
    return `Classified via color-heuristic fallback — MobileNetV4 found no matching nature label${top}.`;
  }
  if (classification && classification.reason === 'error') {
    return 'Classified via color-heuristic fallback — MobileNetV4 inference failed.';
  }
  return 'Classified via color-heuristic fallback (MobileNetV4 offline or unavailable).';
}

export function classifyPixelsFallback(data, rng = Math.random) {
  const score = { bark: 0, leaf: 0, stone: 0, bloom: 0, fungus: 0 };
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const d = mx - mn;
    const v = mx;
    const s = mx === 0 ? 0 : d / mx;
    let h = 0;
    if (d > 0) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }

    if (v < 0.12) {
      score.bark += 0.5;
      continue;
    }
    if (s < 0.14) {
      score.stone += v > 0.75 ? 1 : 0.7;
      continue;
    }
    if (h >= 60 && h <= 170) {
      if (s > 0.5 && v > 0.4) score.leaf += 1;
      else score.fungus += 0.85;
    } else if (h > 170 && h <= 260) {
      score.bloom += 0.7;
    } else if (h > 260 && h <= 340) {
      score.bloom += 1;
    } else if (h > 340 || h <= 12) {
      score.bloom += 1;
    } else if (h > 12 && h <= 32) {
      if (v > 0.55 && s > 0.55) score.fungus += 0.7;
      else score.bark += 1;
    } else if (h > 32 && h <= 45) {
      score.bark += v > 0.6 ? 0.6 : 1;
    } else {
      score.bloom += 0.8;
    }
  }

  let best = EL_KEYS[0];
  let bestV = -1;
  for (const k of EL_KEYS) {
    const jitter = rng() * 0.999;
    const candidate = score[k] + jitter * 0.01;
    if (candidate > bestV) {
      bestV = candidate;
      best = k;
    }
  }
  return best;
}
