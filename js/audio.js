/**
 * EmojiQuiz - audio.js
 * Este archivo maneja todos los efectos de sonido y música del juego
 */

class AudioManager {
    constructor() {
        // Mapeo de sonidos
        this.sounds = {
            click: document.getElementById('click-sound'),
            correct: document.getElementById('correct-sound'),
            wrong: document.getElementById('wrong-sound'),
            gameOver: document.getElementById('game-over-sound'),
            levelUp: document.getElementById('level-up-sound'),
            countdown: document.getElementById('countdown-sound'),
            powerUp: document.getElementById('powerup-sound'),
            achievement: document.getElementById('achievement-sound'),
            timerWarning: document.getElementById('timer-warning-sound') || null,
            backgroundMusic: document.getElementById('background-music')
        };
        
        // Volúmenes predeterminados
        this.volumes = {
            effects: 0.7,  // Volumen de efectos de sonido
            music: 0.4     // Volumen de música de fondo
        };
        
        // Estado
        this.isMusicEnabled = true;
        this.isSoundEnabled = true;
        
        // Inicializar volúmenes
        this.updateVolumes();
    }
    
    /**
     * Actualiza los volúmenes de todos los sonidos
     */
    updateVolumes() {
        // Configurar volumen de efectos
        for (const [key, sound] of Object.entries(this.sounds)) {
            if (key !== 'backgroundMusic' && sound) {
                sound.volume = this.volumes.effects;
            }
        }
        
        // Configurar volumen de música
        if (this.sounds.backgroundMusic) {
            this.sounds.backgroundMusic.volume = this.volumes.music;
        }
    }
    
    /**
     * Reproduce un sonido específico
     * @param {string} soundId - ID del sonido a reproducir
     */
    play(soundId) {
        // No reproducir si los sonidos están desactivados
        if (!this.isSoundEnabled && soundId !== 'backgroundMusic') return;
        if (!this.isMusicEnabled && soundId === 'backgroundMusic') return;
        
        const sound = this.sounds[soundId];
        if (sound) {
            // Reiniciar el sonido si ya está reproduciéndose
            sound.currentTime = 0;
            
            // Intentar reproducir el sonido
            const playPromise = sound.play();
            
            // Manejar errores de reproducción (común en navegadores móviles)
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Error al reproducir sonido:', error);
                });
            }
        }
    }
    
    /**
     * Detiene un sonido específico
     * @param {string} soundId - ID del sonido a detener
     */
    stop(soundId) {
        const sound = this.sounds[soundId];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
    
    /**
     * Inicia/detiene la música de fondo
     * @param {boolean} play - true para iniciar, false para detener
     */
    toggleBackgroundMusic(play) {
        if (!this.isMusicEnabled) return;
        
        if (play) {
            this.sounds.backgroundMusic.loop = true;
            this.play('backgroundMusic');
        } else {
            this.stop('backgroundMusic');
        }
    }
    
    /**
     * Activa/desactiva todos los efectos de sonido
     * @param {boolean} enabled - true para activar, false para desactivar
     */
    toggleSoundEffects(enabled) {
        this.isSoundEnabled = enabled;
    }
    
    /**
     * Activa/desactiva la música de fondo
     * @param {boolean} enabled - true para activar, false para desactivar
     */
    toggleMusic(enabled) {
        this.isMusicEnabled = enabled;
        
        if (enabled) {
            this.sounds.backgroundMusic.play().catch(() => {});
        } else {
            this.sounds.backgroundMusic.pause();
        }
    }
    
    /**
     * Ajusta el volumen de los efectos de sonido
     * @param {number} volume - Volumen entre 0 y 1
     */
    setEffectsVolume(volume) {
        this.volumes.effects = volume;
        this.updateVolumes();
    }
    
    /**
     * Ajusta el volumen de la música
     * @param {number} volume - Volumen entre 0 y 1
     */
    setMusicVolume(volume) {
        this.volumes.music = volume;
        this.updateVolumes();
    }
    
    /**
     * Precarga todos los sonidos
     */
    preloadSounds() {
        // Precarga todos los sonidos
        for (const sound of Object.values(this.sounds)) {
            if (sound) {
                sound.load();
            }
        }
    }
}

// Exportar la clase AudioManager
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
