export default function ComboDisplay({ streak, multiplier }) {
  if (streak < 2) return null;

  const tier = streak >= 8 ? 'fire' : streak >= 5 ? 'hot' : 'warm';

  return (
    <div className={`combo-container combo-${tier}`} aria-label={`Combo ${streak}x`}>
      <span className="combo-number">{streak}</span>
      <span className="combo-label">COMBO</span>
      <span className="combo-multiplier">x{multiplier}</span>
    </div>
  );
}
