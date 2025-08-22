/**
 * Script para migrar el archivo data.js original a la nueva estructura modular
 * Ejecutar con: node migrateData.js
 */

const fs = require('fs');
const path = require('path');

// Función principal
async function migrateData() {
    try {
        // Crear estructura de directorios
        const directories = [
            'data',
            'data/questions',
            'data/translations'
        ];
        
        directories.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`✅ Directorio creado: ${dir}`);
            }
        });
        
        // Leer el archivo data.js original
        const originalData = fs.readFileSync('data.js', 'utf8');
        
        // Extraer categorías
        const categoriesMatch = originalData.match(/categories: \[([\s\S]*?)\],/);
        if (categoriesMatch) {
            const categoriesContent = `/**
 * EmojiQuiz - categories.js
 * Categorías disponibles en el juego
 */

export const categories = [${categoriesMatch[1]}];
`;
            fs.writeFileSync('data/categories.js', categoriesContent);
            console.log('✅ Archivo categories.js creado');
        }
        
        // Extraer cada categoría de preguntas
        const categories = ['movies', 'countries', 'history', 'science', 'literature', 'technology'];
        
        categories.forEach(category => {
            const categoryRegex = new RegExp(`${category}: \\{([\\s\\S]*?)\\},\\s*(?=${categories.join('|')}|powerUps)`);
            const match = originalData.match(categoryRegex);
            
            if (match) {
                const content = `/**
 * EmojiQuiz - questions/${category}.js
 * Preguntas de la categoría "${category.charAt(0).toUpperCase() + category.slice(1)}"
 */

export const ${category}Questions = {${match[1]}};
`;
                fs.writeFileSync(`data/questions/${category}.js`, content);
                console.log(`✅ Archivo questions/${category}.js creado`);
            }
        });
        
        // Crear archivo index.js para questions
        const questionsIndexContent = `/**
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
`;
        fs.writeFileSync('data/questions/index.js', questionsIndexContent);
        console.log('✅ Archivo questions/index.js creado');
        
        // Extraer power-ups
        const powerUpsMatch = originalData.match(/powerUps: (\{[\s\S]*?\}),\s*achievements/);
        if (powerUpsMatch) {
            const powerUpsContent = `/**
 * EmojiQuiz - powerups.js
 * Configuración de power-ups disponibles
 */

export const powerUps = ${powerUpsMatch[1]};
`;
            fs.writeFileSync('data/powerups.js', powerUpsContent);
            console.log('✅ Archivo powerups.js creado');
        }
        
        // Extraer logros
        const achievementsMatch = originalData.match(/achievements: \[([\s\S]*?)\],\s*settings/);
        if (achievementsMatch) {
            const achievementsContent = `/**
 * EmojiQuiz - achievements.js
 * Logros desbloqueables en el juego
 */

export const achievements = [${achievementsMatch[1]}];
`;
            fs.writeFileSync('data/achievements.js', achievementsContent);
            console.log('✅ Archivo achievements.js creado');
        }
        
        // Extraer configuración
        const settingsMatch = originalData.match(/settings: (\{[\s\S]*?\})\s*\};/);
        if (settingsMatch) {
            const settingsContent = `/**
 * EmojiQuiz - settings.js
 * Configuración general del juego
 */

export const settings = ${settingsMatch[1]};
`;
            fs.writeFileSync('data/settings.js', settingsContent);
            console.log('✅ Archivo settings.js creado');
        }
        
        // Crear archivo index.js principal
        const indexContent = `/**
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
        return new Function(...Object.keys(playerStats), \`return \${achievement.condition}\`)(...Object.values(playerStats));
    } catch (error) {
        console.error(\`Error evaluando condición para logro \${achievementId}:\`, error);
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
`;
        fs.writeFileSync('data/index.js', indexContent);
        console.log('✅ Archivo index.js creado');
        
        // Crear archivos de traducción base
        const esTranslations = `/**
 * EmojiQuiz - translations/es.js
 * Traducciones al español
 */

export default {
    ui: {
        appTitle: "EmojiQuiz",
        play: "Jugar",
        settings: "Configuración",
        achievements: "Logros",
        stats: "Estadísticas",
        categories: "Categorías",
        back: "Volver",
        next: "Siguiente",
        submit: "Enviar",
        correct: "¡Correcto!",
        incorrect: "Incorrecto",
        timeUp: "¡Tiempo agotado!",
        score: "Puntuación",
        lives: "Vidas",
        level: "Nivel",
        difficulty: {
            easy: "Fácil",
            medium: "Medio",
            hard: "Difícil"
        },
        selectCategory: "Selecciona una categoría",
        selectDifficulty: "Selecciona dificultad",
        gameOver: "Fin del juego",
        totalScore: "Puntuación total",
        playAgain: "Jugar de nuevo",
        mainMenu: "Menú principal",
        loading: "Cargando...",
        newHighScore: "¡Nuevo récord!",
        powerUps: "Power-Ups",
        unlockedAt: "Se desbloquea en nivel"
    }
};
`;
        fs.writeFileSync('data/translations/es.js', esTranslations);
        console.log('✅ Archivo translations/es.js creado');
        
        const enTranslations = `/**
 * EmojiQuiz - translations/en.js
 * Traducciones al inglés
 */

export default {
    ui: {
        appTitle: "EmojiQuiz",
        play: "Play",
        settings: "Settings",
        achievements: "Achievements",
        stats: "Stats",
        categories: "Categories",
        back: "Back",
        next: "Next",
        submit: "Submit",
        correct: "Correct!",
        incorrect: "Incorrect",
        timeUp: "Time's up!",
        score: "Score",
        lives: "Lives",
        level: "Level",
        difficulty: {
            easy: "Easy",
            medium: "Medium",
            hard: "Hard"
        },
        selectCategory: "Select a category",
        selectDifficulty: "Select difficulty",
        gameOver: "Game Over",
        totalScore: "Total Score",
        playAgain: "Play Again",
        mainMenu: "Main Menu",
        loading: "Loading...",
        newHighScore: "New High Score!",
        powerUps: "Power-Ups",
        unlockedAt: "Unlocks at level"
    }
};
`;
        fs.writeFileSync('data/translations/en.js', enTranslations);
        console.log('✅ Archivo translations/en.js creado');
        
        // Crear utilidad para carga dinámica
        const dynamicLoaderContent = `/**
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
        const module = await import(\`./questions/\${categoryId}.js\`);
        return module[\`\${categoryId}Questions\`];
    } catch (error) {
        console.error(\`Error al cargar la categoría \${categoryId}:\`, error);
        return null;
    }
}

/**
 * Carga traducciones para un idioma específico
 * @param {string} language - Código del idioma a cargar (es, en, fr, etc.)
 * @returns {Promise<Object>} - Promesa que resuelve a las traducciones cargadas
 */
export async function loadTranslations(language = 'es') {
    try {
        const module = await import(\`./translations/\${language}.js\`);
        return module.default || module;
    } catch (error) {
        console.error(\`Error al cargar traducciones para \${language}:\`, error);
        
        // Intentar cargar el idioma por defecto si falla
        if (language !== 'es') {
            return loadTranslations('es');
        }
        
        return {};
    }
}
`;
        fs.writeFileSync('data/dynamicLoader.js', dynamicLoaderContent);
        console.log('✅ Archivo dynamicLoader.js creado');
        
        // Crear un archivo README para explicar la estructura
        const readmeContent = `# EmojiQuiz - Estructura de Datos

Esta carpeta contiene todos los datos estructurados del juego EmojiQuiz.

## Estructura de Archivos

- \`index.js\`: Punto de entrada principal que combina todos los datos y exporta funciones auxiliares
- \`categories.js\`: Categorías disponibles en el juego
- \`powerups.js\`: Power-ups que el jugador puede utilizar
- \`achievements.js\`: Logros desbloqueables
- \`settings.js\`: Configuración general del juego (dificultades, puntuación, etc.)
- \`dynamicLoader.js\`: Utilidades para carga dinámica de datos

### Carpetas

- \`questions/\`: Preguntas organizadas por categorías
  - \`index.js\`: Combina todas las categorías y exporta funciones para obtener preguntas
  - \`movies.js\`, \`countries.js\`, etc.: Preguntas específicas por categoría
- \`translations/\`: Traducciones del juego a diferentes idiomas
  - \`es.js\`: Español (idioma principal)
  - \`en.js\`: Inglés

## Cómo Añadir Nuevas Preguntas

Para añadir nuevas preguntas a una categoría existente, edita el archivo correspondiente en la carpeta \`questions/\`.

Ejemplo para añadir una nueva pregunta en la categoría "movies" con dificultad "medium":

\`\`\`javascript
// En questions/movies.js
export const moviesQuestions = {
    // ... otras dificultades ...
    medium: [
        // ... preguntas existentes ...
        { 
            emojis: ["👻", "🏠", "👨", "👩"], 
            answer: "Poltergeist", 
            options: ["El Exorcista", "Poltergeist", "Actividad Paranormal", "El Conjuro"] 
        }
    ]
};
\`\`\`

## Cómo Añadir una Nueva Categoría

1. Crea un nuevo archivo para la categoría en \`questions/\` (por ejemplo, \`sports.js\`)
2. Añade la nueva categoría al archivo \`categories.js\`
3. Importa y agrega la nueva categoría en \`questions/index.js\`

## Cómo Añadir un Nuevo Idioma

1. Crea un nuevo archivo en \`translations/\` (por ejemplo, \`fr.js\` para francés)
2. Traduce todas las cadenas de texto siguiendo la estructura existente
`;
        fs.writeFileSync('data/README.md', readmeContent);
        console.log('✅ Archivo README.md creado');
        
        console.log('🎉 ¡Migración completada con éxito!');
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error);
    }
}

// Ejecutar la migración
migrateData(); 