---
description: Create a new blog post with proper frontmatter and structure
---

Create a new blog post for the Words platform. Ask me for:
- Post title
- URL slug (kebab-case)
- Publication date (default to today)
- Brief description

Then create a markdown file in `src/content/posts/` with:
- Filename format: `YYYY-MM-DD-slug.md`
- Proper frontmatter (title, pubDate, description, distributed tracking)
- Basic content structure

After creating the file, run `bun astro check` to validate the frontmatter schema.
