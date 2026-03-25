import { useTranslation } from 'react-i18next';

export default function StartScreen({ onPlay, onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="screen fade-in" aria-label="Start screen">
      <div className="logo-container">
        <h1 dangerouslySetInnerHTML={{ __html: t('gameTitle') }} />
        <p className="tagline">{t('tagline')}</p>
      </div>
      <div className="menu-container">
        <button className="main-btn" onClick={onPlay} aria-label={t('playButton')}>
          {t('playButton')}
        </button>
        <button className="secondary-btn" onClick={() => onNavigate('daily')} aria-label={t('dailyChallengeButton')}>
          {t('dailyChallengeButton')}
        </button>
        <button className="secondary-btn" onClick={() => onNavigate('howtoplay')}>
          {t('howToPlayButton')}
        </button>
        <button className="secondary-btn" onClick={() => onNavigate('categories')}>
          {t('categoriesButton')}
        </button>
        <button className="secondary-btn" onClick={() => onNavigate('achievements')}>
          {t('achievementsButton')}
        </button>
        <button className="secondary-btn" onClick={() => onNavigate('settings')}>
          {t('settingsButton')}
        </button>
      </div>
      <div className="footer">
        <span>{t('version')}</span>
        <span>{t('credits')}</span>
      </div>
    </div>
  );
}
