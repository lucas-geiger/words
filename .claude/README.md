# Claude Code Configuration

This directory contains Claude Code configuration for the Words blog platform.

## Structure

```
.claude/
├── README.md              # This file
├── settings.json          # Project settings
├── agents/                # Specialized agents for blog workflows
│   ├── blog-post-creator.md
│   ├── content-distributor.md
│   └── migration-helper.md
└── commands/              # Slash commands for common operations
    ├── new-post.md
    ├── preview.md
    ├── check.md
    ├── build.md
    └── distribute.md
```

## Settings

**settings.json** configures Claude Code behavior:
- `includeCoAuthoredBy: false` - Disables Claude as git commit co-author

## Agents

Specialized agents help with specific blog platform tasks:

- **blog-post-creator**: Create new blog posts with proper frontmatter
- **content-distributor**: Distribute posts to Medium, Substack, LinkedIn
- **migration-helper**: Migrate historical content from other platforms

Invoke agents using the Task tool or by referencing them in prompts.

## Slash Commands

Quick commands for common operations:

- `/new-post` - Create a new blog post
- `/preview` - Start local development server
- `/check` - Run type checking and validation
- `/build` - Build site for production
- `/distribute` - Distribute content to external platforms

## Usage

These configurations are shared in the repository so all contributors have consistent Claude Code behavior and shortcuts.

To use:
1. Ensure Claude Code CLI is installed
2. Navigate to project directory
3. Use slash commands or invoke agents as needed
4. Settings apply automatically to the project
