# LaunchPad Frontend (React + Vite)

This Vite-powered React app is the companion UI for the LaunchPad readiness tracker. It consumes the Nest.js API and provides an approachable interface for managing projects, checklists, and tasks as we walk through the series.

## Available Scripts

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server runs on `http://localhost:5173` and expects the backend at `http://localhost:3000/api` by default.

## Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## Current Functionality (v0.1.0)

- Fetches a seeded project/checklist dataset from the backend.
- Creates new projects, checklists, and tasks using in-memory storage.
- Allows toggling task statuses to visualise workflow progress.

Upcoming articles will harden the frontend with authentication, richer state management, optimistic updates, and production-ready build settings.
