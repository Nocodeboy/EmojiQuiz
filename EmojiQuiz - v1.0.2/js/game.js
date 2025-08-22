/**
 * EmojiQuiz - game.js
 * Este archivo contiene la lógica principal del juego
 */

class Game {
    constructor() {
        // Estado del juego
        this.score = 0;
        this.lives = 3; // Default value, will be updated when gameData is available
        this.level = 1;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.correctAnswersByCategory = {};
        this.unlockedAchievements = [];
        this.currentQuestion = null;
        this.currentCategoryId = null;
        this.currentDifficulty = null;
        this.timer = null;
        this.remainingTime = 0;
        this.questionCounter = 0;
        this.isPaused = false;
        this.timerWarningPlayed = false;
        this.autoSaveInterval = null;
        this.recentAnswers = [];
        
        // Configuración del juego
        this.difficulty = "medium"; // easy, medium, hard
        this.soundEnabled = true;
        this.soundVolume = 0.7;
        this.musicEnabled = true;
        this.musicVolume = 0.4;
        this.crtEffectEnabled = true;
        
        // Power-ups - Initialize with default values
        this.powerUps = {
            fiftyFifty: 3,
            extraTime: 2,
            extraHint: 3
        };
        
        // Initialize when data is available
        this.initializeData();
        
        // Cargar estado guardado si existe
        this.loadGameState();
    }
    
    /**
     * Initialize game data when gameData becomes available
     */
    initializeData() {
        // Wait for gameData to be available
        if (typeof window !== 'undefined' && window.gameData) {
            this.lives = window.gameData.settings.maxLives;
            this.powerUps = {
                fiftyFifty: window.gameData.powerUps.fiftyFifty.initialCount,
                extraTime: window.gameData.powerUps.extraTime.initialCount,
                extraHint: window.gameData.powerUps.extraHint.initialCount
            };
            
            // Inicializar contadores de respuestas correctas por categoría
            window.gameData.categories.forEach(category => {
                this.correctAnswersByCategory[category.id] = 0;
            });
        } else {
            // Retry after a short delay
            setTimeout(() => this.initializeData(), 100);
        }
    }
    
    /**
     * Inicia el juego
     */
    startGame() {
        this.resetGame();
        this.loadQuestion();
        this.startAutoSave();
        if (window.ui) window.ui.showScreen('game-screen');
        
        // Iniciar música de fondo
        if (window.audio) window.audio.toggleBackgroundMusic(true);
    }
    
    /**
     * Reinicia el estado del juego a los valores iniciales
     */
    resetGame() {
        this.score = 0;
        this.lives = window.gameData ? window.gameData.settings.maxLives : 3;
        this.level = 1;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.questionCounter = 0;
        this.isPaused = false;
        this.timerWarningPlayed = false;
        
        // Reiniciar contadores de respuestas correctas por categoría
        if (window.gameData && window.gameData.categories) {
            window.gameData.categories.forEach(category => {
                this.correctAnswersByCategory[category.id] = 0;
            });
        }
        
        // Reiniciar power-ups
        if (window.gameData && window.gameData.powerUps) {
            this.powerUps = {
                fiftyFifty: window.gameData.powerUps.fiftyFifty.initialCount,
                extraTime: window.gameData.powerUps.extraTime.initialCount,
                extraHint: window.gameData.powerUps.extraHint.initialCount
            };
        }
        
        if (window.ui) {
            window.ui.updateStats();
            window.ui.updatePowerUps();
        }
    }
    
