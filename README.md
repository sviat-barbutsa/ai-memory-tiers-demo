# Memory Tiers Demo

A tiny, dependency-free example repo that shows how to structure `Tier 1`, `Tier 2`, and `Tier 3` memory for AI coding agents.

This project is designed as a companion to the memory-tiers article. The app itself is intentionally small. The real point of the repo is to show how an agent can learn:

1. the whole system first
2. the frontend or backend layer second
3. the exact service or package third
4. the raw code last

If you want ready-to-use example prompts for Codex or Claude, start with [`PROMPTS.md`](./PROMPTS.md).

## Why This Repo Exists

Most examples of AI coding workflows are either too abstract or too large.

This repo tries to stay in the useful middle:

- small enough to inspect in a few minutes
- realistic enough to show a frontend, a backend, and a real memory hierarchy
- simple enough to publish as a public GitHub example

## What It Demonstrates

- `Tier 1`: overall system memory
- `Tier 2`: overall frontend or backend memory
- `Tier 3`: specific service or package memory
- raw code read only after the memory layers narrow the search

## Project Shape

```text
memory-tiers-demo/
|- LICENSE
|- PROMPTS.md
|- README.md
|- package.json
|- backend/
|  `- api/
|     |- server.js
|     `- store.js
|- frontend/
|  `- web/
|     |- index.html
|     |- app.js
|     `- styles.css
`- DOCS/
   `- MEMORY/
      |- MEMORY.md
      |- SYSTEM_ARCHITECTURE.md
      |- llm_workflow_guide.txt
      |- backend/
      |  |- BACKEND_MEMORY.md
      |  `- api/
      |     `- API_SERVICE__MEMORY.md
      `- frontend/
         |- FRONTEND_MEMORY.md
         `- web/
            `- WEB_APP__MEMORY.md
```

## The Demo App

The app is a tiny work queue board:

- the backend exposes a few in-memory tasks
- the frontend renders them
- the UI can filter tasks and toggle a task between `todo` and `done`
- the backend also exposes a summary endpoint for counts
- the seed data is deliberately labeled with `Tier 1`, `Tier 2`, `Tier 3`, and `Code` so screenshots immediately communicate the memory concept

There is no database and no third-party dependency. Everything runs on Node built-ins and browser APIs.

## Best Way To Use This Repo

Do not start by reading all the source files.

Start with:

1. [`DOCS/MEMORY/MEMORY.md`](./DOCS/MEMORY/MEMORY.md)
2. [`DOCS/MEMORY/SYSTEM_ARCHITECTURE.md`](./DOCS/MEMORY/SYSTEM_ARCHITECTURE.md)

Then move to Tier 2 or Tier 3 only if the task needs it.

## Run It

Requirements:

- Node 18+

Start the demo:

```bash
npm start
```

Direct alternative:

```bash
node backend/api/server.js
```

Then open:

```text
http://localhost:4173
```

## How To Read This Repo Like An Agent

If you want to simulate the memory-tier workflow:

1. Read [`DOCS/MEMORY/MEMORY.md`](./DOCS/MEMORY/MEMORY.md)
2. Read [`DOCS/MEMORY/SYSTEM_ARCHITECTURE.md`](./DOCS/MEMORY/SYSTEM_ARCHITECTURE.md)
3. If needed, read either:
   - [`DOCS/MEMORY/backend/BACKEND_MEMORY.md`](./DOCS/MEMORY/backend/BACKEND_MEMORY.md)
   - [`DOCS/MEMORY/frontend/FRONTEND_MEMORY.md`](./DOCS/MEMORY/frontend/FRONTEND_MEMORY.md)
4. If needed, read one of the Tier 3 files:
   - [`DOCS/MEMORY/backend/api/API_SERVICE__MEMORY.md`](./DOCS/MEMORY/backend/api/API_SERVICE__MEMORY.md)
   - [`DOCS/MEMORY/frontend/web/WEB_APP__MEMORY.md`](./DOCS/MEMORY/frontend/web/WEB_APP__MEMORY.md)
5. Only then open the raw source files in `backend/` or `frontend/`
