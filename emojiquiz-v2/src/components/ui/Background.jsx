import { useMemo } from 'react';

const EMOJIS = ['🎮', '🎯', '🏆', '⭐', '🎲', '🎪', '🎨', '🎭', '🌟'];

export default function Background({ type }) {
  const pixelEmojis = useMemo(() =>
    EMOJIS.map((e, i) => <span key={i} className="pixel-emoji">{e}</span>),
  []);

  const stars = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => {
      const size = ['size-small', '', 'size-large'][i % 3];
      const color = ['', 'color-cyan', 'color-magenta', 'color-yellow'][i % 4];
      return (
        <div
          key={i}
          className={`pixel-star ${size} ${color}`}
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }}
        />
      );
    }),
  []);

  if (type === 'none') return null;

  if (type === 'neon-grid') return <div className="bg-neon-grid" />;
  if (type === 'pixel-emojis') return <div className="bg-pixel-emojis">{pixelEmojis}</div>;
  if (type === 'pixel-nebula') return <div className="bg-pixel-nebula">{stars}</div>;

  return <div className="bg-neon-grid" />;
}
