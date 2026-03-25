# 🎮 EmojiQuiz - El Juego de Emojis Más Adictivo

**¿Puedes adivinar películas, países, artistas y más solo con emojis?** EmojiQuiz es un juego educativo con estética retro cyberpunk que pondrá a prueba tu ingenio. 450+ preguntas en 10 categorías, logros, power-ups y clasificación online.

![EmojiQuiz](https://img.shields.io/badge/Version-1.0.2-blue) ![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-yellow) ![Questions](https://img.shields.io/badge/Preguntas-450+-purple)

## 🚀 Jugar Ahora

**[🎮 emojiquiz.vercel.app](https://emojiquiz.vercel.app)**

## 🌟 Características

### 🎯 Gameplay
- **10 categorías**: Películas, Países, Historia, Ciencia, Literatura, Tecnología, Comida, Música, Deportes, Animales
- **450+ preguntas** con 3 niveles de dificultad (fácil, medio, difícil)
- **Sistema de puntuación avanzado**: Bonificaciones por tiempo, rachas y nivel
- **4 power-ups estratégicos**: 50:50, Tiempo Extra, Pista Adicional
- **20 logros** desbloqueables según tu progreso
- **Progresión de niveles**: Desbloquea categorías al avanzar
- **Clasificación online** con ranking de jugadores

### 🎨 Estética Retro/Cyberpunk
- **3 fondos animados**: Grid Neón (tipo Tron), Emojis Pixel flotantes, Nebulosa de estrellas
- **Efectos CRT opcionales** (líneas de escaneo retro)
- **Tipografía pixel** con fuente Press Start 2P
- **Paleta de colores cyberpunk** (morado, rojo, cian)

### 🌐 Multiidioma
- Español e Inglés completamente soportados
- Cambio de idioma en tiempo real

### 🎵 Audio Inmersivo
- 8 efectos de sonido + música de fondo ambiental
- Controles de volumen independientes para efectos y música

## 📊 Categorías

| Categoría | Icono | Preguntas | Desbloqueo |
|-----------|-------|-----------|------------|
| Películas | 🎬 | 45 | Desde el inicio |
| Países | 🌍 | 45 | Desde el inicio |
| Historia | 📜 | 45 | Desde el inicio |
| Ciencia | 🔬 | 45 | Desde el inicio |
| Comida | 🍕 | 45 | Desde el inicio |
| Deportes | ⚽ | 45 | Desde el inicio |
| Literatura | 📚 | 45 | Nivel 2 |
| Tecnología | 💻 | 45 | Nivel 2 |
| Música | 🎵 | 45 | Nivel 3 |
| Animales | 🐾 | 45 | Nivel 3 |

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Módulos**: ES6 Modules
- **Animaciones**: CSS animations + keyframes
- **Audio**: Web Audio API
- **Persistencia**: LocalStorage
- **Ranking**: Vercel KV (Redis)
- **Deploy**: Vercel
- **Fuentes**: Google Fonts (Press Start 2P)
- **Iconos**: Font Awesome 6

## 📦 Instalación Local

```bash
# Clonar
git clone https://github.com/Nocodeboy/EmojiQuiz.git
cd EmojiQuiz

# Servir (necesario por ES6 modules)
npx serve "EmojiQuiz - v1.0.2"

# Abrir en navegador
open http://localhost:3000
```

## 🎮 Cómo Jugar

1. **Pulsa JUGAR** para empezar
2. **Observa los emojis** que aparecen en pantalla
3. **Deduce** qué representan juntos
4. **Selecciona** la respuesta correcta entre 4 opciones
5. **Responde rápido** para obtener bonus de tiempo
6. **Mantén rachas** para multiplicar tus puntos
7. **Sube de nivel** para desbloquear nuevas categorías

### 💪 Power-ups

| Power-up | Descripción | Cantidad |
|----------|-------------|----------|
| ✂️ 50:50 | Elimina 2 respuestas incorrectas | 3 |
| ⏱️ Tiempo Extra | Añade 10 segundos | 2 |
| 💡 Pista Extra | Muestra un emoji adicional | 3 |

## 🏗️ Arquitectura

```
EmojiQuiz - v1.0.2/
├── index.html                # Página principal
├── css/
│   ├── styles.css            # Estilos principales + responsive
│   └── backgrounds.css       # Fondos animados (neon, emojis, nebula)
├── js/
│   ├── main.js               # Punto de entrada + event listeners
│   ├── game.js               # Lógica del juego + logros + estado
│   ├── ui.js                 # Interfaz + transiciones + feedback
│   ├── audio.js              # Sistema de audio
│   ├── backgrounds.js        # Gestor de fondos animados
│   ├── leaderboard.js        # Sistema de ranking online
│   └── i18n/translations.js  # Traducciones ES/EN
├── data/
│   ├── index.js              # Agregador de datos + utilidades
│   ├── categories.js         # 10 categorías configuradas
│   ├── achievements.js       # 20 logros desbloqueables
│   ├── powerups.js           # Configuración de power-ups
│   ├── settings.js           # Dificultad, puntuación, vidas
│   └── questions/            # 450+ preguntas organizadas por categoría
│       ├── movies.js
│       ├── countries.js
│       ├── history.js
│       ├── science.js
│       ├── literature.js
│       ├── technology.js
│       ├── food.js
│       ├── music.js
│       ├── sports.js
│       └── animals.js
├── api/leaderboard/           # API serverless para ranking (Vercel KV)
├── assets/sounds/             # 9 efectos de sonido + música de fondo
└── scripts/                   # Validación y utilidades de datos
```

## 🧪 Validación de Datos

```bash
cd "EmojiQuiz - v1.0.2"

# Validar integridad de todas las preguntas
node scripts/validateData.js

# Buscar duplicados
node scripts/checkDuplicates.js

# Contar preguntas por categoría
node scripts/countQuestions.js
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Ver [CONTRIBUTING.md](EmojiQuiz%20-%20v1.0.2/CONTRIBUTING.md) para detalles.

Ideas:
- 📝 Agregar más preguntas a las categorías existentes
- 🌍 Añadir más idiomas (francés, portugués, etc.)
- 🎨 Diseñar nuevos fondos animados
- 🏆 Proponer nuevos logros

## 📝 Licencia

MIT - Ver archivo `LICENSE` para más detalles.

## 📞 Contacto

- **GitHub**: [@Nocodeboy](https://github.com/Nocodeboy)
- **Issues**: [Reportar problemas](https://github.com/Nocodeboy/EmojiQuiz/issues)

---

**⭐ Si te gusta el proyecto, dale una estrella en GitHub ⭐**
