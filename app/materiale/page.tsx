'use client';

import { useState } from 'react';
// Modal simplu pentru imagine fullscreen
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: 12,
          boxShadow: '0 4px 32px #000a',
          background: '#fff',
          cursor: 'zoom-out',
        }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
import Link from 'next/link';

type Materie = {
  nume: string;
  fisiere: { nume: string; url: string }[];
};

export default function MaterialePage() {
    const [modalImg, setModalImg] = useState<{ src: string; alt: string } | null>(null);
  const [materii, setMaterii] = useState<Materie[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('producty-materii');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [numeMaterie, setNumeMaterie] = useState('');
  const [selectedMaterie, setSelectedMaterie] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  // Persistă materii în localStorage
  const saveMaterii = (newMaterii: Materie[]) => {
    setMaterii(newMaterii);
    if (typeof window !== 'undefined') {
      localStorage.setItem('producty-materii', JSON.stringify(newMaterii));
    }
  };

  const adaugaMaterie = () => {
    if (!numeMaterie.trim()) return;
    saveMaterii([...materii, { nume: numeMaterie.trim(), fisiere: [] }]);
    setNumeMaterie('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    // Pentru demo, salvăm doar numele fișierului (nu upload real)
    const file = files[0];
    const url = URL.createObjectURL(file); // Doar local, nu persistă după refresh
    const newMaterii = [...materii];
    newMaterii[idx].fisiere.push({ nume: file.name, url });
    saveMaterii(newMaterii);
    setUploading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Materiale de curs</h1>
      <div className="back-container">
        <Link href="/" className="back-button">← Înapoi</Link>
      </div>

      <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <input
          className="task-input"
          type="text"
          placeholder="Adaugă materie..."
          value={numeMaterie}
          onChange={e => setNumeMaterie(e.target.value)}
          style={{ width: '200px', padding: '8px', fontSize: '14px' }}
        />
        <button
          className="add-button"
          onClick={adaugaMaterie}
          style={{ padding: '8px 12px', fontSize: '14px' }}
        >
          Adaugă
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
          {materii.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                style={{
                  background: selectedMaterie === idx ? '#a259e6' : '#1e1e2f',
                  color: selectedMaterie === idx ? '#fff' : '#a259e6',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'background 0.2s, color 0.2s',
                  minWidth: 100,
                  boxShadow: selectedMaterie === idx ? '0 2px 12px #a259e655' : 'none',
                }}
                onClick={() => setSelectedMaterie(idx)}
              >
                {m.nume}
              </button>
              {selectedMaterie === idx && (
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b6b',
                    fontSize: 18,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 0
                  }}
                  title="Șterge materia"
                  onClick={() => {
                    const newMaterii = materii.filter((_, i) => i !== idx);
                    saveMaterii(newMaterii);
                    setSelectedMaterie(null);
                  }}
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ minWidth: 320, maxWidth: 500, width: '100%' }}>
          {selectedMaterie === null ? (
            <div style={{ color: '#888', fontSize: 18, marginTop: 40, textAlign: 'center' }}>Selectează o materie pentru a încărca fișiere.</div>
          ) : (
            <div>
              <h3
                style={{
                  color: '#a259e6',
                  fontWeight: 700,
                  fontSize: 24, // Increased font size
                  marginBottom: 10,
                  textAlign: 'center'
                }}
              >
                {materii[selectedMaterie].nume}
              </h3>
              <label style={{ display: 'inline-block', marginBottom: 18 }}>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={e => handleFileUpload(e, selectedMaterie)}
                  disabled={uploading}
                />
                <button
                  type="button"
                  style={{
                    background: '#a259e6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: 28,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px #a259e655',
                    marginBottom: 0
                  }}
                  tabIndex={-1}
                  onClick={e => {
                    // Trigger input file click
                    const input = (e.currentTarget.parentElement?.querySelector('input[type=file]') as HTMLInputElement);
                    if (input) input.click();
                  }}
                  title="Adaugă fișier"
                >
                  +
                </button>
              </label>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {materii[selectedMaterie].fisiere.map((f, i) => {
                  const isImage = f.nume.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i);
                  return (
                    <li key={i} style={{ background: '#1e1e2f', color: '#fff', borderRadius: 6, padding: 8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
                      {isImage ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img
                            src={f.url}
                            alt={f.nume}
                            style={{ maxHeight: 120, maxWidth: 180, borderRadius: 8, objectFit: 'contain', background: '#fff', boxShadow: '0 2px 12px #0003', margin: 4, cursor: 'zoom-in' }}
                            onClick={() => setModalImg({ src: f.url, alt: f.nume })}
                            title="Click pentru a mări"
                          />
                          <span style={{ color: '#a259e6', fontWeight: 600 }}>{f.nume}</span>
                        </div>
                      ) : (
                        <a href={f.url} target="_blank" rel="noopener noreferrer" style={{ color: '#a259e6', fontWeight: 600, textDecoration: 'underline' }}>{f.nume}</a>
                      )}
                      <button
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: 18, cursor: 'pointer', marginLeft: 8 }}
                        title="Șterge fișier"
                        onClick={() => {
                          const newMaterii = [...materii];
                          newMaterii[selectedMaterie].fisiere.splice(i, 1);
                          saveMaterii(newMaterii);
                        }}
                      >🗑️</button>
                    </li>
                  );
                })}
                    {modalImg && (
                      <ImageModal src={modalImg.src} alt={modalImg.alt} onClose={() => setModalImg(null)} />
                    )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
