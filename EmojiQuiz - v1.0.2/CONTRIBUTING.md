# Guia para Contribuir a EmojiQuiz

Gracias por tu interes en contribuir a EmojiQuiz! Esta guia te ayudara a entender como anadir contenido o realizar mejoras al juego.

## Anadir Nuevas Preguntas

### Estructura de una pregunta

Cada pregunta tiene este formato:

```javascript
{
    emojis: ["🎬", "🦁", "👑"],     // 2-5 emojis que representen la respuesta
    answer: "El Rey Leon",           // Respuesta correcta
    options: ["El Rey Leon", "Tarzan", "Madagascar", "Jumanji"]  // 4 opciones
}
```

### Reglas para crear buenas preguntas

1. **Los emojis deben tener sentido** para la respuesta (no usar emojis aleatorios)
2. **La respuesta correcta** debe estar en el array de opciones
3. **Las 4 opciones** deben ser plausibles (del mismo tema)
4. **No duplicar** respuestas que ya existan en la misma categoria
5. **Para Paises**: usar SOLO paises, nunca ciudades o regiones
6. **Para Literatura**: usar SOLO obras publicadas, no conceptos
7. **Banderas**: verificar que correspondan al pais correcto
8. **No usar emojis que no rendericen** en todos los navegadores

### Categorias disponibles (10)

| Archivo | Categoria | Desbloqueo |
|---------|-----------|------------|
| `questions/movies.js` | Peliculas | Inicio |
| `questions/countries.js` | Paises | Inicio |
| `questions/history.js` | Historia | Inicio |
| `questions/science.js` | Ciencia | Inicio |
| `questions/food.js` | Comida | Inicio |
| `questions/sports.js` | Deportes | Inicio |
| `questions/literature.js` | Literatura | Nivel 2 |
| `questions/technology.js` | Tecnologia | Nivel 2 |
| `questions/music.js` | Musica | Nivel 3 |
| `questions/animals.js` | Animales | Nivel 3 |

### Dificultades

- **easy**: Conceptos muy conocidos, emojis obvios
- **medium**: Requiere algo de conocimiento, emojis menos directos
- **hard**: Conocimiento especializado, emojis abstractos

### Ejemplo: anadir pregunta a peliculas

Edita `data/questions/movies.js` y anade al array de la dificultad correspondiente:

```javascript
// En el array "medium"
{ emojis: ["🧙‍♂️", "💍", "🌋", "🧝"], answer: "El Senor de los Anillos", options: ["Harry Potter", "El Hobbit", "El Senor de los Anillos", "Las Cronicas de Narnia"] }
```

### Validar tus cambios

Despues de anadir preguntas, ejecuta:

```bash
cd "EmojiQuiz - v1.0.2"
node scripts/validateData.js      # Verifica estructura
node scripts/checkDuplicates.js   # Busca duplicados
```

## Anadir Nueva Categoria

1. Crea el archivo de preguntas en `data/questions/tu_categoria.js`
2. Registrala en `data/questions/index.js` (import + export)
3. Anadela en `data/categories.js`
4. Anade condicion de logro en `js/game.js` (`achievementConditions`)
5. Anade el logro en `data/achievements.js`
6. Verifica que las traducciones existan en `js/i18n/translations.js`

## Proceso de Contribucion

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-pregunta`
3. Haz tus cambios
4. Ejecuta la validacion
5. Commit: `git commit -m 'Agregar preguntas de X'`
6. Push: `git push origin feature/nueva-pregunta`
7. Abre un Pull Request
