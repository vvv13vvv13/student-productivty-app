'use client';

import Link from 'next/link';

type Props = {
  to?: string;
  label?: string;
  position?: 'top' | 'bottom';
};

export default function BackButton({ to = '/', label = '← Înapoi', position = 'top' }: Props) {
  const containerClass = `back-container ${position === 'top' ? 'back-top-left' : 'back-bottom-left'}`;
  return (
    <div className={containerClass}>
      <Link href={to} className="back-button">
        {label}
      </Link>
    </div>
  );
}
