/**
 * EmojiQuiz - questionTranslator.js
 * Utilidad para traducir preguntas de manera sencilla y síncrona
 */

import { translateText, getCurrentLanguage } from '../../data/translations/index.js';

/**
 * Traduce una pregunta de forma simple
 * @param {Object} question - Pregunta original
 * @returns {Object} - Pregunta traducida
 */
export function translateQuestion(question) {
    // Si estamos en español, devolver la pregunta original
    if (getCurrentLanguage() === 'es') {
        return question;
    }
    
    // Traducir respuesta y opciones
    const translatedAnswer = translateText(question.answer);
    const translatedOptions = question.options.map(option => translateText(option));
    
    // Devolver pregunta traducida
    return {
        ...question,
        answer: translatedAnswer,
        options: translatedOptions
    };
}

/**
 * Traduce un conjunto de preguntas
 * @param {Array} questions - Array de preguntas
 * @returns {Array} - Array de preguntas traducidas
 */
export function translateQuestions(questions) {
    return questions.map(translateQuestion);
}

// Para compatibilidad con código antiguo
window.translateQuestion = translateQuestion;
window.translateQuestions = translateQuestions; 