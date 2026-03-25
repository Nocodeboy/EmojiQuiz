import { useTranslation } from 'react-i18next';
import { achievements } from '../../data/achievements.js';

export default function AchievementsScreen({ unlockedIds, onBack }) {
  const { t } = useTranslation();

  const unlocked = achievements.filter(a => unlockedIds.includes(a.id));
  const locked = achievements.filter(a => !unlockedIds.includes(a.id));

  return (
    <div className="screen fade-in" aria-label="Achievements">
      <h2>{t('achievementsTitle')}</h2>

      <div className="achievements-counter">
        {t('achievementsUnlocked')} {unlocked.length}/{achievements.length}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(unlocked.length / achievements.length) * 100}%` }} />
        </div>
      </div>

      <div className="achievements-grid">
        {unlocked.map(a => (
          <div key={a.id} className="achievement-card unlocked">
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-name">{a.name}</div>
            <div className="achievement-description">{a.description}</div>
          </div>
        ))}
        {locked.map(a => (
          <div key={a.id} className="achievement-card locked">
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-name">{a.name}</div>
            <div className="achievement-description">{a.description}</div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack}>{t('backButton')}</button>
    </div>
  );
}
