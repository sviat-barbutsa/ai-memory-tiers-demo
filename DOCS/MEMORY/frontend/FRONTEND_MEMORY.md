# Frontend Memory — Tier 2

This file explains the frontend side of the demo before the agent reads one specific UI file.

## Frontend Scope

The frontend side lives in:

- `frontend/web/index.html`
- `frontend/web/app.js`
- `frontend/web/styles.css`

## Frontend Responsibilities

- render summary cards
- render filtered task list
- handle filter selection
- trigger task toggle writes
- refresh UI after backend updates

## Frontend Rules

- `index.html` owns structure
- `app.js` owns data loading, event wiring, and DOM rendering
- `styles.css` owns visual treatment only
- the UI re-fetches after writes instead of mutating local state optimistically

## UI State Summary

Current state shape:

- `filter`

Derived UI:

- summary numbers
- rendered task list
- current status text

## Read Next

- need exact DOM/rendering details: read [`web/WEB_APP__MEMORY.md`](./web/WEB_APP__MEMORY.md)
