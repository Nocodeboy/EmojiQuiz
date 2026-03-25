import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ audio, crtEnabled, setCrtEnabled, background, setBackground, onBack }) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('emojiQuizLanguage', lang);
  };

  return (
    <div className="screen fade-in" aria-label="Settings">
      <h2>{t('settingsTitle')}</h2>

      <div className="settings-container">
        <div className="setting-item">
          <span>{t('soundEffects')}</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={audio.soundEnabled}
              onChange={(e) => audio.setSoundEnabled(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item">
          <span>{t('soundVolume')}</span>
          <input
            type="range"
            min="0" max="1" step="0.1"
            value={audio.soundVolume}
            onChange={(e) => audio.setSoundVolume(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label={t('soundVolume')}
          />
        </div>

        <div className="setting-item">
          <span>{t('musicLabel')}</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={audio.musicEnabled}
              onChange={(e) => audio.setMusicEnabled(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item">
          <span>{t('musicVolume')}</span>
          <input
            type="range"
            min="0" max="1" step="0.1"
            value={audio.musicVolume}
            onChange={(e) => audio.setMusicVolume(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label={t('musicVolume')}
          />
        </div>

        <div className="setting-item">
          <span>{t('crtEffect')}</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={crtEnabled}
              onChange={(e) => setCrtEnabled(e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item">
          <span>{t('languageLabel')}</span>
          <select value={i18n.language} onChange={handleLanguageChange}>
            <option value="es">{t('spanish')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>

        <div className="setting-item">
          <span>{t('backgroundLabel')}</span>
          <select value={background} onChange={(e) => setBackground(e.target.value)}>
            <option value="neon-grid">{t('backgroundNeon')}</option>
            <option value="pixel-emojis">{t('backgroundEmojis')}</option>
            <option value="pixel-nebula">{t('backgroundNebula')}</option>
            <option value="none">{t('backgroundNone')}</option>
          </select>
        </div>
      </div>

      <button className="back-btn" onClick={onBack}>{t('saveAndBack')}</button>
    </div>
  );
}
