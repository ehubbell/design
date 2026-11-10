# AGENTS

## Overview

Eric Hubbell brand assets, visual foundations, and design diagrams.

This file governs contributions to `eric-hubbell-design`. Read applicable parent instructions before working here.

## Project Context

Read the README and inspect the package commands, source organization, and nearest existing implementation before making changes. Follow any shared workspace context and contracts referenced by the applicable parent instructions.

## Collaboration

Build with the existing architecture and conventions. Prefer focused changes with explicit ownership. Preserve unrelated local work and avoid speculative abstractions or features. Resolve material ambiguity before making dependent changes.

## Workspace Boundaries

Keep mutations within the requested project and scope. Sibling repositories may be read for context; changing them requires explicit user authorization. Read a project's own instructions before working in it.

Use the existing local environment. Do not create replacement infrastructure, run migrations, publish, or deploy without applicable authorization. Keep credentials out of source, logs, and reports.

## Validation

Run the project's applicable lint, type, build, and existing validation commands. Follow the workspace's test ownership and authoring policy; do not invent a test suite or infrastructure during scaffolding. Report checks that could not run and prerequisites that are missing.

## Documentation and Working Notes

Keep the README focused on the project's purpose, prerequisites, setup, and essential usage and development commands. Keep agent contribution instructions here rather than turning the README into an application manual.

Do not create a `docs/` directory or other documentation artifacts unless explicitly requested. Keep plans, progress notes, audits, handoffs, and completion reports in the conversation. Preserve existing documentation and its ownership rules.

## Source ownership

Edit brand artwork under `src/brand/brand-kit/assets/` and kit roles in `styles/tokens.css`. These begin as a portable snapshot of the sibling website's `public/` assets and `src/app/globals.css` (2026-11-10); the website remains authoritative for implemented UI. Describe new identity explorations as proposals. Do not silently sync changes into sibling repositories.

Regenerate `src/brand/brand-kit/exports/` with `npm run export:brand`; never edit generated files. Keep font licenses with exports. The diagram describes this repository's asset workflow, not a business or service architecture. Keep diagram positions and descriptions in its named data; viewing must not persist changes.

Run `npm run check` and `npm run export:brand`. Inspect both previews at desktop and mobile widths, theme and keyboard behavior, diagram pan/zoom/Fit/details, and the extracted ZIP served separately. Compare sibling compositions before adding a new pattern. Do not add a test framework solely for this scaffold.
