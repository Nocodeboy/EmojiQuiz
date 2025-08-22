/**
 * EmojiQuiz - translations/questionManager.js
 * Gestor de traducciones para preguntas
 */

import { dataCache } from '../cache.js';
import { getCurrentLanguage } from './index.js';

// Mapa para almacenar las traducciones cargadas
let loadedQuestionTranslations = {};

/**
 * Carga las traducciones de preguntas para un idioma específico
 * @param {string} language - Código del idioma a cargar
 * @returns {Promise<Object>} - Promesa que resuelve con las traducciones
 */
export async function loadQuestionTranslations(language = 'es') {
    // Verificar si ya están cargadas
    if (loadedQuestionTranslations[language]) {
        return loadedQuestionTranslations[language];
    }
    
    // Verificar si están en caché
    const cachedTranslations = dataCache.get('questionTranslations', language);
    if (cachedTranslations) {
        loadedQuestionTranslations[language] = cachedTranslations;
        return cachedTranslations;
    }
    
    try {
        // Cargar dinámicamente del archivo
        const module = await import(`./questions/${language}.js`);
        loadedQuestionTranslations[language] = module.questionTranslations;
        
        // Guardar en caché
        dataCache.set('questionTranslations', language, module.questionTranslations);
        
        return module.questionTranslations;
    } catch (error) {
        console.error(`Error al cargar traducciones de preguntas para ${language}:`, error);
        
        // Si no es español, intentar cargar español como fallback
        if (language !== 'es') {
            return loadQuestionTranslations('es');
        }
        
        return {};
    }
}

/**
 * Traduce una pregunta al idioma actual o al especificado
 * @param {Object} question - Objeto de pregunta original
 * @param {string} category - Categoría de la pregunta
 * @param {string} language - Idioma (opcional, usa el actual por defecto)
 * @returns {Promise<Object>} - Promesa que resuelve con la pregunta traducida
 */
export async function translateQuestion(question, category, language = null) {
    // Si no se especifica idioma, usar el actual
    const lang = language || getCurrentLanguage();
    
    // Si es español, devolver la pregunta original (asumiendo que es el idioma base)
    if (lang === 'es') {
        return { ...question };
    }
    
    // Cargar traducciones
    const translations = await loadQuestionTranslations(lang);
    
    // Verificar si existe traducción para esta pregunta
    if (translations[category] && translations[category][question.answer]) {
        const translation = translations[category][question.answer];
        
        // Crear una copia de la pregunta con texto traducido
        return {
            ...question,
            answer: translation.answer,
            options: translation.options
        };
    }
    
    // Si no hay traducción, devolver la original
    return { ...question };
}

/**
 * Traduce un conjunto de preguntas al idioma actual
 * @param {Array} questions - Array de preguntas a traducir
 * @param {string} category - Categoría de las preguntas
 * @returns {Promise<Array>} - Promesa que resuelve con las preguntas traducidas
 */
export async function translateQuestions(questions, category) {
    // Obtener todas las promesas de traducción
    const translationPromises = questions.map(q => translateQuestion(q, category));
    
    // Esperar a que se completen todas las traducciones
    return Promise.all(translationPromises);
} 