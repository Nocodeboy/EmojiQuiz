/**
 * EmojiQuiz - achievements.js
 * Logros desbloqueables en el juego
 */

export const achievements = [
    {
        id: "first_win",
        name: "Principiante",
        description: "Responde correctamente tu primera pregunta",
        icon: "🎯",
        condition: "correctAnswers >= 1"
    },
    {
        id: "streak_3",
        name: "Racha Caliente",
        description: "Consigue una racha de 3 respuestas correctas",
        icon: "🔥",
        condition: "streak >= 3"
    },
    {
        id: "level_up",
        name: "Subiendo de Nivel",
        description: "Alcanza el nivel 2",
        icon: "⬆️",
        condition: "level >= 2"
    },
    {
        id: "movie_master",
        name: "Cinéfilo",
        description: "Responde correctamente 10 preguntas de películas",
        icon: "🎬",
        condition: "correctAnswersByCategory.movies >= 10"
    },
    {
        id: "globe_trotter",
        name: "Trotamundos",
        description: "Responde correctamente 10 preguntas de países",
        icon: "🌍",
        condition: "correctAnswersByCategory.countries >= 10"
    },
    {
        id: "history_buff",
        name: "Historiador",
        description: "Responde correctamente 10 preguntas de historia",
        icon: "📜",
        condition: "correctAnswersByCategory.history >= 10"
    },
    {
        id: "scientist",
        name: "Científico",
        description: "Responde correctamente 10 preguntas de ciencia",
        icon: "🔬",
        condition: "correctAnswersByCategory.science >= 10"
    },
    {
        id: "bookworm",
        name: "Ratón de Biblioteca",
        description: "Responde correctamente 10 preguntas de literatura",
        icon: "📚",
        condition: "correctAnswersByCategory.literature >= 10"
    },
    {
        id: "tech_savvy",
        name: "Gurú Tecnológico",
        description: "Responde correctamente 10 preguntas de tecnología",
        icon: "💻",
        condition: "correctAnswersByCategory.technology >= 10"
    },
    {
        id: "foodie",
        name: "Foodie",
        description: "Responde correctamente 10 preguntas de comida",
        icon: "🍕",
        condition: "correctAnswersByCategory.food >= 10"
    },
    {
        id: "music_fan",
        name: "Melómano",
        description: "Responde correctamente 10 preguntas de música",
        icon: "🎵",
        condition: "correctAnswersByCategory.music >= 10"
    },
    {
        id: "sports_star",
        name: "Deportista",
        description: "Responde correctamente 10 preguntas de deportes",
        icon: "⚽",
        condition: "correctAnswersByCategory.sports >= 10"
    },
    {
        id: "animal_lover",
        name: "Amante Animal",
        description: "Responde correctamente 10 preguntas de animales",
        icon: "🐾",
        condition: "correctAnswersByCategory.animals >= 10"
    },
    {
        id: "perfect_streak",
        name: "Perfeccionista",
        description: "Consigue una racha de 10 respuestas correctas",
        icon: "✨",
        condition: "maxStreak >= 10"
    },
    {
        id: "speed_demon",
        name: "Velocista",
        description: "Responde correctamente 5 preguntas en menos de 3 segundos cada una",
        icon: "⚡",
        condition: "score >= 1000" 
    },
    {
        id: "master_of_all",
        name: "Gran Maestro",
        description: "Responde correctamente al menos 5 preguntas de cada categoría",
        icon: "👑",
        condition: "correctAnswersByCategory.movies >= 5 && correctAnswersByCategory.countries >= 5 && correctAnswersByCategory.history >= 5 && correctAnswersByCategory.science >= 5 && correctAnswersByCategory.literature >= 5 && correctAnswersByCategory.technology >= 5 && correctAnswersByCategory.food >= 5 && correctAnswersByCategory.music >= 5 && correctAnswersByCategory.sports >= 5 && correctAnswersByCategory.animals >= 5"
    },
    {
        id: "emoji_wizard",
        name: "Mago de los Emojis",
        description: "Alcanza una puntuación total de 5000 puntos",
        icon: "🧙‍♂️",
        condition: "score >= 5000"
    },
    {
        id: "comeback_kid",
        name: "El Regreso",
        description: "Gana una partida después de tener solo 1 vida restante",
        icon: "🎯",
        condition: "lives <= 1 && score >= 1000"
    },
    {
        id: "explorer",
        name: "Explorador",
        description: "Desbloquea todas las categorías",
        icon: "🧭",
        condition: "level >= 2"
    }
]; 