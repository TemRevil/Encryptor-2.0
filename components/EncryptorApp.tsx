'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Blobs from './Blobs';
import Navbar, { type NavView } from './Navbar';
import Generator from './Generator';
import Wordlist from './Wordlist';
import PassQuest from './PassQuest';
import Team from './Team';
import { ChevronLeftIcon } from './Icons';

type Tool = 'generator' | 'wordlist' | 'passquest';

const TOOLS: { key: Tool; title: string; desc: string; img: string; fontVar: string; color: string }[] = [
  {
    key: 'generator',
    title: 'Generator',
    desc: '"Generate Your Passkey, Where Your Imagination Can Soar. Get a Password Up to 1024 Characters."',
    img: '/Background/Cards/Generator.png',
    fontVar: 'var(--font-saira)',
    color: 'var(--french-rose)',
  },
  {
    key: 'wordlist',
    title: 'Wordlist',
    desc: '"Generate Your Custom Wordlist, Designed for Hackers Seeking Security and Flexibility."',
    img: '/Background/Cards/WordList.png',
    fontVar: 'var(--font-space-mono)',
    color: 'var(--sgbus-green)',
  },
  {
    key: 'passquest',
    title: 'PassQuest',
    desc: '"Challenge Your Mind with the Password Game – Master the Art of Creating Unbreakable Passwords!"',
    img: '/Background/Cards/PassQuest.png',
    fontVar: 'var(--font-rubik)',
    color: 'var(--non-photo-blue)',
  },
];

const DEFAULT = { text: 'Home', font: 'var(--font-rubik)', color: 'var(--text)' };

// Scramble-in text effect (ported from the original changeText): cycles random
// glyphs while progressively locking in the target string over ~1s.
function useScramble(target: string) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const steps = 20;
    const intervalTime = 50;
    let i = 0;
    if (frame.current) clearInterval(frame.current);
    frame.current = setInterval(() => {
      if (i >= steps) {
        if (frame.current) clearInterval(frame.current);
        setDisplay(target);
        return;
      }
      const maxLen = Math.max(display.length, target.length);
      let random = '';
      for (let j = 0; j < maxLen; j++) random += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      const locked = Math.floor((i / steps) * target.length);
      setDisplay(target.substring(0, locked) + random.substring(locked));
      i++;
    }, intervalTime);
    return () => { if (frame.current) clearInterval(frame.current); };
    // Re-run only when the target changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return display;
}

export default function EncryptorApp() {
  const [view, setView] = useState<NavView>('home');
  const [tool, setTool] = useState<Tool | null>(null);
  const [narrow, setNarrow] = useState(false);

  const active = TOOLS.find((t) => t.key === tool);
  const sectionName = useScramble(active ? active.title : DEFAULT.text);

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 734);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openTool = (t: Tool) => setTool(t);
  const closeTool = () => setTool(null);

  return (
    <>
      <Navbar view={view} onNavigate={(v) => { setView(v); if (v === 'team') setTool(null); }} />
      <Blobs />

      {view === 'home' ? (
        <section className="home flex row">
          <section className="title-card flex col">
            <p className="title">Encryptor</p>
            <p className="align">More Secure, More Better</p>
            <div className="section-option flex row gap">
              <button id="close-section" className={tool ? '' : 'off'} onClick={closeTool} aria-label="Back to home">
                <ChevronLeftIcon />
              </button>
              <span id="section-name" className="align" style={{ fontFamily: active ? active.fontVar : DEFAULT.font, color: active ? active.color : DEFAULT.color }}>
                {sectionName}
              </span>
            </div>
          </section>

          {!tool && (
            <section className="cards-box flex col">
              {TOOLS.map((t) => {
                const card = (
                  <div className="card-img" key="img">
                    <Image src={t.img} alt={t.title} width={300} height={210} />
                    <button className="btn align" id={`card-${t.title}`} onClick={() => openTool(t.key)}>{t.title}</button>
                  </div>
                );
                const data = (
                  <div className="card-data flex col" key="data">
                    <p className="align-2">{t.title}</p>
                    <p className="text">{t.desc}</p>
                  </div>
                );
                return (
                  <div className="card flex row" key={t.key}>
                    {narrow ? [card, data] : [data, card]}
                  </div>
                );
              })}
            </section>
          )}

          {tool === 'generator' && <Generator />}
          {tool === 'wordlist' && <Wordlist />}
          {tool === 'passquest' && <PassQuest />}
        </section>
      ) : (
        <Team />
      )}
    </>
  );
}
