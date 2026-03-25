import { useTranslation } from 'react-i18next';
import { powerUps } from '../../data/powerups.js';

export default function HowToPlayScreen({ onBack }) {
  const { t } = useTranslation();

  return (
    <div className="screen fade-in" aria-label="How to play">
      <h2>{t('howToPlay')}</h2>

      <div className="instructions">
        <p>{t('instruction1')}</p>
        <p>{t('instruction2')}</p>
        <p>{t('instruction3')}</p>
        <p>{t('instruction4')}</p>
        <p>{t('instruction5')}</p>
      </div>

      <h3>{t('scoringSystem')}</h3>
      <div className="scoring-info">
        <p>{t('scoringBase')}</p>
        <p>{t('scoringTime')}</p>
        <p>{t('scoringStreak')}</p>
        <p>{t('scoringLevel')}</p>
      </div>

      <h3>{t('powerUpsTitle')}</h3>
      <div className="powerups-info">
        {Object.values(powerUps).map(pu => (
          <div key={pu.id} className="powerup-info-item">
            <span className="powerup-emoji">{pu.emoji}</span>
            <div>
              <strong>{pu.name}</strong>
              <p>{pu.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack}>{t('backButton')}</button>
    </div>
  );
}
