# Unity Game Modifier

A powerful desktop application for modifying game values (XP, Gold, Money, and more) in Unity games. This tool allows you to patch game memory and modify game state values in real-time.

## Features

- **Memory Scanning**: Scan game memory for specific values
- **Value Modification**: Easily modify XP, Gold, Money, and other game values
- **Real-time Updates**: See changes reflected in-game immediately
- **Save/Load States**: Save and load game states for later modification
- **Multi-game Support**: Works with various Unity-based games
- **User-friendly GUI**: Clean, intuitive interface

## Tech Stack

- **Frontend**: React + TypeScript (Web UI)
- **Backend**: Python with memory manipulation libraries
- **Desktop**: Electron for cross-platform support
- **Memory Tools**: PSutil, memory-manipulation libraries

## Project Structure

```
unity-game-modifier/
├── frontend/               # React web interface
���── backend/               # Python backend for memory operations
├── electron/              # Electron main process
├── docs/                  # Documentation
└── tests/                 # Test files
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/constantincatalinstoica-lgtm/unity-game-modifier.git
cd unity-game-modifier
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
pip install -r requirements.txt
```

4. Start the development server
```bash
# Terminal 1: Backend
cd backend
python app.py

# Terminal 2: Frontend
cd frontend
npm start
```

## Usage

1. Launch the application
2. Select the target game process
3. Scan for the value you want to modify
4. Select the memory addresses found
5. Modify the values and apply changes
6. Monitor in real-time as your game updates

## Warning

This tool is for educational purposes and testing on your own games. Unauthorized modification of games may violate terms of service. Use responsibly.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
