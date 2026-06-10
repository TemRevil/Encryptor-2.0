'use client';

import { useRef, useState } from 'react';

const CHAR_SETS = {
  Nums: '0123456789',
  Capitalize: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Sympols: '!@#$%^&*()_+[]{}|;:,.<>?',
  Lowercase: 'abcdefghijklmnopqrstuvwxyz',
} as const;
type SetKey = keyof typeof CHAR_SETS;

const BUTTONS: { key: SetKey; label: string }[] = [
  { key: 'Nums', label: '1234...' },
  { key: 'Capitalize', label: 'ABCD...' },
  { key: 'Sympols', label: '!@#$...' },
  { key: 'Lowercase', label: 'abcd...' },
];

export default function Generator() {
  // Nums active by default (matches the original).
  const [active, setActive] = useState<Record<SetKey, boolean>>({ Nums: true, Capitalize: false, Sympols: false, Lowercase: false });
  const [length, setLength] = useState(228);
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save modal
  const [saveOpen, setSaveOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [savePass, setSavePass] = useState('');
  const [saveAlert, setSaveAlert] = useState('');

  const flashAlert = (msg: string) => {
    setAlert(msg);
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setAlert(''), 2000);
  };

  const toggle = (k: SetKey) => setActive((a) => ({ ...a, [k]: !a[k] }));

  const generate = () => {
    const chars = (Object.keys(CHAR_SETS) as SetKey[]).filter((k) => active[k]).map((k) => CHAR_SETS[k]).join('');
    if (chars.length === 0) { flashAlert('Please select at least one character set'); return; }
    let out = '';
    for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(out);
    setAlert('');
  };

  const copy = async () => {
    if (!password) return;
    try { await navigator.clipboard.writeText(password); } catch { /* ignore */ }
    flashAlert('Password copied to clipboard');
  };

  const openSave = () => { setSavePass(password); setEmail(''); setSaveAlert(''); setSaveOpen(true); };

  const doSave = () => {
    const e = email.trim();
    const p = savePass.trim();
    if (e === '' || p === '') {
      setSaveAlert('Please fill in all fields');
      setTimeout(() => setSaveAlert(''), 2000);
      return;
    }
    const blob = new Blob([`Email/Username: ${e}\nPassword: ${p}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'password.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    setSaveOpen(false);
    setEmail('');
    setSavePass('');
  };

  return (
    <section className="generator flex col center gap">
      <div className="flex col gap">
        <div className="flex row gap">
          {BUTTONS.slice(0, 2).map((b) => (
            <button key={b.key} className={`check-box text${active[b.key] ? ' active' : ''}`} onClick={() => toggle(b.key)}>{b.label}</button>
          ))}
        </div>
        <div className="flex row gap">
          {BUTTONS.slice(2).map((b) => (
            <button key={b.key} className={`check-box text${active[b.key] ? ' active' : ''}`} onClick={() => toggle(b.key)}>{b.label}</button>
          ))}
        </div>
      </div>

      <div className="box flex row center gap" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <span id="range-num" className="text">{length}</span>
        <label className="slider">
          <input type="range" className="level" value={length} min={8} max={1024} onChange={(e) => setLength(Number(e.target.value))} aria-label="Password length" />
        </label>
      </div>

      <div className="box flex col center gap" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <input type="text" id="g-pass-input" className="text" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Generated password" />
        <div className="flex row center gap">
          <button className="btn-2 text" onClick={generate}>Generate</button>
          <button className="btn-2 text" onClick={copy}>Copy</button>
          <button className="btn-2 text" onClick={openSave}>Save</button>
        </div>
        <span id="generator-alert" className="text">{alert}</span>
      </div>

      {saveOpen && (
        <div className="modal flex center" onClick={() => setSaveOpen(false)}>
          <div className="save-box flex col gap" onClick={(e) => e.stopPropagation()}>
            <p className="align">Saving...</p>
            <hr />
            <div className="saving-box-input flex col gap">
              <label htmlFor="Email" className="text">Email</label>
              <input type="text" id="Email" className="input text" placeholder="Email, Username, Description..." value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="pass-key" className="text">Password</label>
              <input type="text" id="pass-key" className="input text" placeholder="Password" value={savePass} onChange={(e) => setSavePass(e.target.value)} />
              <span id="saving-alert" className="text">{saveAlert}</span>
            </div>
            <hr />
            <div className="save-box-btn flex row gap">
              <button className="btn-2 text" onClick={doSave}>Save</button>
              <button className="btn-2 text" onClick={() => setSaveOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
