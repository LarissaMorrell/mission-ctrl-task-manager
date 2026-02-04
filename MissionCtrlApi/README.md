# MissionCtrl API - .NET Core Backend

Simple RESTful API for managing mission tasks using .NET Core 10, Entity Framework Core, and SQLite.

## Prerequisites

- .NET 10.0 SDK or later ([Download](https://dotnet.microsoft.com/download))

## Setup & Run

1. **Navigate to the project directory:**
   ```bash
   cd MissionCtrlApi
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Run the application:**
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5242`

4. **View API documentation:**
   Open `http://localhost:5242/swagger` in your browser to see the interactive API documentation

## API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/missionTasks` | Get all mission tasks | None | Array of MissionTask |
| GET | `/api/missionTasks/{id}` | Get single mission task | None | MissionTask object |
| POST | `/api/missionTasks` | Create new mission task | CreateUpdateMissionTaskDto | MissionTask object (201) |
| PUT | `/api/missionTasks/{id}` | Update existing mission task | CreateUpdateMissionTaskDto | MissionTask object |
| DELETE | `/api/missionTasks/{id}` | Delete mission task | None | 204 No Content |

## Request/Response Models

### MissionTask (Response)
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the MissionCtrl app",
  "status": "InProgress",
  "dueDate": "2026-02-10T00:00:00",
  "createdAt": "2026-02-02T10:30:00Z",
  "updatedAt": "2026-02-02T11:00:00Z"
}
```

### CreateUpdateMissionTaskDto (Request)
```json
{
  "title": "Complete project",
  "description": "Finish the MissionCtrl app",
  "status": "Pending",
  "dueDate": "2026-02-10"
}
```

**Status values:** `"Pending"`, `"InProgress"`, `"Complete"`

## Database

- SQLite database file (`missionTasks.db`) is created automatically on first run
- Located in the project root directory
- Can be deleted to reset the database

## Project Structure

```
MissionCtrlApi/
├── Program.cs                # Application entry point & API endpoints
├── Models/
│   └── MissionTask.cs           # Database entity model
├── DTOs/
│   ├── MissionTaskDto.cs        # Response DTO
│   └── CreateUpdateMissionTaskDto.cs  # Request DTO with validation
└── Data/
    └── MissionTaskDbContext.cs  # Entity Framework DbContext
```

## Features

- **RESTful API design** with proper HTTP methods and status codes
- **Input validation** using Data Annotations
- **CORS configuration** for frontend integration
- **Swagger/OpenAPI documentation** for easy testing
- **Entity Framework Core** with SQLite for data persistence
- **Minimal API pattern** for clean, concise code

## Development

### Build the project:
```bash
dotnet build
```

### Run with hot reload:
```bash
dotnet watch run
```

### Clean build artifacts:
```bash
dotnet clean
```

## Notes

- The API uses port 5242 by default
- CORS is configured to allow requests from `http://localhost:5173` (React dev server)
- Database schema is created automatically using `EnsureCreated()`
- All timestamps are stored in UTC
