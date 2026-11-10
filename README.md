# Eric Hubbell Design

A local brand kit for creating, reviewing, managing, and exporting Eric Hubbell’s identity assets, with an interactive asset-workflow diagram.

## Preview

Requires Node.js/npm for command shortcuts and Python 3 for the static server and ZIP export. The preview uses HTML, CSS, and browser JavaScript. Asset exports use the local Sharp dependency and Python’s standard-library ZIP support. Run `npm ci` once before exporting; no application build is required.

```sh
npm start
```

- Brand kit: http://127.0.0.1:8765/brand/brand-kit/
- Asset workflow: http://127.0.0.1:8765/diagrams/project-overview/

## Edit and export

Edit `src/brand/brand-kit/assets/` for artwork and licensed fonts, `styles/tokens.css` for visual roles, and the kit HTML for specimens. Asset management is file-based and Git-reviewable. Add new assets to the preview to expose individual downloads; all source files enter the ZIP automatically.

```sh
npm run check
npm run export:brand
```

Generated downloads live in `src/brand/brand-kit/exports/`: a ZIP with both portable previews and assets, plus a SHA-256 asset manifest. Extract the ZIP and serve that folder with `python3 -m http.server 8766 --bind 127.0.0.1`; open `/brand/brand-kit/`. Each logo has SVG, PNG, and JPG downloads in its top-right menu. Generated raster files are 1024 × 1024 pixels under `exports/images/` and are included in the ZIP. PNG preserves rounded-corner transparency; JPG flattens it onto the variant’s background color. Original artwork remains unchanged.

Four logo variants live beside their downloads: `assets/icon.svg` and `assets/eh-full-bleed.svg` are the dark rounded and full-bleed versions; `assets/eh-rounded-light.svg` and `assets/eh-full-bleed-light.svg` are their light counterparts. Each is shown at 16, 24, 32, and 48 CSS pixels, matching the Playbooks logo kit’s size scale. Theme tokens belong to Color; the asset manifest and authoring guidance are under Resources.

Initial assets, fonts/licenses, and tokens are a portable snapshot of `../web/public/` and `../web/src/app/globals.css` on November 10, 2026. Implemented CSS takes precedence over prose in `../web/DESIGN.md`. The website owns its implemented UI; this repository owns design authoring and exports. New identity explorations must be marked as proposals. Changes do not automatically sync to the website.

## Git workflows

The repository starts on `dev`. No commit, remote, or publication is created by scaffolding. Before using the bundled workflows, configure `origin` and establish local `dev` and `main` branches.

- `npm run commit -- "Message"`: stages all project changes, commits on `dev`, and pushes it.
- `npm run deploy`: with a clean tree, merges `dev` into `main`, pushes `main`, and returns to `dev`. This publishes Git changes, not a hosted site.
