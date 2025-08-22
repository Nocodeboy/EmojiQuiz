/**
 * EmojiQuiz - powerups.js
 * Configuración de power-ups disponibles
 */

export const powerUps = {
    fiftyFifty: {
        name: "50:50",
        icon: "✂️",
        description: "Elimina dos respuestas incorrectas",
        initialCount: 3
    },
    extraTime: {
        name: "Tiempo Extra",
        icon: "⏱️",
        description: "Añade 10 segundos al temporizador",
        initialCount: 2
    },
    extraHint: {
        name: "Pista Extra",
        icon: "💡",
        description: "Muestra un emoji adicional como pista",
        initialCount: 3
    }
}; 