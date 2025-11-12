# Work in Progress (WIP)

This directory contains drafts and research for blog articles.

## Structure

```
wip/
├── content/              # Draft articles (may or may not be published)
│   ├── 1-article-name/
│   │   └── draft.md
│   ├── 2-another-article/
│   │   └── draft.md
│   └── ...
└── research/             # Research notes and knowledge base
    ├── topic-1.md
    ├── topic-2.md
    └── ...
```

## Workflow

### Research Notes (`./wip/research/`)

- Write exploratory research articles
- Build a knowledge base of ideas and findings
- These are **not** published to the blog
- Can be referenced when writing articles

### Draft Articles (`./wip/content/X-article-name/`)

- Each article gets its own numbered directory
- Work on drafts that may never be published
- When ready to publish, move content to `content/posts/` with proper formatting

### Publishing Process

When a draft is ready:

1. Review and finalize content in `wip/content/X-article-name/draft.md`
2. Create properly formatted file in `content/posts/YYYY-MM-DD-slug.md`
3. Add complete frontmatter (title, pubDate, description, tags, etc.)
4. Run `bun astro check` to validate
5. Test locally with `bun --bun astro dev`
6. Commit and push to trigger deployment

Use the `/promote` command to help with this process.

## Claude Code Support

Use these commands when working with WIP content:

- `/new-draft` - Create a new draft article in wip/content/
- `/new-research` - Create a new research note in wip/research/
- `/promote` - Promote a draft to published content
- `/list-wip` - List all WIP content and research

See [../.claude/README.md](../.claude/README.md) for all available commands.
