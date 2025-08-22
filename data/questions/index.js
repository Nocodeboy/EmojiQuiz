/**
 * EmojiQuiz - questions/index.js
 * Combina todas las categorías de preguntas
 */

import { moviesQuestions } from './movies.js';
import { countriesQuestions } from './countries.js';
import { historyQuestions } from './history.js';
import { scienceQuestions } from './science.js';
import { literatureQuestions } from './literature.js';
import { technologyQuestions } from './technology.js';

export const questions = {
    movies: moviesQuestions,
    countries: countriesQuestions,
    history: historyQuestions,
    science: scienceQuestions,
    literature: literatureQuestions,
    technology: technologyQuestions
};

/**
 * Obtiene preguntas aleatorias de una categoría y dificultad específicas
 * @param {string} category - Categoría de las preguntas
 * @param {string} difficulty - Nivel de dificultad (easy, medium, hard)
 * @param {number} count - Número de preguntas a obtener
 * @returns {Array} - Array de preguntas aleatorias
 */
export function getRandomQuestions(category, difficulty, count = 5) {
    if (!questions[category] || !questions[category][difficulty]) {
        return [];
    }
    
    const availableQuestions = questions[category][difficulty];
    if (count >= availableQuestions.length) {
        return [...availableQuestions];
    }
    
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * Obtiene todas las preguntas disponibles para una categoría
 * @param {string} category - Categoría de las preguntas
 * @returns {Object} - Objeto con preguntas por nivel de dificultad
 */
export function getAllQuestionsForCategory(category) {
    return questions[category] || {};
}

/**
 * Verifica que los emojis sean válidos para todas las preguntas
 * @returns {boolean} - True si todos los emojis son válidos
 */
export function validateEmojis() {
    let valid = true;
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
    
    Object.keys(questions).forEach(category => {
        const categoryQuestions = questions[category];
        
        ['easy', 'medium', 'hard'].forEach(difficulty => {
            const questionSet = categoryQuestions[difficulty] || [];
            
            questionSet.forEach((question, index) => {
                if (!question.emojis || !Array.isArray(question.emojis) || question.emojis.length === 0) {
                    console.error(`❌ Pregunta sin emojis: ${category}.${difficulty}[${index}]`);
                    valid = false;
                }
                
                // Verificar si hay emojis repetidos consecutivos
                const hasRepeatedEmojis = question.emojis.some((emoji, i, arr) => 
                    i > 0 && emoji === arr[i-1] && emoji === arr[i-2] && emoji === arr[i-3]
                );
                
                if (hasRepeatedEmojis) {
                    console.warn(`⚠️ Emojis repetitivos: ${category}.${difficulty}[${index}] - ${question.answer}`);
                }
            });
        });
    });
    
    return valid;
}

/**
 * Busca preguntas duplicadas entre todas las categorías y dificultades
 * @returns {Array} - Array de objetos con información sobre preguntas duplicadas
 */
export function findDuplicateQuestions() {
    const duplicates = [];
    const allQuestions = [];
    
    // Recopilar todas las preguntas en un array con su información
    Object.keys(questions).forEach(category => {
        const categoryQuestions = questions[category];
        
        ['easy', 'medium', 'hard'].forEach(difficulty => {
            const questionSet = categoryQuestions[difficulty] || [];
            
            questionSet.forEach((question, index) => {
                allQuestions.push({
                    category,
                    difficulty,
                    index,
                    question
                });
            });
        });
    });
    
    // Buscar duplicados por texto de respuesta
    const answerMap = new Map();
    
    allQuestions.forEach(item => {
        const answer = item.question.answer.toLowerCase().trim();
        
        if (!answerMap.has(answer)) {
            answerMap.set(answer, [item]);
        } else {
            answerMap.get(answer).push(item);
        }
    });
    
    // Filtrar solo las respuestas que aparecen más de una vez
    answerMap.forEach((items, answer) => {
        if (items.length > 1) {
            duplicates.push({
                answer,
                count: items.length,
                instances: items.map(item => `${item.category}.${item.difficulty}[${item.index}]`)
            });
        }
    });
    
    // Buscar duplicados por conjunto de emojis
    const emojiMap = new Map();
    
    allQuestions.forEach(item => {
        if (!item.question.emojis) return;
        
        const emojiKey = item.question.emojis.join(',');
        
        if (!emojiMap.has(emojiKey)) {
            emojiMap.set(emojiKey, [item]);
        } else {
            emojiMap.get(emojiKey).push(item);
        }
    });
    
    // Filtrar solo los conjuntos de emojis que aparecen más de una vez
    emojiMap.forEach((items, emojiKey) => {
        if (items.length > 1) {
            duplicates.push({
                emojis: emojiKey,
                count: items.length,
                instances: items.map(item => `${item.category}.${item.difficulty}[${item.index}]`)
            });
        }
    });
    
    return duplicates;
} 