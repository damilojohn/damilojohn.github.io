# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
