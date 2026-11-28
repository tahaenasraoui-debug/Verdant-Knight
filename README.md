# The Verdant Knight: Chronicles of the Realm

[![CI](https://github.com/tahaenasraoui-debug/Verdant-Knight/actions/workflows/ci.yml/badge.svg)](https://github.com/tahaenasraoui-debug/Verdant-Knight/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/tahaenasraoui-debug/Verdant-Knight/actions/workflows/pages.yml/badge.svg)](https://github.com/tahaenasraoui-debug/Verdant-Knight/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Offline-first naturalist RPG running entirely in the browser with on-device WebGPU vision inference (Transformers.js + quantized MobileNetV4). Built for the Hacktoberfest Open-Source AI Challenge (Week 1: "Touch Grass").

![The Verdant Knight Gameplay Preview](docs/media/screenshot.png)

<video src="docs/media/field-demo.mp4" controls="controls" width="100%"></video>

## Demo

* **Live Web App:** [Play The Verdant Knight](https://tahaenasraoui-debug.github.io/Verdant-Knight/)

## Overview

Photograph plants, bark, stones, or fungi on a walk; the local vision model classifies the photo on-device, maps it to one of five elemental stats, updates your pixel-art character equipment, and logs the entry in a local field codex.

## Android Installation (Planned / WIP)

> **Status:** Native Android `.apk` packaging is **planned / work in progress** and is not yet published in [Releases](https://github.com/tahaenasraoui-debug/Verdant-Knight/releases).

Until a native `.apk` release is available, you can install **The Verdant Knight** on Android as a Progressive Web App (PWA):

1. Open the [Live Web App](https://tahaenasraoui-debug.github.io/Verdant-Knight/) in Chrome or Firefox on Android while connected to the internet so the app shell (`sw.js`) and model weights (~15 MB) can cache locally.
2. Tap **Add to Home Screen** (or **Install App**) in your browser menu.
3. Grant camera permissions when harvesting specimens; **Forage Mode** and the rest of the RPG continue to function offline even without cached model weights.

## The Naturalist Stat Matrix

Physical flora and landscape elements map directly to your character's RPG attributes and equipment tiers:

| Specimen Category | Primary Stat | Equipment Slot Unlocked | Lore & Aesthetic |
| :--- | :--- | :--- | :--- |
| **Bark & Timber** | **DEF (Defense)** | Cuirass & Plated Armor | Rough ironwood pauldrons, split-oak cuirass |
| **Foliage & Needles** | **DEX (Agility)** | Cloaks & Wraps | Wind-runner mantles, woven briar hoods |
| **Stones & Minerals** | **STR (Strength)** | Weapons | Flint daggers, basalt maces, granite blades |
| **Flowers & Berries** | **WIS (Wisdom)** | Amulets & Circlets | Amber pendants, seed talismans, floral circlets |
| **Fungi, Moss & Lichen** | **END (Endurance)** | Shields & Belts | Lichen-woven sashes, mycelium spore aegis |

## Key Features

- **Minimal Screen Interaction:**
  - Trail Mode features a single primary shutter button.
  - Haptic confirmation pulses (`navigator.vibrate([100, 50, 100])`) allow players to confirm captures by touch without looking at a screen mid-walk.
- **Client-Side Open-Weight Vision Model:**
  - Evaluates photographs using a quantized **MobileNetV4** neural network model loaded dynamically via **Transformers.js v3** and **WebGPU** (with automatic WASM fallback, plus an offline color-heuristic fallback when the model is unavailable or unmatched).
  - No external cloud APIs, no network requests for inference, and zero telemetry leaving the device.
- **Dynamic Paper-Doll Pixel Avatars:**
  - Full character creation featuring archetypes, skin tones, hairstyles, colors, and war markings.
  - Unlocked and equipped gear visually updates directly on the avatar's canvas.
- **The Field Codex:**
  - A collectible field guide recording rarity tiers (Common to Legendary), elemental classifications, and discovery logs *(scientific taxonomy / binomial classification planned — WIP)*.
- **Offline-First Shell & Persistence:**
  - App shell caching via Service Worker (`sw.js`) and PWA `manifest.json` ensures Forage Mode and progression work cleanly offline.
  - Entire application state, unlocked relics, inventory, and codex entries persist locally via `localStorage` with schema validation and automatic oldest-thumbnail pruning on storage quota limits.

## Why Local Inference

Trails and backcountry routes often have spotty or no mobile reception.

1. **Works without signal:** On-device WebGPU/WASM inference runs offline once cached.
2. **Photos stay on device:** Field photos contain GPS metadata and are never uploaded to a remote server.
3. **No API keys or usage fees:** Inference runs on local hardware.

## Quickstart & Local Setup

Because the application uses ES modules, a Service Worker, and WebGPU via browser workers, it must be served over an HTTP connection rather than opened directly via `file://`.

### 1. Clone the Repository

```bash
git clone https://github.com/tahaenasraoui-debug/Verdant-Knight.git
cd Verdant-Knight
```

### 2. Start a Local Server

Run a local server with Python:

```bash
python3 -m http.server 8000
```

### 3. Open in Browser

Open your browser and navigate to:

```text
http://localhost:8000
```

*Note: On your first online load, the browser caches the app shell via `sw.js` and downloads the quantized model weights (~15 MB). Subsequent runs—including Forage Mode without cached weights—function completely offline.*

### 4. Run Tests

Unit tests use Node's built-in test runner with zero external dependencies:

```bash
node --test
```

## Technology Stack

* **Runtime & AI Pipeline:** [Transformers.js v3](https://github.com/huggingface/transformers.js) (`@huggingface/transformers`, loaded dynamically)
* **Model Backbone:** `onnx-community/mobilenetv4_conv_small.e2400_r224_in1k`
* **Graphics & Rendering:** HTML5 Canvas (Pixel-Art Engine)
* **Audio:** Web Audio API (Synthesized procedural retro 8-bit chimes)
* **Haptics:** Web Vibration API
* **Offline & Persistence:** Service Worker (`sw.js`), Web App Manifest (`manifest.json`), and Browser `localStorage`

## Contributing

Contributions, bug reports, and feature suggestions are welcome. For larger changes or new features, please open an issue first to discuss the approach before writing code.

1. Fork the repository and create a branch from `main` (e.g., `git checkout -b fix/short-description` or `feat/short-description`).
2. Keep pull requests focused on a single change and follow the existing code style.
3. Run the local checks before opening a PR:

   ```bash
   node --test
   node --check sw.js
   ```

4. Open a Pull Request describing what changed and why (include a screenshot or GIF for UI/canvas changes, and link any related issue).

Preserve the offline-first, zero-build static web architecture.

When reporting bugs, please include steps to reproduce, expected vs. actual behavior, and your environment details (OS and browser version).

## License

This project is open-source and available under the [MIT License](LICENSE).
