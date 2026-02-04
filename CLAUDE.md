# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack MissionCtrl Task Management application built as a production-ready MVP. The architecture follows a clean separation between backend (.NET Core 10 API) and frontend (React 19 with TypeScript).

**Technology Stack:**
- Backend: .NET Core 10 Minimal API, Entity Framework Core, SQLite
- Frontend: React 19, TypeScript, Vite

## Development Commands

### Backend (MissionCtrlApi/)

```bash
cd MissionCtrlApi

# Run development server (http://localhost:5242)
dotnet run

# Run with hot reload
dotnet watch run

# Build project
dotnet build

# Restore dependencies
dotnet restore

# View API documentation
# Open http://localhost:5242/swagger
```

### Frontend (missionctrl-frontend/)

```bash
cd missionctrl-frontend

# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Running Full Stack

Both servers must run simultaneously:
1. Terminal 1: `cd MissionCtrlApi && dotnet run`
2. Terminal 2: `cd missionctrl-frontend && npm run dev`

## Architecture Overview

### Backend Architecture (Minimal API Pattern)

All API logic lives in a single file ([MissionCtrlApi/Program.cs](MissionCtrlApi/Program.cs)) using .NET's Minimal API pattern. This differs from traditional Controller-based APIs:

- **Program.cs**: Contains all 5 RESTful endpoints, CORS config, EF Core setup, and middleware
- **Models/MissionTask.cs**: Entity model with ProtocolStatus enum (Pending, InProgress, Complete)
- **DTOs/**: Request/response DTOs with validation annotations
- **Data/MissionTaskDbContext.cs**: EF Core DbContext

**Critical Design Note:** When adding new endpoints or modifying existing ones, all work happens in Program.cs. There are no separate controller classes.

### Database

- SQLite file-based database (`missionTasks.db`) auto-created on first run
- Database schema created using `db.Database.EnsureCreated()` in startup code
- All timestamps stored in UTC
- To reset database: delete `missionTasks.db` file and restart API

### Frontend Architecture (Hook-Based State Management)

**State Management Pattern:** Custom React hook ([src/hooks/useMissionTasks.ts](missionctrl-frontend/src/hooks/useMissionTasks.ts)) manages all state instead of Redux/Context. This hook is the single source of truth for:
- MissionTask list state
- CRUD operations
- Loading states
- Error handling

**Data Flow:**
1. [App.tsx](missionctrl-frontend/src/App.tsx) uses `useMissionTasks()` hook
2. Hook calls [services/missionTaskApi.ts](missionctrl-frontend/src/services/missionTaskApi.ts) for HTTP operations
3. API service uses native Fetch API (no Axios)
4. Components receive state and callbacks via props

**Component Hierarchy:**
```
App.tsx (state container)
├── MissionTaskForm.tsx (create/edit form)
├── MissionTaskList.tsx (list container)
│   └── MissionTaskItem.tsx (individual cards)
└── ErrorMessage.tsx (error display)
```

### API Integration

**Base URL:** Hardcoded to `http://localhost:5242/api/missionTasks` in [missionTaskApi.ts](missionctrl-frontend/src/services/missionTaskApi.ts)

**CORS Configuration:** Backend allows origins:
- `http://localhost:3000`
- `http://localhost:5173` (Vite default)
- `http://localhost:5174`

If changing frontend dev server port, update CORS policy in [MissionCtrlApi/Program.cs](MissionCtrlApi/Program.cs:20).

### Type Safety

TypeScript interfaces in [missionctrl-frontend/src/types/missionTask.ts](missionctrl-frontend/src/types/missionTask.ts) mirror backend DTOs:
- `MissionTask`: Full entity with id, timestamps
- `CreateUpdateMissionTask`: Request payload for POST/PUT
- `MissionTaskStatus`: Union type matching backend enum (Pending, InProgress, Complete)

**Important:** When modifying backend models/DTOs, update frontend types accordingly.

## Key Design Decisions

### Why Minimal API instead of Controllers?
Reduces boilerplate for simple CRUD operations. All 5 endpoints are clearly visible in one file.

### Why SQLite instead of PostgreSQL/SQL Server?
Zero configuration, file-based, perfect for MVPs and local development. No separate database server required.

### Why Custom Hook instead of Redux?
Application state is simple (single mission task list). Custom hook provides sufficient state management without Redux boilerplate.

### Why Native Fetch instead of Axios?
No external dependencies, smaller bundle size, built-in browser API with full async/await support.

## Common Gotchas

1. **Backend must run before frontend** - Frontend will error on startup if API isn't available at localhost:5242
2. **CORS errors** - If using non-standard ports, update CORS policy in Program.cs
3. **Database location** - `missionTasks.db` file is created in MissionCtrlApi/ directory, not project root
4. **All API logic in Program.cs** - No separate controller files to search for endpoint logic
5. **No migrations** - Uses `EnsureCreated()` instead of EF migrations for simplicity

## API Endpoints Reference

All endpoints defined in [MissionCtrlApi/Program.cs](MissionCtrlApi/Program.cs):

- `GET /api/missionTasks` - Returns all mission tasks ordered by creation date (newest first)
- `GET /api/missionTasks/{id}` - Returns single mission task or 404
- `POST /api/missionTasks` - Create mission task, returns 201 with location header
- `PUT /api/missionTasks/{id}` - Update mission task, returns updated object or 404
- `DELETE /api/missionTasks/{id}` - Delete mission task, returns 204 or 404
