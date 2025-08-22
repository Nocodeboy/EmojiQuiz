/**
 * EmojiQuiz - settings.js
 * Configuración general del juego
 */

export const settings = {
    difficulties: {
        easy: {
            timePerQuestion: 15,
            pointsBase: 100,
            pointsTimeBonus: 5,
            pointsStreakBonus: 10,
            pointsLevelBonus: 20
        },
        medium: {
            timePerQuestion: 12,
            pointsBase: 150,
            pointsTimeBonus: 8,
            pointsStreakBonus: 15,
            pointsLevelBonus: 30
        },
        hard: {
            timePerQuestion: 10,
            pointsBase: 200,
            pointsTimeBonus: 10,
            pointsStreakBonus: 20,
            pointsLevelBonus: 40
        }
    },
    questionsPerLevel: 10,
    maxLives: 3,
    maxStreak: 3
}; 