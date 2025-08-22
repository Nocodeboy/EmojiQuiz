# 🎮 EmojiQuiz - Juego Educativo Retro

Un juego educativo interactivo donde debes adivinar conceptos, películas, países y más usando únicamente emojis. Con estética retro y efectos visuales cyberpunk.

![EmojiQuiz](https://img.shields.io/badge/Version-1.0.2-blue) ![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Características

### 🎯 **Gameplay**
- **Múltiples categorías**: Películas, países, historia, ciencia, literatura, tecnología
- **Sistema de puntuación avanzado**: Bonificaciones por tiempo y rachas consecutivas
- **Power-ups estratégicos**: 50:50, tiempo extra, pista adicional
- **Sistema de logros**: Desbloquea achievements según tu progreso
- **Progresión de niveles**: Desbloquea nuevas categorías al avanzar

### 🎨 **Estética Retro/Cyberpunk**
- **3 fondos animados**:
  - 🌐 **Grid Neón**: Cuadrícula tipo Tron con perspectiva 3D
  - 😊 **Emojis Pixel**: Emojis flotantes en estilo pixel art
  - ✨ **Nebulosa Pixel**: Campo de estrellas pixeladas con efectos nebulosa
- **Efectos CRT opcionales**
- **Tipografía pixel** con fuente Press Start 2P
- **Paleta de colores cyberpunk**

### 🌐 **Multiidioma**
- **Español** e **Inglés** completamente soportados
- Traducciones dinámicas de interfaz y contenido
- Cambio de idioma en tiempo real

### 🎵 **Audio**
- Efectos de sonido inmersivos
- Música de fondo ambiental
- Controles de volumen independientes
- Audio responsive a las acciones del juego

## 🚀 Demo en Vivo

**[🎮 Jugar EmojiQuiz](https://emojiquiz.vercel.app)**

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Módulos**: ES6 Modules para arquitectura modular
- **Animaciones**: CSS animations y keyframes
- **Audio**: Web Audio API
- **Storage**: LocalStorage para persistencia
- **Fonts**: Google Fonts (Press Start 2P)
- **Icons**: Font Awesome

## 📦 Instalación Local

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Nocodeboy/EmojiQuiz.git
   cd EmojiQuiz
   ```

2. **Sirve los archivos** (necesario por ES6 modules):
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con cualquier servidor local
   ```

3. **Abre en navegador**:
   ```
   http://localhost:8000
   ```

## 🎮 Cómo Jugar

1. **🚀 Inicia el juego** haciendo clic en "JUGAR"
2. **👀 Observa los emojis** que aparecen en pantalla
3. **🤔 Deduce** qué representan los emojis juntos
4. **✅ Selecciona** la respuesta correcta entre las opciones
5. **⏰ Responde rápido** para obtener bonus de tiempo
6. **🔥 Mantén rachas** para multiplicar tus puntos
7. **🆙 Sube de nivel** para desbloquear nuevas categorías

### 💪 Power-ups Disponibles

- **50:50** - Elimina dos respuestas incorrectas
- **⏰ Tiempo Extra** - Añade 10 segundos al temporizador
- **💡 Pista Extra** - Muestra un emoji adicional como ayuda

## 🏗️ Arquitectura del Proyecto

```
EmojiQuiz/
├── 📄 index.html              # Página principal
├── 🎨 css/
│   ├── styles.css             # Estilos principales
│   └── backgrounds.css        # Fondos animados
├── ⚡ js/
│   ├── main.js               # Punto de entrada
│   ├── game.js               # Lógica del juego
│   ├── ui.js                 # Interfaz de usuario
│   ├── audio.js              # Sistema de audio
│   ├── backgrounds.js        # Gestor de fondos
│   └── i18n/
│       └── translations.js   # Sistema de traducciones
├── 📊 data/
│   ├── index.js              # Agregador de datos
│   ├── categories.js         # Configuración de categorías
│   ├── achievements.js       # Sistema de logros
│   ├── powerups.js          # Configuración de power-ups
│   ├── settings.js          # Configuración del juego
│   └── questions/           # Preguntas por categoría
└── 🎵 assets/
    ├── sounds/              # Efectos de sonido
    └── images/              # Recursos gráficos
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Algunas ideas:

- 📝 **Agregar más preguntas** a las categorías existentes
- 🆕 **Crear nuevas categorías** (deportes, música, arte, etc.)
- 🌍 **Añadir más idiomas** (francés, portugués, etc.)
- 🎨 **Diseñar nuevos fondos animados**
- 🎵 **Contribuir efectos de sonido**
- 🏆 **Proponer nuevos logros**

### Proceso de Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-categoria`)
3. Commit tus cambios (`git commit -m 'Agregar categoría de deportes'`)
4. Push a la rama (`git push origin feature/nueva-categoria`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Emojis**: Basado en Unicode Emoji Standard
- **Sonidos**: Efectos de sonido retro/arcade
- **Fuentes**: Press Start 2P de Google Fonts
- **Inspiración**: Clásicos juegos de trivia y estética cyberpunk

## 📞 Contacto

- **GitHub**: [@Nocodeboy](https://github.com/Nocodeboy)
- **Issues**: [Reportar problemas](https://github.com/Nocodeboy/EmojiQuiz/issues)

---

### 🎯 ¡Desarrollado con 💖 para la comunidad!

**⭐ Si te gusta el proyecto, no olvides darle una estrella en GitHub ⭐**