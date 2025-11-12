# Workflow, Standards, and Best Practices

This document is the **complete technical reference** for the Words blog project. It outlines development workflow, coding standards, and best practices using Astro, Bun, and GitHub Pages.

**For a quick overview, see [README.md](README.md)**

## Technology Stack

- **Static Site Generator**: Astro v5+
- **Runtime**: Bun (for development and tooling scripts)
- **Styling**: Tailwind CSS v3+ (via CDN)
- **JavaScript Framework**: Alpine.js v3+ (via CDN)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Content Format**: Markdown with YAML frontmatter
- **Type Safety**: TypeScript with Zod schema validation

### Frontend Architecture

**CSS Strategy**: This project uses Tailwind CSS loaded from CDN rather than compiled. This approach:
- Eliminates build step for CSS
- Provides instant prototyping with utility classes
- Reduces bundle configuration complexity
- Works seamlessly with Astro's hot reload

**JavaScript Strategy**: Alpine.js is used for DOM manipulation and interactivity. It provides:
- Declarative reactive components
- Minimal JavaScript footprint
- No build step required
- Clean integration with server-rendered HTML

**Important**: All CDN script tags must use the `is:inline` directive in Astro to prevent processing:

```astro
<script is:inline src="https://cdn.tailwindcss.com"></script>
<script is:inline defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

## Project Setup

### Initial Installation

```bash
# Create new Astro project with Bun
bun create astro@latest

# Install dependencies
bun install

# Run development server with Bun runtime
bun --bun astro dev
```

### Configuration Files

**astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/words', // Only if not using username.github.io repo
  output: 'static',
  // Optional: integrate markdown plugins
});
```

**Important Notes:**

- For `username.github.io` repositories, omit the `base` setting
- For other repositories, `base` must match your repo name with leading slash
- All internal links must be prefixed with the `base` value when configured

## Content Collections Structure

### Directory Organization

```
.
├── content/                   # Published content (root-level, not in src/)
│   └── posts/                 # Blog posts collection
│       ├── 2020-03-15-historical-post.md
│       ├── 2023-06-20-recent-post.md
│       └── 2025-01-10-new-post.md
├── wip/                       # Work-in-progress content
│   ├── content/               # Draft articles
│   │   ├── 1-article-name/
│   │   │   └── draft.md
│   │   └── 2-another-article/
│   │       └── draft.md
│   └── research/              # Research notes (knowledge base, not published)
│       └── topic-name.md
├── src/
│   ├── content.config.ts      # Content collections configuration
│   ├── pages/
│   │   ├── index.astro        # Homepage (Tailwind + Alpine)
│   │   └── blog/
│   │       ├── index.astro    # Blog list page (Tailwind + Alpine)
│   │       └── [...slug].astro # Dynamic blog post pages (Tailwind + Alpine)
│   ├── layouts/               # Reusable layouts (future)
│   └── components/            # Reusable components (future)
├── scripts/                   # Standalone TypeScript utility scripts
│   ├── distribute.ts          # (planned) Multi-platform distribution
│   ├── migrate.ts             # (planned) Historical content migration
│   └── publish.ts             # (planned) Publishing automation
├── .claude/                   # Claude Code configuration
│   ├── agents/                # Specialized agents
│   ├── commands/              # Slash commands
│   └── settings.json          # Project settings
└── public/                    # Static assets
```

**Key Architectural Decisions**:

1. **No layouts or components yet**: All pages use inline Tailwind classes. Layouts/components will be extracted when patterns emerge.
2. **Content location**: Published posts are in `content/posts/` (root-level, outside `src/`) for cleaner separation.
3. **WIP workflow**: Three-tier content system (research → drafts → published).
4. **Scripts**: Flat TypeScript files, no subdirectories.

### Content Collections Configuration

**src/content.config.ts**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Lucas'),
    excerpt: z.string().optional(), // For distribution to other platforms
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    distributed: z
      .object({
        medium: z.boolean().default(false),
        substack: z.boolean().default(false),
        linkedin: z.boolean().default(false),
      })
      .optional(),
  }),
});

export const collections = { posts };
```

## Pages and Styling

### Page Architecture

All pages currently use **inline Tailwind CSS classes** - no separate layout components yet. This approach:
- Speeds up initial development
- Avoids premature abstraction
- Makes each page self-contained and easy to understand

Layouts and components will be extracted when clear patterns emerge across 3+ pages.

### Page Structure Pattern

Each page follows this structure:

```astro
---
// Frontmatter: imports and data fetching
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');
---

