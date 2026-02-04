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
    │   └── components/        # UI components
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

## 🏗️ Architecture Decisions

### Backend: Why Minimal API?
- **Simpler than Controllers** for CRUD operations
- **Less boilerplate** code to maintain
- **Easier to understand** and maintain
- **Sufficient** for this application scope

### Backend: Why SQLite?
- **Zero configuration** - no database server needed
- **File-based** - easy to inspect and reset
- **Perfect for demos** and MVP applications
- **Production-capable** for small-to-medium apps

### Frontend: Why Custom Hook instead of Redux?
- **No over-engineering** - Redux adds unnecessary complexity
- **Cleaner codebase** - no actions, reducers, or store configuration
- **Sufficient state management** for this scope
- **Faster development** with less boilerplate

### Frontend: Why Fetch instead of Axios?
- **Built-in** browser API (zero dependencies)
- **Smaller bundle** size
- **Sufficient** for basic CRUD operations
- **Modern** async/await support

## 🎨 UI/UX Features

- **Visual status indicators**: Color-coded borders (Blue → Orange → Green)
- **Smooth interactions**: Hover effects and transitions
- **Mobile-first design**: Fully responsive layout
- **Clear feedback**: Loading states, error messages, and confirmations
- **Intuitive editing**: Click edit to populate form, quick status changes

## 📊 API Documentation

### Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/missionTasks` | Get all mission tasks | 200 |
| GET | `/api/missionTasks/{id}` | Get single mission task | 200, 404 |
| POST | `/api/missionTasks` | Create mission task | 201, 400 |
| PUT | `/api/missionTasks/{id}` | Update mission task | 200, 400, 404 |
| DELETE | `/api/missionTasks/{id}` | Delete mission task | 204, 404 |

### Example Request (POST /api/missionTasks)
```json
{
  "title": "Complete project",
  "description": "Finish the MissionCtrl app",
  "status": "Pending",
  "dueDate": "2026-02-28"
}
```

### Example Response
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the MissionCtrl app",
  "status": "Pending",
  "dueDate": "2026-02-28T00:00:00",
  "createdAt": "2026-02-02T14:30:00Z",
  "updatedAt": "2026-02-02T14:30:00Z"
}
```

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

## 📝 Design Principles

1. **Keep it Simple** - Avoid over-engineering
2. **Production-Ready** - Include validation, error handling, and documentation
3. **Clean Code** - Clear naming, proper structure, and comments where needed
4. **Type Safety** - Full TypeScript and C# type coverage
5. **Separation of Concerns** - Clear boundaries between layers

## 🚧 What Was NOT Included (Intentionally)

To keep the project appropriately scoped:

- ❌ **Authentication** - Adds significant complexity for MVP
- ❌ **Redux** - Custom hooks sufficient for this scope
- ❌ **Repository Pattern** - Over-engineering for Minimal API
- ❌ **Unit Tests** - Kept focused on core functionality
- ❌ **Docker** - Not required for local development
- ❌ **CI/CD** - Kept focused on application development

## 🔮 Future Enhancements

If this were a real production application, consider adding:

### Backend
- User authentication with JWT
- Pagination for large datasets
- Filtering and sorting endpoints
- Rate limiting
- Logging and monitoring
- Unit and integration tests

### Frontend
- Local storage for offline capability
- Search and filter UI
- Task categories and tags
- Drag-and-drop reordering
- Dark mode
- Internationalization (i18n)
- End-to-end tests

### DevOps
- Docker containerization
- CI/CD pipeline
- Environment configurations
- Database migrations
- Performance monitoring

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

## 🎓 What This Demonstrates

1. **Full-stack development** with modern technologies
2. **RESTful API design** with proper HTTP semantics
3. **Clean architecture** with separation of concerns
4. **Type safety** with TypeScript and C#
5. **Production thinking** (validation, errors, documentation) without over-engineering
6. **Code quality** - readable, maintainable, and well-structured
7. **User experience** - responsive design, error handling, loading states
8. **Communication** - clear documentation and thoughtful decisions
