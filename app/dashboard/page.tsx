"use client";
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('producty-current-user');
    if (currentUser !== 'admin') {
      setNotAllowed(true);
      setLoading(false);
      return;
    }
    fetch('https://producty.onrender.com/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding:40}}>Se încarcă...</div>;
  if (notAllowed) return <div style={{padding:40, color:'#ff6b6b', fontWeight:600}}>Nu ai acces la acest dashboard.</div>;

  return (
    <div className="container">
      <h1 className="title">Dashboard Admin</h1>
      <div style={{marginBottom:24, fontSize:18}}>
        <b>Total utilizatori:</b> {users.length}
      </div>
      <table style={{width:'100%', maxWidth:700, margin:'0 auto', background:'#1e1e2f', borderRadius:12, boxShadow:'0 2px 12px #a259e655'}}>
        <thead>
          <tr style={{color:'#a259e6', fontWeight:700}}>
            <td style={{padding:8}}>Username</td>
            <td style={{padding:8}}>Taskuri</td>
            <td style={{padding:8}}>Timp activ (minute)</td>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.username}>
              <td style={{padding:8}}>{u.username}</td>
              <td style={{padding:8}}>{u.tasks.length}</td>
              <td style={{padding:8}}>{u.totalSessionTimeMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
