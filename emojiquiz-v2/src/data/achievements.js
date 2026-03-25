export const achievements = [
  { id: "first_win", name: "Principiante", description: "Responde correctamente tu primera pregunta", icon: "\u{1F3AF}", check: (s) => s.correctAnswers >= 1 },
  { id: "streak_3", name: "Racha Caliente", description: "Consigue un combo de 3", icon: "\u{1F525}", check: (s) => s.maxStreak >= 3 },
  { id: "streak_5", name: "Combo x5", description: "Alcanza un combo de 5", icon: "\u{1F4A5}", check: (s) => s.maxStreak >= 5 },
  { id: "streak_10", name: "Combo x10", description: "Alcanza un combo de 10", icon: "\u26A1", check: (s) => s.maxStreak >= 10 },
  { id: "level_up", name: "Subiendo de Nivel", description: "Alcanza el nivel 2", icon: "\u2B06\uFE0F", check: (s) => s.level >= 2 },
  { id: "movie_master", name: "Cinefilo", description: "10 respuestas correctas de peliculas", icon: "\u{1F3AC}", check: (s) => (s.correctAnswersByCategory?.movies || 0) >= 10 },
  { id: "globe_trotter", name: "Trotamundos", description: "10 respuestas correctas de paises", icon: "\u{1F30D}", check: (s) => (s.correctAnswersByCategory?.countries || 0) >= 10 },
  { id: "history_buff", name: "Historiador", description: "10 respuestas correctas de historia", icon: "\u{1F4DC}", check: (s) => (s.correctAnswersByCategory?.history || 0) >= 10 },
  { id: "scientist", name: "Cientifico", description: "10 respuestas correctas de ciencia", icon: "\u{1F52C}", check: (s) => (s.correctAnswersByCategory?.science || 0) >= 10 },
  { id: "bookworm", name: "Raton de Biblioteca", description: "10 respuestas correctas de literatura", icon: "\u{1F4DA}", check: (s) => (s.correctAnswersByCategory?.literature || 0) >= 10 },
  { id: "tech_savvy", name: "Guru Tecnologico", description: "10 respuestas correctas de tecnologia", icon: "\u{1F4BB}", check: (s) => (s.correctAnswersByCategory?.technology || 0) >= 10 },
  { id: "foodie", name: "Foodie", description: "10 respuestas correctas de comida", icon: "\u{1F355}", check: (s) => (s.correctAnswersByCategory?.food || 0) >= 10 },
  { id: "music_fan", name: "Melomano", description: "10 respuestas correctas de musica", icon: "\u{1F3B5}", check: (s) => (s.correctAnswersByCategory?.music || 0) >= 10 },
  { id: "sports_star", name: "Deportista", description: "10 respuestas correctas de deportes", icon: "\u26BD", check: (s) => (s.correctAnswersByCategory?.sports || 0) >= 10 },
  { id: "animal_lover", name: "Amante Animal", description: "10 respuestas correctas de animales", icon: "\u{1F43E}", check: (s) => (s.correctAnswersByCategory?.animals || 0) >= 10 },
  { id: "speed_demon", name: "Velocista", description: "Alcanza 1000 puntos", icon: "\u26A1", check: (s) => s.score >= 1000 },
  { id: "emoji_wizard", name: "Mago de los Emojis", description: "Alcanza 5000 puntos", icon: "\u{1F9D9}\u200D\u2642\uFE0F", check: (s) => s.score >= 5000 },
  { id: "daily_first", name: "Primer Desafio", description: "Completa tu primer desafio diario", icon: "\u{1F4C5}", check: (s) => (s.dailyChallengesCompleted || 0) >= 1 },
  { id: "daily_streak_7", name: "Semana Perfecta", description: "7 desafios diarios consecutivos", icon: "\u{1F5D3}\uFE0F", check: (s) => (s.dailyStreak || 0) >= 7 },
  { id: "master_of_all", name: "Gran Maestro", description: "5 correctas de cada categoria", icon: "\u{1F451}", check: (s) => {
    const cats = ['movies','countries','history','science','literature','technology','food','music','sports','animals'];
    return cats.every(c => (s.correctAnswersByCategory?.[c] || 0) >= 5);
  }},
];
