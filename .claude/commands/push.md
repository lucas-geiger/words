---
description: Commit and push changes with an expressive commit message
---

Create an expressive commit message, commit all changes, and push to remote.

## Process

1. **Check Status**: Run `git status` to see all changes

2. **Review Changes**: Run `git diff` (both staged and unstaged) to understand what changed

3. **Analyze Changes**: Review the diffs and determine:
   - What was added, modified, or removed
   - The purpose of these changes
   - The impact on the project

4. **Draft Commit Message**:
   - Write a concise, expressive commit message (1-2 sentences)
   - Focus on **why** the changes were made, not just **what** changed
   - Use conventional commit style when appropriate (feat:, fix:, docs:, chore:, etc.)
   - Examples:
     - "feat: add WIP workflow with draft and research directories"
     - "chore: move content directory to root for cleaner structure"
     - "docs: update README with linting and formatting instructions"
     - "fix: correct content.config.ts path after directory restructure"

5. **Stage and Commit**: Use heredoc format for proper message formatting:

   ```bash
   git add .
   git commit -m "$(cat <<'EOF'
   Your commit message here.
   EOF
   )"
   ```

6. **Push**: Push to the current branch:

   ```bash
   git push
   ```

7. **Verify**: Run `git status` after push to confirm success

## Important Notes

- **Never** force push unless explicitly requested
- **Never** skip hooks (--no-verify)
- **Never** amend commits unless explicitly requested
- If there are no changes to commit, inform me - don't create an empty commit
- If pre-commit hooks modify files, verify and may need to amend (check authorship first)
- Show me the commit message before committing for approval

## Example

If I added linting setup and moved content directory:

```
chore: add ESLint/Prettier and restructure content directory

- Configure ESLint for TypeScript and Astro files
- Add Prettier with Astro plugin for consistent formatting
- Move content from src/content/posts to content/posts for cleaner structure
- Add weekly lint check to CI workflow
```
