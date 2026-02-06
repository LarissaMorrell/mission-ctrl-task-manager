# MissionCtrl Task Manager Application

Full-stack application built with .NET Core Web API and React + TypeScript, demonstrating clean architecture, RESTful API design, and modern frontend development practices.

## 🎯 Overview

This project is a production-ready MVP for task management with:
- **Backend**: .NET Core 10 Minimal API with Entity Framework Core and SQLite
- **Frontend**: React 19 with TypeScript, using Vite for development
- **Architecture**: Clean separation of concerns, type-safe communication, and responsive UI

## 🚀 Quick Start

### Prerequisites
- .NET 10.0 SDK ([Download](https://dotnet.microsoft.com/download))
- Node.js 18+ and npm

### Running the Application

**1. Start the Backend (Terminal 1):**
```bash
cd MissionCtrlApi
dotnet run
```
Backend will run on `http://localhost:5242`
Swagger UI available at `http://localhost:5242/swagger`

**2. Start the Frontend (Terminal 2):**
```bash
cd missionctrl-frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

**3. Open your browser:**
Navigate to `http://localhost:5173` to use the application


## 📊 API Documentation

For detailed API documentation including endpoints, request/response models, and examples, see the [Backend Documentation](./MissionCtrlApi/README.md).

## 🔧 Technology Stack

### Backend
- .NET Core 10 (Minimal API)
- Entity Framework Core 10
- SQLite
- Swashbuckle (Swagger/OpenAPI)

### Frontend
- React 19
- TypeScript
- Vite
- Native Fetch API
- CSS3 with Flexbox/Grid


## 📁 Project Structure

```
mission-ctrl-task-manager/
├── MissionCtrlApi/            # .NET Core Backend
│   ├── Program.cs             # API endpoints & configuration
│   ├── Models/                # Database entities
│   ├── DTOs/                  # Request/response models
│   ├── Data/                  # EF Core DbContext
│   └── README.md              # Backend documentation
│
└── missionctrl-frontend/      # React Frontend
    ├── src/
    │   ├── types/             # TypeScript interfaces
    │   ├── services/          # API communication
    │   ├── hooks/             # Custom React hooks
    │   ├── utils/             # Utility functions
    │   └── components/        # UI components (Atomic Design)
    │       ├── atoms/         # Basic building blocks (buttons, icons)
    │       ├── molecules/     # Combinations of atoms (MissionTaskItem, MissionTaskList)
    │       └── organisms/     # Complex components (MissionTaskForm, GridView)
    └── README.md              # Frontend documentation
```

## ✨ Features

### Core Functionality
- ✅ **Create** mission tasks with title, description, status, and due date
- ✅ **Read** all mission tasks with most recent first
- ✅ **Update** mission tasks including inline status changes
- ✅ **Delete** mission tasks with confirmation dialog
- ✅ **Persistent storage** with SQLite database

### Production-Ready Features
- ✅ Input validation (frontend + backend)
- ✅ Error handling with user-friendly messages
- ✅ Loading states for async operations
- ✅ RESTful API with proper HTTP status codes
- ✅ CORS configuration for cross-origin requests
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ TypeScript for type safety
- ✅ Clean, documented code
- ✅ Comprehensive README files

## 🎨 UI/UX Features

- **Smooth interactions**: Hover effects and transitions
- **Mobile-first design**: Fully responsive layout
- **Layout Toggling**: View tasks within a single list, or grid format sorted by task status
- **Visual status indicators**: Color-coded borders (Blue → Orange → Green)
- **Clear feedback**: Loading states, error messages, and confirmations
- **Intuitive editing**: Click edit to populate form, or use dropdown for quick status changes
- **Date urgency logic**: Visual color-coding for tasks due today, or tasks already overdue


## 🚧 Architecture Decisions: What Was NOT Included (Intentionally)

To keep the project appropriately scoped and to reduce complexity:

- ❌ **Authentication** - Adds significant complexity, not ideal for a code test needing review
- ❌ **Redux** - Custom hooks sufficient for this scope, less boilerplate
- ❌ **Repository Pattern** - Over-engineering for Minimal API
- ❌ **Unit Tests** - Kept focused on core functionality
- ❌ **Docker** - Not required for local development
- ❌ **CI/CD** - Kept focused on application development


## 🔮 Future Enhancements

If this were a real production application, consider including:

### Backend
- User authentication with JWT
  - Depending on needs of users, roles and policies as well
- Pagination for large datasets
- Filtering and sorting endpoints
- Logging and monitoring
- Unit and integration tests

### Frontend
- Search, filter, and sorting UI
- Drag-and-drop reordering
- Configurable MissionTask statuses
- Status control logic (i.e. creation of new task with "completed" status)
- Alert window within UI, instead of browser Alert Dialogs
- Overlay for forms
- Unit and End-to-end tests

## 📚 Additional Documentation

- [Backend Documentation](./MissionCtrlApi/README.md) - Detailed API docs
- [Frontend Documentation](./missionctrl-frontend/README.md) - Component details

## 🤔 Assumptions & Trade-offs

### Assumptions
1. Single-user application (no authentication needed)
2. Local development environment
3. Small-to-medium dataset (no pagination needed initially)
4. Modern browser support (ES6+, Fetch API)

### Trade-offs
1. **SQLite over PostgreSQL**: Easier setup, sufficient for MVP
2. **Minimal API over Controllers**: Simpler, but less structure for large APIs
3. **Custom hooks over Redux**: Less boilerplate, but wouldn't scale to very complex state
4. **No caching layer**: Simpler architecture, acceptable for MVP performance

### Scalability

**Current State**

The MVP architecture handles the current scope well:
- `useMissionTasks` hook manages all CRUD state in a single location
- SQLite provides zero-config persistence for local development
- Minimal API keeps endpoint logic simple and readable in `Program.cs`
- Atomic Design organizes components into predictable layers

**If Future Enhancements Were Added**

Adding **JWT authentication** would require:
- Middleware in `Program.cs` for token validation
- Protected route wrappers or context for auth state in React
- Token refresh logic in `missionTaskApi.ts`

Adding **pagination and filtering** would require:
- Query parameters in the GET endpoint (`?page=1&status=Pending&sortBy=dueDate`)
- `useMissionTasks` hook would need to track pagination state and filters
- UI components for page navigation and filter controls

Adding **drag-and-drop reordering** would require:
- A `sortOrder` field on `MissionTask` model
- Optimistic updates in state to prevent UI lag
- Consider a library like `@dnd-kit` or `react-beautiful-dnd`

Adding **search, filter, and sorting UI** would require:
- Additional state in `useMissionTasks` or a separate `useFilters` hook
- Debounced search input to reduce API calls
- If dataset grows large, move filtering server-side with query parameters

**When to Consider Larger Changes**
- If state becomes deeply nested or shared across many components → consider Zustand
- If task lists exceed hundreds of items → add virtualization with `react-window`
- If deploying to production with multiple users → migrate SQLite to PostgreSQL

