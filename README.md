# Words

A self-hosted static blog platform built with Astro and published to GitHub Pages, with TypeScript tooling for content distribution and historical content migration.

## Features

- **Modern Stack**: Astro v5+ static site generator with Bun runtime
- **Type-Safe Content**: Content collections with Zod schema validation
- **Historical Content**: Preserve and re-publish articles with original dates
- **Multi-Platform Distribution**: Automated distribution to Medium, Substack, and LinkedIn
- **Automated Deployment**: GitHub Actions workflow for continuous deployment

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun --bun astro dev

# Type check content
bun astro check

# Build for production
bun astro build

# Preview production build
bun astro preview
```

Visit http://localhost:4321 to see your blog.

## Project Structure

```
├── src/
│   ├── content/
│   │   └── posts/           # Blog posts (markdown)
│   ├── pages/
│   │   └── blog/            # Blog pages
│   ├── layouts/             # Page layouts
│   └── components/          # Reusable components
├── scripts/                 # TypeScript tooling (Bun)
│   ├── publish.ts
│   ├── distribute.ts
│   └── migrate.ts
├── .claude/                 # Claude Code configuration
└── .github/
    └── workflows/
        └── deploy.yml       # Automated deployment
```

## Creating Content

Create a new blog post in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
pubDate: 2025-01-15
description: "Brief description for SEO"
tags: ["tech", "blog"]
distributed:
  medium: false
  substack: false
  linkedin: false
---

Your content here...
```

**Filename format**: `YYYY-MM-DD-slug-of-post.md`

## Tooling Scripts

```bash
# Publish a single post
bun run scripts/publish.ts

# Distribute to external platforms
bun run scripts/distribute.ts

# Migrate historical content
bun run scripts/migrate.ts
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Required GitHub Settings**:
- Repository Settings → Pages → Source: "GitHub Actions"

## Documentation

- **[SPEC.md](SPEC.md)** - Project requirements, decisions, and open questions
- **[WORKFLOW.md](WORKFLOW.md)** - Complete technical reference and best practices
- **[CLAUDE.md](CLAUDE.md)** - Guidance for Claude Code AI assistant
- **[.claude/README.md](.claude/README.md)** - Claude Code configuration and commands

## Claude Code Support

This project includes Claude Code configuration with:
- Specialized agents for blog workflows
- Slash commands for common operations (`/new-post`, `/preview`, `/check`, etc.)
- Project-specific settings

See [.claude/README.md](.claude/README.md) for details.

## Tech Stack

- **Static Site Generator**: [Astro](https://astro.build) v5+
- **Runtime**: [Bun](https://bun.sh)
- **Deployment**: [GitHub Pages](https://pages.github.com)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Language**: TypeScript

## License

[Add your license here]
