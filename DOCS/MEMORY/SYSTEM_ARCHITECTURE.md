# Memory Tiers Demo — System Architecture

## Overview

This is a tiny full-stack demo designed to show how memory tiers can guide an agent before it touches code.

## Runtime Shape

```text
Browser
  -> GET /                 -> index.html
  -> GET /app.js           -> frontend logic
  -> GET /styles.css       -> frontend styles
  -> GET /api/summary      -> task counts
  -> GET /api/tasks        -> task list
  -> POST /api/tasks/:id/toggle -> flips status

Node HTTP Server
  -> serves static frontend files
  -> serves JSON API
  -> reads/writes in-memory task store
```

## Main Flow

### Page Load

1. Browser requests `/`
2. Server returns `index.html`
3. Browser loads `app.js`
4. Frontend requests `/api/summary`
5. Frontend requests `/api/tasks?status=all`
6. Screen renders summary cards and task cards

### Toggle Flow

1. User clicks a task button
2. Frontend sends `POST /api/tasks/:id/toggle`
3. Backend flips status in memory
4. Frontend reloads summary + filtered list

## Shared Conventions

- JSON endpoints return plain objects
- the backend is the only owner of task state
- the frontend does not mutate local task state optimistically
- the UI always re-fetches after a write
- the app uses no third-party dependencies

## Why The Tiers Matter Here

Even in a tiny project, the agent benefits from reading in this order:

1. Tier 1 to understand the whole system
2. Tier 2 to understand either backend-wide or frontend-wide structure
3. Tier 3 to understand the exact part being changed
4. raw code only after the search is narrow
