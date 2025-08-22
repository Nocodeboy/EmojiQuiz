/**
 * EmojiQuiz - index.js
 * Archivo principal que combina todos los datos del juego
 */

import { categories } from './categories.js';
import { questions, getRandomQuestions, getAllQuestionsForCategory } from './questions/index.js';
import { powerUps } from './powerups.js';
import { achievements } from './achievements.js';
import { settings } from './settings.js';

/**
 * Verifica si un logro ha sido desbloqueado
 * @param {string} achievementId - ID del logro a verificar
 * @param {Object} playerStats - Estadísticas actuales del jugador
 * @returns {boolean} - True si el logro está desbloqueado
 */
function isAchievementUnlocked(achievementId, playerStats) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return false;
    
    // Evaluamos la condición como una expresión JavaScript
    try {
        // eslint-disable-next-line no-new-func
        return new Function(...Object.keys(playerStats), `return ${achievement.condition}`)(...Object.values(playerStats));
    } catch (error) {
        console.error(`Error evaluando condición para logro ${achievementId}:`, error);
        return false;
    }
}

/**
 * Obtiene todos los logros desbloqueados para las estadísticas del jugador
 * @param {Object} playerStats - Estadísticas actuales del jugador
 * @returns {Array} - Array de logros desbloqueados
 */
function getUnlockedAchievements(playerStats) {
    return achievements.filter(achievement => 
        isAchievementUnlocked(achievement.id, playerStats)
    );
}

/**
 * Verifica si una categoría está desbloqueada según el nivel del jugador
 * @param {string} categoryId - ID de la categoría a verificar
 * @param {number} playerLevel - Nivel actual del jugador
 * @returns {boolean} - True si la categoría está desbloqueada
 */
function isCategoryUnlocked(categoryId, playerLevel) {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return false;
    
    return category.unlocked || (category.unlockLevel && playerLevel >= category.unlockLevel);
}

/**
 * Calcula la puntuación para una respuesta
 * @param {Object} params - Parámetros para el cálculo
 * @param {string} params.difficulty - Dificultad de la pregunta
 * @param {number} params.timeLeft - Tiempo restante en segundos
 * @param {number} params.streak - Racha actual de respuestas correctas
 * @param {number} params.level - Nivel actual del jugador
 * @returns {number} - Puntuación calculada
 */
function calculateScore({difficulty, timeLeft, streak, level}) {
    const difficultySettings = settings.difficulties[difficulty];
    if (!difficultySettings) return 0;
    
    let score = difficultySettings.pointsBase;
    score += timeLeft * difficultySettings.pointsTimeBonus;
    score += Math.min(streak, settings.maxStreak) * difficultySettings.pointsStreakBonus;
    score += level * difficultySettings.pointsLevelBonus;
    
    return Math.round(score);
}

// Objeto principal con todos los datos y funciones auxiliares del juego
const gameData = {
    // Datos principales
    categories,
    questions,
    powerUps,
    achievements,
    settings,
    
    // Funciones auxiliares
    utils: {
        getRandomQuestions,
        getAllQuestionsForCategory,
        isAchievementUnlocked,
        getUnlockedAchievements,
        isCategoryUnlocked,
        calculateScore
    }
};

// Exportar datos del juego
export default gameData;
window.gameData = gameData; 