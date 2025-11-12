# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

"Words" is a static blog platform (Astro + Bun) with content distribution tooling.

**Key Documentation**:
- **[README.md](README.md)** - Quick start and overview
- **[WORKFLOW.md](WORKFLOW.md)** - Complete technical reference (single source of truth)
- **[SPEC.md](SPEC.md)** - Requirements and open questions
- **[.claude/](.claude/)** - Agent and slash command configuration

## Critical Guidelines for Claude Code

### Historical Dates (CRITICAL)
**ALWAYS** preserve original publication dates from historical articles. When working with:
- Content migration scripts
- Distribution to external platforms
- Creating markdown files from existing content

**NEVER** default to current dates. Use the original `pubDate` from source material.

### Content Format
Blog posts use markdown with YAML frontmatter.

**Critical fields**:
- `pubDate` - **MUST** use YYYY-MM-DD format and preserve historical dates
- `distributed` - Object tracking which platforms have received content (check before distributing!)

**Filename format**: `YYYY-MM-DD-slug-of-post.md` (date must match `pubDate`)

See [README.md](README.md) for frontmatter example | [WORKFLOW.md](WORKFLOW.md):74-150 for complete schema

### Distribution Platform Limitations
Platform APIs have backdating restrictions:
- **Medium**: Cannot reliably backdate posts via API
- **Substack**: May require manual posting for historical dates
- **LinkedIn**: Has character limits and formatting restrictions

Always check `distributed` frontmatter field to avoid duplicate posts. See [WORKFLOW.md](WORKFLOW.md):289-324 for details.

### Configuration Files
- `astro.config.mjs` - Set `site` and `base` for GitHub Pages
- `src/content.config.ts` - Content collections schema with Zod validation
- `.github/workflows/deploy.yml` - Deployment automation

See [WORKFLOW.md](WORKFLOW.md) for complete configuration details.

### Available Tools
Use project-specific shortcuts from `.claude/`:
- **Slash Commands**: `/new-post`, `/preview`, `/check`, `/build`, `/distribute`
- **Agents**: blog-post-creator, content-distributor, migration-helper

See [.claude/README.md](.claude/README.md) for complete list.
