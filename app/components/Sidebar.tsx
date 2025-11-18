'use client';

import Link from 'next/link';
import { FaCalendarAlt, FaCheckCircle, FaSignInAlt, FaStar, FaStore, FaBook } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Meniu</h2>
      <ul>
        <li><Link href="/orar"><FaCalendarAlt /> Orar</Link></li>
        <li><Link href="/taskuri"><FaTasks /> Taskuri</Link></li>
        <li><Link href="/taskuri-completate"><FaCheckCircle /> Taskuri completate</Link></li>
        <li><Link href="/login"><FaSignInAlt /> Log in</Link></li>
        <li><Link href="/puncte"><FaStar /> Puncte</Link></li>
        <li><Link href="/magazin"><FaStore /> Magazin</Link></li>
        <li><Link href="/materiale"><FaBook /> Materiale de curs</Link></li>
      </ul>
    </div>
  );
}