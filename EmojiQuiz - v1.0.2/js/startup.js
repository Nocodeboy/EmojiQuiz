/**
 * EmojiQuiz - startup.js
 * Script para garantizar que el juego arranca correctamente
 */

// Asegurarnos de que gameData está disponible globalmente
if (typeof window.gameData === 'undefined' && typeof gameData !== 'undefined') {
    window.gameData = gameData;
}

// Parche temporal para adaptar las funciones asincrónicas
if (window.gameData) {
    // Función para traducir preguntas de forma simple
    const simpleTranslateQuestion = (question) => {
        if (window.currentLanguage === 'es' || !window.translateText) {
            return question;
        }
        
        return {
            ...question,
            answer: window.translateText(question.answer),
            options: question.options.map(option => window.translateText(option))
        };
    };
    
    // Parche para getRandomQuestions
    const originalGetRandomQuestions = window.gameData.utils.getRandomQuestions;
    window.gameData.utils.getRandomQuestions = function(category, difficulty, count) {
        const questions = originalGetRandomQuestions(category, difficulty, count);
        
        // Solo traducir si no estamos en español
        if (window.currentLanguage !== 'es' && window.translateText) {
            return questions.map(simpleTranslateQuestion);
        }
        
        return questions;
    };
}

// Notificar que el juego está listo
console.log('🎮 EmojiQuiz está listo para comenzar');
document.dispatchEvent(new Event('gameReady')); 