# Memory Tiers Demo — Memory Index

This file is the starting point for an AI coding assistant.

## Read Order

1. Read this file.
2. Read [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md).
3. If needed, read Tier 2:
   - [`backend/BACKEND_MEMORY.md`](./backend/BACKEND_MEMORY.md)
   - [`frontend/FRONTEND_MEMORY.md`](./frontend/FRONTEND_MEMORY.md)
4. If needed, read Tier 3:
   - [`backend/api/API_SERVICE__MEMORY.md`](./backend/api/API_SERVICE__MEMORY.md)
   - [`frontend/web/WEB_APP__MEMORY.md`](./frontend/web/WEB_APP__MEMORY.md)
5. Only then open raw code in `backend/` or `frontend/`.

## Tier Map

### Tier 1

- [`MEMORY.md`](./MEMORY.md) — index and read order
- [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md) — overall system shape and flows
- [`llm_workflow_guide.txt`](./llm_workflow_guide.txt) — how an agent should consume the docs

### Tier 2

- [`backend/BACKEND_MEMORY.md`](./backend/BACKEND_MEMORY.md) — backend-wide context
- [`frontend/FRONTEND_MEMORY.md`](./frontend/FRONTEND_MEMORY.md) — frontend-wide context

### Tier 3

- [`backend/api/API_SERVICE__MEMORY.md`](./backend/api/API_SERVICE__MEMORY.md) — API service details
- [`frontend/web/WEB_APP__MEMORY.md`](./frontend/web/WEB_APP__MEMORY.md) — web app details

## System Summary

This demo has only two runtime parts:

- a backend API server built on Node built-ins
- a browser frontend served by the backend

The app domain is deliberately tiny: a task board with a summary panel and a toggle action.

## What Matters Most

- The backend owns task state in memory.
- The frontend reads summary + task list from the backend.
- Toggling a task triggers a `POST` to the backend and then refreshes the screen.
- There are no external services, no database, and no dependencies.

## When To Read More

- Need overall flow or architecture: read Tier 1 only.
- Need to change server behavior or endpoint shape: read backend Tier 2, then backend Tier 3.
- Need to change UI rendering or interaction flow: read frontend Tier 2, then frontend Tier 3.
