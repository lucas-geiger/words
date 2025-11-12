---
description: Promote a draft to published content
---

Promote a draft article from WIP to published blog post.

1. List all drafts in `wip/content/`
2. Ask which draft to promote
3. Ask for final metadata:
   - Final title (if different from draft)
   - Publication date (YYYY-MM-DD format)
   - Description (for SEO and previews)
   - Tags (comma-separated)
4. Create properly formatted file in `content/posts/YYYY-MM-DD-slug.md` with complete frontmatter:
   ```yaml
   ---
   title: 'Final Post Title'
   pubDate: 2025-01-15
   description: 'Brief SEO description'
   tags: ['tag1', 'tag2']
   distributed:
     medium: false
     substack: false
     linkedin: false
   ---
   ```

After creating:

- Run `bun astro check` to validate
- Ask if I want to keep or delete the original draft
- Remind me to test locally with `bun --bun astro dev`
