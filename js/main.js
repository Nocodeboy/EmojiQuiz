/**
 * EmojiQuiz - main.js
 * Archivo principal que inicializa el juego y maneja los eventos
 */

// Instancias globales
let game;
let ui;
let audio;

// Hacer las instancias accesibles globalmente
window.game = null;
window.ui = null;
window.audio = null;

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Wait for gameData to be available
    function waitForGameData() {
        if (window.gameData) {
            initializeGame();
        } else {
            setTimeout(waitForGameData, 50);
        }
    }
    
    function initializeGame() {
        // Crear instancias
        audio = new AudioManager();
        game = new Game();
        ui = new UI();
    
    // Hacer las instancias accesibles globalmente
    window.audio = audio;
    window.game = game;
    window.ui = ui;
    
    // Cargar configuración guardada
    if (window.game) window.game.loadSettings();
    
    // Inicializar pantalla de categorías
    if (window.ui) window.ui.initCategoriesScreen();
    
    // Inicializar pantalla de logros
    if (window.ui) window.ui.initAchievementsScreen();
    
    // Precargar sonidos
    if (window.audio) window.audio.preloadSounds();
    
        // Configurar eventos
        setupEventListeners();
        
        // Mostrar pantalla de inicio
        window.ui.showScreen('start-screen');
    }
    
    waitForGameData();
});

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // === Eventos de la pantalla de inicio ===
    // Botón Jugar
    document.getElementById('start-game-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.startGame();
    });
    
    // Botón Cómo Jugar
    document.getElementById('how-to-play-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('how-to-play-screen');
    });
    
    // Botón Categorías
    document.getElementById('categories-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.initCategoriesScreen(); // Actualiza datos por si ha habido cambios
        if (window.ui) window.ui.showScreen('categories-screen');
    });
    
    // Botón Logros
    document.getElementById('achievements-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.initAchievementsScreen(); // Actualiza datos por si hay logros nuevos
        if (window.ui) window.ui.showScreen('achievements-screen');
    });
    
    // Botón Ajustes
    document.getElementById('settings-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('settings-screen');
    });
    
    // === Eventos de la pantalla de juego ===
    // Botón Siguiente
    document.getElementById('next-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.loadQuestion();
    });
    
    // Botón Pausa
    document.getElementById('pause-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.pauseGame();
    });
    
    // === Power-ups ===
    document.getElementById('fiftyFifty-powerup').addEventListener('click', () => {
        if (window.game && window.game.usePowerUp('fiftyFifty')) {
            if (window.audio) window.audio.play('powerUp');
        }
    });
    
    document.getElementById('extraTime-powerup').addEventListener('click', () => {
        if (window.game && window.game.usePowerUp('extraTime')) {
            if (window.audio) window.audio.play('powerUp');
        }
    });
    
    document.getElementById('extraHint-powerup').addEventListener('click', () => {
        if (window.game && window.game.usePowerUp('extraHint')) {
            if (window.audio) window.audio.play('powerUp');
        }
    });
    
    // === Eventos de la pantalla de fin del juego ===
    // Botón Jugar de Nuevo
    document.getElementById('restart-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.startGame();
    });
    
    // Botón Menú Principal
    document.getElementById('main-menu-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // Botones de compartir en redes sociales
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (window.audio) window.audio.play('click');
            const platform = e.currentTarget.classList.contains('twitter') ? 'twitter' :
                            e.currentTarget.classList.contains('facebook') ? 'facebook' :
                            'whatsapp';
            if (window.game) window.game.shareScore(platform);
        });
    });
    
    // === Eventos de la pantalla de instrucciones ===
    // Botón Volver
    document.getElementById('back-from-howto-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de categorías ===
    // Botón Volver
    document.getElementById('back-from-categories-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de logros ===
    // Botón Volver
    document.getElementById('back-from-achievements-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de ajustes ===
    // Interruptor de sonido
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        if (window.audio) window.audio.toggleSoundEffects(e.target.checked);
        if (window.game) window.game.updateSettings('sound', e.target.checked);
        
        // Reproducir un sonido para demostrar el cambio
        if (e.target.checked) {
            if (window.audio) window.audio.play('click');
        }
    });
    
    // Control de volumen de efectos
    document.getElementById('sound-volume').addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        if (window.audio) window.audio.setEffectsVolume(volume);
        if (window.game) window.game.updateSettings('soundVolume', volume);
        
        // Reproducir un sonido para demostrar el cambio
        if (window.audio && window.audio.isSoundEnabled) {
            if (window.audio) window.audio.play('click');
        }
    });
    
    // Interruptor de música
    document.getElementById('music-toggle').addEventListener('change', (e) => {
        if (window.audio) window.audio.toggleMusic(e.target.checked);
        if (window.game) window.game.updateSettings('music', e.target.checked);
    });
    
    // Control de volumen de música
    document.getElementById('music-volume').addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        if (window.audio) window.audio.setMusicVolume(volume);
        if (window.game) window.game.updateSettings('musicVolume', volume);
    });
    
    // Interruptor de efecto CRT
    document.getElementById('crt-effect-toggle').addEventListener('change', (e) => {
        if (window.game) window.game.updateSettings('crtEffect', e.target.checked);
    });
    
    // Selector de dificultad
    document.getElementById('difficulty-selector').addEventListener('change', (e) => {
        if (window.game) window.game.updateSettings('difficulty', e.target.value);
    });
    
    // Selector de fondo animado
    document.getElementById('background-selector-settings').addEventListener('change', (e) => {
        if (window.backgroundManager) {
            window.backgroundManager.changeBackground(e.target.value);
        }
    });
    
    // Botón Guardar y Volver
    document.getElementById('back-from-settings-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // === Eventos del modal de pausa ===
    // Botón Continuar
    document.getElementById('continue-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.resumeGame();
    });
    
    // Botón Reiniciar
    document.getElementById('restart-from-pause-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.resumeGame();
        if (window.game) window.game.startGame();
    });
    
    // Botón Salir al Menú
    document.getElementById('exit-to-menu-btn').addEventListener('click', () => {
        if (window.audio) window.audio.play('click');
        if (window.game) window.game.resumeGame();
        if (window.ui) window.ui.showScreen('start-screen');
    });
    
    // === Eventos de teclado ===
    document.addEventListener('keydown', (e) => {
        // Si el juego está activo
        if (!document.getElementById('game-screen').classList.contains('hidden')) {
            // Tecla escape para pausar/reanudar
            if (e.key === 'Escape') {
                if (window.game && window.game.isPaused) {
                    if (window.game) window.game.resumeGame();
                } else {
                    if (window.game) window.game.pauseGame();
                }
            }
            
            // Números 1-4 para seleccionar opciones
            if (e.key >= '1' && e.key <= '4') {
                const index = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option');
                
                if (index < options.length && !options[index].disabled) {
                    options[index].click();
                }
            }
            
            // Tecla espacio para 'siguiente' si está visible
            if (e.key === ' ' && document.getElementById('next-btn').style.display !== 'none') {
                document.getElementById('next-btn').click();
            }
            
            // Teclas para power-ups
            if (e.key === 'q' || e.key === 'Q') { // 50:50
                document.getElementById('fiftyFifty-powerup').click();
            }
            if (e.key === 'w' || e.key === 'W') { // Tiempo extra
                document.getElementById('extraTime-powerup').click();
            }
            if (e.key === 'e' || e.key === 'E') { // Pista extra
                document.getElementById('extraHint-powerup').click();
            }
        }
    });
}

// Evitar que el modal de pausa se cierre al hacer clic en él
document.getElementById('pause-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('pause-modal')) {
        e.stopPropagation();
    }
});
