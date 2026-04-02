# Reflex Agent Skills

Up-to-date knowledge about [Reflex](https://reflex.dev) for AI coding assistants. Helps agents build full-stack Python web apps with Reflex more accurately.

## Installing

These skills work with any agent that supports the Agent Skills standard, including Claude Code, Cursor, OpenCode, OpenAI Codex, and Pi.

### Claude Code

```
/plugin marketplace add reflex-dev/agent-skills
```

### Cursor

Install from the Cursor Marketplace or add manually via **Settings > Rules > Add Rule > Remote Rule (Github)** with `reflex-dev/agent-skills`.

### npx skills

```
npx skills add reflex-dev/agent-skills
```

### Clone / Copy

Clone this repo and copy the skill folders into the appropriate directory for your agent:

| Agent        | Skill Directory              |
| ------------ | ---------------------------- |
| Claude Code  | `~/.claude/skills/`          |
| Cursor       | `~/.cursor/skills/`          |
| OpenCode     | `~/.config/opencode/skills/` |
| OpenAI Codex | `~/.codex/skills/`           |
| Pi           | `~/.pi/agent/skills/`        |

## Skills

Skills are contextual and auto-loaded based on your conversation.

| Skill                                      | Description                                                                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [reflex-docs](skills/reflex-docs/SKILL.md) | Framework documentation covering components, state management, events, styling, database, routing, authentication, and more |

## MCP Servers

This plugin includes the [Reflex MCP server](https://mcp.reflex.dev) for enhanced functionality.

## Resources

- [Reflex Documentation](https://reflex.dev/docs)
- [Reflex GitHub](https://github.com/reflex-dev/reflex)

## Contributing

Each skill lives in `skills/<name>/` and contains a `SKILL.md` manifest. See the [Agent Skills spec](https://agentskills.io/) for the format.
