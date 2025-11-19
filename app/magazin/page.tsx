 'use client';

import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

const SHOP_ITEMS = [
  { key: 'theme', name: 'Teme exclusive', cost: 100, desc: 'Deblochează teme de culoare speciale pentru aplicație.' },
  { key: 'icons', name: 'Iconițe personalizate', cost: 80, desc: 'Schimbă iconițele din meniu cu variante amuzante sau premium.' },
  { key: 'stickers', name: 'Sticker pack-uri', cost: 60, desc: 'Atașează stickere/memoji la taskuri sau progres.' },
  { key: 'backgrounds', name: 'Background-uri pentru pagini', cost: 120, desc: 'Fundaluri animate sau imagini pentru paginile principale.' },
  { key: 'badges', name: 'Badge-uri de realizare', cost: 50, desc: 'Insigne vizibile pe profil pentru realizări.' },
  { key: 'boost', name: 'Boost-uri de productivitate', cost: 70, desc: 'Activează moduri speciale: Focus Mode, Motivational Quotes etc.' },
  { key: 'fonts', name: 'Schimbare font', cost: 40, desc: 'Deblochează fonturi noi pentru interfață.' },
  { key: 'minigame', name: 'Mini-jocuri', cost: 90, desc: 'Acces la mini-jocuri de relaxare.' },
  { key: 'sounds', name: 'Sunete de notificare', cost: 30, desc: 'Alege sunete diferite pentru taskuri completate.' },
  { key: 'avatar', name: 'Custom avatar', cost: 110, desc: 'Personalizează un avatar care apare pe pagină.' },
];

export default function MagazinPage() {
  const [points, setPoints] = useState(0);
  const [owned, setOwned] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('producty-points');
    setPoints(Number(saved) || 0);
    const ownedItems = localStorage.getItem('producty-owned') || '[]';
    setOwned(JSON.parse(ownedItems));
  }, []);

  const handleBuy = (key: string, cost: number) => {
    if (owned.includes(key) || points < cost) return;
    const newPoints = points - cost;
    const newOwned = [...owned, key];
    setPoints(newPoints);
    setOwned(newOwned);
    localStorage.setItem('producty-points', String(newPoints));
    localStorage.setItem('producty-owned', JSON.stringify(newOwned));
  };

  return (
    <div className="container">
      <h1 className="title">Magazin</h1>
      <BackButton />
      <div style={{ fontSize: 24, marginBottom: 32, color: 'var(--accent)' }}>
        Puncte disponibile: <b>{points}</b>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        {SHOP_ITEMS.map(item => (
          <div key={item.key} style={{
            background: 'var(--menu-item-bg)',
            color: 'var(--text)',
            border: `2px solid var(--accent)`,
            borderRadius: 16,
            padding: 24,
            minWidth: 260,
            maxWidth: 320,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{item.name}</div>
            <div style={{ fontSize: 15, marginBottom: 16, color: 'var(--text)' }}>{item.desc}</div>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
              {item.cost} ⭐
            </div>
            <button
              disabled={owned.includes(item.key) || points < item.cost}
              onClick={() => handleBuy(item.key, item.cost)}
              style={{
                background: owned.includes(item.key) ? 'gray' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 700,
                fontSize: 16,
                cursor: owned.includes(item.key) ? 'not-allowed' : 'pointer',
                opacity: owned.includes(item.key) ? 0.7 : 1,
                marginTop: 8,
                transition: 'background 0.2s, opacity 0.2s',
              }}
            >
              {owned.includes(item.key) ? 'Cumpărat' : points < item.cost ? 'Insuficiente puncte' : 'Cumpără'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