    /**
     * Carga una nueva pregunta aleatoria
     */
    loadQuestion() {
        // Detener el temporizador anterior si existe
        if (this.timer) clearInterval(this.timer);
        
        // Reproducir sonido de nueva pregunta
        if (window.audio) window.audio.play('click');
        
        // Resetear el flag de advertencia del temporizador
        this.timerWarningPlayed = false;
        
        // Seleccionar una categoría aleatoria desbloqueada
        if (!window.gameData || !window.gameData.categories) {
            console.error('gameData not available');
            return;
        }
        const unlockedCategories = window.gameData.categories.filter(cat => cat.unlocked);
        const randomCategory = unlockedCategories[Math.floor(Math.random() * unlockedCategories.length)];
        this.currentCategoryId = randomCategory.id;
        
        // Seleccionar una dificultad basada en el nivel actual
        if (this.level <= 2) {
            this.currentDifficulty = "easy";
        } else if (this.level <= 4) {
            // Mezclar preguntas fáciles y medias
            this.currentDifficulty = Math.random() < 0.7 ? "easy" : "medium";
        } else {
            // Distribuir entre todas las dificultades, con más peso en media
            const rand = Math.random();
            if (rand < 0.3) {
                this.currentDifficulty = "easy";
            } else if (rand < 0.8) {
                this.currentDifficulty = "medium";
            } else {
                this.currentDifficulty = "hard";
            }
        }
        
        // Verificar si hay preguntas disponibles para esa categoría y dificultad
        if (!window.gameData.questions[this.currentCategoryId] || 
            !window.gameData.questions[this.currentCategoryId][this.currentDifficulty] || 
            window.gameData.questions[this.currentCategoryId][this.currentDifficulty].length === 0) {
            
            // Si no hay preguntas, intentar con otra categoría
            return this.loadQuestion();
        }
        
        // Seleccionar una pregunta aleatoria de la categoría y dificultad actual
        const questions = window.gameData.questions[this.currentCategoryId][this.currentDifficulty];
        let selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
        
        // Mantener un registro de las últimas 5 respuestas para evitar repeticiones
        if (!this.recentAnswers) {
            this.recentAnswers = [];
        }
        
        // Intentar evitar preguntas con la misma respuesta que hayan salido recientemente
        let attempts = 0;
        const maxAttempts = 5; // Máximo número de intentos para evitar bucles infinitos
        
        while (this.recentAnswers.includes(selectedQuestion.answer) && attempts < maxAttempts) {
            selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
            attempts++;
        }
        
        // Actualizar el historial de respuestas recientes
        this.recentAnswers.push(selectedQuestion.answer);
        if (this.recentAnswers.length > 5) {
            this.recentAnswers.shift(); // Mantener solo las 5 más recientes
        }
        
        this.currentQuestion = selectedQuestion;
        
        // Actualizar la UI
        if (window.ui) window.ui.updateCategory(randomCategory.name);
        if (window.ui) window.ui.displayEmojis(this.currentQuestion.emojis);
        if (window.ui) window.ui.displayOptions(this.currentQuestion.options);
        
        // Reiniciar el feedback y ocultar el botón de siguiente
        if (window.ui) window.ui.resetFeedback();
        if (window.ui) window.ui.hideNextButton();
        
        // Iniciar el temporizador
        this.startTimer();
        
        // Aumentar el contador de preguntas
        this.questionCounter++;
        
        // Verificar si debemos aumentar de nivel
        if (window.gameData && this.questionCounter > window.gameData.settings.questionsPerLevel) {
            this.levelUp();
        }
    }
    
    /**
     * Inicia el temporizador para la pregunta actual
     */
    startTimer() {
        if (!window.gameData) return;
        const diffSettings = window.gameData.settings.difficulties[this.difficulty];
        this.remainingTime = diffSettings.timePerQuestion;
        
        // Reproducir sonido de cuenta regresiva para empezar
        if (window.audio) window.audio.play('countdown');
        
        // Actualizar la barra de tiempo al 100%
        if (window.ui) window.ui.updateTimerBar(100);
        
        this.timer = setInterval(() => {
            // Si el juego está pausado, no reducir el tiempo
            if (this.isPaused) return;
            
            this.remainingTime--;
            
            // Actualizar la barra de tiempo
            const percentage = (this.remainingTime / diffSettings.timePerQuestion) * 100;
            if (window.ui) window.ui.updateTimerBar(percentage);
            
            // Reproducir sonido de advertencia cuando queda poco tiempo
            if (percentage <= 30 && !this.timerWarningPlayed) {
                if (window.audio) window.audio.play('timerWarning');
                this.timerWarningPlayed = true;
            }
            
            // Si se acaba el tiempo
            if (this.remainingTime <= 0) {
                clearInterval(this.timer);
                this.handleTimeout();
            }
        }, 1000);
    }
    
