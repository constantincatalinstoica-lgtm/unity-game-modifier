# Setup Guide

## Prerequisites

### Windows
- Python 3.8+
- Node.js 16+
- Administrator privileges for memory operations
- Visual Studio Build Tools (optional, for native modules)

### macOS
- Python 3.8+
- Node.js 16+
- Xcode Command Line Tools: `xcode-select --install`

### Linux
- Python 3.8+
- Node.js 16+
- Build essentials: `sudo apt-get install build-essential`

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/constantincatalinstoica-lgtm/unity-game-modifier.git
cd unity-game-modifier
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Running the Application

### Development Mode

**Terminal 1 - Backend**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

### Running with Electron

```bash
cd electron
npm install
npm start
```

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (should be 3.8+)
- Check if port 5000 is in use: `lsof -i :5000` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)
- Ensure virtual environment is activated

### Frontend won't connect to backend
- Verify backend is running on http://localhost:5000
- Check browser console for CORS errors
- Ensure both are running on the same machine

### Memory operations denied
- Run with administrator/sudo privileges
- Check game process is still running
- Verify process is not protected by anti-cheat software

## Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd ../backend
pytest
```
