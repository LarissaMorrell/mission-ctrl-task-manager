# MissionCtrl Frontend - React + TypeScript

Modern, responsive React application for managing mission tasks, built with TypeScript and Vite.

## Prerequisites

- Node.js 18+ and npm

## Setup & Run

1. **Navigate to the project directory:**
   ```bash
   cd missionctrl-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

4. **Ensure backend is running:**
   The frontend expects the API at `http://localhost:5242`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Features

- ✅ Create, edit, and delete mission tasks
- ✅ Update mission task status (Pending → In Progress → Complete)
- ✅ Set and display due dates
- ✅ Real-time validation
- ✅ Error handling with user-friendly messages
- ✅ Loading states for async operations
- ✅ Responsive design (mobile-friendly)
- ✅ Clean, modern UI with visual status indicators

## Project Structure

```
missionctrl-frontend/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── types/
│   │   └── missionTask.ts            # TypeScript interfaces
│   ├── services/
│   │   └── missionTaskApi.ts         # API communication layer
│   ├── hooks/
│   │   └── useMissionTasks.ts        # Custom hook for state management
│   └── components/
│       ├── MissionTaskForm.tsx       # Create/edit form component
│       ├── MissionTaskList.tsx       # List of mission tasks component
│       ├── MissionTaskItem.tsx       # Individual mission task card
│       └── ErrorMessage.tsx       # Error display component
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Native Fetch API** - HTTP requests (no external dependencies)
- **Custom Hooks** - State management (no Redux needed)

## Design Decisions

### Why custom hook instead of Redux?
For this application scope, a custom `useMissionTasks` hook provides:
- Sufficient state management
- Simpler codebase with no boilerplate
- Easier to understand and maintain
- Faster development

### Why native Fetch instead of Axios?
- Built-in browser API (zero dependencies)
- Sufficient for basic CRUD operations
- Smaller bundle size
- Modern async/await support

### Component Architecture
- **Separation of concerns**: API layer, hooks, and components are separate
- **Reusability**: Components accept props for flexibility
- **Type safety**: Full TypeScript coverage with no `any` types
- **Single responsibility**: Each component has one clear purpose

## Color Coding

The app uses color-coded borders for mission task status:
- **Blue** - Pending
- **Orange** - In Progress
- **Green** - Complete (with reduced opacity)

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (900px+ container)
- Tablet (768px breakpoint)
- Mobile (full-width, stacked layout)

## Error Handling

- Network errors are caught and displayed to users
- Form validation prevents invalid submissions
- Delete confirmations prevent accidental data loss
- Loading states provide visual feedback

## Future Enhancements

If this were extended to production, consider adding:
- Local storage for offline capability
- Search and filtering functionality
- Sorting options (by date, status, priority)
- Mission task categories or tags
- Bulk operations (delete multiple, mark all complete)
- Pagination for large mission task lists
- Dark mode support
- Keyboard shortcuts
