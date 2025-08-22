# Guía para Contribuir a EmojiQuiz

¡Gracias por tu interés en contribuir a EmojiQuiz! Esta guía te ayudará a entender cómo añadir contenido o realizar mejoras al juego.

## Añadir Nuevas Preguntas

### Método 1: Edición Manual

1. Navega a la carpeta `data/questions/`
2. Abre el archivo de la categoría donde quieres añadir preguntas (ej. `movies.js`)
3. Añade tu nueva pregunta al array correspondiente según la dificultad

Estructura de una pregunta:
```javascript
{
    emojis: ["🦁", "👑"],        // Array de emojis que representan la respuesta
    answer: "El Rey León",       // Respuesta correcta
    options: [                   // 4 opciones (incluyendo la respuesta correcta)
        "El Rey León", 
        "Tarzán", 
        "Madagascar", 
        "Jumanji"
    ]
}
```

### Método 2: Usando la Utilidad

También puedes usar nuestro script para añadir preguntas:

```javascript
import { addQuestion } from './data/utils/questionManager.js';

// Añadir una nueva pregunta
addQuestion({
    category: 'movies',
    difficulty: 'medium',
    emojis: ['👽', '📞', '🏠', '🚲'],
    answer: 'E.T.',
    options: ['E.T.', 'La Llegada', 'Distrito 9', 'Depredador']
});
```

## Añadir una Nueva Categoría

1. Crea un nuevo archivo en `data/questions/` (ej. `sports.js`) con esta estructura:

```javascript
/**
 * EmojiQuiz - questions/sports.js
 * Preguntas de la categoría "Deportes"
 */

export const sportsQuestions = {
    easy: [
        // Preguntas fáciles
    ],
    medium: [
        // Preguntas medias
    ],
    hard: [
        // Preguntas difíciles
    ]
};
```

2. Añade la nueva categoría al archivo `data/categories.js`:

```javascript
export const categories = [
    // ... categorías existentes ...
    {
        id: "sports",
        name: "Deportes",
        icon: "⚽",
        description: "Deportes y eventos deportivos en emojis",
        unlocked: false,
        unlockLevel: 3,
        color: "#e67e22"
    }
];
```

3. Importa y agrega la nueva categoría en `data/questions/index.js`:

```javascript
import { sportsQuestions } from './sports.js';

export const questions = {
    // ... categorías existentes ...
    sports: sportsQuestions
}; 