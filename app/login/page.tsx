'use client';

import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

// Simplu: datele se stochează în localStorage (nu e pentru producție)

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedInUser(localStorage.getItem('producty-current-user'));
    }
  }, []);

  const handleRegister = () => {
    if (!username || !password) {
      setMessage('Completează toate câmpurile!');
      return;
    }
    const users = JSON.parse(localStorage.getItem('producty-users') || '{}');
    if (users[username]) {
      setMessage('Acest utilizator există deja!');
      return;
    }
    users[username] = { password, data: { tasks: [], materials: [], activity: [] } };
    localStorage.setItem('producty-users', JSON.stringify(users));
    setMessage('Cont creat cu succes! Te poți loga.');
    setIsRegister(false);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('producty-users') || '{}');
    if (users[username] && users[username].password === password) {
      localStorage.setItem('producty-current-user', username);
      // Marchează loginul și ora de început sesiune
      const now = new Date().toISOString();
      if (!users[username].activity) users[username].activity = [];
      users[username].activity.push({ type: 'login', time: now });
      users[username].lastLogin = now;
      users[username].sessionStart = Date.now();
      localStorage.setItem('producty-users', JSON.stringify(users));
      setMessage('Logare reușită!');
      window.location.reload();
    } else {
      setMessage('Date incorecte!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('producty-current-user');
    setLoggedInUser(null);
    window.location.reload();
  };

  if (loggedInUser) {
    return (
      <div className="container">
        <h1 className="title">Contul tău</h1>
        <BackButton />
        <div style={{ margin: '40px auto', maxWidth: 350, background: '#1e1e2f', borderRadius: 12, padding: 32, boxShadow: '0 2px 12px #a259e655', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18, color: '#a259e6' }}>Salut, {loggedInUser}!</div>
          <button className="add-button" onClick={handleLogout} style={{ marginBottom: 10 }}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">{isRegister ? 'Creează cont' : 'Log in'}</h1>
      <BackButton />
      <div className="task-form" style={{ flexDirection: 'column', maxWidth: 350, margin: '0 auto' }}>
        <input
          className="task-input"
          type="text"
          placeholder="Utilizator"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <input
          className="task-input"
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 18 }}
        />
        {isRegister ? (
          <>
            <button className="add-button" onClick={handleRegister} style={{ marginBottom: 10 }}>
              Creează cont
            </button>
            <button className="back-button" onClick={() => { setIsRegister(false); setMessage(''); }}>
              Ai deja cont? Loghează-te
            </button>
          </>
        ) : (
          <>
            <button className="add-button" onClick={handleLogin} style={{ marginBottom: 10 }}>
              Log in
            </button>
            <button className="back-button" onClick={() => { setIsRegister(true); setMessage(''); }}>
              Nu ai cont? Creează unul
            </button>
          </>
        )}
        {message && <div style={{ color: '#ff6b6b', marginTop: 16, fontWeight: 500 }}>{message}</div>}
      </div>
    </div>
  );
}
