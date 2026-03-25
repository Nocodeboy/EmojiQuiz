import { questions } from '../data/questions/index.js';

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

export function getDailyQuestions(count = 10) {
  const today = new Date().toISOString().slice(0, 10);
  const rng = mulberry32(hashString(today));

  const allQuestions = [];
  Object.entries(questions).forEach(([category, diffs]) => {
    ['easy', 'medium', 'hard'].forEach(diff => {
      (diffs[diff] || []).forEach(q => allQuestions.push({ ...q, category, difficulty: diff }));
    });
  });

  // Shuffle with seeded RNG
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  return allQuestions.slice(0, count);
}

export function getDailyState() {
  const today = new Date().toISOString().slice(0, 10);
  const key = `emojiQuiz_daily_${today}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function saveDailyState(score, correctAnswers) {
  const today = new Date().toISOString().slice(0, 10);
  const key = `emojiQuiz_daily_${today}`;
  localStorage.setItem(key, JSON.stringify({ date: today, score, correctAnswers, completed: true }));

  // Update streak
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const yesterdayKey = `emojiQuiz_daily_${yesterday}`;
  const yesterdayData = localStorage.getItem(yesterdayKey);
  const prevStreak = parseInt(localStorage.getItem('emojiQuiz_dailyStreak') || '0');
  const newStreak = yesterdayData ? prevStreak + 1 : 1;
  localStorage.setItem('emojiQuiz_dailyStreak', String(newStreak));

  // Track total completed
  const total = parseInt(localStorage.getItem('emojiQuiz_dailyChallengesCompleted') || '0');
  localStorage.setItem('emojiQuiz_dailyChallengesCompleted', String(total + 1));
}

export function getDailyStreak() {
  return parseInt(localStorage.getItem('emojiQuiz_dailyStreak') || '0');
}

export function getDailyChallengesCompleted() {
  return parseInt(localStorage.getItem('emojiQuiz_dailyChallengesCompleted') || '0');
}
