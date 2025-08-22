/**
 * EmojiQuiz - translations.js
 * Este archivo contiene todas las traducciones para los diferentes idiomas del juego
 */

const translations = {
    // Español (idioma predeterminado)
    es: {
        // Pantalla de inicio
        gameTitle: "EMOJI<span>QUIZ</span>",
        tagline: "¡Adivina con emojis!",
        playButton: "JUGAR",
        howToPlayButton: "CÓMO JUGAR",
        categoriesButton: "CATEGORÍAS",
        achievementsButton: "LOGROS",
        settingsButton: "AJUSTES",
        version: "v1.0.0",
        credits: "Creado con 💖 para todos",
        
        // Pantalla de juego
        levelLabel: "NIVEL",
        pointsLabel: "PUNTOS",
        livesLabel: "VIDAS",
        categoryLabel: "Categoría",
        nextButton: "SIGUIENTE",
        
        // Power-ups
        fiftyFiftyTooltip: "Elimina dos respuestas incorrectas",
        extraTimeTooltip: "Añade 10 segundos extra",
        extraHintTooltip: "Muestra un emoji adicional como pista",
        
        // Mensajes de feedback
        correct: "¡Correcto! 🎉",
        incorrect: "¡Incorrecto! 😢 La respuesta correcta es: ",
        timeUp: "¡Tiempo agotado! 😢 La respuesta correcta es: ",
        basePoints: "base",
        timeBonus: "tiempo",
        streakBonus: "racha",
        levelBonus: "nivel",
        points: "puntos",
        
        // Pantalla de fin del juego
        gameOver: "FIN DEL JUEGO",
        finalScore: "Tu puntuación final:",
        correctAnswers: "Respuestas correctas:",
        incorrectAnswers: "Respuestas incorrectas:",
        levelReached: "Nivel alcanzado:",
        maxStreak: "Racha máxima:",
        playAgain: "JUGAR DE NUEVO",
        mainMenu: "MENÚ PRINCIPAL",
        
        // Pantalla de instrucciones
        howToPlay: "CÓMO JUGAR",
        instruction1: "1. Se mostrarán varios emojis que forman un concepto, persona o idea.",
        instruction2: "2. Selecciona la respuesta correcta entre las opciones.",
        instruction3: "3. Responde antes de que se acabe el tiempo.",
        instruction4: "4. Consigue rachas de aciertos para multiplicar tus puntos.",
        instruction5: "5. Supera niveles para desbloquear nuevas categorías y desafíos.",
        scoringSystem: "Sistema de puntuación:",
        scoringBase: "• Respuesta correcta: 100 puntos base",
        scoringTime: "• Bonus por tiempo: Hasta 50 puntos extra",
        scoringStreak: "• Bonus por racha: 10 puntos por cada acierto consecutivo",
        scoringLevel: "• Bonus por nivel: 20 puntos × nivel actual",
        powerUpsTitle: "Power-ups:",
        backButton: "VOLVER",
        
        // Pantalla de categorías
        categoriesTitle: "CATEGORÍAS",
        categoryLocked: "Nivel",
        
        // Pantalla de logros
        achievementsTitle: "LOGROS",
        achievementsUnlocked: "Logros desbloqueados:",
        achievementsLocked: "Logros pendientes:",
        achievementLocked: "Bloqueado",
        noAchievementsUnlocked: "¡Aún no has desbloqueado ningún logro!",
        unlockMoreAchievements: "Sigue jugando para conseguirlos todos.",
        
        // Pantalla de ajustes
        settingsTitle: "AJUSTES",
        soundEffects: "Efectos de sonido",
        soundVolume: "Volumen de efectos",
        music: "Música",
        musicVolume: "Volumen de música",
        crtEffect: "Efecto CRT",
        difficulty: "Dificultad",
        difficultyEasy: "Fácil",
        difficultyMedium: "Normal",
        difficultyHard: "Difícil",
        saveAndBack: "GUARDAR Y VOLVER",
        
        // Diálogo de pausa
        pauseTitle: "JUEGO PAUSADO",
        continueButton: "CONTINUAR",
        restartButton: "REINICIAR",
        exitButton: "SALIR AL MENÚ",
        
        // Notificaciones
        notifLevelUp: "¡Has subido al nivel",
        notifCategoryUnlocked: "¡Nueva categoría desbloqueada: ",
        notifAchievementUnlocked: "¡Logro desbloqueado: ",
        notifNoPowerUps: "No tienes más power-ups de este tipo",
        notifExtraTime: " segundos añadidos",
        notifExtraHint: "Pista adicional añadida: ",
        notifNoMoreHints: "No hay más pistas disponibles para esta pregunta",
        gameSaved: "¡Juego guardado! 💾",
        saveError: "Error al guardar el juego 😢",
        
        // Compartir
        shareMessage: "¡He conseguido {score} puntos en EmojiQuiz! ¿Puedes superarme? #EmojiQuiz #JuegoEducativo",
        
        // Categorías
        movies: "Películas",
        countries: "Países",
        history: "Historia",
        science: "Ciencia",
        literature: "Literatura",
        technology: "Tecnología",
        math: "Matemáticas",
        sports: "Deportes",
        music: "Música",
        art: "Arte",
        food: "Comida",
        animals: "Animales",
        
        // Textos del idioma
        languageLabel: "Idioma",
        spanish: "Español",
        english: "Inglés",
        
        // Fondos animados
        backgroundLabel: "Fondo Animado",
        backgroundNeon: "Grid Neón",
        backgroundEmojis: "Emojis Pixel",
        backgroundNebula: "Nebulosa Pixel",
        backgroundNone: "Sin Fondo"
    },
    
    // English
    en: {
        // Start screen
        gameTitle: "EMOJI<span>QUIZ</span>",
        tagline: "Guess with emojis!",
        playButton: "PLAY",
        howToPlayButton: "HOW TO PLAY",
        categoriesButton: "CATEGORIES",
        achievementsButton: "ACHIEVEMENTS",
        settingsButton: "SETTINGS",
        version: "v1.0.0",
        credits: "Created with 💖 for everyone",
        
        // Game screen
        levelLabel: "LEVEL",
        pointsLabel: "SCORE",
        livesLabel: "LIVES",
        categoryLabel: "Category",
        nextButton: "NEXT",
        
        // Power-ups
        fiftyFiftyTooltip: "Removes two incorrect answers",
        extraTimeTooltip: "Adds 10 extra seconds",
        extraHintTooltip: "Shows an additional emoji hint",
        
        // Feedback messages
        correct: "Correct! 🎉",
        incorrect: "Incorrect! 😢 The right answer is: ",
        timeUp: "Time's up! 😢 The right answer is: ",
        basePoints: "base",
        timeBonus: "time",
        streakBonus: "streak",
        levelBonus: "level",
        points: "points",
        
        // Game over screen
        gameOver: "GAME OVER",
        finalScore: "Your final score:",
        correctAnswers: "Correct answers:",
        incorrectAnswers: "Incorrect answers:",
        levelReached: "Level reached:",
        maxStreak: "Max streak:",
        playAgain: "PLAY AGAIN",
        mainMenu: "MAIN MENU",
        
        // Instructions screen
        howToPlay: "HOW TO PLAY",
        instruction1: "1. Several emojis that form a concept, person, or idea will be shown.",
        instruction2: "2. Select the correct answer from the options.",
        instruction3: "3. Answer before time runs out.",
        instruction4: "4. Get streaks of correct answers to multiply your points.",
        instruction5: "5. Level up to unlock new categories and challenges.",
        scoringSystem: "Scoring system:",
        scoringBase: "• Correct answer: 100 base points",
        scoringTime: "• Time bonus: Up to 50 extra points",
        scoringStreak: "• Streak bonus: 10 points for each consecutive hit",
        scoringLevel: "• Level bonus: 20 points × current level",
        powerUpsTitle: "Power-ups:",
        backButton: "BACK",
        
        // Categories screen
        categoriesTitle: "CATEGORIES",
        categoryLocked: "Level",
        
        // Achievements screen
        achievementsTitle: "ACHIEVEMENTS",
        achievementsUnlocked: "Unlocked achievements:",
        achievementsLocked: "Achievements to unlock:",
        achievementLocked: "Locked",
        noAchievementsUnlocked: "You haven't unlocked any achievements yet!",
        unlockMoreAchievements: "Keep playing to unlock them all.",
        
        // Settings screen
        settingsTitle: "SETTINGS",
        soundEffects: "Sound effects",
        soundVolume: "Effects volume",
        music: "Music",
        musicVolume: "Music volume",
        crtEffect: "CRT Effect",
        difficulty: "Difficulty",
        difficultyEasy: "Easy",
        difficultyMedium: "Normal",
        difficultyHard: "Hard",
        saveAndBack: "SAVE & BACK",
        
        // Pause dialog
        pauseTitle: "GAME PAUSED",
        continueButton: "CONTINUE",
        restartButton: "RESTART",
        exitButton: "EXIT TO MENU",
        
        // Notifications
        notifLevelUp: "You've reached level ",
        notifCategoryUnlocked: "New category unlocked: ",
        notifAchievementUnlocked: "Achievement unlocked: ",
        notifNoPowerUps: "You don't have any more power-ups of this type",
        notifExtraTime: " seconds added",
        notifExtraHint: "Additional hint added: ",
        notifNoMoreHints: "No more hints available for this question",
        gameSaved: "Game saved! 💾",
        saveError: "Error saving game 😢",
        
        // Sharing
        shareMessage: "I scored {score} points in EmojiQuiz! Can you beat me? #EmojiQuiz #EducationalGame",
        
        // Categories
        movies: "Movies",
        countries: "Countries",
        history: "History",
        science: "Science",
        literature: "Literature",
        technology: "Technology",
        math: "Mathematics",
        sports: "Sports",
        music: "Music",
        art: "Art",
        food: "Food",
        animals: "Animals",
        
        // Language texts
        languageLabel: "Language",
        spanish: "Spanish",
        english: "English",
        
        // Animated backgrounds
        backgroundLabel: "Animated Background",
        backgroundNeon: "Neon Grid",
        backgroundEmojis: "Pixel Emojis",
        backgroundNebula: "Pixel Nebula",
        backgroundNone: "No Background"
    }
};

