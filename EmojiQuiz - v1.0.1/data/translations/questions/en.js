/**
 * EmojiQuiz - translations/questions/en.js
 * Traducciones de preguntas al inglés
 */

export const questionTranslations = {
    movies: {
        "El Rey León": {
            answer: "The Lion King",
            options: ["The Lion King", "Tarzan", "Madagascar", "Jumanji"]
        },
        "Harry Potter": {
            answer: "Harry Potter",
            options: ["Harry Potter", "The Lord of the Rings", "The Chronicles of Narnia", "Percy Jackson"]
        },
        "Frozen": {
            answer: "Frozen",
            options: ["Ice Age", "Frozen", "The Snowman", "The Frozen Kingdom"]
        },
        "Cars": {
            answer: "Cars",
            options: ["Fast and Furious", "Cars", "Transformers", "Hot Wheels"]
        },
        "Toy Story": {
            answer: "Toy Story",
            options: ["Toy Story", "Christopher Robin", "Pinocchio", "The Nutcracker"]
        },
        "Parque Jurásico": {
            answer: "Jurassic Park",
            options: ["Jurassic Park", "King Kong", "Godzilla", "The Lost Island"]
        },
        "Cazafantasmas": {
            answer: "Ghostbusters",
            options: ["Ghostbusters", "Poltergeist", "The Exorcist", "The Omen"]
        },
        "Tiburón": {
            answer: "Jaws",
            options: ["Jaws", "Deep Blue", "The Deep", "The Sea"]
        },
        "Solo en Casa": {
            answer: "Home Alone",
            options: ["Home Alone", "The Intruder", "Mrs. Doubtfire", "Little Fugitive"]
        },
        "Titanic": {
            answer: "Titanic",
            options: ["Titanic", "Poseidon", "The Perfect Storm", "Open Water"]
        },
        // ... más películas
    },
    countries: {
        "México": {
            answer: "Mexico",
            options: ["Spain", "Mexico", "Colombia", "Peru"]
        },
        "Italia": {
            answer: "Italy",
            options: ["Greece", "France", "Italy", "Portugal"]
        },
        "Australia": {
            answer: "Australia",
            options: ["Australia", "New Zealand", "South Africa", "Brazil"]
        },
        // ... más países
    },
    history: {
        "Imperio Romano": {
            answer: "Roman Empire",
            options: ["Roman Empire", "Ancient Greece", "Middle Ages", "Mongol Empire"]
        },
        "Fiesta del Té de Boston": {
            answer: "Boston Tea Party",
            options: ["American Civil War", "Boston Tea Party", "War of Independence", "Treaty of Versailles"]
        },
        // ... más eventos históricos
    },
    science: {
        "Ley de la Gravedad": {
            answer: "Law of Gravity",
            options: ["Law of Gravity", "Theory of Evolution", "Newton's Laws", "String Theory"]
        },
        "Electricidad": {
            answer: "Electricity",
            options: ["Magnetism", "Electricity", "Energy", "Waves"]
        },
        // ... más conceptos científicos
    },
    literature: {
        "Caperucita Roja": {
            answer: "Little Red Riding Hood",
            options: ["Sleeping Beauty", "Snow White", "Little Red Riding Hood", "Cinderella"]
        },
        "Los Tres Cerditos": {
            answer: "The Three Little Pigs",
            options: ["The Three Little Pigs", "The Wolf and the Seven Kids", "Goldilocks", "The Tortoise and the Hare"]
        },
        // ... más obras literarias
    },
    technology: {
        "Smartphone": {
            answer: "Smartphone",
            options: ["Smartphone", "Tablet", "Computer", "Smartwatch"]
        },
        "Ordenador": {
            answer: "Computer",
            options: ["Smartphone", "Tablet", "Computer", "Console"]
        },
        // ... más tecnologías
    }
};

/**
 * Obtiene las traducciones para una pregunta específica
 * @param {string} category - Categoría de la pregunta
 * @param {string} originalAnswer - Respuesta original (clave)
 * @returns {Object|null} - Objeto con la respuesta y opciones traducidas
 */
export function getQuestionTranslation(category, originalAnswer) {
    if (!questionTranslations[category] || !questionTranslations[category][originalAnswer]) {
        return null;
    }
    
    return questionTranslations[category][originalAnswer];
} 