    /**
     * Maneja cuando se acaba el tiempo para responder
     */
    handleTimeout() {
        // Reproducir sonido de error
        if (window.audio) window.audio.play('wrong');
        
        // Marcar la respuesta correcta y deshabilitar todos los botones
        if (window.ui) window.ui.markCorrectAnswer(this.currentQuestion.answer);
        if (window.ui) window.ui.disableAllOptions();
        
        // Reducir vidas
        this.lives--;
        
        // Reiniciar la racha
        this.streak = 0;
        
        // Aumentar contador de respuestas incorrectas
        this.wrongAnswers++;
        
        // Mostrar mensaje de tiempo agotado usando traducción
        if (window.ui) window.ui.showFeedback(`${(window.getText || function(key) { return key; })('timeUp')} ${this.currentQuestion.answer}`, 'wrong');
        
        // Actualizar estadísticas
        if (window.ui) window.ui.updateStats();
        if (window.ui) window.ui.updateStreak();
        
        // Mostrar el botón de siguiente temporalmente
        if (window.ui) window.ui.showNextButton();
        
        // Comprobar si el juego ha terminado
        if (this.lives <= 0) {
            // Esperar un poco antes de terminar para que el usuario vea el feedback
            setTimeout(() => {
                this.endGame();
            }, 2000);
        } else {
            // Automáticamente continuar a la siguiente pregunta después de 3 segundos
            setTimeout(() => {
                this.loadQuestion();
            }, 3000);
        }
    }
    
    /**
     * Verifica si la respuesta del usuario es correcta
     * @param {string} selectedOption - La opción seleccionada por el usuario
     */
    checkAnswer(selectedOption) {
        // Detener el temporizador
        clearInterval(this.timer);
        
        // Deshabilitar todos los botones de opciones
        if (window.ui) window.ui.disableAllOptions();
        if (window.ui) window.ui.markCorrectAnswer(this.currentQuestion.answer);
        
        // Comprobar si la respuesta es correcta
        const isCorrect = selectedOption === this.currentQuestion.answer;
        
        if (isCorrect) {
            // Reproducir sonido de acierto
            if (window.audio) window.audio.play('correct');
            
            // Respuesta correcta
            // Aumentar la racha
            this.streak++;
            if (this.streak > this.maxStreak) {
                this.maxStreak = this.streak;
            }
            
            // Mantener la racha dentro del límite máximo
            if (window.gameData && this.streak > window.gameData.settings.maxStreak) {
                this.streak = window.gameData.settings.maxStreak;
            }
            
            // Calcular puntos basados en el tiempo restante, el nivel, y la racha
            const diffSettings = window.gameData.settings.difficulties[this.difficulty];
            const timeBonus = Math.floor(this.remainingTime * diffSettings.pointsTimeBonus);
            const streakBonus = this.streak * diffSettings.pointsStreakBonus;
            const levelBonus = this.level * diffSettings.pointsLevelBonus;
            const questionScore = diffSettings.pointsBase + timeBonus + streakBonus + levelBonus;
            
            // Actualizar la puntuación
            this.score += questionScore;
            
            // Aumentar contador de respuestas correctas
            this.correctAnswers++;
            this.correctAnswersByCategory[this.currentCategoryId]++;
            
            // Obtener términos traducidos para el feedback
            const basePointsText = (window.getText || function(key) { return key; })('basePoints');
            const timeBonusText = (window.getText || function(key) { return key; })('timeBonus');
            const streakBonusText = (window.getText || function(key) { return key; })('streakBonus');
            const levelBonusText = (window.getText || function(key) { return key; })('levelBonus');
            const pointsText = (window.getText || function(key) { return key; })('points');
            const correctText = (window.getText || function(key) { return key; })('correct');
            
            // Mostrar el desglose de puntos usando traducciones
            if (window.ui) window.ui.showFeedback(`${correctText}<br>+${diffSettings.pointsBase} (${basePointsText}) +${timeBonus} (${timeBonusText}) +${streakBonus} (${streakBonusText}) +${levelBonus} (${levelBonusText}) = +${questionScore} ${pointsText}`, 'correct');
            
            // Crear efecto de partículas
            if (window.ui) window.ui.createParticles();
            
            // Verificar logros
            this.checkAchievements();
        } else {
            // Reproducir sonido de error
            if (window.audio) window.audio.play('wrong');
            
            // Respuesta incorrecta
            if (window.ui) window.ui.markWrongAnswer(selectedOption);
            
            // Reducir vidas
            this.lives--;
            
            // Reiniciar la racha
            this.streak = 0;
            
            // Aumentar contador de respuestas incorrectas
            this.wrongAnswers++;
            
            // Mostrar mensaje de respuesta incorrecta usando traducción
            if (window.ui) window.ui.showFeedback(`${(window.getText || function(key) { return key; })('incorrect')} ${this.currentQuestion.answer}`, 'wrong');
        }
        
        // Actualizar estadísticas
        if (window.ui) window.ui.updateStats();
        if (window.ui) window.ui.updateStreak();
        
        // Mostrar el botón de siguiente
        if (window.ui) window.ui.showNextButton();
        
        if (isCorrect) {
            // Para respuestas correctas, solo verificar si el juego terminó
            if (this.lives <= 0) {
                this.endGame();
            }
        } else {
            // Para respuestas incorrectas, avanzar automáticamente
            if (this.lives <= 0) {
                // Esperar un poco antes de terminar para que el usuario vea el feedback
                setTimeout(() => {
                    this.endGame();
                }, 2000);
            } else {
                // Automáticamente continuar a la siguiente pregunta después de 3 segundos
                setTimeout(() => {
                    this.loadQuestion();
                }, 3000);
            }
        }
    }
    
