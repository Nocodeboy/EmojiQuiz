/**
 * EmojiQuiz - dynamicLoader.js
 * Funciones para cargar datos de manera dinámica
 */

/**
 * Carga dinámicamente preguntas para una categoría específica
 * @param {string} categoryId - ID de la categoría a cargar
 * @returns {Promise<Object>} - Promesa que resuelve a las preguntas cargadas
 */
export async function loadCategory(categoryId) {
    try {
        const module = await import(`./questions/${categoryId}.js`);
        return module[`${categoryId}Questions`];
    } catch (error) {
        console.error(`Error al cargar la categoría ${categoryId}:`, error);
        return null;
    }
}

/**
 * Carga traducciones para un idioma específico (preparado para futuras expansiones)
 * @param {string} language - Código del idioma a cargar (es, en, fr, etc.)
 * @returns {Promise<Object>} - Promesa que resuelve a las traducciones cargadas
 */
export async function loadTranslations(language = 'es') {
    try {
        const module = await import(`./translations/${language}.js`);
        return module.default || module;
    } catch (error) {
        console.error(`Error al cargar traducciones para ${language}:`, error);
        
        // Intentar cargar el idioma por defecto si falla
        if (language !== 'es') {
            return loadTranslations('es');
        }
        
        return {};
    }
} 