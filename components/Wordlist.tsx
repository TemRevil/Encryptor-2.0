'use client';

import { useRef, useState } from 'react';

// Lazily yields every combination of `chars` with length in [minLen, maxLen].
function* generateCombinations(chars: string[], minLen: number, maxLen: number, prefix = ''): Generator<string> {
  if (prefix.length >= minLen) yield prefix;
  if (prefix.length < maxLen) {
    for (let i = 0; i < chars.length; i++) {
      yield* generateCombinations(chars, minLen, maxLen, prefix + chars[i]);
    }
  }
}

export default function Wordlist() {
  const [chars, setChars] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [alert, setAlert] = useState('');
  const [content, setContent] = useState('');
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = (msg: string, ms = 2000) => {
    setAlert(msg);
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlert(''), ms);
  };

  const generate = () => {
    const characters = chars.split('');
    const minRange = parseInt(min);
    const maxRange = parseInt(max);
    if (characters.length === 0) { flash('Please enter characters in the input field'); return; }
    if (isNaN(minRange) || isNaN(maxRange) || minRange > maxRange || minRange <= 0 || maxRange <= 0) {
      flash('Please enter valid min and max range');
      return;
    }
    const combos: string[] = [];
    for (const c of generateCombinations(characters, minRange, maxRange)) combos.push(c);
    setContent(combos.join('\n'));
    flash('Wordlist is ready to download', 3000);
  };

  const download = () => {
    if (content === '') { flash('Please generate the wordlist first'); return; }
    setAlert('');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wordlist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <section className="wordlist flex col center gap">
      <div className="box flex col gap">
        <p className="align-2">Wordlist</p>
        <p className="align">Characters</p>
        <input type="text" id="wordlist-input" className="text" minLength={1} maxLength={41} value={chars} onChange={(e) => setChars(e.target.value)} aria-label="Wordlist characters" />
        <p className="align">Range</p>
        <div className="wordlist-range-box flex row gap">
          <div className="flex col">
            <p className="text">Min</p>
            <input type="text" id="wordlist-range-min" className="text" minLength={1} maxLength={2} value={min} onChange={(e) => setMin(e.target.value)} aria-label="Minimum length" />
          </div>
          <div className="flex col">
            <p className="text">Max</p>
            <input type="text" id="wordlist-range-max" className="text" minLength={1} maxLength={2} value={max} onChange={(e) => setMax(e.target.value)} aria-label="Maximum length" />
          </div>
        </div>
        <button className="btn-2 text" onClick={generate}>Generate</button>
        <button className="btn-2 text" onClick={download}>Download</button>
        <span id="wordlist-alert" className="text">{alert}</span>
      </div>
    </section>
  );
}