    /**
     * Avanza al siguiente nivel
     */
    levelUp() {
        this.level++;
        this.questionCounter = 0;
        
        // Reproducir sonido de subida de nivel
        if (window.audio) window.audio.play('levelUp');
        
        // Actualizar nivel en la UI
        if (window.ui) window.ui.updateLevel();
        
        // Mostrar notificación de subida de nivel usando traducción
        if (window.ui) window.ui.showNotification(`${(window.getText || function(key) { return key; })('notifLevelUp')} ${this.level}! 🎉`);
        
        // Desbloquear nuevas categorías si corresponde
        this.unlockCategories();
        
        // Verificar logros relacionados con el nivel
        this.checkAchievements();
    }
    
    /**
     * Desbloquea categorías basadas en el nivel actual
     */
    unlockCategories() {
        // Buscar categorías que deban desbloquearse en este nivel
        if (!window.gameData) return;
        const newlyUnlocked = window.gameData.categories.filter(cat => !cat.unlocked && cat.unlockLevel === this.level);
        
        if (newlyUnlocked.length > 0) {
            // Desbloquear las categorías
            newlyUnlocked.forEach(category => {
                // Marcar como desbloqueada en los datos del juego
                const catIndex = window.gameData.categories.findIndex(c => c.id === category.id);
                if (catIndex !== -1) {
                    window.gameData.categories[catIndex].unlocked = true;
                }
                
                // Reproducir sonido de desbloqueo
                if (window.audio) window.audio.play('achievement');
                
                // Obtener nombre traducido de la categoría
                const categoryName = (window.getText || function(key) { return key; })(category.id) || category.name;
                
                // Mostrar notificación usando traducción
                if (window.ui) window.ui.showNotification(`${(window.getText || function(key) { return key; })('notifCategoryUnlocked')} ${categoryName}! ${category.icon}`);
            });
        }
    }
    
    /**
     * Verifica si se han cumplido nuevos logros
     */
    checkAchievements() {
        const context = {
            correctAnswers: this.correctAnswers,
            wrongAnswers: this.wrongAnswers,
            streak: this.streak,
            maxStreak: this.maxStreak,
            level: this.level,
            score: this.score,
            correctAnswersByCategory: this.correctAnswersByCategory
        };
        
        let achievementUnlocked = false;
        
        // Definir condiciones predefinidas para cada logro
        const achievementConditions = {
            first_win: () => context.correctAnswers >= 1,
            streak_3: () => context.streak >= 3,
            level_up: () => context.level >= 2,
            movie_master: () => context.correctAnswersByCategory.movies >= 10,
            globe_trotter: () => context.correctAnswersByCategory.countries >= 10,
            history_buff: () => context.correctAnswersByCategory.history >= 10,
            scientist: () => context.correctAnswersByCategory.science >= 10,
            bookworm: () => context.correctAnswersByCategory.literature >= 10,
            tech_savvy: () => context.correctAnswersByCategory.technology >= 10,
            perfect_streak: () => context.streak >= 10
        };
        
        if (!window.gameData) return;
        window.gameData.achievements.forEach(achievement => {
            // Verificar si ya se ha desbloqueado
            if (this.unlockedAchievements.includes(achievement.id)) {
                return;
            }
            
            // Verificar la condición del logro usando el objeto predefinido
            try {
                if (achievementConditions[achievement.id] && achievementConditions[achievement.id]()) {
                    // Desbloquear el logro
                    this.unlockedAchievements.push(achievement.id);
                    achievementUnlocked = true;
                    
                    // Mostrar notificación usando traducción
                    if (window.ui) window.ui.showNotification(`${(window.getText || function(key) { return key; })('notifAchievementUnlocked')} ${achievement.name}! ${achievement.icon}`);
                }
            } catch (error) {
                console.error(`Error al evaluar logro '${achievement.id}':`, error);
            }
        });
        
        // Reproducir sonido de logro si se desbloqueó al menos uno
        if (achievementUnlocked) {
            if (window.audio) window.audio.play('achievement');
        }
    }
    
