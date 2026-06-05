import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [status, setStatus] = useState('Connecting to backend...');
  const [games, setGames] = useState([]);
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Check backend health
      const healthRes = await axios.get('http://localhost:5000/api/health');
      setStatus('Connected to backend ✅');

      // Fetch games
      const gamesRes = await axios.get('http://localhost:5000/api/games');
      setGames(gamesRes.data.games);

      // Fetch mods
      const modsRes = await axios.get('http://localhost:5000/api/mods');
      setMods(modsRes.data.mods);

      setLoading(false);
    } catch (error) {
      setStatus('Error connecting to backend ❌');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 Unity Game Modifier</h1>
        <p className="status">{status}</p>
      </header>

      <main className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section className="section">
              <h2>Available Games</h2>
              <ul>
                {games.map(game => (
                  <li key={game.id}>
                    <strong>{game.name}</strong>
                    <p>{game.path}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="section">
              <h2>Available Mods</h2>
              <ul>
                {mods.map(mod => (
                  <li key={mod.id}>
                    <strong>{mod.name}</strong>
                    <p>v{mod.version}</p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
