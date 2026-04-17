# API Service Memory — Tier 3

This file explains the exact backend service files.

## Relevant Files

```text
backend/api/
├── server.js   # HTTP server, route matching, static file serving
└── store.js    # in-memory tasks and summary helpers
```

## `server.js`

Responsibilities:

- create the Node HTTP server
- parse URL and method
- route API requests
- serve static frontend files
- serialize JSON responses

Important behaviors:

- `/` maps to `frontend/web/index.html`
- `/api/tasks` supports a `status` query param
- `/api/tasks/:id/toggle` flips the task status
- after write endpoints, the server returns both updated item and summary

## `store.js`

Responsibilities:

- hold task array in memory
- list tasks by filter
- get one task by ID
- toggle task status
- compute summary counts
- expose preloaded demo data that visually communicates the memory tiers

Important behaviors:

- state is process-local and resets on restart
- task objects are cloned before return
- `completionRate` is derived, not stored
- each task includes a `memoryTier` label used by the frontend for display

## Safe Change Patterns

- adding a new task field usually belongs in `store.js` first
- adding a new endpoint starts in `server.js`, but should reuse `store.js`
- avoid embedding task mutation logic directly in route handlers