    /**
     * Usa un power-up
     * @param {string} type - Tipo de power-up (fiftyFifty, extraTime, extraHint)
     */
    usePowerUp(type) {
        // Verificar si tiene disponible el power-up
        if (this.powerUps[type] <= 0) {
            if (window.ui) window.ui.showNotification((window.getText || function(key) { return key; })('notifNoPowerUps'), "error");
            return false;
        }
        
        // Reducir contador del power-up
        this.powerUps[type]--;
        
        // Actualizar UI de power-ups
        if (window.ui) window.ui.updatePowerUps();
        
        // Guardar el estado del juego para persistir el cambio en los power-ups
        this.saveGameState();
        
        // Reproducir sonido de power-up
        if (window.audio) window.audio.play('powerUp');
        
        // Efectos específicos según el tipo de power-up
        switch (type) {
            case 'fiftyFifty':
                // Eliminar dos opciones incorrectas
                if (window.ui) window.ui.applyFiftyFifty(this.currentQuestion.answer);
                break;
                
            case 'extraTime':
                // Añadir tiempo extra
                const extraSeconds = 10;
                this.remainingTime += extraSeconds;
                
                // Actualizar el porcentaje de la barra de tiempo
                if (!window.gameData) return false;
                const diffSettings = window.gameData.settings.difficulties[this.difficulty];
                const percentage = (this.remainingTime / diffSettings.timePerQuestion) * 100;
                if (window.ui) window.ui.updateTimerBar(percentage > 100 ? 100 : percentage);
                
                // Resetear la advertencia del temporizador
                this.timerWarningPlayed = false;
                
                // Mostrar notificación usando traducción
                if (window.ui) window.ui.showNotification(`+${extraSeconds} ${(window.getText || function(key) { return key; })('notifExtraTime')}`);
                break;
                
            case 'extraHint':
                // Mostrar un emoji adicional como pista
                const additionalEmojis = this.getAdditionalHintEmojis();
                if (additionalEmojis.length > 0) {
                    const randomEmoji = additionalEmojis[Math.floor(Math.random() * additionalEmojis.length)];
                    if (window.ui) window.ui.addExtraHintEmoji(randomEmoji);
                    // Mostrar notificación usando traducción
                    if (window.ui) window.ui.showNotification(`${(window.getText || function(key) { return key; })('notifExtraHint')} ${randomEmoji}`);
                } else {
                    // Mostrar notificación usando traducción
                    if (window.ui) window.ui.showNotification((window.getText || function(key) { return key; })('notifNoMoreHints'));
                    // Devolver el power-up
                    this.powerUps[type]++;
                    if (window.ui) window.ui.updatePowerUps();
                    // Guardar el estado actualizado ya que devolvimos el power-up
                    this.saveGameState();
                }
                break;
        }
        
        return true;
    }
    
