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

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage('Completează toate câmpurile!');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Eroare la înregistrare');
        return;
      }
      setMessage('Cont creat cu succes! Te poți loga.');
      setIsRegister(false);
    } catch (err) {
      setMessage('Eroare de rețea!');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Date incorecte!');
        return;
      }
      // Salvează userul logat local doar pentru sesiune
      localStorage.setItem('producty-current-user', username);
      setMessage('Logare reușită!');
      window.location.reload();
    } catch (err) {
      setMessage('Eroare de rețea!');
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
