from flask import Flask, request, jsonify
from flask_cors import CORS
import psutil
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Store process information
current_process = None

@app.route('/api/processes', methods=['GET'])
def get_processes():
    """Get list of running processes"""
    try:
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'exe']):
            try:
                if 'Unity' in proc.info['name'] or 'Game' in proc.info['name']:
                    processes.append({
                        'pid': proc.info['pid'],
                        'name': proc.info['name'],
                        'exe': proc.info['exe']
                    })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
        return jsonify({'processes': processes})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process/select', methods=['POST'])
def select_process():
    """Select a process to modify"""
    try:
        data = request.json
        pid = data.get('pid')
        
        current_process = psutil.Process(pid)
        return jsonify({
            'status': 'success',
            'process': {
                'pid': current_process.pid,
                'name': current_process.name(),
                'memory': current_process.memory_info().rss / 1024 / 1024  # MB
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/memory/scan', methods=['POST'])
def scan_memory():
    """Scan memory for a specific value"""
    try:
        data = request.json
        value = data.get('value')
        value_type = data.get('type', 'int')
        
        if not current_process:
            return jsonify({'error': 'No process selected'}), 400
        
        # Memory scanning logic would go here
        # This is a placeholder implementation
        results = {
            'addresses': [],
            'count': 0
        }
        
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/memory/modify', methods=['POST'])
def modify_memory():
    """Modify value at a specific memory address"""
    try:
        data = request.json
        address = data.get('address')
        new_value = data.get('value')
        value_type = data.get('type', 'int')
        
        if not current_process:
            return jsonify({'error': 'No process selected'}), 400
        
        # Memory modification logic would go here
        # This is a placeholder implementation
        
        return jsonify({'status': 'success', 'message': f'Modified memory at {address}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
