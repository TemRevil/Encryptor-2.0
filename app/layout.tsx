import type { Metadata, Viewport } from 'next';
import { Cairo, Rubik, Exo_2, Saira, Space_Mono, Amatic_SC } from 'next/font/google';
import './globals.css';

const cairo = Cairo({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cairo', display: 'swap' });
const rubik = Rubik({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-rubik', display: 'swap' });
const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-exo', display: 'swap' });
const saira = Saira({ subsets: ['latin'], weight: ['700'], variable: '--font-saira', display: 'swap' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['700'], variable: '--font-space-mono', display: 'swap' });
const amaticSC = Amatic_SC({ subsets: ['latin'], weight: ['700'], variable: '--font-amatic', display: 'swap' });

export const metadata: Metadata = {
  title: 'Encryptor | Beta',
  description: 'A Tem Revil Developer Profile',
  keywords: [
    'TemRevil', 'Tem Revil', 'Encryptor', 'Secure', 'Security', 'Generator', 'Password',
    'Password Generator', 'Wordlist', 'Wordlist Generator', 'Gen', 'Passkey', 'Key', 'Pass',
    'Encryption', 'Password Game',
  ],
  authors: [{ name: 'Tem Revil', url: 'https://temrevil.com' }],
  robots: 'index, follow',
  icons: { icon: '/Background/icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#124fff',
};

// Applies the saved theme before first paint so there's no flash of the wrong
// theme. Mirrors the old two-stylesheet localStorage('theme') behavior using a
// data-theme attribute (legacy values stored CSS paths — map them across).
const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='CSS/Main-Light.css')t='light';if(t==='CSS/Main.css')t='dark';if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;localStorage.setItem('theme',t);}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cairo.variable} ${rubik.variable} ${exo2.variable} ${saira.variable} ${spaceMono.variable} ${amaticSC.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {children}
      </body>
    </html>
  );
}
