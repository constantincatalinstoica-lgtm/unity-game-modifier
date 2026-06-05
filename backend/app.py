"""
Unity Game Modifier - Backend API Server
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

@app.route('/api/games', methods=['GET'])
def get_games():
    """Get list of available games"""
    return jsonify({
        'games': [
            {'id': 1, 'name': 'Unity Game Example', 'path': 'C:\\Games\\example'},
        ]
    })

@app.route('/api/mods', methods=['GET'])
def get_mods():
    """Get available mods"""
    return jsonify({
        'mods': [
            {'id': 1, 'name': 'Example Mod', 'version': '1.0.0'},
        ]
    })

@app.route('/api/apply-mod', methods=['POST'])
def apply_mod():
    """Apply a mod to a game"""
    data = request.get_json()
    game_id = data.get('game_id')
    mod_id = data.get('mod_id')
    
    return jsonify({
        'status': 'success',
        'message': f'Mod {mod_id} applied to game {game_id}'
    })

if __name__ == '__main__':
    print("🚀 Unity Game Modifier Backend starting...")
    print("📌 Running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
