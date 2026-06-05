import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Process {
  pid: number;
  name: string;
  exe: string;
}

interface SelectedProcess {
  pid: number;
  name: string;
  memory: number;
}

function App() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<SelectedProcess | null>(null);
  const [scanValue, setScanValue] = useState('');
  const [valueType, setValueType] = useState('int');
  const [scanning, setScanning] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/processes`);
      setProcesses(response.data.processes);
    } catch (error) {
      console.error('Error fetching processes:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectProcess = async (process: Process) => {
    try {
      const response = await axios.post(`${API_BASE}/process/select`, {
        pid: process.pid
      });
      setSelectedProcess(response.data.process);
      setAddresses([]);
    } catch (error) {
      console.error('Error selecting process:', error);
    }
  };

  const scanMemory = async () => {
    if (!selectedProcess || !scanValue) return;

    try {
      setScanning(true);
      const response = await axios.post(`${API_BASE}/memory/scan`, {
        value: scanValue,
        type: valueType
      });
      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.error('Error scanning memory:', error);
    } finally {
      setScanning(false);
    }
  };

  const modifyValue = async (address: string) => {
    const newValue = prompt('Enter new value:');
    if (!newValue) return;

    try {
      await axios.post(`${API_BASE}/memory/modify`, {
        address,
        value: newValue,
        type: valueType
      });
      alert('Memory modified successfully!');
    } catch (error) {
      console.error('Error modifying memory:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎮 Unity Game Modifier</h1>
        <p>Modify game values like XP, Gold, Money, and more</p>
      </header>

      <div className="container">
        {/* Process Selection */}
        <section className="section">
          <h2>1. Select Game Process</h2>
          <button onClick={fetchProcesses} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Processes'}
          </button>
          <div className="process-list">
            {processes.length === 0 ? (
              <p>No Unity game processes found. Start your game and try again.</p>
            ) : (
              processes.map((proc) => (
                <button
                  key={proc.pid}
                  className={`process-item ${selectedProcess?.pid === proc.pid ? 'selected' : ''}`}
                  onClick={() => selectProcess(proc)}
                >
                  <strong>{proc.name}</strong> (PID: {proc.pid})
                </button>
              ))
            )}
          </div>
          {selectedProcess && (
            <div className="selected-info">
              ✓ Selected: <strong>{selectedProcess.name}</strong> ({selectedProcess.memory.toFixed(2)} MB)
            </div>
          )}
        </section>

        {/* Memory Scanning */}
        {selectedProcess && (
          <section className="section">
            <h2>2. Scan Memory</h2>
            <div className="scan-controls">
              <input
                type="text"
                placeholder="Enter value to scan (e.g., 1000)"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
              />
              <select value={valueType} onChange={(e) => setValueType(e.target.value)}>
                <option value="int">Integer</option>
                <option value="float">Float</option>
                <option value="double">Double</option>
                <option value="byte">Byte</option>
              </select>
              <button onClick={scanMemory} disabled={scanning || !scanValue}>
                {scanning ? 'Scanning...' : 'Scan'}
              </button>
            </div>

            {addresses.length > 0 && (
              <div className="results">
                <h3>Found {addresses.length} addresses:</h3>
                <div className="address-list">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="address-item">
                      <span>{addr}</span>
                      <button onClick={() => modifyValue(addr)}>Modify</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
