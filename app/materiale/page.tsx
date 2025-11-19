'use client';

import BackButton from '../components/BackButton';

export default function MaterialePage() {
  const sample = [
    { id: 1, title: 'Curs: Programare 101', url: '#' },
    { id: 2, title: 'Slide-uri: Matematică', url: '#' },
    { id: 3, title: 'Fișier: Proiect.docx', url: '#' },
  ];

  return (
    <div className="container">
      <h1 className="title">Materiale de curs</h1>
      <BackButton />

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        {sample.map(item => (
          <a key={item.id} href={item.url} className="menu-item" style={{ minWidth: 320, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{item.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