<!doctype html>
<html lang="en" class="bg-gray-200">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title - Words</title>

    <!-- Tailwind CSS and Alpine.js from CDN -->
    <script is:inline src="https://cdn.tailwindcss.com"></script>
    <script is:inline defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body class="bg-white max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
    <header class="mb-16 pb-8 border-b border-gray-300">
      <h1 class="text-4xl font-bold tracking-tight">Words</h1>
      <nav class="flex gap-6">
        <a href={`${import.meta.env.BASE_URL}/`}>Home</a>
        <a href={`${import.meta.env.BASE_URL}/blog`}>All Posts</a>
      </nav>
    </header>
    <main>
      <!-- Page content -->
    </main>
  </body>
</html>
```

### Tailwind CSS Guidelines

**Responsive Spacing**:
- Use responsive padding: `px-4 sm:px-8 lg:px-12`
- This provides 16px → 32px → 48px gutters as viewport grows

**Typography Scale**:
- H1 (homepage): `text-4xl font-bold tracking-tight`
- H2 (sections): `text-2xl font-semibold`
- Body text: `text-gray-900` with `leading-relaxed`
- Muted text: `text-gray-600`

**Color Palette**:
- Text: `text-gray-900` (primary), `text-gray-600` (secondary)
- Borders: `border-gray-300`
- Background: `bg-white` (content), `bg-gray-200` (html/viewport)
- Accent: `text-blue-600` (links on hover)

**Prose Styling** (for blog posts):
Use Tailwind's typography plugin classes for markdown content:
```astro
<div class="prose prose-lg max-w-none
  prose-headings:font-semibold
  prose-a:text-blue-600
  prose-code:bg-gray-100">
  <Content />
</div>
```

### Navigation Links

**Critical**: Always include trailing slash after `BASE_URL` when building paths:

```astro
<!-- ✅ Correct -->
<a href={`${import.meta.env.BASE_URL}/`}>Home</a>
<a href={`${import.meta.env.BASE_URL}/blog`}>Blog</a>
<a href={`${import.meta.env.BASE_URL}/blog/${post.id}`}>Post</a>

<!-- ❌ Wrong - creates /wordsblog instead of /words/blog -->
<a href={`${import.meta.env.BASE_URL}blog`}>Blog</a>
```

### Alpine.js Usage

Alpine.js is loaded but not yet used. When needed for interactivity:

```astro
<!-- Toggle example -->
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>
```

## Markdown Content Standards

### File Naming Convention

Use ISO date format with slug:

```
YYYY-MM-DD-slug-of-post.md
```

Examples:

- `2020-03-15-my-first-post.md`
- `2023-12-25-holiday-reflections.md`

### Frontmatter Template

```yaml
---
title: 'Your Post Title'
pubDate: 2025-01-10
description: 'A brief description for SEO and listings'
author: 'Lucas'
excerpt: 'Optional excerpt for distribution to Medium/Substack/LinkedIn'
tags: ['tech', 'blog', 'tutorial']
draft: false
distributed:
  medium: false
  substack: false
  linkedin: false
---
Your markdown content starts here...
```

### Frontmatter Rules

1. **title**: Required, use sentence case
2. **pubDate**: Required, YYYY-MM-DD format for historical dates
3. **description**: Required, 150-160 characters for SEO
4. **excerpt**: Optional but recommended for distribution scripts
5. **tags**: Use lowercase, kebab-case for multi-word tags
6. **draft**: Set to `true` to exclude from production builds
7. **distributed**: Track which platforms the content has been posted to

### Content Guidelines

- Use proper markdown heading hierarchy (start with ##, not #)
- Include alt text for all images
- Use code blocks with language specifiers
- Keep paragraphs concise (3-5 sentences)
- Use relative links for internal content

## GitHub Actions Workflow

### Workflow Configuration

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build with Astro
        uses: withastro/action@v5
        with:
          package-manager: bun@latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### GitHub Repository Settings

1. Navigate to **Settings > Pages**
2. Set **Source** to "GitHub Actions"
3. Save changes

### Performance Optimizations

- **Bun lockfile**: Commit `bun.lockb` for faster CI installs (30-70% faster)
- **Caching**: The `withastro/action` handles caching automatically
- **Parallelization**: Bun automatically parallelizes file operations

## Development Workflow

### Daily Development

```bash
# Start development server (with Bun runtime)
bun --bun astro dev

