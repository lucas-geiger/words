# Project Specification: Words Blog

This document defines the **requirements, decisions, and open questions** for the Words blog platform.

**For implementation details, see [WORKFLOW.md](WORKFLOW.md) | For overview, see [README.md](README.md)**

## Overview

A self-hosted static blog published to GitHub Pages, with tooling for content distribution and migration of historical articles.

## Core Requirements

### Blog Platform

- **Hosting**: GitHub Pages
- **Type**: Static site (SSG to be determined)
- **Build**: GitHub Actions workflow
- **Content Format**: Markdown articles
- **Historical Content**: Support for re-publishing several years of existing articles with preserved publication dates

### TypeScript Tooling (Bun Runtime)

Scripts will be standalone TypeScript files executed via Bun, runnable both locally and in GitHub Actions.

#### Script 1: Blog Publisher

- Publish individual blog articles
- Process markdown content
- Generate static site pages
- Handle metadata (title, date, tags, etc.)

#### Script 2: Content Distributor

- Export blog excerpts to multiple platforms:
  - Medium
  - Substack
  - LinkedIn
- **Critical**: Preserve historical published dates (not current date)
- May require API integration with each platform
- Should handle authentication/credentials securely

## Technical Considerations

### Static Site Generator

- **Selected**: Astro v5+ (chosen for content-first architecture)
- Features utilized:
  - Content Collections with Zod schema validation
  - Type-safe markdown processing
  - Custom publish dates preserved from frontmatter
  - Built-in GitHub Pages deployment support
  - Minimal JavaScript output for fast loading

### Content Structure

- Markdown files with frontmatter for metadata:
  - Title
  - Publication date (historical dates supported)
  - Tags/categories
  - Excerpt/summary
  - Author info
  - Distribution status (which platforms it's been posted to)

### Historical Content Migration

- Need process for:
  - Importing existing articles
  - Preserving original publication dates
  - Maintaining URLs/permalinks if applicable
  - Handling any media/images from old articles

### Distribution Script Challenges

- Platform API authentication
  - Medium: OAuth or integration tokens
  - Substack: API access (may have limitations)
  - LinkedIn: OAuth, posting API
- Backdating content:
  - **Important**: Not all platforms may support setting historical dates via API
  - May need workarounds or date notation in content
- Rate limiting considerations
- Tracking what's been distributed to avoid duplicates

### GitHub Actions Integration

- Workflow for building and deploying site
- Potential workflow for automated content distribution
- Secure secret management for API keys
- Bun runtime setup in CI

## Decisions Made

✅ **Static Site Generator**: Astro v5+ selected
✅ **Runtime**: Bun for development and tooling
✅ **Content Structure**: Defined in WORKFLOW.md with Zod schema
✅ **Deployment**: GitHub Actions workflow specified

## Open Questions

1. **Content Migration**: What format are the historical articles currently in?
2. **Distribution Automation**: Should distribution be manual, semi-automated, or fully automated?
3. **Platform Limitations**: Do Medium/Substack/LinkedIn APIs support backdating posts?
4. **URL Structure**: Should we maintain specific URL patterns for SEO?
5. **Theme/Design**: Any specific design requirements or templates?
6. **Analytics**: Should we include analytics tracking?
7. **Comments**: Any commenting system needed?
8. **RSS Feed**: Should an RSS feed be generated?

## Next Steps

1. ✅ Choose static site generator (Astro)
2. ✅ Define content structure and frontmatter schema (see WORKFLOW.md)
3. Initialize Astro project with Bun
4. Set up content collections structure
5. Create basic blog pages and layout
6. Implement GitHub Actions deployment workflow
7. Create publisher script
8. Research platform APIs for distribution script
9. Plan historical content migration process
