import { useEffect, useState } from 'react';

export const Countdown = ({ target }: { target: number }) => {
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const newDiff = target - Date.now();
      setDiff(newDiff);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  // Return null when countdown reaches zero
  if (diff <= 0) return null;

  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);

  return (
    <span className="tabular-nums">
      {h.toString().padStart(2, '0')}:
      {m.toString().padStart(2, '0')}:
      {s.toString().padStart(2, '0')}
    </span>
  );
};