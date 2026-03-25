import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getDailyQuestions, getDailyState, saveDailyState, getDailyStreak } from '../../utils/dailyChallenge.js';
import { useTimer } from '../../hooks/useTimer.js';
import { settings } from '../../data/settings.js';
import ComboDisplay from '../ui/ComboDisplay.jsx';

export default function DailyChallengeScreen({ audio, game, onBack, showNotification }) {
  const { t } = useTranslation();
  const dailyState = getDailyState();
  const dailyStreak = getDailyStreak();

  const [started, setStarted] = useState(false);
  const [questions] = useState(() => getDailyQuestions(10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const [options, setOptions] = useState([]);

  const currentQ = questions[currentIdx];

  useEffect(() => {
    if (currentQ) setOptions([...currentQ.options].sort(() => Math.random() - 0.5));
  }, [currentIdx]);

  const handleTimeUp = useCallback(() => {
    if (feedback) return;
    setStreak(0);
    setFeedback({ type: 'timeout', message: currentQ?.answer });
    audio.play('wrong');
  }, [feedback, currentQ, audio]);

  const timer = useTimer(12, handleTimeUp, started && !feedback && !finished);

  useEffect(() => {
    if (started && currentQ) timer.reset(12);
  }, [currentIdx, started]);

  const handleAnswer = useCallback((answer) => {
    if (feedback) return;
    timer.pause();
    const correct = answer === currentQ.answer;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const diff = settings.difficulties[currentQ.difficulty] || settings.difficulties.easy;
      const multiplier = 1 + (newStreak * 0.1);
      const pts = Math.round((diff.pointsBase + timer.timeLeft * diff.pointsTimeBonus) * multiplier);
      setScore(prev => prev + pts);
      setCorrectCount(prev => prev + 1);
      audio.play('correct');
      setFeedback({ type: 'correct', points: pts });
    } else {
      setStreak(0);
      audio.play('wrong');
      setFeedback({ type: 'incorrect', message: currentQ.answer });
    }
  }, [feedback, currentQ, timer, streak, audio]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
      saveDailyState(score, correctCount);
      game.checkAchievements();
      audio.play('gameOver');
    } else {
      setCurrentIdx(prev => prev + 1);
      setFeedback(null);
    }
  }, [currentIdx, questions.length, score, correctCount, game, audio]);

  if (dailyState?.completed && !started) {
    return (
      <div className="screen fade-in" aria-label="Daily challenge completed">
        <h2>{t('dailyChallengeTitle')}</h2>
        <div className="daily-info">
          <p className="daily-completed-msg">{t('dailyCompleted')}</p>
          <p className="daily-score">{t('dailyScore')}{dailyState.score}</p>
          <p className="daily-streak">{t('dailyStreak')}{dailyStreak} dias</p>
        </div>
        <button className="back-btn" onClick={onBack}>{t('backButton')}</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="screen fade-in" aria-label="Daily challenge">
        <h2>{t('dailyChallengeTitle')}</h2>
        <p className="daily-desc">{t('dailyChallengeDesc')}</p>
        <p className="daily-streak">{t('dailyStreak')}{dailyStreak} dias</p>
        <button className="main-btn" onClick={() => { setStarted(true); audio.play('click'); }}>
          {t('startChallenge')}
        </button>
        <button className="back-btn" onClick={onBack}>{t('backButton')}</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="screen fade-in" aria-label="Daily challenge results">
        <h2>{t('dailyChallengeTitle')}</h2>
        <div className="final-score">{score}</div>
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-label">{t('correctAnswers')}</div>
            <div className="stat-value">{correctCount}/10</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('accuracy')}</div>
            <div className="stat-value">{Math.round((correctCount / 10) * 100)}%</div>
          </div>
        </div>
        <button className="back-btn" onClick={onBack}>{t('mainMenu')}</button>
      </div>
    );
  }

  return (
    <div className="screen fade-in" aria-label="Daily challenge game">
      <div className="level-badge">
        {currentIdx + 1}/{questions.length}
      </div>

      <div className="stats-container">
        <span>{t('pointsLabel')}: <strong>{score}</strong></span>
      </div>

      <div className="category">{t(currentQ.category)}</div>

      <div className="emoji-display" role="img">
        {currentQ.emojis.map((e, i) => (
          <span key={i} className="emoji" style={{ '--i': i }}>{e}</span>
        ))}
      </div>

      <div className="timer-container">
        <div className="timer-bar" style={{
          width: `${timer.percentage}%`,
          backgroundColor: timer.timeLeft <= 3 ? 'var(--wrong-color)' : 'var(--secondary-color)',
        }} />
      </div>

      <ComboDisplay streak={streak} multiplier={Math.round((1 + streak * 0.1) * 10) / 10} />

      <div className="options-container">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`option ${feedback && opt === currentQ.answer ? 'correct' : ''}`}
            onClick={() => handleAnswer(opt)}
            disabled={!!feedback}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`feedback ${feedback.type}`} aria-live="polite">
          <p>
            {feedback.type === 'correct'
              ? `${t('correct')} +${feedback.points}`
              : `${feedback.type === 'timeout' ? t('timeUp') : t('incorrect')}${feedback.message}`}
          </p>
        </div>
      )}
      {feedback && (
        <button className="next-btn visible" onClick={handleNext}>
          {t('nextButton')}
        </button>
      )}
    </div>
  );
}
