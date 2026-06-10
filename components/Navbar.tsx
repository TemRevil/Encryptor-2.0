'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SunIcon, MoonIcon, MenuIcon } from './Icons';

type Theme = 'dark' | 'light';
type NavView = 'home' | 'team';

export default function Navbar({ view, onNavigate }: { view: NavView; onNavigate: (v: NavView) => void }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  // Adopt whatever the pre-paint boot script already resolved onto <html>.
  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || 'dark';
    setTheme(current);
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* ignore */ }
  };

  const go = (v: NavView) => { onNavigate(v); setMenuOpen(false); };

  return (
    <nav className="flex row between">
      <div className="flex row center" id="nav-container">
        <button className="logo transition" onClick={() => go('home')} aria-label="Encryptor home" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Image src="/Background/icon.png" alt="Encryptor" width={50} height={50} />
        </button>
        <div className="desktop-links flex row center" style={{ display: menuOpen ? 'none' : undefined }}>
          <button className="links" aria-current={view === 'home'} style={{ opacity: view === 'home' ? 1 : 0.7 }} onClick={() => go('home')}>Home</button>
          <button className="links" aria-current={view === 'team'} style={{ opacity: view === 'team' ? 1 : 0.7 }} onClick={() => go('team')}>Team</button>
        </div>
      </div>

      <div className="flex col gap" id="nav-collapse-box">
        <button className="flex center text" id="nav-collapse" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <MenuIcon />
        </button>
        {menuOpen && (
          <div className="flex col gap" style={{ alignItems: 'center' }}>
            <button className="links" onClick={() => go('home')}>Home</button>
            <button className="links" onClick={() => go('team')}>Team</button>
          </div>
        )}
      </div>

      <div className="flex col center transition">
        <button
          className="mode-btn transition"
          key={theme}
          onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ color: 'var(--text)' }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}

export type { NavView };
