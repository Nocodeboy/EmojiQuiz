/**
 * EmojiQuiz - main.js
 * Archivo principal que inicializa el juego y maneja los eventos
 */

// Instancias globales
let game;
let ui;
let audio;

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancias
    audio = new AudioManager();
    game = new Game();
    ui = new UI();
    
    // Cargar configuración guardada
    game.loadSettings();
    
    // Inicializar pantalla de categorías
    ui.initCategoriesScreen();
    
    // Inicializar pantalla de logros
    ui.initAchievementsScreen();
    
    // Precargar sonidos
    audio.preloadSounds();
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar pantalla de inicio
    ui.showScreen('start-screen');
});

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // === Eventos de la pantalla de inicio ===
    // Botón Jugar
    document.getElementById('start-game-btn').addEventListener('click', () => {
        audio.play('click');
        game.startGame();
    });
    
    // Botón Cómo Jugar
    document.getElementById('how-to-play-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('how-to-play-screen');
    });
    
    // Botón Categorías
    document.getElementById('categories-btn').addEventListener('click', () => {
        audio.play('click');
        ui.initCategoriesScreen(); // Actualiza datos por si ha habido cambios
        ui.showScreen('categories-screen');
    });
    
    // Botón Logros
    document.getElementById('achievements-btn').addEventListener('click', () => {
        audio.play('click');
        ui.initAchievementsScreen(); // Actualiza datos por si hay logros nuevos
        ui.showScreen('achievements-screen');
    });
    
    // Botón Ajustes
    document.getElementById('settings-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('settings-screen');
    });
    
    // === Eventos de la pantalla de juego ===
    // Botón Siguiente
    document.getElementById('next-btn').addEventListener('click', () => {
        audio.play('click');
        game.loadQuestion();
    });
    
    // Botón Pausa
    document.getElementById('pause-btn').addEventListener('click', () => {
        audio.play('click');
        game.pauseGame();
    });
    
    // === Power-ups ===
    document.getElementById('fiftyFifty-powerup').addEventListener('click', () => {
        if (game.usePowerUp('fiftyFifty')) {
            audio.play('powerUp');
        }
    });
    
    document.getElementById('extraTime-powerup').addEventListener('click', () => {
        if (game.usePowerUp('extraTime')) {
            audio.play('powerUp');
        }
    });
    
    document.getElementById('extraHint-powerup').addEventListener('click', () => {
        if (game.usePowerUp('extraHint')) {
            audio.play('powerUp');
        }
    });
    
    // === Eventos de la pantalla de fin del juego ===
    // Botón Jugar de Nuevo
    document.getElementById('restart-btn').addEventListener('click', () => {
        audio.play('click');
        game.startGame();
    });
    
    // Botón Menú Principal
    document.getElementById('main-menu-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('start-screen');
    });
    
    // Botones de compartir en redes sociales
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            audio.play('click');
            const platform = e.currentTarget.classList.contains('twitter') ? 'twitter' :
                            e.currentTarget.classList.contains('facebook') ? 'facebook' :
                            'whatsapp';
            game.shareScore(platform);
        });
    });
    
    // === Eventos de la pantalla de instrucciones ===
    // Botón Volver
    document.getElementById('back-from-howto-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de categorías ===
    // Botón Volver
    document.getElementById('back-from-categories-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de logros ===
    // Botón Volver
    document.getElementById('back-from-achievements-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('start-screen');
    });
    
    // === Eventos de la pantalla de ajustes ===
    // Interruptor de sonido
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        audio.toggleSoundEffects(e.target.checked);
        game.updateSettings('sound', e.target.checked);
        
        // Reproducir un sonido para demostrar el cambio
        if (e.target.checked) {
            audio.play('click');
        }
    });
    
    // Control de volumen de efectos
    document.getElementById('sound-volume').addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.setEffectsVolume(volume);
        game.updateSettings('soundVolume', volume);
        
        // Reproducir un sonido para demostrar el cambio
        if (audio.isSoundEnabled) {
            audio.play('click');
        }
    });
    
    // Interruptor de música
    document.getElementById('music-toggle').addEventListener('change', (e) => {
        audio.toggleMusic(e.target.checked);
        game.updateSettings('music', e.target.checked);
    });
    
    // Control de volumen de música
    document.getElementById('music-volume').addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.setMusicVolume(volume);
        game.updateSettings('musicVolume', volume);
    });
    
    // Interruptor de efecto CRT
    document.getElementById('crt-effect-toggle').addEventListener('change', (e) => {
        game.updateSettings('crtEffect', e.target.checked);
    });
    
    // Selector de dificultad
    document.getElementById('difficulty-selector').addEventListener('change', (e) => {
        game.updateSettings('difficulty', e.target.value);
    });
    
    // Botón Guardar y Volver
    document.getElementById('back-from-settings-btn').addEventListener('click', () => {
        audio.play('click');
        ui.showScreen('start-screen');
    });
    
    // === Eventos del modal de pausa ===
    // Botón Continuar
    document.getElementById('continue-btn').addEventListener('click', () => {
        audio.play('click');
        game.resumeGame();
    });
    
    // Botón Reiniciar
    document.getElementById('restart-from-pause-btn').addEventListener('click', () => {
        audio.play('click');
        game.resumeGame();
        game.startGame();
    });
    
    // Botón Salir al Menú
    document.getElementById('exit-to-menu-btn').addEventListener('click', () => {
        audio.play('click');
        game.resumeGame();
        ui.showScreen('start-screen');
    });
    
    // === Eventos de teclado ===
    document.addEventListener('keydown', (e) => {
        // Si el juego está activo
        if (!document.getElementById('game-screen').classList.contains('hidden')) {
            // Tecla escape para pausar/reanudar
            if (e.key === 'Escape') {
                if (game.isPaused) {
                    game.resumeGame();
                } else {
                    game.pauseGame();
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
