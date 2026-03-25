import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function getGrade(accuracy) {
  if (accuracy >= 95) return 'S';
  if (accuracy >= 80) return 'A';
  if (accuracy >= 65) return 'B';
  if (accuracy >= 50) return 'C';
  if (accuracy >= 30) return 'D';
  return 'F';
}

export default function GameOverScreen({ game, onPlayAgain, onMainMenu }) {
  const { t } = useTranslation();
  const { score, correctCount, incorrectCount, level, maxStreak, questionsAnswered, totalResponseTime } = game;

  const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0;
  const avgTime = questionsAnswered > 0 ? (totalResponseTime / questionsAnswered).toFixed(1) : '0.0';
  const grade = useMemo(() => getGrade(accuracy), [accuracy]);

  const gradeColors = { S: '#ff00ff', A: '#00ff88', B: '#33a8ff', C: '#ffcc00', D: '#ff9800', F: '#f44336' };

  return (
    <div className="screen fade-in" aria-label="Game over screen">
      <h2>{t('gameOver')}</h2>

      <div className="grade-display" style={{ color: gradeColors[grade] }}>
        <span className="grade-letter">{grade}</span>
        <span className="grade-label">{t(`grade_${grade}`)}</span>
      </div>

      <div className="game-over-score">{t('finalScore')}</div>
      <div className="final-score">{score}</div>

      <div className="stats-summary">
        <div className="stat-item">
          <div className="stat-label">{t('correctAnswers')}</div>
          <div className="stat-value correct">{correctCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('incorrectAnswers')}</div>
          <div className="stat-value wrong">{incorrectCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('levelReached')}</div>
          <div className="stat-value">{level}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('maxStreak')}</div>
          <div className="stat-value">{maxStreak}x</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('accuracy')}</div>
          <div className="stat-value">{accuracy}%</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">{t('avgTime')}</div>
          <div className="stat-value">{avgTime}s</div>
        </div>
      </div>

      <div className="social-share">
        <button className="social-btn twitter" aria-label="Share on Twitter" onClick={() => {
          const text = t('shareMessage', { score });
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        }}>
          <i className="fab fa-twitter"></i>
        </button>
        <button className="social-btn whatsapp" aria-label="Share on WhatsApp" onClick={() => {
          const text = t('shareMessage', { score });
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }}>
          <i className="fab fa-whatsapp"></i>
        </button>
      </div>

      <button className="restart-btn" onClick={onPlayAgain}>{t('playAgain')}</button>
      <button className="main-menu-btn" onClick={onMainMenu}>{t('mainMenu')}</button>
    </div>
  );
}
