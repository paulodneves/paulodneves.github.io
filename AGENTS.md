# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open `index.html` directly in a browser or serve locally:

```
npx serve .
# or
python -m http.server
```

Deployed to GitHub Pages at `pdiegoneves.github.io` — push to `main` to publish.

## Architecture

Static single-page portfolio. Three moving parts:

- **`index.html`** — entire page structure + all CSS inlined in `<style>`. The inline CSS and `css/styles.css` are mirrors of each other; keep both in sync when changing styles.
- **`js/main.js`** — all interactivity loaded via `defer`. Bootstraps on `DOMContentLoaded`.
- **`projetos/*.html`** — older project detail pages using Tailwind CDN + Chart.js (different design system than the main page, not integrated with `css/styles.css`).

## Data lives in JS

Portfolio cards and timeline entries are **hardcoded arrays in `js/main.js`**, not fetched from anywhere:

- `portfolioData` (line 132) — add/edit/remove projects here. Each entry has `title`, `category` (`software`|`dados`|`automacao`), `description`, `result`, `tags[]`, `link`.
- `experienceData` (line 261) — add/edit career timeline entries here.

Both arrays are rendered dynamically into the DOM on page load; skeleton loaders in the HTML are replaced immediately.

## Animation conventions

- **Scroll reveal**: add class `reveal` to any element. The `revealObserver` in `main.js` adds `visible` when it enters viewport. Stagger with `style="--delay: 0.1s"`.
- **Counter animation**: `<span class="counter" data-target="90">0</span>` — fires once on viewport entry.
- **Skill bars**: `<div class="skill-bar__fill" data-width="85"></div>` — width animates to `data-width%` on viewport entry.
- All animations respect `prefers-reduced-motion` via CSS.

## CSS design tokens

All tokens are CSS custom properties on `:root` (accent green: `#10B981`). Change color/spacing here rather than in individual rules. The `--delay` custom property on reveal elements controls stagger timing.

## nav-h coupling

The nav height (`68px`) is hardcoded in both CSS (`--nav-h: 68px`) and JS (`const navH = 68` at line 49 of `main.js`). Change both together if the nav height changes.
