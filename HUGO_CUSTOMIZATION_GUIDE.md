# Hugo Static Site Building & Theme Customization Guide

## How Hugo Builds Static Sites

Hugo is a static site generator that converts your Markdown content and templates into HTML files. Here's the process:

### 1. **Content Processing**
- Hugo reads your `content/` directory (Markdown files with front matter)
- Each `.md` file becomes a page with metadata (title, date, tags, etc.)
- The front matter (YAML between `---`) provides page configuration

### 2. **Template Resolution**
Hugo uses a **lookup order** to find templates:
1. `layouts/` in your site root (highest priority - your customizations)
2. `themes/[theme-name]/layouts/` (theme defaults)

This means files in your `layouts/` directory **override** theme templates.

### 3. **Template Hierarchy**

```
baseof.html (base template)
  ├── head.html (partial)
  ├── header.html (partial)
  ├── main block (content area)
  └── footer.html (partial)
```

**Key Concepts:**
- **`baseof.html`**: The root template that wraps all pages
- **Blocks**: Named sections (`{{- block "main" . }}{{ end }}`) that child templates can override
- **Partials**: Reusable template fragments (`{{- partial "header.html" . }}`)
- **Lookup Order**: Hugo finds templates in this order:
  - `layouts/_default/baseof.html` (your custom base)
  - `themes/PaperMod/layouts/_default/baseof.html` (theme base)

## Your Current Setup

You're using the **PaperMod** theme with some customizations:

```
damilojohn.github.io/
├── config.yml              # Site configuration
├── content/                # Your Markdown content
│   ├── articles/          # Blog posts
│   └── projects/         # Project pages
├── layouts/               # YOUR CUSTOM TEMPLATES (overrides theme)
│   └── _default/
│       ├── archives.html
│       └── staticpage.html
├── static/                # Static assets (CSS, images, PDFs)
│   └── css/
│       └── style.css
└── themes/
    └── PaperMod/          # Theme files (don't edit directly!)
        ├── layouts/       # Theme templates
        ├── assets/        # Theme CSS/JS
        └── ...
```

## How to Customize Your Theme

### Method 1: Override Templates (Recommended)

**Why**: This preserves theme updates. When you update PaperMod, your customizations remain.

**How**: Copy theme templates to your `layouts/` directory and modify them.

#### Example: Customizing the Base Template

1. Copy the theme's base template:
   ```bash
   # Copy from theme to your layouts
   cp themes/PaperMod/layouts/_default/baseof.html layouts/_default/baseof.html
   ```

2. Now edit `layouts/_default/baseof.html` - your changes override the theme.

#### Example: Adding Custom CSS/JS

Create `layouts/partials/extend_head.html`:
```html
{{- /* Custom head content */ -}}
<link rel="stylesheet" href="/css/custom-effects.css">
<script src="/js/custom-animations.js" defer></script>
```

The theme already includes `{{- partial "extend_head.html" . }}` in `head.html`, so this file will be automatically included.

### Method 2: Add Custom Assets

**Static Assets**: Put files in `static/` directory
- `static/css/custom.css` → accessible at `/css/custom.css`
- `static/js/effects.js` → accessible at `/js/effects.js`
- `static/images/logo.png` → accessible at `/images/logo.png`

**Then reference them**:
- In `layouts/partials/extend_head.html` for CSS/JS
- In Markdown: `![alt](/images/logo.png)`

### Method 3: Override Specific Layouts

**Single Post Page** (`single.html`):
```bash
cp themes/PaperMod/layouts/_default/single.html layouts/_default/single.html
```
Now you can add custom elements, animations, or effects to post pages.

**Home Page** (`index.html` or `list.html`):
```bash
cp themes/PaperMod/layouts/_default/list.html layouts/_default/list.html
```

**404 Page**:
```bash
cp themes/PaperMod/layouts/404.html layouts/404.html
```

### Method 4: Custom Partials

Create your own partials in `layouts/partials/`:

**Example: `layouts/partials/custom_effects.html`**
```html
<div class="custom-animation-wrapper">
  <!-- Your custom HTML/CSS/JS effects -->
</div>
```

**Then include it in templates:**
```html
{{- partial "custom_effects.html" . }}
```

## Practical Examples

### Adding a Custom Animation Effect

1. **Create CSS file**: `static/css/animations.css`
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-entry {
  animation: fadeInUp 0.6s ease-out;
}
```

2. **Include in head**: Create `layouts/partials/extend_head.html`
```html
<link rel="stylesheet" href="/css/animations.css">
```

### Adding Custom JavaScript

1. **Create JS file**: `static/js/custom.js`
```javascript
// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
```

2. **Include in head**: Add to `layouts/partials/extend_head.html`
```html
<script src="/js/custom.js" defer></script>
```

### Customizing Post Layout

1. **Copy single.html**:
```bash
cp themes/PaperMod/layouts/_default/single.html layouts/_default/single.html
```

2. **Edit** `layouts/_default/single.html` to add custom elements:
```html
{{- define "main" }}
<article class="post-single">
  <!-- Existing content -->
  
  <!-- Add your custom effect here -->
  <div class="custom-post-effect">
    {{ .Content }}
  </div>
</article>
{{- end }}
```

## Understanding Template Variables

Hugo provides many variables you can use in templates:

- **`.Title`**: Page title
- **`.Content`**: Rendered Markdown content
- **`.Params`**: Front matter parameters
- **`.Site.Params`**: Site config parameters
- **`.Permalink`**: Full URL to page
- **`.Date`**: Publication date
- **`.Tags`**: Page tags
- **`.IsHome`**: True if homepage
- **`.Kind`**: Page type (page, section, home, etc.)

**Example usage:**
```html
{{ if .IsHome }}
  <h1>Welcome to {{ .Site.Title }}</h1>
{{ end }}

{{ range .Params.tags }}
  <span class="tag">{{ . }}</span>
{{ end }}
```

## Development Workflow

1. **Start Hugo server**:
   ```bash
   hugo server -D
   ```
   - `-D` includes draft posts
   - Runs at `http://localhost:1313`
   - Auto-reloads on file changes

2. **Build for production**:
   ```bash
   hugo
   ```
   - Outputs to `public/` directory
   - Minifies CSS/JS
   - Optimizes assets

3. **Test locally** before deploying

## Best Practices

1. **Never edit theme files directly** - Always override in `layouts/`
2. **Use partials** for reusable components
3. **Keep custom CSS/JS in `static/`** - organized by type
4. **Document your customizations** - comment your code
5. **Test after theme updates** - ensure compatibility

## Common Customization Points

| File | Purpose | Location |
|------|---------|----------|
| `extend_head.html` | Add CSS/JS to `<head>` | `layouts/partials/` |
| `extend_footer.html` | Add content before `</body>` | `layouts/partials/` |
| `baseof.html` | Root template structure | `layouts/_default/` |
| `single.html` | Individual post/page layout | `layouts/_default/` |
| `list.html` | List/archive pages | `layouts/_default/` |
| `header.html` | Navigation/header | `layouts/partials/` |
| `footer.html` | Footer content | `layouts/partials/` |

## Next Steps

1. **Experiment**: Start with `extend_head.html` to add custom CSS
2. **Override templates**: Copy theme templates you want to modify
3. **Create partials**: Build reusable components
4. **Add effects**: Use CSS animations, JS libraries, etc.

Remember: Hugo's template lookup means your `layouts/` files always take precedence over theme files!



