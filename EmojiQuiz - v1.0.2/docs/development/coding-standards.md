# Estándares de Código para EmojiQuiz

Este documento establece las convenciones y estándares de código para el proyecto EmojiQuiz.

## Estructura General

### Módulos
- Cada funcionalidad debe estar en su propio módulo
- Usar export/import para las dependencias entre módulos
- Evitar efectos secundarios en la inicialización de módulos

### Nombres de archivos
- Usar camelCase para archivos JavaScript: `gameLogic.js`
- Usar kebab-case para archivos CSS: `game-screen.css`
- Los nombres deben ser descriptivos de su contenido

## JavaScript

### Estilo de Código
- Usar ECMAScript más reciente (ES6+)
- Utilizar `const` y `let`, evitar `var`
- Preferir arrow functions cuando sea apropiado
- Utilizar template literals para concatenación
- Usar destructuring cuando mejore la legibilidad

```javascript
// Correcto
const { score, level } = gameState;
const displayText = `Nivel ${level}: ${score} puntos`;

// Evitar
const score = gameState.score;
const level = gameState.level;
const displayText = "Nivel " + level + ": " + score + " puntos";
```

### Patrones y Prácticas
- Seguir el patrón módulo para organizar el código
- Evitar variables globales
- Usar promesas o async/await para código asíncrono
- Implementar manejo de errores en operaciones asíncronas
- Aplicar programación funcional cuando sea conveniente

```javascript
// Correcto
const filteredQuestions = questions
  .filter(q => q.category === selectedCategory)
  .map(q => ({ id: q.id, text: q.text }))
  .slice(0, 10);

// Evitar
const filteredQuestions = [];
for (let i = 0; i < questions.length; i++) {
  if (questions[i].category === selectedCategory) {
    filteredQuestions.push({
      id: questions[i].id,
      text: questions[i].text
    });
    if (filteredQuestions.length >= 10) break;
  }
}
```

## CSS

### Organización
- Utilizar CSS modular cuando sea posible
- Agrupar reglas relacionadas
- Comentar secciones principales
- Orden de propiedades: posicionamiento > dimensiones > márgenes/padding > tipografía > visuales

### Nomenclatura
- Usar BEM (Block, Element, Modifier) para clases CSS
- Nombres descriptivos en inglés
- Evitar selectores excesivamente específicos

```css
/* Correcto */
.game-screen__question {
  margin-bottom: 20px;
}

.game-screen__question--highlighted {
  background-color: var(--highlight-color);
}

/* Evitar */
#game-container div.question.highlight {
  margin-bottom: 20px;
  background-color: yellow;
}
```

## HTML

### Estructura
- Usar HTML5 semántico (header, nav, main, etc.)
- Mantener la estructura jerárquica clara
- Cada pantalla/componente principal en su propio contenedor

### Accesibilidad
- Incluir atributos ARIA cuando sean necesarios
- Asegurar contraste adecuado de colores
- Proporcionar textos alternativos para imágenes
- Asegurar navegabilidad por teclado

## Convenciones de Comentarios

### Documentación de funciones
```javascript
/**
 * Obtiene preguntas aleatorias de una categoría específica.
 * @param {string} categoryId - ID de la categoría
 * @param {string} difficulty - Nivel de dificultad (easy, medium, hard)
 * @param {number} count - Número de preguntas a obtener
 * @return {Array} Lista de preguntas seleccionadas
 */
function getRandomQuestions(categoryId, difficulty, count) {
  // Implementación...
}
```

### Comentarios en el código
- Usar comentarios para explicar "por qué", no "qué"
- Evitar comentarios obvios
- Mantener comentarios actualizados con el código

## Control de Versiones

### Mensajes de commit
- Utilizar formato conciso y descriptivo
- Comenzar con un verbo en presente 
- Incluir referencia a tickets/issues cuando aplique

Ejemplos:
- "Add new power-up feature"
- "Fix timer display bug in game screen"
- "Refactor question loading system for better performance"

### Ramas
- `main` - código estable
- `develop` - desarrollo activo
- `feature/nombre-caracteristica` - nuevas características
- `fix/descripcion-problema` - correcciones 