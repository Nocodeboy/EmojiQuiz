# Guía de Migración a la Estructura Modular de Datos

Esta guía explica cómo actualizar el código existente para usar la nueva estructura modular de datos.

## Cambios necesarios en archivos JavaScript

### 1. Actualizar importaciones

**Antes:**
```javascript
// Acceso directo al objeto gameData
const categories = window.gameData.categories;
const movies = window.gameData.questions.movies;
```

**Después:**
```javascript
// Importación de módulos ES
import gameData from './data/index.js';

const categories = gameData.categories;
const movies = gameData.questions.movies;

// O usando destructuring
import { categories, questions, powerUps } from './data/index.js';
const { movies } = questions;
```

### 2. Usar las funciones auxiliares

**Antes:**
```javascript
// Código personalizado para obtener preguntas aleatorias
const shuffledQuestions = [...gameData.questions.movies.easy].sort(() => 0.5 - Math.random());
const selectedQuestions = shuffledQuestions.slice(0, 5);
```

**Después:**
```javascript
// Usar las funciones auxiliares proporcionadas
import gameData from './data/index.js';

const selectedQuestions = gameData.utils.getRandomQuestions('movies', 'easy', 5);
```

### 3. Carga dinámica (opcional)

Si deseas implementar carga dinámica para optimizar el rendimiento:

```javascript
import { loadCategory, loadTranslations } from './data/dynamicLoader.js';

// Cargar una categoría específica solo cuando sea necesaria
async function loadGameCategory(categoryId) {
  const categoryQuestions = await loadCategory(categoryId);
  // Usar las preguntas cargadas
}

// Cargar traducciones según la preferencia del usuario
async function setLanguage(language) {
  const translations = await loadTranslations(language);
  // Aplicar traducciones a la interfaz
}
```

## Cambios en archivos HTML

Actualizar las referencias a los scripts:

**Antes:**
```html
<script src="data.js"></script>
```

**Después:**
```html
<script type="module">
  import gameData from './data/index.js';
  window.gameData = gameData; // Opcional: mantener compatibilidad con código existente
</script>
```

## Verificación de la migración

Para verificar que todo funciona correctamente después de la migración:

1. Comprueba que todas las categorías y preguntas se cargan correctamente
2. Verifica que los power-ups funcionan igual que antes
3. Asegúrate de que los logros se siguen desbloqueando adecuadamente
4. Prueba el juego en diferentes dificultades para confirmar que la configuración se aplica correctamente 