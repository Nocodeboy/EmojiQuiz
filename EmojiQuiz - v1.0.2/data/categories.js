/**
 * EmojiQuiz - categories.js
 * Categorías disponibles en el juego
 */

export const categories = [
    {
        id: "movies",
        name: "Películas",
        icon: "🎬",
        description: "Adivina películas famosas a partir de sus emojis",
        unlocked: true,
        color: "#e74c3c"
    },
    {
        id: "countries",
        name: "Países",
        icon: "🌍",
        description: "Descubre países a través de emojis relacionados",
        unlocked: true,
        color: "#3498db"
    },
    {
        id: "history",
        name: "Historia",
        icon: "📜",
        description: "Eventos históricos representados con emojis",
        unlocked: true,
        color: "#f39c12"
    },
    {
        id: "science",
        name: "Ciencia",
        icon: "🔬",
        description: "Conceptos científicos en forma de emojis",
        unlocked: true,
        color: "#2ecc71"
    },
    {
        id: "literature",
        name: "Literatura",
        icon: "📚",
        description: "Libros y obras literarias en emojis",
        unlocked: false,
        unlockLevel: 2,
        color: "#9b59b6"
    },
    {
        id: "technology",
        name: "Tecnología",
        icon: "💻",
        description: "Conceptos tecnológicos mediante emojis",
        unlocked: false,
        unlockLevel: 2,
        color: "#1abc9c"
    },
    {
        id: "food",
        name: "Comida",
        icon: "🍕",
        description: "Platos y alimentos del mundo en emojis",
        unlocked: true,
        color: "#e67e22"
    },
    {
        id: "sports",
        name: "Deportes",
        icon: "⚽",
        description: "Deportes y atletas representados con emojis",
        unlocked: true,
        color: "#27ae60"
    },
    {
        id: "music",
        name: "Música",
        icon: "🎵",
        description: "Canciones, artistas y géneros musicales",
        unlocked: false,
        unlockLevel: 3,
        color: "#e91e63"
    },
    {
        id: "animals",
        name: "Animales",
        icon: "🐾",
        description: "Animales y vida salvaje en emojis",
        unlocked: false,
        unlockLevel: 3,
        color: "#795548"
    }
]; 