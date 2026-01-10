"use client";
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AccountMenuItem() {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('producty-current-user'));
    }
  }, []);
  return (
    <Link href="/login">
      <div className="menu-item">
        {username ? <FaUser size={30} /> : <FaSignInAlt size={30} />}
        <span className="menu-label">{username ? 'Cont' : 'Log in'}</span>
      </div>
    </Link>
  );
}
