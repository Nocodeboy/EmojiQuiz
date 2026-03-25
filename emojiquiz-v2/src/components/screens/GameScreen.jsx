import { useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from '../../hooks/useTimer.js';
import { settings } from '../../data/settings.js';
import { powerUps as powerUpDefs } from '../../data/powerups.js';
import ComboDisplay from '../ui/ComboDisplay.jsx';

export default function GameScreen({ game, audio, onPause, showNotification }) {
  const { t } = useTranslation();
  const {
    score, lives, level, streak, comboMultiplier,
    currentQuestion, feedback, powerUpState, visibleOptions, extraHintEmoji,
    scoreBreakdown, checkAnswer, handleTimeUp, nextQuestion, usePowerUp,
  } = game;

  const difficulty = currentQuestion?.difficulty || 'easy';
  const timePerQuestion = settings.difficulties[difficulty]?.timePerQuestion || 15;

  const isTimerActive = !feedback && !!currentQuestion && !game.isPaused;
  const stableTimeUp = useCallback(handleTimeUp, [currentQuestion?.answer]);
  const timer = useTimer(timePerQuestion, stableTimeUp, isTimerActive);

  // Reset timer on new question
  useEffect(() => {
    if (currentQuestion) timer.reset(timePerQuestion);
  }, [currentQuestion?.answer]);

  // Pause timer when game is paused
  useEffect(() => {
    if (game.isPaused) timer.pause();
  }, [game.isPaused, timer]);

  const handleAnswer = useCallback((answer) => {
    if (feedback) return;
    const correct = answer === currentQuestion?.answer;
    audio.play(correct ? 'correct' : 'wrong');
    timer.pause();
    checkAnswer(answer, timer.timeLeft);
  }, [feedback, currentQuestion, audio, timer, checkAnswer]);

  const handleNext = useCallback(() => {
    audio.play('click');
    nextQuestion();
  }, [audio, nextQuestion]);

  const handlePowerUp = useCallback((type) => {
    const result = usePowerUp(type, timer.timeLeft, timer.addTime);
    if (result) {
      audio.play('powerup');
      if (type === 'skipQuestion') showNotification(t('notifSkipped'));
      if (type === 'extraTime') showNotification(`+10${t('notifExtraTime')}`);
    } else {
      showNotification(t('notifNoPowerUps'));
    }
  }, [usePowerUp, timer, audio, showNotification, t]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (game.isPaused) return;
      const key = e.key;
      if (['1', '2', '3', '4'].includes(key) && !feedback) {
        const idx = parseInt(key) - 1;
        if (visibleOptions[idx]) handleAnswer(visibleOptions[idx]);
      }
      if (key === ' ' && feedback) { e.preventDefault(); handleNext(); }
      if (key === 'Escape') onPause();
      if (key === 'q' || key === 'Q') handlePowerUp('fiftyFifty');
      if (key === 'w' || key === 'W') handlePowerUp('extraTime');
      if (key === 'e' || key === 'E') handlePowerUp('extraHint');
      if (key === 'r' || key === 'R') handlePowerUp('skipQuestion');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [feedback, visibleOptions, game.isPaused, handleAnswer, handleNext, onPause, handlePowerUp]);

  if (!currentQuestion) return null;

  const timerColor = timer.timeLeft <= 3 ? 'var(--wrong-color)' :
    timer.timeLeft <= 5 ? '#ff9800' : 'var(--secondary-color)';

  return (
    <div className="screen fade-in" aria-label="Game screen">
      <button className="pause-btn" onClick={onPause} aria-label="Pause">
        <i className="fas fa-pause"></i>
      </button>
      <div className="level-badge">{t('levelLabel')} {level}</div>

      <div className="stats-container">
        <span>{t('pointsLabel')}: <strong className="score-value">{score}</strong></span>
        <span>{t('livesLabel')}: {'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}</span>
      </div>

      <div className="category" style={{ color: currentQuestion.color }}>
        {t(currentQuestion.category)}
      </div>

      <div className="emoji-display" role="img" aria-label="Emoji clue">
        {currentQuestion.emojis.map((emoji, i) => (
          <span key={i} className="emoji" style={{ '--i': i }}>{emoji}</span>
        ))}
        {extraHintEmoji && <span className="emoji hint-emoji">{extraHintEmoji}</span>}
      </div>

      <div className="timer-container" role="timer" aria-label={`${timer.timeLeft} seconds left`}>
        <div
          className="timer-bar"
          style={{ width: `${timer.percentage}%`, backgroundColor: timerColor }}
        />
      </div>

      <ComboDisplay streak={streak} multiplier={comboMultiplier} />

      <div className="power-up-container">
        {Object.entries(powerUpDefs).map(([key, def]) => (
          <button
            key={key}
            className={`power-up ${(powerUpState[key] || 0) <= 0 ? 'disabled' : ''}`}
            onClick={() => handlePowerUp(key)}
            title={t(`${key}Tooltip`) || def.description}
            aria-label={`${def.name} (${powerUpState[key] || 0} left)`}
          >
            <i className={`fas ${def.icon}`}></i>
            <div className="power-up-count">{powerUpState[key] || 0}</div>
          </button>
        ))}
      </div>

      <div className="options-container" role="group" aria-label="Answer options">
        {visibleOptions.map((option, i) => (
          option ? (
            <button
              key={i}
              className={`option ${feedback ?
                (option === currentQuestion.answer ? 'correct' : feedback.type !== 'correct' && option === feedback.message ? '' : 'dimmed')
                : ''}`}
              onClick={() => handleAnswer(option)}
              disabled={!!feedback}
              aria-label={`Option ${i + 1}: ${option}`}
            >
              <span className="option-key">{i + 1}</span> {option}
            </button>
          ) : (
            <button key={i} className="option eliminated" disabled aria-hidden="true">
              ---
            </button>
          )
        ))}
      </div>

      {feedback && (
        <div className={`feedback ${feedback.type}`} aria-live="polite">
          {feedback.type === 'correct' ? (
            <>
              <p>{t('correct')}</p>
              {scoreBreakdown && (
                <p className="score-breakdown">
                  +{scoreBreakdown.total} ({scoreBreakdown.base} {t('basePoints')}
                  {scoreBreakdown.timeBonus > 0 && ` + ${scoreBreakdown.timeBonus} ${t('timeBonus')}`}
                  {scoreBreakdown.multiplier > 1 && ` x${scoreBreakdown.multiplier}`})
                </p>
              )}
            </>
          ) : (
            <p>{feedback.type === 'timeout' ? t('timeUp') : t('incorrect')}{feedback.message}</p>
          )}
        </div>
      )}

      {feedback && (
        <button className="next-btn visible" onClick={handleNext}>
          {t('nextButton')} (Space)
        </button>
      )}
    </div>
  );
}
