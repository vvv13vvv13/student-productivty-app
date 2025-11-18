'use client';

import { FaTasks, FaCalendarAlt, FaChartBar, FaClock, FaCheckCircle, FaSignInAlt, FaStar, FaStore, FaBook } from 'react-icons/fa';
import Link from 'next/link';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

function MenuItem({ icon, label, href }: MenuItemProps) {
  return (
    <Link href={href}>
      <div className="menu-item">
        {icon}
        <span className="menu-label">{label}</span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">PRODUCTi</h1>

      <nav className="menu">
        <MenuItem icon={<FaTasks size={30} />} label="Taskuri" href="/taskuri" />
        <MenuItem icon={<FaCalendarAlt size={30} />} label="Calendar" href="/calendar" />
        <MenuItem icon={<FaChartBar size={30} />} label="Progres" href="/progres" />
        <MenuItem icon={<FaClock size={30} />} label="Orar" href="/orar" />
        <MenuItem icon={<FaCheckCircle size={30} />} label="Taskuri completate" href="/taskuri-completate" />
        <MenuItem icon={<FaSignInAlt size={30} />} label="Log in" href="/login" />
        <MenuItem icon={<FaStar size={30} />} label="Puncte" href="/puncte" />
        <MenuItem icon={<FaStore size={30} />} label="Magazin" href="/magazin" />
        <MenuItem icon={<FaBook size={30} />} label="Materiale de curs" href="/materiale" />
      </nav>
    </div>
  );
}