    /**
     * Obtiene emojis adicionales como pista para la pregunta actual
     * @returns {Array} - Lista de emojis adicionales
     */
    getAdditionalHintEmojis() {
        // Esta función simula emojis adicionales para la pregunta
        // En una implementación real, estos emojis adicionales estarían en los datos de preguntas
        
        // Palabras clave asociadas con la respuesta correcta
        const answer = this.currentQuestion.answer.toLowerCase();
        const additionalEmojis = [];
        
        // Lista de posibles emojis adicionales según la categoría
        if (this.currentCategoryId === 'movies') {
            if (answer.includes('rey') || answer.includes('león')) additionalEmojis.push('👑', '🦁');
            if (answer.includes('harry') || answer.includes('potter')) additionalEmojis.push('🧙‍♂️', '⚡', '🧹');
            if (answer.includes('frozen')) additionalEmojis.push('❄️', '👸', '☃️');
            if (answer.includes('cars')) additionalEmojis.push('🏎️', '🚗', '🏁');
            if (answer.includes('toy') || answer.includes('story')) additionalEmojis.push('🧸', '🤠', '👽');
            if (answer.includes('solo') || answer.includes('casa')) additionalEmojis.push('🏠', '👦', '🎄');
            if (answer.includes('titanic')) additionalEmojis.push('🚢', '💏', '🧊');
            if (answer.includes('jurassic')) additionalEmojis.push('🦖', '🦕', '🏝️');
            if (answer.includes('wall') || answer.includes('walle')) additionalEmojis.push('🤖', '🌱', '🚀');
            if (answer.includes('rata') || answer.includes('ratatouille')) additionalEmojis.push('🐀', '👨‍🍳', '🍲');
        } else if (this.currentCategoryId === 'countries') {
            if (answer.includes('méxico')) additionalEmojis.push('🌮', '🌵', '🇲🇽');
            if (answer.includes('italia')) additionalEmojis.push('🍕', '🍝', '🇮🇹');
            if (answer.includes('australia')) additionalEmojis.push('🦘', '🐨', '🇦🇺');
            if (answer.includes('japón')) additionalEmojis.push('🍣', '🗻', '🇯🇵');
            if (answer.includes('estados unidos')) additionalEmojis.push('🗽', '🦅', '🇺🇸');
            if (answer.includes('alemania')) additionalEmojis.push('🥨', '🍻', '⚽', '🇩🇪');
            if (answer.includes('francia')) additionalEmojis.push('🥐', '🗼', '🍷', '🇫🇷');
            if (answer.includes('china')) additionalEmojis.push('🐉', '🧧', '🥟', '🇨🇳');
            if (answer.includes('india')) additionalEmojis.push('🐘', '🕉️', '🪔', '🇮🇳');
            if (answer.includes('canadá')) additionalEmojis.push('🍁', '🏒', '🦫', '🇨🇦');
            if (answer.includes('grecia')) additionalEmojis.push('🏛️', '🫒', '⛵', '🇬🇷');
        }
        
        // Si no hay pistas adicionales para esta respuesta, crear una genérica
        if (additionalEmojis.length === 0) {
            return ['🎯', '❓', '💡']; // Emojis genéricos que indican pista
        }
        
        // Verificar similitud con emojis existentes para evitar redundancias
        const currentEmojis = this.currentQuestion.emojis;
        
        // Filtrar emojis demasiado similares a los existentes
        const filteredEmojis = additionalEmojis.filter(emoji => {
            // No incluir emojis idénticos a los que ya tiene la pregunta
            if (currentEmojis.includes(emoji)) return false;
            
            // Filtrar también emojis muy similares (misma categoría/tema)
            for (const existingEmoji of currentEmojis) {
                // Detectar similitud basada en grupos comunes (ejemplo: si ya hay un castillo, no poner otro edificio)
                if (this.areSimilarEmojis(emoji, existingEmoji)) return false;
            }
            
            return true;
        });
        
        // Si después de filtrar quedan menos de 2 emojis, agregar algunos genéricos
        if (filteredEmojis.length < 2) {
            filteredEmojis.push('🎯', '💡');
        }
        
        return filteredEmojis;
    }
    
