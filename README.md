# Unity Game Modifier

A tool to modify and enhance Unity games with custom mods and tweaks.

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)

### Windows
Just run the startup script:
```batch
start.bat
```

This will:
1. Check for Python and Node.js
2. Create a Python virtual environment
3. Install backend dependencies
4. Start the Flask backend on `http://localhost:5000`
5. Install frontend dependencies
6. Start the React frontend on `http://localhost:3000`

### Manual Startup (Linux/Mac)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

**Frontend (in another terminal):**
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
unity-game-modifier/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML entry point
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # React entry point
│   └── package.json        # Node dependencies
├── start.bat               # Windows startup script
└── README.md               # This file
```

## 🔧 Development

The backend runs on **port 5000** and the frontend on **port 3000**.

- Backend API: http://localhost:5000
- Frontend UI: http://localhost:3000

## 📝 License

MIT

## 👨‍💻 Author

constantincatalinstoica-lgtm
