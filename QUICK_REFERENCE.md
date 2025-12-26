# Hugo Theme Customization Quick Reference

## 🚀 Quick Start

### Enable Custom Effects (Already Set Up!)
Your custom CSS and JS are already configured:
- ✅ `layouts/partials/extend_head.html` - Links to custom CSS/JS
- ✅ `static/css/custom-effects.css` - Animation styles
- ✅ `static/js/custom-effects.js` - Interactive behaviors

**To test**: Run `hugo server` and check your site!

## 📁 File Structure Cheat Sheet

```
your-site/
├── config.yml                    # Site settings
├── content/                      # Markdown content
│   └── articles/                 # Blog posts
├── layouts/                      # YOUR CUSTOMIZATIONS (overrides theme)
│   └── partials/
│       └── extend_head.html      # Add CSS/JS here
├── static/                       # Static assets (accessible at /)
│   ├── css/                      # → /css/
│   ├── js/                       # → /js/
│   └── images/                   # → /images/
└── themes/PaperMod/              # Theme (don't edit directly!)
```

## 🎨 Common Customizations

### 1. Add Custom CSS
**File**: `layouts/partials/extend_head.html`
```html
<link rel="stylesheet" href="/css/your-styles.css">
```

### 2. Add Custom JavaScript
**File**: `layouts/partials/extend_head.html`
```html
<script src="/js/your-script.js" defer></script>
```

### 3. Override Post Template
```bash
cp themes/PaperMod/layouts/_default/single.html layouts/_default/single.html
```
Then edit `layouts/_default/single.html`

### 4. Override Home Page
```bash
cp themes/PaperMod/layouts/_default/list.html layouts/_default/list.html
```

### 5. Create Custom Partial
Create `layouts/partials/my-component.html`, then use:
```html
{{- partial "my-component.html" . }}
```

## 🔧 Hugo Commands

```bash
# Development server (with drafts)
hugo server -D

# Build for production
hugo

# Build with verbose output
hugo --verbose
```

## 🎯 Template Lookup Order

Hugo checks in this order (first match wins):
1. `layouts/` (your customizations)
2. `themes/PaperMod/layouts/` (theme defaults)

**Key Point**: Files in `layouts/` override theme files!

## 📝 Template Variables

Common variables you can use:
- `{{ .Title }}` - Page title
- `{{ .Content }}` - Rendered content
- `{{ .Params.tags }}` - Front matter tags
- `{{ .Site.Title }}` - Site title
- `{{ .Permalink }}` - Full URL
- `{{ .IsHome }}` - True if homepage
- `{{ .Date }}` - Publication date

## 🎭 Current Custom Effects

Your site now includes:

### CSS Effects (`custom-effects.css`):
- ✨ Fade-in animations for posts
- 🎯 Smooth hover effects
- 🖼️ Image zoom on hover
- 📜 Reading progress bar (JS)
- 📋 Enhanced copy buttons (JS)
- 🖱️ Smooth scrolling
- 🌓 Dark mode transitions

### JavaScript Features (`custom-effects.js`):
- Smooth scroll for anchor links
- Image lightbox (click to zoom)
- Reading progress indicator
- Copy-to-clipboard for code blocks
- Lazy loading support

## 💡 Pro Tips

1. **Always override in `layouts/`** - Never edit theme files directly
2. **Use partials** - Keep templates modular and reusable
3. **Test locally** - Run `hugo server` before deploying
4. **Check browser console** - For JS errors
5. **Use CSS variables** - Theme uses `var(--primary)`, `var(--theme)`, etc.

## 🔍 Debugging

- **Check Hugo output**: `hugo server --verbose`
- **Browser DevTools**: F12 → Console/Network tabs
- **Template errors**: Check terminal output
- **Missing files**: Verify paths in `static/` directory

## 📚 Learn More

- Hugo Docs: https://gohugo.io/documentation/
- PaperMod Theme: https://github.com/adityatelange/hugo-PaperMod
- Template Functions: https://gohugo.io/functions/

---

**Remember**: Your `layouts/` directory is your playground! 🎨



