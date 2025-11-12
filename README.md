# Words

A self-hosted static blog platform built with Astro and published to GitHub Pages, with TypeScript tooling for content distribution and historical content migration.

## Features

- **Modern Stack**: Astro v5+ static site generator with Bun runtime
- **Utility-First Styling**: Tailwind CSS via CDN for rapid development
- **Lightweight Interactivity**: Alpine.js for DOM manipulation without heavy frameworks
- **Type-Safe Content**: Content collections with Zod schema validation
- **Historical Content**: Preserve and re-publish articles with original dates
- **Multi-Platform Distribution**: Automated distribution to Medium, Substack, and LinkedIn (planned)
- **Automated Deployment**: GitHub Actions workflow for continuous deployment

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun --bun astro dev

# Lint and format check
bun run lint

# Auto-fix linting and formatting
bun run lint:fix

# Type check content
bun astro check

# Build for production
bun astro build

# Preview production build
bun astro preview
```

Visit http://localhost:4321/words to see your blog (note: /words is the base path).

## Project Structure

```
├── wip/                     # Work in progress (drafts & research)
│   ├── content/             # Draft articles (1-name/, 2-name/, etc.)
│   └── research/            # Research notes (not published)
├── content/
│   └── posts/               # Published blog posts (markdown)
├── src/
│   ├── pages/
│   │   └── blog/            # Blog pages (Tailwind + Alpine)
│   ├── layouts/             # Page layouts (future)
│   └── components/          # Reusable components (future)
├── scripts/                 # TypeScript tooling (Bun)
│   ├── publish.ts           # (to be implemented)
│   ├── distribute.ts        # (to be implemented)
│   └── migrate.ts           # (to be implemented)
├── .claude/                 # Claude Code configuration
└── .github/
    └── workflows/
        └── deploy.yml       # Automated deployment
```

## Creating Content

### Writing Workflow

This project uses a **work-in-progress (WIP) directory** for drafts and research:

1. **Research**: Write exploratory notes in `wip/research/` - these build your knowledge base but aren't published
2. **Draft**: Create article drafts in `wip/content/X-article-name/` - numbered directories for each article
3. **Publish**: When ready, promote draft to `content/posts/YYYY-MM-DD-slug.md` with full frontmatter

### Draft Format (wip/content/)

```
wip/content/1-my-first-article/draft.md
```

Work freely without strict formatting - focus on content.

### Published Format (content/posts/)

```markdown
---
title: 'Your Post Title'
pubDate: 2025-01-15
description: 'Brief description for SEO'
tags: ['tech', 'blog']
distributed:
  medium: false
  substack: false
  linkedin: false
---

Your content here...
```

**Filename format**: `YYYY-MM-DD-slug-of-post.md`

See [wip/README.md](wip/README.md) for complete workflow details.

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

**GitHub Actions Workflows**:

- **Deploy** (`.github/workflows/deploy.yml`) - Runs on push to main
- **Lint** (`.github/workflows/lint.yml`) - Runs on push, PRs, and weekly on Mondays

**Required GitHub Settings**:

- Repository Settings → Pages → Source: "GitHub Actions"

## Documentation

- **[SPEC.md](SPEC.md)** - Project requirements, decisions, and open questions
- **[WORKFLOW.md](WORKFLOW.md)** - Complete technical reference and best practices
- **[DECISIONS.md](DECISIONS.md)** - Setup decisions and rationale (session log)
- **[CLAUDE.md](CLAUDE.md)** - Guidance for Claude Code AI assistant
- **[.claude/README.md](.claude/README.md)** - Claude Code configuration and commands

## Claude Code Support

This project includes Claude Code configuration with:

- **WIP workflow commands**: `/new-draft`, `/new-research`, `/promote`, `/list-wip`
- **Development commands**: `/preview`, `/check`, `/build`, `/distribute`, `/push`
- **Specialized agents**: blog-post-creator, content-distributor, migration-helper
- **Project settings**: Git co-author disabled

See [.claude/README.md](.claude/README.md) for complete documentation.

## Tech Stack

- **Static Site Generator**: [Astro](https://astro.build) v5+
- **Runtime**: [Bun](https://bun.sh)
- **Deployment**: [GitHub Pages](https://pages.github.com)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Language**: TypeScript

## License

[Add your license here]
