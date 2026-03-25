import { useTranslation } from 'react-i18next';

export default function PauseModal({ onContinue, onRestart, onExit }) {
  const { t } = useTranslation();

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Pause menu">
      <div className="modal-content">
        <h2>{t('pauseTitle')}</h2>
        <button className="main-btn" onClick={onContinue}>{t('continueButton')}</button>
        <button className="secondary-btn" onClick={onRestart}>{t('restartButton')}</button>
        <button className="back-btn" onClick={onExit}>{t('exitButton')}</button>
      </div>
    </div>
  );
}
