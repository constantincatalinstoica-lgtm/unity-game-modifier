# Architecture Overview

## System Components

### Frontend (React + TypeScript)
- **Location**: `frontend/`
- **Purpose**: User interface for the game modifier
- **Features**:
  - Process selection and management
  - Memory scanning interface
  - Value modification UI
  - Real-time results display

### Backend (Python + Flask)
- **Location**: `backend/`
- **Purpose**: Memory operations and game process management
- **API Endpoints**:
  - `GET /api/processes`: List running game processes
  - `POST /api/process/select`: Select a process to modify
  - `POST /api/memory/scan`: Scan memory for specific values
  - `POST /api/memory/modify`: Modify memory at specific address
  - `GET /api/health`: Health check

### Desktop Integration (Electron)
- **Location**: `electron/`
- **Purpose**: Cross-platform desktop application
- **Features**:
  - Runs backend as subprocess
  - Embeds React frontend
  - System tray integration

## Data Flow

1. User selects a game process from the list
2. Frontend sends process ID to backend
3. Backend attaches to the process and prepares for memory operations
4. User enters value to scan
5. Backend scans process memory for matching values
6. Results displayed in frontend
7. User selects address to modify
8. Frontend sends modification request with new value
9. Backend writes to memory at specified address
10. Game receives the new value in real-time

## Security Considerations

- Only scans and modifies memory of selected process
- No network exposure (runs locally)
- Requires elevated privileges on some systems
- Clear warnings about terms of service

## Technology Stack Details

### Frontend
- React 18+ for UI components
- TypeScript for type safety
- Axios for API communication
- CSS for styling

### Backend
- Flask for REST API
- PSUtil for process management
- Memory manipulation libraries for direct memory access
- CORS enabled for frontend communication

### Desktop
- Electron for cross-platform wrapper
- Node.js backend process management
