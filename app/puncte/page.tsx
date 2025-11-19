 'use client';

import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

export default function PunctePage() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('producty-points');
    if (saved) setPoints(Number(saved));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Punctele tale</h1>
      <BackButton />
      <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--accent)', margin: '40px 0' }}>
        {points} ⭐
      </div>
      <p style={{ fontSize: 20, color: 'var(--text)' }}>
        Primești puncte pentru fiecare task completat!
      </p>
    </div>
  );
}
