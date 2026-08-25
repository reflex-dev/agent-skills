---
name: reflex-hol-guard
description: >
  Protect agent-driven Reflex development and operations with HOL Guard on the local
  coding-agent boundary. Use when an agent will run shell, package, Git, database,
  cloud, or deployment commands for a Reflex app and runtime policy, approvals, or
  evidence are needed before state-changing tool execution.
---

# Reflex Workflow Safety with HOL Guard

Use HOL Guard as a safety layer around the **local coding-agent harness** that is working on a Reflex project. HOL Guard does not run inside the Reflex web server and this skill does not claim server-side Reflex interception.

Keep using the repository's other Reflex skills for framework-specific work: `reflex-docs` for current APIs, `setup-python-env` before project setup, and `reflex-process-management` for compile/run/reload/debug workflows.

## Start the agent through HOL Guard before mutations

Install the maintained CLI if needed:

```bash
pipx install hol-guard
```

Identify the local agent harness instead of guessing a name:

```bash
hol-guard detect
```

Use the exact identifier returned by `detect` to install protection and launch a protected session:

```bash
hol-guard install <detected-harness>
hol-guard run <detected-harness>
```

If protection cannot be established, do not describe the current session as guarded. Keep remaining work read-only or restart from a HOL Guard-protected session before state-changing calls.

Before package installs, Git writes, database migrations, cloud changes, deploys, process termination, or other mutating commands, verify the setup:

```bash
hol-guard doctor
```

Command inspection is inspection only. A command-test result is not proof that the current agent process is intercepted; the protected harness launched through HOL Guard is the enforcement boundary.

## Preserve Reflex-native safeguards

HOL Guard is additive. Do not bypass normal Reflex and platform controls because Guard is present. Keep least-privilege credentials, normal Git review, database backups, cloud IAM, preview/dry-run operations, and project validation. If Guard denies or holds an action for review, do not execute the blocked operation through an unguarded shell or alternate tool.

## Completion checks

Before claiming a protected mutation completed, confirm that the coding-agent session was launched through HOL Guard before the mutation, the state-changing operation went through that protected harness, deny/review/error outcomes prevented execution, and Reflex-native validation still ran where applicable.

For runtime details and supported harnesses, use the maintained HOL Guard documentation at https://github.com/hashgraph-online/hol-guard.
