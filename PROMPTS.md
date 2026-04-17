# Prompt Cookbook

These prompts are designed to show how an agent should use the demo repo.

## 1. Explain The System

```text
Read DOCS/MEMORY/MEMORY.md and DOCS/MEMORY/SYSTEM_ARCHITECTURE.md.

Explain this demo system in one short paragraph.
Do not scan the raw codebase yet.
```

## 2. Backend Change

```text
Read:
- DOCS/MEMORY/MEMORY.md
- DOCS/MEMORY/SYSTEM_ARCHITECTURE.md
- DOCS/MEMORY/backend/BACKEND_MEMORY.md
- DOCS/MEMORY/backend/api/API_SERVICE__MEMORY.md

Then add a backend endpoint that returns task counts grouped by memoryTier.
After that, read only the exact backend files you need.
```

## 3. Frontend Change

```text
Read:
- DOCS/MEMORY/MEMORY.md
- DOCS/MEMORY/SYSTEM_ARCHITECTURE.md
- DOCS/MEMORY/frontend/FRONTEND_MEMORY.md
- DOCS/MEMORY/frontend/web/WEB_APP__MEMORY.md

Then add a search box that filters visible tasks by title on the client side.
Read only the exact frontend files you need.
```

## 4. Cross-Stack Change

```text
Read Tier 1 first.

Then read:
- DOCS/MEMORY/backend/BACKEND_MEMORY.md
- DOCS/MEMORY/frontend/FRONTEND_MEMORY.md
- DOCS/MEMORY/backend/api/API_SERVICE__MEMORY.md
- DOCS/MEMORY/frontend/web/WEB_APP__MEMORY.md

Add a new task field named priority and surface it in both the API and the UI.
Plan the implementation before editing files.
```

## 5. Review Mode

```text
Read Tier 1 and the relevant Tier 2 and Tier 3 memory files.

Review the changes with a code review mindset:
- bugs
- regressions
- mismatches between memory docs and source code
- missing updates to docs
```

## 6. Anti-Pattern Prompt

This is the prompt you should avoid:

```text
Read all memory and scan the entire codebase before doing anything.
```

The whole point of the demo is to show why that workflow is wasteful.
