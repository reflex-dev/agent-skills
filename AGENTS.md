# Agents

## Initializing a New Reflex Project

When starting a new Reflex project or setting up a development environment, you **must** follow the [setup-python-env](skills/setup-python-env/SKILL.md) skill before doing anything else.

Do not skip any steps. Do not assume a virtual environment or Reflex is already available — always verify first by following the skill's instructions in order.

After the environment is ready and Reflex is installed, run:

```bash
reflex init
```

Then proceed with the user's request.

Before reading or editing any project files, confirm the environment is ready. Do not start editing code before the virtual environment exists and Reflex is installed.

## Writing Reflex Code

When creating or modifying components, state, events, styling, database models, or routing, follow the [reflex-docs](skills/reflex-docs/SKILL.md) skill.

> Your training data about Reflex may be outdated. Always prefer the reference documentation over pre-trained knowledge.

## Managing a Reflex Process

When you need to compile, run, or reload a Reflex application, follow the [reflex-process-management](skills/reflex-process-management/SKILL.md) skill.

Follow the skill for compiling, running, reloading, and investigating errors in a Reflex app.

## Verifying Changes

After making code changes, verify the app compiles before claiming success:

```bash
reflex compile --dry
```

This catches syntax errors, import issues, and component problems without starting the server. Do not report a change as complete until it compiles cleanly.

## Conventions & Common Pitfalls

These are mistakes that are easy to make when writing Reflex code. Follow the [reflex-docs](skills/reflex-docs/SKILL.md) skill for details, but keep these in mind:

- **Conditional rendering**: Use `rx.cond()` for conditionals and `rx.foreach()` for iteration over Vars. Do not use Python `if`/`for` to branch on a Var's value at render time — a Var's value is not known on the server when the component is built.
- **Event handlers**: Must be methods on a `rx.State` subclass decorated with `@rx.event`. UI cannot mutate state directly.
- **Var operations**: Transform Vars with Var operations, not plain Python. Avoid f-strings, `.format()`, or arbitrary Python functions on a Var — these run at build time, not with the runtime value.
- **State access**: Components read state through Vars on a State class, never by calling Python directly on server-side values during render.

## Using the Reflex MCP Server

This plugin bundles the Reflex MCP server (see `.mcp.json`). Use it for live, authoritative lookups — current component APIs, props, and documentation — when the static [reflex-docs](skills/reflex-docs/SKILL.md) skill does not have the detail you need or you need to confirm something against the latest version.
