'use client';

import { useState } from 'react';
import BackButton from '../components/BackButton';

// Simplu: datele se stochează în localStorage (nu e pentru producție)
export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
    users[username] = { password };
    localStorage.setItem('producty-users', JSON.stringify(users));
    setMessage('Cont creat cu succes! Te poți loga.');
    setIsRegister(false);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('producty-users') || '{}');
    if (users[username] && users[username].password === password) {
      localStorage.setItem('producty-current-user', username);
      setMessage('Logare reușită!');
      // Poți redirecționa sau salva stare globală aici
    } else {
      setMessage('Date incorecte!');
    }
  };

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
