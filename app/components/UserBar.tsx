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
    <div style={{ position: 'fixed', top: 18, right: 24, zIndex: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ background: '#a259e6', color: '#fff', borderRadius: 20, padding: '6px 16px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px #a259e655' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6, verticalAlign: 'middle' }}><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="2"/></svg>
        {username}
      </span>
    </div>
  );
}
