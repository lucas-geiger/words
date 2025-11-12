---
description: Create a new draft article in wip/content/
---

Create a new draft article in the WIP directory.

1. Check `wip/content/` to find the next available number
2. Ask me for a descriptive article name (will be kebab-cased)
3. Create directory: `wip/content/X-article-name/`
4. Create `draft.md` with minimal frontmatter:

   ```yaml
   ---
   title: 'Working Title'
   ---
   Start writing here...
   ```

The draft format is intentionally minimal - focus on writing content, not perfect formatting. You can iterate freely and reference research notes from `wip/research/` as needed.

When the draft is ready to publish, use `/promote` to move it to `content/posts/` with full frontmatter.
