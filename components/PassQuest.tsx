'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { passwordQuests } from '@/lib/passquest';

export default function PassQuest() {
  const [input, setInput] = useState('');
  const [surrendered, setSurrendered] = useState(false);
  const [alert, setAlert] = useState('');

  // How far the player has progressed: the highest contiguous prefix of quests
  // satisfied. We reveal quests one at a time (the next unsolved one), matching
  // the original's incremental flow but recomputed purely from the input.
  const solvedCount = useMemo(() => {
    let n = 0;
    for (const q of passwordQuests) {
      if (q.validate(input)) n++;
      else break;
    }
    return n;
  }, [input]);

  const started = input.length > 0;
  const allDone = solvedCount === passwordQuests.length;
  // Quests visible so far: all solved ones + the current target (newest on top).
  const visibleCount = started ? Math.min(solvedCount + 1, passwordQuests.length) : 0;
  const visible = passwordQuests.slice(0, visibleCount);

  const surrender = () => {
    if (solvedCount < 3) {
      setAlert('Come On Give it A Try.');
      setTimeout(() => setAlert(''), 3000);
    } else {
      setSurrendered(true);
      setAlert('You have surrendered.');
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(input); } catch { /* ignore */ }
    setAlert('Copied!');
    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <section className="passquest flex col center gap">
      <div className="box flex col gap">
        <div className="flex row center gap">
          <input
            type="text"
            id="passquest-input"
            className="text"
            placeholder="Write Here..."
            value={input}
            disabled={surrendered}
            readOnly={surrendered}
            onChange={(e) => setInput(e.target.value)}
            aria-label="PassQuest password"
          />
          <span className="text" id="passquest-input-num">{input.length}</span>
        </div>
        <div className="flex row center gap">
          <button className="btn-2 text" onClick={surrender}>Surrender</button>
          <button className="btn-2 text" onClick={copy}>Copy</button>
        </div>
        <span id="passquest-alert" className={allDone ? 'text congrats' : 'text'}>
          {allDone ? 'Congratulations!' : alert}
        </span>
      </div>

      <div className="flex col center gap" id="passquest-quests">
        {/* Newest quest first (prepended), like the original. */}
        {[...visible].reverse().map((quest) => {
          const done = quest.validate(input);
          return (
            <div key={quest.id} className={`box quest-box flex col gap transition${done ? ' active' : ''}`}>
              <p className="align">Quest.{quest.id}</p>
              <hr />
              <p className="text">{quest.text}</p>
              {quest.sponsors && (
                <div className="flex row quest-sponsors">
                  {quest.sponsors.map((s) => (
                    <div className="img" key={s.alt}>
                      <Image src={s.src} alt={s.alt} width={80} height={40} style={{ width: '100%', height: 'auto' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