// Función para obtener una traducción
function getText(key, langCode = currentLanguage) {
    // Si el idioma no existe, usar español como fallback
    if (!translations[langCode]) {
        langCode = 'es';
    }
    
    // Si la clave no existe en el idioma, buscar en español
    if (!translations[langCode][key]) {
        // Si tampoco existe en español, devolver la clave
        if (!translations['es'][key]) {
            return key;
        }
        return translations['es'][key];
    }
    
    return translations[langCode][key];
}

// Variable global para almacenar el idioma actual
let currentLanguage = localStorage.getItem('emojiQuizLanguage') || 'es';

// Función para cambiar el idioma
function changeLanguage(langCode) {
    if (translations[langCode]) {
        currentLanguage = langCode;
        localStorage.setItem('emojiQuizLanguage', langCode);
        updateUILanguage();
        return true;
    }
    return false;
}

// Función para actualizar la interfaz al cambiar de idioma
function updateUILanguage() {
    // Esta función será implementada por cada pantalla
    // y será llamada cuando se cambie el idioma
    if (typeof ui !== 'undefined' && ui.updateLanguage) {
        ui.updateLanguage();
    }
}

// Hacer las funciones accesibles globalmente
window.getText = getText;
window.changeLanguage = changeLanguage;
window.updateUILanguage = updateUILanguage;

// Exportar las funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getText,
        changeLanguage,
        updateUILanguage
    };
}