# Create new blog post
touch content/posts/$(date +%Y-%m-%d)-new-post.md

# Build for production (test locally)
bun astro build

# Preview production build
bun astro preview

# Type check
bun astro check

# Run custom scripts
bun run scripts/publish.ts
bun run scripts/distribute.ts
```

### Git Workflow

```bash
# Create feature branch
git checkout -b content/new-blog-post

# Commit changes
git add .
git commit -m "Add new blog post about [topic]"

# Push to GitHub (triggers deployment on main branch)
git push origin content/new-blog-post

# Create PR, merge to main when ready
```

### Content Queries in Astro Pages

```typescript
// Get all published posts, sorted by date
import { getCollection } from 'astro:content';

const posts = (await getCollection('posts'))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

// Render a post
const { slug } = Astro.params;
const post = await getEntry('posts', slug);
const { Content } = await post.render();
```

## Bun Considerations

### What Works Well with Bun

✅ Development server (with `--bun` flag)
✅ Static site generation (production builds)
✅ Package management (fast installs)
✅ Running TypeScript scripts
✅ Testing and tooling

### Current Limitations

⚠️ Some integrations may have rough edges
⚠️ SSR (Server-Side Rendering) not recommended for production
⚠️ Community integrations may not be fully tested with Bun

**Recommendation**: Use Bun for development and tooling. Static builds work perfectly.

## TypeScript Tooling Scripts

### Script Location

```
scripts/
├── publish.ts           # Publish single blog post
├── distribute.ts        # Distribute to Medium/Substack/LinkedIn
└── migrate.ts           # Migrate historical content
```

Scripts are standalone TypeScript files - no subdirectories needed.

### Script Execution

```bash
# Run with Bun
bun run scripts/publish.ts --post "2025-01-10-my-post"
bun run scripts/distribute.ts --post "2025-01-10-my-post" --platforms "medium,linkedin"

# Run in GitHub Actions (configure as needed)
```

### Script Standards

- Use TypeScript for type safety
- Import types from `astro:content` when working with posts
- Handle errors gracefully with try/catch
- Log all operations for debugging
- Store API credentials in environment variables
- Never commit secrets

## Historical Content Migration

### Migration Process

1. **Prepare source files**: Convert to markdown if needed
2. **Extract metadata**: Parse existing frontmatter or metadata
3. **Preserve dates**: Ensure `pubDate` reflects original publication
4. **Validate schema**: Run through Zod schema validation
5. **Test locally**: Build site and verify all posts render
6. **Commit in batches**: Group by year or topic for cleaner history

### Migration Script Checklist

- [ ] Parse original content format
- [ ] Extract and preserve publication dates
- [ ] Convert to markdown if needed
- [ ] Generate proper frontmatter
- [ ] Handle images and assets
- [ ] Validate against content collection schema
- [ ] Create summary report of migrated posts

## Best Practices Summary

### Content

- Write in markdown with consistent frontmatter
- Use content collections for type safety
- Preserve historical dates for old posts
- Draft posts locally before pushing

### Development

- Use Bun for fast development and tooling
- Run `bun run lint` before committing
- Run `astro check` before committing
- Test production builds locally with `astro preview`
- Keep dependencies updated

### Deployment

- Commit lockfile (`bun.lockb`) for reproducible builds
- Let GitHub Actions handle deployment automatically
- Monitor workflow runs for errors
- Test changes in feature branches

### Distribution

- Track distribution status in frontmatter
- Preserve original publication dates when cross-posting
- Handle platform API errors gracefully
- Respect rate limits

### Performance

- Minimize JavaScript in static output
- Optimize images before committing
- Use Astro's built-in optimizations
- Leverage Bun's fast file operations

## Troubleshooting

### Common Issues

**Issue**: Base path not working for internal links
**Solution**: Ensure all internal links use `import.meta.env.BASE_URL` prefix

**Issue**: GitHub Pages 404 on routes
**Solution**: Check `site` and `base` configuration in astro.config.mjs

**Issue**: Date parsing errors
**Solution**: Use `z.date()` or `z.string().transform(str => new Date(str))` in schema

**Issue**: Bun integration issues
**Solution**: Fall back to Node for specific problematic integrations

### Getting Help

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [Bun Documentation](https://bun.sh/docs)
- Check GitHub Issues in this repository

## Version History

- **v1.0** (2025-01-12): Initial workflow documentation
  - Astro v5+ with Bun
  - GitHub Pages deployment
  - Content collections structure
  - Distribution workflow planning
