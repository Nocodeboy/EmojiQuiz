import { useState, useCallback, useRef } from 'react';
import { questions, getRandomQuestions } from '../data/questions/index.js';
import { categories } from '../data/categories.js';
import { settings } from '../data/settings.js';
import { powerUps as powerUpDefs } from '../data/powerups.js';
import { achievements } from '../data/achievements.js';

const STORAGE_KEY = 'emojiQuiz_gameState';

function loadSavedState() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

function getInitialPowerUps() {
  const p = {};
  Object.entries(powerUpDefs).forEach(([k, v]) => { p[k] = v.initialCount; });
  return p;
}

export function useGame() {
  const saved = loadSavedState();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(settings.maxLives);
  const [level, setLevel] = useState(saved?.level || 1);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(saved?.maxStreak || 0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [powerUpState, setPowerUpState] = useState(getInitialPowerUps());
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [extraHintEmoji, setExtraHintEmoji] = useState(null);
  const [correctAnswersByCategory, setCorrectAnswersByCategory] = useState(saved?.correctAnswersByCategory || {});
  const [unlockedAchievements, setUnlockedAchievements] = useState(saved?.unlockedAchievements || []);
  const [newAchievement, setNewAchievement] = useState(null);
  const [totalResponseTime, setTotalResponseTime] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState(null);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  const recentAnswers = useRef([]);
  const questionStartTime = useRef(Date.now());
  const questionsInLevel = useRef(0);

  const getUnlockedCategories = useCallback((lvl) => {
    return categories.filter(c => c.unlocked || (c.unlockLevel && lvl >= c.unlockLevel));
  }, []);

  const getDifficulty = useCallback((lvl) => {
    if (lvl <= 2) return 'easy';
    if (lvl <= 4) return 'medium';
    return 'hard';
  }, []);

  const loadQuestion = useCallback((lvl) => {
    const unlocked = categories.filter(c => c.unlocked || (c.unlockLevel && (lvl || level) >= c.unlockLevel));
    const cat = unlocked[Math.floor(Math.random() * unlocked.length)];
    const diff = lvl <= 2 ? 'easy' : lvl <= 4 ? 'medium' : 'hard';
    const qs = questions[cat.id]?.[diff] || questions[cat.id]?.easy || [];
    if (!qs.length) return;

    // Avoid repeats
    let q;
    let attempts = 0;
    do {
      q = qs[Math.floor(Math.random() * qs.length)];
      attempts++;
    } while (recentAnswers.current.includes(q.answer) && attempts < 20);

    recentAnswers.current.push(q.answer);
    if (recentAnswers.current.length > 10) recentAnswers.current.shift();

    // Shuffle options
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    setCurrentQuestion({ ...q, category: cat.id, difficulty: diff });
    setVisibleOptions(shuffled);
    setExtraHintEmoji(null);
    setFeedback(null);
    setScoreBreakdown(null);
    questionStartTime.current = Date.now();
  }, [level]);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(settings.maxLives);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setQuestionsAnswered(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    setPowerUpState(getInitialPowerUps());
    setTotalResponseTime(0);
    setComboMultiplier(1);
    questionsInLevel.current = 0;
    recentAnswers.current = [];
    loadQuestion(level);
  }, [level, loadQuestion]);

  const calculatePoints = useCallback((q, timeLeft, currentStreak) => {
    const diff = settings.difficulties[q.difficulty] || settings.difficulties.easy;
    const base = diff.pointsBase;
    const timeBonus = Math.round(timeLeft * diff.pointsTimeBonus);
    const streakBonus = Math.round(currentStreak * diff.pointsStreakBonus);
    const levelBonus = Math.round(level * diff.pointsLevelBonus);
    const multiplier = 1 + (currentStreak * 0.1);
    const total = Math.round((base + timeBonus + streakBonus + levelBonus) * multiplier);
    return { base, timeBonus, streakBonus, levelBonus, multiplier: Math.round(multiplier * 10) / 10, total };
  }, [level]);

  const checkAnswer = useCallback((answer, timeLeft) => {
    if (!currentQuestion || feedback) return;
    const responseTime = (Date.now() - questionStartTime.current) / 1000;
    setTotalResponseTime(prev => prev + responseTime);
    setQuestionsAnswered(prev => prev + 1);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      const multiplier = 1 + (newStreak * 0.1);
      setComboMultiplier(Math.round(multiplier * 10) / 10);

      const pts = calculatePoints(currentQuestion, timeLeft, newStreak);
      setScore(prev => prev + pts.total);
      setScoreBreakdown(pts);
      setCorrectCount(prev => prev + 1);

      const cat = currentQuestion.category;
      setCorrectAnswersByCategory(prev => ({ ...prev, [cat]: (prev[cat] || 0) + 1 }));

      questionsInLevel.current++;
      setFeedback({ type: 'correct', message: currentQuestion.answer, points: pts });

      // Check level up
      if (questionsInLevel.current >= settings.questionsPerLevel) {
        setLevel(prev => prev + 1);
        questionsInLevel.current = 0;
      }
    } else {
      setStreak(0);
      setComboMultiplier(1);
      setIncorrectCount(prev => prev + 1);
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) setIsGameOver(true);
        return newLives;
      });
      setFeedback({ type: 'incorrect', message: currentQuestion.answer });
    }
  }, [currentQuestion, feedback, streak, maxStreak, calculatePoints]);

  const handleTimeUp = useCallback(() => {
    if (!currentQuestion || feedback) return;
    setStreak(0);
    setComboMultiplier(1);
    setIncorrectCount(prev => prev + 1);
    setQuestionsAnswered(prev => prev + 1);
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) setIsGameOver(true);
      return newLives;
    });
    setFeedback({ type: 'timeout', message: currentQuestion.answer });
  }, [currentQuestion, feedback]);

  const nextQuestion = useCallback(() => {
    if (isGameOver) return;
    loadQuestion(level);
  }, [isGameOver, level, loadQuestion]);

  const usePowerUp = useCallback((type, timeLeft, addTime) => {
    if (!currentQuestion || feedback) return false;
    if ((powerUpState[type] || 0) <= 0) return false;

    setPowerUpState(prev => ({ ...prev, [type]: prev[type] - 1 }));

    switch (type) {
      case 'fiftyFifty': {
        const wrong = visibleOptions.filter(o => o !== currentQuestion.answer);
        const toRemove = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
        setVisibleOptions(prev => prev.map(o => toRemove.includes(o) ? null : o));
        return true;
      }
      case 'extraTime':
        if (addTime) addTime(10);
        return true;
      case 'extraHint': {
        const hintEmojis = ['\u{1F50D}', '\u{1F4A1}', '\u2B50', '\u{1F3AF}', '\u2728'];
        setExtraHintEmoji(hintEmojis[Math.floor(Math.random() * hintEmojis.length)]);
        return true;
      }
      case 'skipQuestion':
        loadQuestion(level);
        return true;
      default:
        return false;
    }
  }, [currentQuestion, feedback, powerUpState, visibleOptions, level, loadQuestion]);

  const checkAchievements = useCallback(() => {
    const stats = {
      score, level, streak, maxStreak, correctAnswers: correctCount,
      correctAnswersByCategory, lives,
      dailyChallengesCompleted: parseInt(localStorage.getItem('emojiQuiz_dailyChallengesCompleted') || '0'),
      dailyStreak: parseInt(localStorage.getItem('emojiQuiz_dailyStreak') || '0'),
    };
    const newUnlocked = [];
    achievements.forEach(a => {
      if (!unlockedAchievements.includes(a.id) && a.check(stats)) {
        newUnlocked.push(a.id);
      }
    });
    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
      const achievement = achievements.find(a => a.id === newUnlocked[0]);
      setNewAchievement(achievement);
      setTimeout(() => setNewAchievement(null), 3000);
    }
  }, [score, level, streak, maxStreak, correctCount, correctAnswersByCategory, lives, unlockedAchievements]);

  const saveState = useCallback(() => {
    const state = { level, maxStreak, correctAnswersByCategory, unlockedAchievements };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [level, maxStreak, correctAnswersByCategory, unlockedAchievements]);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    checkAchievements();
    saveState();
  }, [checkAchievements, saveState]);

  return {
    score, lives, level, streak, maxStreak, comboMultiplier,
    correctCount, incorrectCount, questionsAnswered, totalResponseTime,
    currentQuestion, isGameOver, isPlaying, isPaused, feedback,
    powerUpState, visibleOptions, extraHintEmoji, scoreBreakdown,
    correctAnswersByCategory, unlockedAchievements, newAchievement,
    startGame, checkAnswer, handleTimeUp, nextQuestion, usePowerUp,
    endGame, setIsPaused, setIsPlaying, setIsGameOver, getUnlockedCategories,
    loadQuestion, checkAchievements, saveState, setLevel,
  };
}
