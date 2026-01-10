"use client";
import { useEffect, useState } from 'react';

export default function UserBar() {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('producty-current-user'));
    }
  }, []);
  if (!username) return null;
  return (
    <div style={{ position: 'fixed', top: 18, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <span style={{ background: '#a259e6', color: '#fff', borderRadius: 20, padding: '6px 16px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px #a259e655' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6, verticalAlign: 'middle' }}><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="2"/></svg>
        {username}
      </span>
      {username === 'admin' && (
        <a href="/dashboard" title="Dashboard admin" style={{ marginTop: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '50%', width: 28, height: 28, boxShadow: '0 2px 8px #a259e655', border: '2px solid #a259e6', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="#a259e6" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" stroke="#a259e6" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" stroke="#a259e6" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" stroke="#a259e6" strokeWidth="2"/></svg>
        </a>
      )}
    </div>
  );
}
