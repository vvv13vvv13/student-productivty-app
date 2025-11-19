'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const themes = [
	{
		name: 'Mov',
		key: 'purple',
		colors: {
			'--main-bg': '#2a1342',
			'--main-gradient': 'linear-gradient(120deg, #2a1342 60%, #a259e6 100%)',
			'--menu-bg': 'rgba(42, 19, 66, 0.7)',
			'--menu-item-bg': 'linear-gradient(120deg, #3d1766 60%, #a259e622 100%)',
			'--accent': '#a259e6',
			'--text': '#f3eaff',
		},
	},
	{
		name: 'Albastru',
		key: 'blue',
		colors: {
			'--main-bg': '#1e1e2f',
			'--main-gradient': 'linear-gradient(120deg, #1e1e2f 60%, #00bfff 100%)',
			'--menu-bg': 'rgba(30, 30, 47, 0.7)',
			'--menu-item-bg': 'linear-gradient(120deg, #23233a 60%, #00bfff22 100%)',
			'--accent': '#00bfff',
			'--text': '#eaf6ff',
		},
	},
	{
		name: 'Verde mentă',
		key: 'mint',
		colors: {
			'--main-bg': '#1e2f28',
			'--main-gradient': 'linear-gradient(120deg, #1e2f28 60%, #2ee59d 100%)',
			'--menu-bg': 'rgba(30, 47, 40, 0.7)',
			'--menu-item-bg': 'linear-gradient(120deg, #233a32 60%, #2ee59d22 100%)',
			'--accent': '#2ee59d',
			'--text': '#eafff6',
		},
	},
	{
		name: 'Portocaliu',
		key: 'orange',
		colors: {
			'--main-bg': '#2f231e',
			'--main-gradient': 'linear-gradient(120deg, #2f231e 60%, #ffb347 100%)',
			'--menu-bg': 'rgba(47, 35, 30, 0.7)',
			'--menu-item-bg': 'linear-gradient(120deg, #3a2d23 60%, #ffb34722 100%)',
			'--accent': '#ffb347',
			'--text': '#fff7e6',
		},
	},
	{
		name: 'Roz pastel',
		key: 'pink',
		colors: {
			'--main-bg': '#42213d',
			'--main-gradient': 'linear-gradient(120deg, #42213d 60%, #ffb6b9 100%)',
			'--menu-bg': 'rgba(66, 33, 61, 0.7)',
			'--menu-item-bg': 'linear-gradient(120deg, #663a5c 60%, #ffb6b922 100%)',
			'--accent': '#ffb6b9',
			'--text': '#fff0f3',
		},
	},
];

const isThemeUnlocked = (themeKey: string) => {
	if (themeKey === 'purple') return true; // tema implicită e mereu disponibilă
	try {
		const owned = JSON.parse(localStorage.getItem('producty-owned') || '[]');
		return owned.includes('theme');
	} catch {
		return false;
	}
};

function applyTheme(themeKey: string) {
	if (!isThemeUnlocked(themeKey)) {
		alert('Trebuie să cumperi "Teme exclusive" din Magazin pentru a debloca această temă!');
		return;
	}
	const theme = themes.find((t) => t.key === themeKey);
	if (!theme) return;
	Object.entries(theme.colors).forEach(([key, value]) => {
		document.documentElement.style.setProperty(key, value);
	});
	localStorage.setItem('producty-theme', themeKey);
}

export default function ThemePicker() {
	useEffect(() => {
		const saved = localStorage.getItem('producty-theme');
		if (saved) applyTheme(saved);
	}, []);

	return (
		<div className="container">
			<h1 className="title">Personalizare temă</h1>
			<div className="back-container">
				<Link href="/" className="back-button">
					← Înapoi
				</Link>
			</div>
			<div
				style={{
					display: 'flex',
					gap: 32,
					justifyContent: 'center',
					flexWrap: 'wrap',
					marginTop: 40,
				}}
			>
				{themes.map((theme) => (
					<button
						key={theme.key}
						onClick={() => applyTheme(theme.key)}
						disabled={!isThemeUnlocked(theme.key)}
						style={{
							background: theme.colors['--main-gradient'],
							color: theme.colors['--text'],
							border: `2px solid ${theme.colors['--accent']}`,
							borderRadius: 16,
							padding: '32px 40px',
							fontSize: 20,
							fontWeight: 700,
							cursor: isThemeUnlocked(theme.key) ? 'pointer' : 'not-allowed',
							boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
							transition: 'transform 0.2s',
							opacity: isThemeUnlocked(theme.key) ? 1 : 0.5,
						}}
						onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
						onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
					>
						{theme.name}
						{!isThemeUnlocked(theme.key) && (
							<div style={{ fontSize: 12, marginTop: 8, color: '#fff', opacity: 0.8 }}>
								Deblochează din Magazin
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
