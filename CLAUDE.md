# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

Personal blog and portfolio site for Damilola John, built with **Hugo** using the **PaperMod** theme. Deployed to GitHub Pages via the `hugo` branch. Design emphasis is on minimalism and clean modern aesthetics.

## Commands

```bash
# Local dev server (includes draft posts, auto-reloads at http://localhost:1313)
hugo server -D

# Production build (outputs to public/)
hugo

# Build with verbose output (useful for debugging template errors)
hugo --verbose
```

The CI/CD pipeline (`.github/workflows/hugo.yml`) uses Hugo Extended v0.148.0 and deploys on every push to the `hugo` branch.

## Architecture

```
├── config.yml              # Site config: menus, params, theme settings
├── content/
│   ├── articles/           # Blog posts (ML/systems topics)
│   ├── projects/           # Project write-ups
│   ├── about.md            # About page (uses staticpage layout)
│   └── archives.md         # Archives page
├── layouts/                # Custom templates (override PaperMod defaults)
│   ├── _default/
│   │   ├── staticpage.html # Layout for about/static pages
│   │   └── archives.html   # Custom archives layout
│   ├── articles/
│   │   └── list.html       # Articles list page (rectangular card tiles)
│   ├── projects/
│   │   └── list.html       # Projects list page (left-border hover tiles)
│   └── partials/
│       └── extend_head.html # Injects custom CSS/JS into <head>
├── static/
│   ├── css/
│   │   ├── style.css            # Primary custom styles
│   │   └── custom-effects.css   # Animations, hover effects
│   ├── js/
│   │   └── custom-effects.js    # Scroll, lightbox, progress bar
│   └── [images/assets]          # Cover images referenced in front matter
└── themes/PaperMod/        # Theme (never edit directly)
```

**Key architectural rule**: Hugo's lookup order means `layouts/` always overrides `themes/PaperMod/layouts/`. To customize any theme template, copy it into `layouts/` and edit there.

## Content Front Matter

Standard front matter for articles:

```yaml
---
title: "Article Title"
date: 2026-01-16T08:25:46+01:00
draft: false
cover:
    image: "filename.png"   # must exist in static/
    alt: 'Alt text'
tags: ['Tag1', 'Tag2']
Categories: ['Category']
---
```

Standard front matter for projects:

```yaml
---
title: "Project Name"
date: 2026-01-01T00:00:00+01:00
draft: false
description: "One or two sentence blurb shown on the projects list page."
tags: ['Python', 'Rust']   # tech stack chips shown on the tile
github: "https://github.com/..."   # optional
demo: "https://..."                # optional — used as the title's primary link
article: "https://..."             # optional
weight: 1                          # controls display order (lower = first)
---
```

**Draft behaviour**: Both `layouts/articles/list.html` and `layouts/projects/list.html` explicitly filter `Draft: false` at the template level, so drafts are hidden even when running `hugo server -D`.

**Projects tile link priority**: `demo` → `github` → `article` (first available becomes the title link).

## Design System

The about, projects, and articles list pages share a consistent design implemented as standalone HTML templates (not extending PaperMod's baseof). They all use:

- **Tailwind CSS** (CDN), **Inter** (sans), **Merriweather** (serif), **Material Icons**
- Zinc/gray palette with dark mode via `document.documentElement.classList.toggle('dark')`
- Identical header (hamburger mobile nav) and footer across all three pages

When adding a new top-level section page, copy the header/footer/script block from `layouts/projects/list.html` as a starting point.

## Customization Points

- **Add CSS/JS**: Edit `layouts/partials/extend_head.html` to include additional stylesheets or scripts
- **Override a theme template**: Copy the file from `themes/PaperMod/layouts/` to the same relative path under `layouts/` and modify
- **New partial**: Create `layouts/partials/my-component.html`, then include with `{{- partial "my-component.html" . }}`
- **Math rendering**: Enabled via KaTeX passthrough delimiters in `config.yml` (`\[...\]`, `$$...$$`, `\(...\)`)

## Site Goals

- Entry point for career/work: articles, projects, about, and CV
- Explore web features (animations, WebAssembly) as the site evolves
- Maintain minimalist, modern design — do not introduce visual clutter

## Important

- Do not edit files under `themes/PaperMod/` directly
- Do not violate copyright or intellectual property in any content or assets added
- The `public/` directory is the Hugo build output — changes there are overwritten on rebuild
