# Project Decisions and Setup Log

This document records key decisions made during the initial setup of the Words blog platform.

## Session Date: 2025-01-12

### 1. Project Structure Decisions

#### Content Directory Location

**Decision**: Move content from `src/content/posts/` to root-level `content/posts/`
**Reasoning**: Cleaner separation of concerns - content is separate from source code
**Impact**: Updated `src/content.config.ts` and all documentation

#### Empty Directory Handling

**Decision**: Remove unnecessary subdirectories from `scripts/` folder
**Original**: `scripts/lib/platforms/` for distribution code
**Changed to**: Flat TypeScript files in `scripts/` directory
**Reasoning**: Scripts are standalone TypeScript files, no need for nested structure

#### Git Tracking of Empty Directories

**Decision**: Add `.gitkeep` files to empty but important directories
**Applied to**:

- `src/components/`
- `src/layouts/`
- `public/`
- `wip/content/`
- `wip/research/`
- `content/posts/`

### 2. WIP (Work-in-Progress) Workflow

**Decision**: Implement a three-tier content workflow
**Structure**:

1. `wip/research/` - Private knowledge base, not published
2. `wip/content/X-article-name/` - Numbered draft directories
3. `content/posts/YYYY-MM-DD-slug.md` - Published posts with full frontmatter

**Key Principles**:

- Drafts should be minimal - focus on writing, not formatting
- Research notes inform articles but aren't published
- Only published posts need complete frontmatter validation
- Preserve historical dates when promoting old content

### 3. Claude Code Configuration

#### Git Co-Author Setting

**Decision**: Disable Claude as git co-author
**Configuration**: `.claude/settings.json` with `includeCoAuthoredBy: false`
**Reasoning**: Project preference for commit attribution

#### Slash Commands Created

**WIP Commands**:

- `/new-draft` - Create numbered draft directory
- `/new-research` - Create research note
- `/promote` - Promote draft to published
- `/list-wip` - Overview of all WIP content

**Development Commands**:

- `/preview` - Start dev server
- `/check` - Type checking
- `/build` - Production build
- `/distribute` - Publish to external platforms
- `/push` - Auto-commit and push with expressive message

**Push Command Behavior**:

- Analyzes changes automatically
- Creates expressive commit message using conventional commit style
- Commits and pushes without pausing for approval
- Shows commit message in output for reference

#### Agents Created

1. **blog-post-creator** - Handles drafts, research notes, and publishing
2. **content-distributor** - Multi-platform distribution (Medium, Substack, LinkedIn)
3. **migration-helper** - Historical content migration with date preservation

### 4. Code Quality Setup

#### Linting and Formatting

**Decision**: Use ESLint + Prettier with Astro support
**Configuration Files**:

- `eslint.config.js` - TypeScript and Astro linting rules
- `.prettierrc.json` - Code formatting standards
- `.prettierignore` - Excluded files/directories

**Scripts Added**:

- `bun run lint` - Check linting and formatting
- `bun run lint:fix` - Auto-fix issues
- `bun run format` - Format all files
- `bun run format:check` - Check formatting only

**CI Integration**: `.github/workflows/lint.yml`

- Runs on push to main
- Runs on all pull requests
- Weekly schedule (Mondays at 9am UTC)
- Manual trigger available

### 5. Documentation Structure

**File Purposes**:

- **README.md** - Entry point, quick start, practical examples
- **SPEC.md** - Requirements, decisions, open questions
- **WORKFLOW.md** - Complete technical reference (single source of truth)
- **CLAUDE.md** - Critical AI guidelines, mostly links to other docs
- **wip/README.md** - WIP workflow documentation
- **.claude/README.md** - Claude Code configuration reference
- **DECISIONS.md** (this file) - Session decisions and rationale

**Key Principle**: Avoid duplication - each doc has a unique purpose

### 6. Demo Content and Design

#### Example Blog Post

**Created**: `content/posts/2025-01-12-welcome-to-words.md`
**Content**: Explains platform philosophy and workflow
**Purpose**: Demonstrates content structure and markdown rendering

#### Design System

**Chosen Approach**: Minimalist, readable design
**Key Decisions**:

