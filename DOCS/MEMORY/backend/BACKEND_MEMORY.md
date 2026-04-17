# Backend Memory — Tier 2

This file explains the backend as a whole before the agent reads one specific backend file.

## Backend Scope

The backend side of the demo is only one service:

- `backend/api/server.js` — HTTP entry point and routing
- `backend/api/store.js` — in-memory data operations

Even so, this file exists to demonstrate what Tier 2 should do:

- explain the backend shape
- explain shared rules
- explain where to go next

## Backend Responsibilities

- serve static frontend assets
- expose JSON endpoints for health, summary, tasks, and toggle
- own task state in memory

## Backend Rules

- `server.js` handles HTTP concerns and static file serving
- `store.js` owns task data and mutations
- route handlers should stay thin
- task writes happen through exported store functions

## Backend API Summary

- `GET /api/health`
- `GET /api/summary`
- `GET /api/tasks?status=all|todo|done`
- `GET /api/tasks/:id`
- `POST /api/tasks/:id/toggle`

## Read Next

- need exact endpoint behavior: read [`api/API_SERVICE__MEMORY.md`](./api/API_SERVICE__MEMORY.md)
