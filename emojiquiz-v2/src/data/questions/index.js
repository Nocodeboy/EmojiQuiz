import { moviesQuestions } from './movies.js';
import { countriesQuestions } from './countries.js';
import { historyQuestions } from './history.js';
import { scienceQuestions } from './science.js';
import { literatureQuestions } from './literature.js';
import { technologyQuestions } from './technology.js';
import { foodQuestions } from './food.js';
import { musicQuestions } from './music.js';
import { sportsQuestions } from './sports.js';
import { animalsQuestions } from './animals.js';

export const questions = {
  movies: moviesQuestions,
  countries: countriesQuestions,
  history: historyQuestions,
  science: scienceQuestions,
  literature: literatureQuestions,
  technology: technologyQuestions,
  food: foodQuestions,
  music: musicQuestions,
  sports: sportsQuestions,
  animals: animalsQuestions,
};

export function getRandomQuestions(category, difficulty, count = 5) {
  if (!questions[category]?.[difficulty]) return [];
  const available = [...questions[category][difficulty]];
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  return available.slice(0, count);
}

export function getAllQuestionsForCategory(category) {
  return questions[category] || {};
}
