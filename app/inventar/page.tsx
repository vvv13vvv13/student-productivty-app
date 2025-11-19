'use client';

import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

const SHOP_ITEMS = [
  { key: 'theme', name: 'Teme exclusive', desc: 'Teme de culoare speciale pentru aplicație.' },
  { key: 'icons', name: 'Iconițe personalizate', desc: 'Iconițe amuzante sau premium.' },
  { key: 'stickers', name: 'Sticker pack-uri', desc: 'Stickere/memoji pentru taskuri sau progres.' },
  { key: 'backgrounds', name: 'Background-uri pentru pagini', desc: 'Fundaluri animate sau imagini.' },
  { key: 'badges', name: 'Badge-uri de realizare', desc: 'Insigne pentru realizări.' },
  { key: 'boost', name: 'Boost-uri de productivitate', desc: 'Focus Mode, Motivational Quotes etc.' },
  { key: 'fonts', name: 'Schimbare font', desc: 'Fonturi noi pentru interfață.' },
  { key: 'minigame', name: 'Mini-jocuri', desc: 'Mini-jocuri de relaxare.' },
  { key: 'sounds', name: 'Sunete de notificare', desc: 'Sunete diferite pentru taskuri completate.' },
  { key: 'avatar', name: 'Custom avatar', desc: 'Avatar personalizat pe pagină.' },
];

export default function InventarPage() {
  const [owned, setOwned] = useState<string[]>([]);

  useEffect(() => {
    const ownedItems = localStorage.getItem('producty-owned') || '[]';
    setOwned(JSON.parse(ownedItems));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Inventar</h1>
      <BackButton />
      <div style={{ margin: '32px 0', fontSize: 20 }}>
        {owned.length === 0 ? (
          <div>Nu ai cumpărat încă nimic din magazin.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
            {SHOP_ITEMS.filter(item => owned.includes(item.key)).map(item => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
