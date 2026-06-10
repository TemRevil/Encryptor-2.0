'use client';

import Image from 'next/image';
import { Html5Icon, Css3Icon, JsIcon, ReactIcon } from './Icons';

interface Member {
  name: string;
  role: string;
  subrole: string;
  img: string;
  stack: ('html' | 'css' | 'js' | 'react')[];
  portfolio: string | null;
}

const MEMBERS: Member[] = [
  {
    name: 'Mohammed Ahmed',
    role: 'Front-End Dev',
    subrole: 'Designer & Coder',
    img: '/Background/Team/Dev.Mohammed.png',
    stack: ['html', 'css', 'js'],
    portfolio: 'https://temrevil.com',
  },
  {
    name: 'Eslam Fathy',
    role: 'Front-End Dev',
    subrole: 'Coding Consultant',
    img: '/Background/Team/Dev.Eslam.jpg',
    stack: ['html', 'css', 'js', 'react'],
    portfolio: null,
  },
];

const STACK_ICON = { html: Html5Icon, css: Css3Icon, js: JsIcon, react: ReactIcon };

export default function Team() {
  return (
    <section className="team flex row">
      {MEMBERS.map((m) => (
        <div className="box flex row" key={m.name}>
          <div className="avatar">
            <Image src={m.img} alt={m.name} width={250} height={250} />
          </div>
          <hr />
          <div className="flex col between">
            <div className="flex col">
              <p className="align-2">{m.name}</p>
              <p className="align">{m.role}</p>
              <p className="align">{m.subrole}</p>
            </div>
            <div className="flex row icons">
              {m.stack.map((s) => {
                const Icon = STACK_ICON[s];
                return <Icon key={s} />;
              })}
            </div>
          </div>
          <button
            className="btn-2 text portfolio-btn"
            onClick={() => { if (m.portfolio) window.open(m.portfolio, '_blank', 'noopener'); }}
            disabled={!m.portfolio}
            style={{ opacity: m.portfolio ? 1 : 0.5 }}
          >
            Portfolio
          </button>
        </div>
      ))}
    </section>
  );
}
