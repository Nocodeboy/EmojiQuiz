/**
 * EmojiQuiz - Background Manager
 * Maneja los fondos animados del juego
 */

class BackgroundManager {
    constructor() {
        this.currentBackground = localStorage.getItem('emojiQuizBackground') || 'neon-grid';
        this.backgrounds = {
            'neon-grid': {
                name: 'Grid Neón',
                class: 'bg-neon-grid',
                init: () => this.initNeonGrid()
            },
            'pixel-emojis': {
                name: 'Emojis Pixel',
                class: 'bg-pixel-emojis',
                init: () => this.initPixelEmojis()
            },
            'pixel-nebula': {
                name: 'Nebulosa Pixel',
                class: 'bg-pixel-nebula',
                init: () => this.initPixelNebula()
            },
            'none': {
                name: 'Sin Fondo',
                class: '',
                init: () => {}
            }
        };
        
        this.backgroundElement = null;
        this.init();
    }
    
    init() {
        // Aplicar fondo guardado
        this.setBackground(this.currentBackground);
    }
    
    
    setBackground(backgroundKey) {
        // Remover fondo anterior
        this.clearBackground();
        
        const background = this.backgrounds[backgroundKey];
        if (!background) return;
        
        this.currentBackground = backgroundKey;
        localStorage.setItem('emojiQuizBackground', backgroundKey);
        
        if (background.class) {
            // Crear elemento de fondo
            this.backgroundElement = document.createElement('div');
            this.backgroundElement.className = `background-container ${background.class}`;
            this.backgroundElement.id = 'game-background';
            
            // Insertar antes del contenido del juego
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                document.body.insertBefore(this.backgroundElement, gameContainer);
            } else {
                document.body.insertBefore(this.backgroundElement, document.body.firstChild);
            }
            
            // Inicializar efectos específicos del fondo
            background.init();
        }
    }
    
    clearBackground() {
        if (this.backgroundElement) {
            this.backgroundElement.remove();
            this.backgroundElement = null;
        }
        
        // Limpiar elementos específicos de fondos anteriores
        document.querySelectorAll('.pixel-emoji, .pixel-star').forEach(el => el.remove());
    }
    
    initNeonGrid() {
        // El grid neón se maneja completamente con CSS
        console.log('Grid Neón activado');
    }
    
    initPixelEmojis() {
        const container = this.backgroundElement;
        const emojis = ['🎬', '❤️', '🌍', '📚', '🤔', '⚡', '🎯', '🔥', '⭐', '🚀', '🎮', '💫'];
        
        // Crear emojis flotantes
        for (let i = 0; i < 12; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'pixel-emoji';
            emoji.textContent = emojis[i % emojis.length];
            
            // Posición y timing aleatorios
            emoji.style.left = `${Math.random() * 100}%`;
            emoji.style.animationDelay = `${Math.random() * -20}s`;
            emoji.style.animationDuration = `${15 + Math.random() * 10}s`;
            emoji.style.opacity = `${0.3 + Math.random() * 0.4}`;
            
            container.appendChild(emoji);
        }
        
        console.log('Emojis Pixel activados');
    }
    
    initPixelNebula() {
        const container = this.backgroundElement;
        const colors = ['', 'color-cyan', 'color-magenta', 'color-yellow'];
        const sizes = ['size-small', '', 'size-large'];
        
        // Crear estrellas pixel
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = `pixel-star ${colors[Math.floor(Math.random() * colors.length)]} ${sizes[Math.floor(Math.random() * sizes.length)]}`;
            
            // Posición aleatoria
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Animación aleatoria
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            
            container.appendChild(star);
        }
        
        console.log('Nebulosa Pixel activada');
    }
    
    // Método para cambiar fondo desde código
    changeBackground(backgroundKey) {
        this.setBackground(backgroundKey);
    }
    
    // Método para obtener el fondo actual
    getCurrentBackground() {
        return this.currentBackground;
    }
    
}

// Función para inicializar el Background Manager
function initBackgroundManager() {
    if (typeof window !== 'undefined' && !window.backgroundManager) {
        window.backgroundManager = new BackgroundManager();
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackgroundManager);
} else {
    initBackgroundManager();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundManager;
}