- Max width: 720px for optimal reading
- System font stack for fast loading
- Subtle blue accent color (#2563eb)
- Mobile-responsive with breakpoint at 640px
- No external CSS framework - vanilla CSS in component files

**Pages Styled**:

1. Homepage (`src/pages/index.astro`) - Landing page with recent posts
2. Blog list (`src/pages/blog/index.astro`) - All posts chronologically
3. Blog post (`src/pages/blog/[...slug].astro`) - Individual post view

### 7. Deployment Configuration

**Platform**: GitHub Pages
**Trigger**: Automatic on push to main branch
**Workflow**: `.github/workflows/deploy.yml`
**Build Tool**: `withastro/action@v5` with Bun package manager

**Required Settings**:

- Repository Settings → Pages → Source: "GitHub Actions"
- `astro.config.mjs` → `base: '/words'` (for non-username.github.io repos)

### 8. Key Development Commands

```bash
# Development
bun --bun astro dev           # Start dev server (http://localhost:4321)
bun run lint                  # Check code quality
bun run lint:fix              # Auto-fix issues
bun astro check               # Type check content

# Production
bun astro build               # Build for production
bun astro preview             # Preview production build

# Git workflow
/push                         # Auto-commit and push with smart message
```

### 9. Outstanding Items (Not Yet Implemented)

**Scripts** (marked as "to be implemented" in docs):

- `scripts/publish.ts` - Blog publishing automation
- `scripts/distribute.ts` - Multi-platform distribution
- `scripts/migrate.ts` - Historical content migration

**Features**:

- Actual distribution to Medium/Substack/LinkedIn (APIs not integrated)
- RSS feed generation
- Analytics integration
- Commenting system

### 10. Important Constraints and Guidelines

**Historical Dates**:

- **CRITICAL**: Always preserve original publication dates
- Never default to current dates when migrating content
- Filename date must match `pubDate` in frontmatter

**Distribution**:

- Check `distributed` field to avoid duplicate posts
- Medium cannot reliably backdate via API
- Substack may require manual posting for historical dates

**Content Validation**:

- Run `bun astro check` before publishing
- Frontmatter must match Zod schema in `src/content.config.ts`

## Questions Answered During Session

1. **Q**: Should content be in src/ or at root?
   **A**: Root-level `content/` for separation from source code

2. **Q**: How to handle empty directories?
   **A**: Add `.gitkeep` files, remove unnecessary nested structures

3. **Q**: How to disable Claude as git co-author?
   **A**: Use `includeCoAuthoredBy: false` in `.claude/settings.json`

4. **Q**: Should /push command pause for approval?
   **A**: No - auto-commit and push for speed, show message in output

5. **Q**: How to preview locally?
   **A**: `bun --bun astro dev` or `bun run dev`

6. **Q**: Are scripts in subdirectories?
   **A**: No - flat TypeScript files for simplicity

## Session Date: 2025-11-12

### 11. Frontend Architecture Migration

#### Decision: Migrate to Tailwind CSS + Alpine.js via CDN

**From**: Custom CSS with CSS variables in `<style>` blocks
**To**: Tailwind CSS utility classes + Alpine.js via CDN
**Date**: 2025-11-12

**Motivation**:
- Faster prototyping with utility-first CSS
- No build step required for CSS
- Easier responsive design with Tailwind's breakpoint system
- Alpine.js for future interactive features without heavy frameworks

**Implementation**:
- Converted all three pages: `index.astro`, `blog/index.astro`, `blog/[...slug].astro`
- Removed all custom `<style>` blocks
- Added CDN scripts with `is:inline` directive (critical for Astro)
- Implemented responsive gutters: `px-4 sm:px-8 lg:px-12` (16px → 32px → 48px)
- Used gray background on `<html>` element to show content container clearly

**Key Technical Details**:

```astro
<!-- Must use is:inline to prevent Astro from processing CDN scripts -->
<script is:inline src="https://cdn.tailwindcss.com"></script>
<script is:inline defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

**Design System**:
- Max width: `max-w-3xl` (768px)
- Responsive padding: `px-4 sm:px-8 lg:px-12`
- Typography: `text-4xl` (h1), `text-2xl` (h2), system font stack
- Colors: `gray-900` (text), `gray-600` (muted), `gray-300` (borders), `blue-600` (links)

#### Bug Fix: Navigation Links

**Problem**: Links were generating incorrect URLs
- Example: `/words` + `blog` → `/wordsblog` (wrong)
- Root cause: Missing slash after `BASE_URL`

**Solution**: Always add `/` after `BASE_URL` when concatenating paths
```astro
<a href={`${import.meta.env.BASE_URL}/`}>Home</a>
<a href={`${import.meta.env.BASE_URL}/blog`}>Blog</a>
<a href={`${import.meta.env.BASE_URL}/blog/${post.id}`}>Post</a>
```

#### Component Strategy

**Decision**: No layouts or components yet
**Reasoning**:
- Pages are simple enough for inline Tailwind classes
- Avoid premature abstraction
- Extract components only when 3+ pages share identical patterns

**Future**: Will create layouts/components when clear patterns emerge

### 12. Documentation Updates

**Updated Files**:
- `WORKFLOW.md`: Added "Frontend Architecture" section to tech stack
- `WORKFLOW.md`: Added "Pages and Styling" section with Tailwind guidelines
- `WORKFLOW.md`: Updated directory structure to show actual implementation
- `DECISIONS.md`: This session log

**New Documentation Sections**:
- Tailwind CSS guidelines (responsive spacing, typography scale, color palette)
- Alpine.js usage examples
- Navigation link patterns (with BASE_URL trailing slash requirement)
- Page structure pattern with CDN scripts

## Next Steps

To continue development:

1. **Test deployment**: Wait for GitHub Actions to complete, verify site at URL
2. **Try WIP workflow**: Create draft with `/new-draft`, promote with `/promote`
3. **Implement distribution scripts**: Start with Medium API integration
4. **Add more content**: Write additional blog posts to test workflow
5. **Customize design**: Adjust colors, fonts, layout as desired

## Reference Links

- [Astro Documentation](https://docs.astro.build)
- [Bun Documentation](https://bun.sh/docs)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Claude Code Documentation](https://code.claude.com/docs)