    /**
     * Determina si dos emojis son similares (auxiliar para getAdditionalHintEmojis)
     * @param {string} emoji1 - Primer emoji
     * @param {string} emoji2 - Segundo emoji
     * @returns {boolean} - Verdadero si son similares
     */
    areSimilarEmojis(emoji1, emoji2) {
        // Emojis de bandera son similares entre sí
        if ((emoji1.includes('🇦') || emoji1.includes('🇧') || emoji1.includes('🇨') || emoji1.includes('🇩') || emoji1.includes('🇪') || 
             emoji1.includes('🇫') || emoji1.includes('🇬') || emoji1.includes('🇭') || emoji1.includes('🇮') || emoji1.includes('🇯') || 
             emoji1.includes('🇰') || emoji1.includes('🇱') || emoji1.includes('🇲') || emoji1.includes('🇳') || emoji1.includes('🇴') || 
             emoji1.includes('🇵') || emoji1.includes('🇶') || emoji1.includes('🇷') || emoji1.includes('🇸') || emoji1.includes('🇹') || 
             emoji1.includes('🇺') || emoji1.includes('🇻') || emoji1.includes('🇼') || emoji1.includes('🇽') || emoji1.includes('🇾') || 
             emoji1.includes('🇿')) && 
            (emoji2.includes('🇦') || emoji2.includes('🇧') || emoji2.includes('🇨') || emoji2.includes('🇩') || emoji2.includes('🇪') || 
             emoji2.includes('🇫') || emoji2.includes('🇬') || emoji2.includes('🇭') || emoji2.includes('🇮') || emoji2.includes('🇯') || 
             emoji2.includes('🇰') || emoji2.includes('🇱') || emoji2.includes('🇲') || emoji2.includes('🇳') || emoji2.includes('🇴') || 
             emoji2.includes('🇵') || emoji2.includes('🇶') || emoji2.includes('🇷') || emoji2.includes('🇸') || emoji2.includes('🇹') || 
             emoji2.includes('🇺') || emoji2.includes('🇻') || emoji2.includes('🇼') || emoji2.includes('🇽') || emoji2.includes('🇾') || 
             emoji2.includes('🇿'))) {
            return true;
        }
        
        // Emojis de comida
        const foodEmojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥨', '🥯', '🥖', '🥗', '🍝', '🫕', '🥘', '🫔', '🌮', '🌯', '🍜', '🥪'];
        if (foodEmojis.includes(emoji1) && foodEmojis.includes(emoji2)) {
            return true;
        }
        
        // Emojis de edificios/lugares
        const buildingEmojis = ['🏛️', '🏢', '🏰', '🏠', '🏥', '🏨', '🏪', '🏫', '🏬', '🏭', '⛪', '🕌', '🕍', '🛕', '⛩️', '🏯'];
        if (buildingEmojis.includes(emoji1) && buildingEmojis.includes(emoji2)) {
            return true;
        }
        
        // Emojis de animales
        const animalEmojis = ['🐵', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🐈‍⬛', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦫', '🦔', '🦇', '🐻', '🐻‍❄️', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '🐡', '🦈', '🐙', '🐚', '🪸', '🦀', '🦞', '🦐', '🦑', '🦪', '🐌', '🦋', '🐛', '🐜', '🐝', '🪲', '🐞', '🦗', '🪳', '🕷️', '🕸️', '🦂', '🦟', '🪰', '🪱', '🦠'];
        if (animalEmojis.includes(emoji1) && animalEmojis.includes(emoji2)) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Pausa el juego
     */
    pauseGame() {
        if (!this.isPaused) {
            this.isPaused = true;
            if (window.ui) window.ui.showPauseModal();
            
            // Pausar la música si está habilitada
            if (this.musicEnabled) {
                if (window.audio) window.audio.stop('backgroundMusic');
            }
        }
    }
    
    /**
     * Continúa el juego pausado
     */
    resumeGame() {
        if (this.isPaused) {
            this.isPaused = false;
            if (window.ui) window.ui.hidePauseModal();
            
            // Reanudar la música si está habilitada
            if (this.musicEnabled) {
                if (window.audio) window.audio.play('backgroundMusic');
            }
        }
    }
    
    /**
     * Finaliza el juego actual y muestra la pantalla de fin del juego
     */
    endGame() {
        // Detener el temporizador
        clearInterval(this.timer);
        
        // Detener el guardado automático
        this.stopAutoSave();
        
        // Guardar estado final
        this.saveGameState();
        
        // Reproducir sonido de fin del juego
        if (window.audio) window.audio.play('gameOver');
        
        // Pausar la música de fondo
        if (window.audio) window.audio.stop('backgroundMusic');
        
        // Actualizar estadísticas finales
        if (window.ui) window.ui.updateFinalStats(this.score, this.correctAnswers, this.wrongAnswers, this.level, this.maxStreak);
        
        // Mostrar pantalla de fin del juego
        if (window.ui) window.ui.showScreen('game-over-screen');
    }
    
    /**
     * Actualiza la configuración del juego
     * @param {string} setting - Configuración a cambiar (sound, soundVolume, music, musicVolume, crtEffect, difficulty)
     * @param {any} value - Nuevo valor
     */
    updateSettings(setting, value) {
        switch (setting) {
            case 'sound':
                this.soundEnabled = value;
                if (window.audio) window.audio.toggleSoundEffects(value);
                break;
                
            case 'soundVolume':
                this.soundVolume = value;
                if (window.audio) window.audio.setEffectsVolume(value);
                break;
                
            case 'music':
                this.musicEnabled = value;
                if (window.audio) window.audio.toggleMusic(value);
                break;
                
            case 'musicVolume':
                this.musicVolume = value;
                if (window.audio) window.audio.setMusicVolume(value);
                break;
                
            case 'crtEffect':
                this.crtEffectEnabled = value;
                // Actualizar efecto CRT según el nuevo valor
                const crtEffect = document.querySelector('.crt-effect');
                if (this.crtEffectEnabled) {
                    crtEffect.style.display = 'block';
                } else {
                    crtEffect.style.display = 'none';
                }
                break;
                
            case 'difficulty':
                this.difficulty = value;
                break;
        }
        
        // Guardar configuración en localStorage
        this.saveSettings();
    }
    
    /**
     * Guarda la configuración actual en localStorage
     */
    saveSettings() {
        const settings = {
            difficulty: this.difficulty,
            soundEnabled: this.soundEnabled,
            soundVolume: this.soundVolume,
            musicEnabled: this.musicEnabled,
            musicVolume: this.musicVolume,
            crtEffectEnabled: this.crtEffectEnabled
        };
        
        try {
            localStorage.setItem('emojiQuizSettings', JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Error al guardar la configuración:', error);
            return false;
        }
    }
    
    /**
     * Carga la configuración guardada de localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('emojiQuizSettings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                
                this.difficulty = settings.difficulty;
                this.soundEnabled = settings.soundEnabled;
                this.soundVolume = settings.soundVolume;
                this.musicEnabled = settings.musicEnabled;
                this.musicVolume = settings.musicVolume;
                this.crtEffectEnabled = settings.crtEffectEnabled;
                
                // Actualizar UI
                if (window.ui) window.ui.updateSettings();
                return true;
            }
        } catch (error) {
            console.error('Error al cargar la configuración:', error);
        }
        return false;
    }
    
    /**
     * Comparte la puntuación en redes sociales
     * @param {string} platform - Plataforma para compartir (twitter, facebook, whatsapp)
     */
    shareScore(platform) {
        // Obtener el mensaje traducido para compartir y reemplazar el placeholder de puntuación
        const message = (window.getText || function(key) { return key; })('shareMessage').replace('{score}', this.score);
        let shareUrl;
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
                break;
                
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
                break;
                
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }
    
    /**
     * Guarda el estado actual del juego
     */
    saveGameState() {
        const gameState = {
            score: this.score,
            lives: this.lives,
            level: this.level,
            streak: this.streak,
            maxStreak: this.maxStreak,
            correctAnswers: this.correctAnswers,
            wrongAnswers: this.wrongAnswers,
            correctAnswersByCategory: this.correctAnswersByCategory,
            unlockedAchievements: this.unlockedAchievements,
            questionCounter: this.questionCounter,
            powerUps: this.powerUps,
            settings: {
                difficulty: this.difficulty,
                soundEnabled: this.soundEnabled,
                soundVolume: this.soundVolume,
                musicEnabled: this.musicEnabled,
                musicVolume: this.musicVolume,
                crtEffectEnabled: this.crtEffectEnabled
            }
        };
        
        try {
            localStorage.setItem('emojiQuizGameState', JSON.stringify(gameState));
            return true;
        } catch (error) {
            console.error('Error al guardar el estado del juego:', error);
            return false;
        }
    }

    /**
     * Carga el estado guardado del juego
     */
    loadGameState() {
        try {
            const savedState = localStorage.getItem('emojiQuizGameState');
            if (savedState) {
                const gameState = JSON.parse(savedState);
                
                // Restaurar estado del juego
                this.score = gameState.score;
                this.lives = gameState.lives;
                this.level = gameState.level;
                this.streak = gameState.streak;
                this.maxStreak = gameState.maxStreak;
                this.correctAnswers = gameState.correctAnswers;
                this.wrongAnswers = gameState.wrongAnswers;
                this.correctAnswersByCategory = gameState.correctAnswersByCategory;
                this.unlockedAchievements = gameState.unlockedAchievements;
                this.questionCounter = gameState.questionCounter;
                this.powerUps = gameState.powerUps;
                
                // Restaurar configuración
                this.difficulty = gameState.settings.difficulty;
                this.soundEnabled = gameState.settings.soundEnabled;
                this.soundVolume = gameState.settings.soundVolume;
                this.musicEnabled = gameState.settings.musicEnabled;
                this.musicVolume = gameState.settings.musicVolume;
                this.crtEffectEnabled = gameState.settings.crtEffectEnabled;
                
                // Actualizar UI
                if (window.ui) window.ui.updateStats();
                if (window.ui) window.ui.updatePowerUps();
                if (window.ui) window.ui.updateLevel();
                if (window.ui) window.ui.updateStreak();
                
                return true;
            }
        } catch (error) {
            console.error('Error al cargar el estado del juego:', error);
        }
        return false;
    }

    /**
     * Inicia el guardado automático
     */
    startAutoSave() {
        // Guardar cada 5 minutos
        this.autoSaveInterval = setInterval(() => {
            this.saveGameState();
        }, 5 * 60 * 1000);
    }

    /**
     * Detiene el guardado automático
     */
    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    /**
     * Guarda el juego manualmente
     */
    manualSave() {
        if (this.saveGameState()) {
            if (window.ui) window.ui.showNotification((window.getText || function(key) { return key; })('gameSaved'), 'success');
        } else {
            if (window.ui) window.ui.showNotification((window.getText || function(key) { return key; })('saveError'), 'error');
        }
    }
}

// Exportar la clase Game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}
