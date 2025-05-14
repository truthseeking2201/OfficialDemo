import { useEffect, useState } from 'react';

export const Countdown = ({ target }: { target: number }) => {
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff <= 0) return <span>00:00:00</span>;

  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);

  return (
    <span>
      {h.toString().padStart(2, '0')}:
      {m.toString().padStart(2, '0')}:
      {s.toString().padStart(2, '0')}
    </span>
  );
};