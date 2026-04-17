# Web App Memory — Tier 3

This file explains the exact frontend files.

## Relevant Files

```text
frontend/web/
├── index.html   # structure and mount points
├── app.js       # state, fetching, rendering, interactions
└── styles.css   # visual system
```

## `index.html`

Provides:

- hero copy
- summary card mount points
- filter button group
- task list container
- status text node

## `app.js`

Responsibilities:

- keep current `filter` in local state
- fetch `/api/summary`
- fetch `/api/tasks?status=...`
- render summary numbers
- render task cards
- handle toggle button clicks
- refresh the screen after a write
- render a visible tier label for each task so the screenshot communicates the memory model

Important behaviors:

- `loadScreen()` is the main orchestration function
- filter changes trigger a full reload
- toggles are handled through the backend, not local mutation
- task cards display both backend status and the memory-tier label

## `styles.css`

Responsibilities:

- define palette and spacing tokens
- style summary cards and task cards
- style filter and toggle buttons
- make layout responsive on smaller screens

## Safe Change Patterns

- new data field from backend usually requires `app.js` render updates
- new visual treatment usually belongs only in `styles.css`
- new UI controls usually touch `index.html` and `app.js`
