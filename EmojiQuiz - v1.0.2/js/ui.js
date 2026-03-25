/**
 * EmojiQuiz - ui.js
 * Este archivo contiene todas las funciones relacionadas con la interfaz de usuario
 */

class UI {
    constructor() {
        // Elementos de la pantalla de juego
        this.emojiDisplay = document.getElementById('emoji-display');
        this.optionsContainer = document.getElementById('options-container');
        this.feedbackElement = document.getElementById('feedback');
        this.nextBtn = document.getElementById('next-btn');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.levelElement = document.getElementById('level');
        this.categoryElement = document.getElementById('category');
        this.timerBar = document.getElementById('timer-bar');
        this.streakContainer = document.getElementById('streak-container');
        
        // Elementos de power-ups
        this.powerUpCounters = {
            fiftyFifty: document.getElementById('fiftyFifty-count'),
            extraTime: document.getElementById('extraTime-count'),
            extraHint: document.getElementById('extraHint-count')
        };
        
        // Elementos de la pantalla de fin del juego
        this.finalScoreElement = document.getElementById('final-score');
        this.correctAnswersElement = document.getElementById('correct-answers');
        this.wrongAnswersElement = document.getElementById('wrong-answers');
        this.finalLevelElement = document.getElementById('final-level');
        this.maxStreakElement = document.getElementById('max-streak');
        
        // Elementos de pantallas y modales
        this.allScreens = document.querySelectorAll('.screen');
        this.pauseModal = document.getElementById('pause-modal');
        
        // Elementos para idioma
        this.languageSelector = document.getElementById('language-selector');
        this.languageSelectorSettings = document.getElementById('language-selector-settings');
        
        // Estado de la UI
        this.isExtraHintAdded = false;
        this.notificationTimeout = null;
        
        // Inicializar idioma
        this.initLanguageSelectors();
        // Defer updateLanguage until after game is initialized
        setTimeout(() => {
            if (this.updateLanguage) this.updateLanguage();
            this.initializeSettings();
        }, 100);
        
        // Agregar botón de guardado manual
        const gameScreen = document.getElementById('game-screen');
        const saveButton = document.createElement('button');
        saveButton.id = 'save-game-btn';
        saveButton.className = 'save-button';
        saveButton.innerHTML = '💾';
        saveButton.title = (window.getText || function(key) { return key; })('saveGame');
        gameScreen.appendChild(saveButton);
        
        // Agregar evento de guardado
        saveButton.addEventListener('click', () => {
            if (window.audio) window.audio.play('click');
            window.game.manualSave();
        });
    }
    
    /**
     * Inicializa los selectores de idioma
     */
    initLanguageSelectors() {
        // Configurar el valor inicial de los selectores según el idioma guardado
        if (this.languageSelector) {
            this.languageSelector.value = currentLanguage;
            
            // Evento de cambio de idioma en pantalla principal
            this.languageSelector.addEventListener('change', (e) => {
                const newLanguage = e.target.value;
                this.changeLanguageAndUpdate(newLanguage);
            });
        }
        
        if (this.languageSelectorSettings) {
            this.languageSelectorSettings.value = currentLanguage;
            
            // Evento de cambio de idioma en ajustes
            this.languageSelectorSettings.addEventListener('change', (e) => {
                const newLanguage = e.target.value;
                this.changeLanguageAndUpdate(newLanguage);
            });
        }
    }
    
    /**
     * Inicializa la configuración de los selectores
     */
    initializeSettings() {
        // Sincronizar el selector de fondo con el valor actual
        if (window.backgroundManager) {
            const backgroundSelector = document.getElementById('background-selector-settings');
            if (backgroundSelector) {
                backgroundSelector.value = window.backgroundManager.getCurrentBackground();
            }
        }
    }
    
    /**
     * Cambia el idioma y actualiza la interfaz
     * @param {string} newLanguage - Código del nuevo idioma
     */
    changeLanguageAndUpdate(newLanguage) {
        if (changeLanguage(newLanguage)) {
            // Sincronizar los selectores de idioma
            if (this.languageSelector) this.languageSelector.value = newLanguage;
            if (this.languageSelectorSettings) this.languageSelectorSettings.value = newLanguage;
            
            // Sincronizar el selector de fondo
            if (window.backgroundManager) {
                const backgroundSelector = document.getElementById('background-selector-settings');
                if (backgroundSelector) {
                    backgroundSelector.value = window.backgroundManager.getCurrentBackground();
                }
            }
            
            // Actualizar todos los textos de la interfaz
            this.updateLanguage();
            
            // Reproducir sonido de clic
            if (typeof audio !== 'undefined') {
                if (window.audio) window.audio.play('click');
            }
        }
    }
    
    /**
     * Actualiza todos los textos en la interfaz según el idioma actual
     */
    updateLanguage() {
        // Pantalla de inicio
        this.updateTextContent('game-title', 'gameTitle', true);
        this.updateTextContent('tagline', 'tagline');
        this.updateTextContent('start-game-btn', 'playButton');
        this.updateTextContent('how-to-play-btn', 'howToPlayButton');
        this.updateTextContent('categories-btn', 'categoriesButton');
        this.updateTextContent('achievements-btn', 'achievementsButton');
        this.updateTextContent('settings-btn', 'settingsButton');
        this.updateTextContent('version', 'version');
        this.updateTextContent('credits', 'credits');
        
        // Pantalla de juego
        this.updateTextContent('level-label', 'levelLabel');
        this.updateTextContent('points-label', 'pointsLabel');
        this.updateTextContent('lives-label', 'livesLabel');
        this.updateTextContent('category-label', 'categoryLabel');
        this.updateTextContent('next-btn', 'nextButton');
        
        // Power-ups
        this.updateTooltip('fiftyFifty-powerup', 'fiftyFiftyTooltip');
        this.updateTooltip('extraTime-powerup', 'extraTimeTooltip');
        this.updateTooltip('extraHint-powerup', 'extraHintTooltip');
        
        // Pantalla de fin del juego
        this.updateTextContent('game-over-title', 'gameOver');
        this.updateTextContent('final-score-label', 'finalScore');
        this.updateTextContent('correct-answers-label', 'correctAnswers');
        this.updateTextContent('wrong-answers-label', 'incorrectAnswers');
        this.updateTextContent('level-reached-label', 'levelReached');
        this.updateTextContent('max-streak-label', 'maxStreak');
        this.updateTextContent('restart-btn', 'playAgain');
        this.updateTextContent('main-menu-btn', 'mainMenu');
        
        // Pantalla de instrucciones
        this.updateTextContent('how-to-play-title', 'howToPlay');
        this.updateTextContent('instruction-1', 'instruction1');
        this.updateTextContent('instruction-2', 'instruction2');
        this.updateTextContent('instruction-3', 'instruction3');
        this.updateTextContent('instruction-4', 'instruction4');
        this.updateTextContent('instruction-5', 'instruction5');
        this.updateTextContent('scoring-title', 'scoringSystem');
        this.updateTextContent('scoring-base', 'scoringBase');
        this.updateTextContent('scoring-time', 'scoringTime');
        this.updateTextContent('scoring-streak', 'scoringStreak');
        this.updateTextContent('scoring-level', 'scoringLevel');
        this.updateTextContent('powerups-title', 'powerUpsTitle');
        this.updateTextContent('fifty-fifty-desc', 'fiftyFiftyTooltip');
        this.updateTextContent('extra-time-desc', 'extraTimeTooltip');
        this.updateTextContent('extra-hint-desc', 'extraHintTooltip');
        this.updateTextContent('back-from-howto-btn', 'backButton');
        
        // Pantalla de categorías
        this.updateTextContent('categories-title', 'categoriesTitle');
        this.updateTextContent('back-from-categories-btn', 'backButton');
        
        // Reinicializar la pantalla de categorías para actualizar los nombres
        this.initCategoriesScreen();
        
        // Pantalla de logros
        this.updateTextContent('achievements-title', 'achievementsTitle');
        this.updateTextContent('back-from-achievements-btn', 'backButton');
        
        // Reinicializar la pantalla de logros para actualizar los textos
        this.initAchievementsScreen();
        
        // Pantalla de ajustes
        this.updateTextContent('settings-title', 'settingsTitle');
        this.updateTextContent('sound-effects-label', 'soundEffects');
        this.updateTextContent('sound-volume-label', 'soundVolume');
        this.updateTextContent('music-label', 'music');
        this.updateTextContent('music-volume-label', 'musicVolume');
        this.updateTextContent('crt-effect-label', 'crtEffect');
        this.updateTextContent('difficulty-label', 'difficulty');
        this.updateTextContent('difficulty-easy', 'difficultyEasy');
        this.updateTextContent('difficulty-medium', 'difficultyMedium');
        this.updateTextContent('difficulty-hard', 'difficultyHard');
        this.updateTextContent('language-label', 'languageLabel');
        this.updateTextContent('language-spanish', 'spanish');
        this.updateTextContent('language-english', 'english');
        this.updateTextContent('background-label', 'backgroundLabel');
        this.updateTextContent('background-neon', 'backgroundNeon');
        this.updateTextContent('background-emojis', 'backgroundEmojis');
        this.updateTextContent('background-nebula', 'backgroundNebula');
        this.updateTextContent('background-none', 'backgroundNone');
        this.updateTextContent('back-from-settings-btn', 'saveAndBack');
        
        // Modal de pausa
        this.updateTextContent('pause-title', 'pauseTitle');
        this.updateTextContent('continue-btn', 'continueButton');
        this.updateTextContent('restart-from-pause-btn', 'restartButton');
        this.updateTextContent('exit-to-menu-btn', 'exitButton');
    }
    
    /**
     * Actualiza el contenido de texto de un elemento
     * @param {string} elementId - ID del elemento
     * @param {string} textKey - Clave de texto en el archivo de traducciones
     * @param {boolean} isHTML - Si el contenido incluye HTML
     */
    updateTextContent(elementId, textKey, isHTML = false) {
        const element = document.getElementById(elementId);
        if (element) {
            const translatedText = (window.getText || function(key) { return key; })(textKey);
            if (isHTML) {
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    }
    
    /**
     * Actualiza el tooltip (atributo title) de un elemento
     * @param {string} elementId - ID del elemento
     * @param {string} textKey - Clave de texto en el archivo de traducciones
     */
    updateTooltip(elementId, textKey) {
        const element = document.getElementById(elementId);
        if (element) {
            element.title = (window.getText || function(key) { return key; })(textKey);
        }
    }
    
    /**
     * Muestra una pantalla específica y oculta las demás
     * @param {string} screenId - ID de la pantalla a mostrar
     */
    showScreen(screenId) {
        // Ocultar todas las pantallas
        this.allScreens.forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Mostrar la pantalla solicitada
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) {
            screenToShow.classList.remove('hidden');
            // Añadir animación de entrada
            screenToShow.classList.add('fade-in');
            setTimeout(() => {
                screenToShow.classList.remove('fade-in');
            }, 500);
        }
    }
    
    /**
     * Actualiza la categoría mostrada
     * @param {string} categoryName - Nombre de la categoría
     */
    updateCategory(categoryName) {
        // Traducir el nombre de la categoría si existe en las traducciones
        const translatedCategory = (window.getText || function(key) { return key; })(categoryName.toLowerCase()) || categoryName;
        this.categoryElement.textContent = `${(window.getText || function(key) { return key; })('categoryLabel')}: ${translatedCategory}`;
    }
    
    /**
     * Muestra los emojis de la pregunta actual
     * @param {Array} emojis - Array de emojis a mostrar
     */
    displayEmojis(emojis) {
        // Limpiar el contenedor de emojis
        this.emojiDisplay.innerHTML = '';
        
        // Resetear el estado de la pista extra
        this.isExtraHintAdded = false;
        
        // Añadir cada emoji con animación
        emojis.forEach((emoji, index) => {
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = emoji;
            emojiSpan.classList.add('emoji');
            emojiSpan.style.setProperty('--i', index);
            this.emojiDisplay.appendChild(emojiSpan);
        });
    }
    
    /**
     * Añade un emoji adicional como pista
     * @param {string} emoji - Emoji a añadir
     */
    addExtraHintEmoji(emoji) {
        if (this.isExtraHintAdded) return;
        
        const emojis = this.emojiDisplay.querySelectorAll('.emoji');
        const index = emojis.length;
        
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.classList.add('emoji', 'glow');
        emojiSpan.style.setProperty('--i', index);
        this.emojiDisplay.appendChild(emojiSpan);
        
        this.isExtraHintAdded = true;
    }
    
    /**
     * Muestra las opciones de respuesta
     * @param {Array} options - Opciones de respuesta
     */
    displayOptions(options) {
        // Limpiar el contenedor de opciones
        this.optionsContainer.innerHTML = '';
        
        // Mezclar las opciones para que no siempre esté la respuesta en el mismo lugar
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        
        // Añadir cada opción como un botón
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option');
            button.addEventListener('click', () => {
                window.game.checkAnswer(option);
            });
            this.optionsContainer.appendChild(button);
        });
    }
    
    /**
     * Actualiza las estadísticas mostradas (puntuación, vidas)
     */
    updateStats() {
        if (!window.game) return;
        
        this.scoreElement.textContent = window.game.score;
        
        // Actualizar las vidas con emojis
        let livesHTML = '';
        const maxLives = window.gameData ? window.gameData.settings.maxLives : 3;
        for (let i = 0; i < maxLives; i++) {
            if (i < window.game.lives) {
                livesHTML += '❤️ ';
            } else {
                livesHTML += '💔 ';
            }
        }
        this.livesElement.innerHTML = livesHTML.trim();
    }
    
    /**
     * Actualiza el nivel mostrado
     */
    updateLevel() {
        if (!window.game) return;
        this.levelElement.textContent = window.game.level;
        
        // Efecto visual para el cambio de nivel
        this.levelElement.style.animation = 'pulse 0.5s ease 3';
        setTimeout(() => {
            this.levelElement.style.animation = '';
        }, 1500);
    }
    
    /**
     * Actualiza la barra de tiempo
     * @param {number} percentage - Porcentaje de tiempo restante (0-100)
     */
    updateTimerBar(percentage) {
        this.timerBar.style.width = `${percentage}%`;
        
        // Cambiar color según el tiempo restante
        if (percentage > 60) {
            this.timerBar.style.backgroundColor = 'var(--secondary-color)';
        } else if (percentage > 30) {
            this.timerBar.style.backgroundColor = 'var(--accent-color)';
        } else {
            this.timerBar.style.backgroundColor = 'var(--wrong-color)';
        }
    }
    
    /**
     * Actualiza el contador de racha
     */
    updateStreak() {
        if (!window.game) return;
        
        const streakEmojis = this.streakContainer.querySelectorAll('.streak-emoji');
        streakEmojis.forEach((emoji, index) => {
            if (index < window.game.streak) {
                emoji.classList.add('active');
            } else {
                emoji.classList.remove('active');
            }
        });
    }
    
    /**
     * Muestra el feedback para una respuesta
     * @param {string} message - Mensaje de feedback
     * @param {string} type - Tipo de feedback (correct/wrong)
     */
    showFeedback(message, type) {
        // Traducir mensajes específicos
        if (type === 'correct') {
            const basePoints = (window.getText || function(key) { return key; })('basePoints');
            const timeBonus = (window.getText || function(key) { return key; })('timeBonus');
            const streakBonus = (window.getText || function(key) { return key; })('streakBonus');
            const levelBonus = (window.getText || function(key) { return key; })('levelBonus');
            const points = (window.getText || function(key) { return key; })('points');
            
            // Reemplazar términos en el mensaje
            message = message.replace('base', basePoints)
                            .replace('tiempo', timeBonus)
                            .replace('racha', streakBonus)
                            .replace('nivel', levelBonus)
                            .replace('puntos', points)
                            .replace('¡Correcto! 🎉', (window.getText || function(key) { return key; })('correct'));
        } else if (type === 'wrong') {
            if (message.includes('¡Incorrecto!')) {
                message = message.replace('¡Incorrecto! 😢 La respuesta correcta es: ', (window.getText || function(key) { return key; })('incorrect'));
            } else if (message.includes('¡Tiempo agotado!')) {
                message = message.replace('¡Tiempo agotado! 😢 La respuesta correcta es: ', (window.getText || function(key) { return key; })('timeUp'));
            }
        }
        
        this.feedbackElement.innerHTML = message;
        this.feedbackElement.className = 'feedback';
        this.feedbackElement.classList.add(type);
    }
    
    /**
     * Resetea el contenedor de feedback
     */
    resetFeedback() {
        this.feedbackElement.textContent = '';
        this.feedbackElement.className = 'feedback';
    }
    
    /**
     * Muestra el botón de siguiente pregunta
     */
    showNextButton() {
        this.nextBtn.style.display = 'block';
    }
    
    /**
     * Oculta el botón de siguiente pregunta
     */
    hideNextButton() {
        this.nextBtn.style.display = 'none';
    }
    
    /**
     * Deshabilita todos los botones de opciones
     */
    disableAllOptions() {
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            button.disabled = true;
        });
    }
    
    /**
     * Marca la opción correcta
     * @param {string} correctOption - Texto de la opción correcta
     */
    markCorrectAnswer(correctOption) {
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            if (button.textContent === correctOption) {
                button.style.backgroundColor = 'var(--correct-color)';
            }
        });
    }
    
    /**
     * Marca una opción como incorrecta
     * @param {string} wrongOption - Texto de la opción incorrecta
     */
    markWrongAnswer(wrongOption) {
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            if (button.textContent === wrongOption) {
                button.style.backgroundColor = 'var(--wrong-color)';
            }
        });
    }
    
    /**
     * Aplica el power-up 50:50 eliminando dos opciones incorrectas
     * @param {string} correctOption - Texto de la opción correcta
     */
    applyFiftyFifty(correctOption) {
        const optionButtons = Array.from(document.querySelectorAll('.option'));
        const incorrectOptions = optionButtons.filter(button => button.textContent !== correctOption);
        
        // Elegir aleatoriamente dos opciones incorrectas para eliminar
        if (incorrectOptions.length >= 2) {
            // Mezclar para elegir aleatoriamente
            incorrectOptions.sort(() => Math.random() - 0.5);
            
            // Eliminar dos opciones
            for (let i = 0; i < 2; i++) {
                // No eliminar realmente, solo deshabilitar y ocultar parcialmente
                incorrectOptions[i].disabled = true;
                incorrectOptions[i].style.opacity = '0.3';
                incorrectOptions[i].style.cursor = 'not-allowed';
            }
        }
    }
    
    /**
     * Actualiza la UI de power-ups
     */
    updatePowerUps() {
        if (!window.game) return;
        
        // Actualizar los contadores de power-ups en la UI
        for (const [type, count] of Object.entries(window.game.powerUps)) {
            const counterElement = this.powerUpCounters[type];
            if (counterElement) {
                counterElement.textContent = count;
                
                // Aplicar efecto visual si está agotado
                const powerUpElement = document.getElementById(`${type}-powerup`);
                if (powerUpElement) {
                    if (count <= 0) {
                        powerUpElement.classList.add('disabled');
                    } else {
                        powerUpElement.classList.remove('disabled');
                    }
                }
            }
        }
    }
    
    /**
     * Crea partículas de celebración
     */
    createParticles() {
        const container = document.getElementById('game-container') || document.body;
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 3;

        // Crear 15 partículas desde el centro del emoji display
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Tamaño aleatorio
            const size = Math.random() * 8 + 4;

            // Color aleatorio
            const colors = ['#FF4081', '#00BCD4', '#FFC107', '#8BC34A', '#9C27B0', '#ff6b6b', '#4a2fbd'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Dirección aleatoria desde el centro
            const angle = (Math.PI * 2 * i) / 15 + (Math.random() * 0.5);
            const distance = 50 + Math.random() * 120;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            // Configurar estilos
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.position = 'absolute';
            particle.style.zIndex = '100';

            // Añadir al container del juego
            container.appendChild(particle);

            // Animar hacia afuera
            requestAnimationFrame(() => {
                particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                particle.style.left = `${endX}px`;
                particle.style.top = `${endY}px`;
                particle.style.opacity = '0';
                particle.style.transform = `scale(0.2)`;
            });

            // Eliminar después de la animación
            setTimeout(() => {
                particle.remove();
            }, 900);
        }
    }
    
    /**
     * Muestra una notificación temporal
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación (default/error/success)
     */
    showNotification(message, type = 'default') {
        // Traducir mensajes específicos
        if (message.includes('¡Has subido al nivel')) {
            message = `${(window.getText || function(key) { return key; })('notifLevelUp')} ${message.split(' ').pop()}`;
        } else if (message.includes('¡Nueva categoría desbloqueada:')) {
            const categoryName = message.split(': ')[1].split(' ')[0];
            const translatedCategory = (window.getText || function(key) { return key; })(categoryName.toLowerCase()) || categoryName;
            message = `${(window.getText || function(key) { return key; })('notifCategoryUnlocked')} ${translatedCategory}`;
        } else if (message.includes('¡Logro desbloqueado:')) {
            const achievementName = message.split(': ')[1].split(' ')[0];
            message = `${(window.getText || function(key) { return key; })('notifAchievementUnlocked')} ${achievementName}`;
        } else if (message === 'No tienes más power-ups de este tipo') {
            message = (window.getText || function(key) { return key; })('notifNoPowerUps');
        } else if (message.includes('segundos añadidos')) {
            const seconds = message.split(' ')[0];
            message = `${seconds}${(window.getText || function(key) { return key; })('notifExtraTime')}`;
        } else if (message.includes('Pista adicional añadida:')) {
            const emoji = message.split(': ')[1];
            message = `${(window.getText || function(key) { return key; })('notifExtraHint')} ${emoji}`;
        } else if (message === 'No hay más pistas disponibles para esta pregunta') {
            message = (window.getText || function(key) { return key; })('notifNoMoreHints');
        }
        
        // Eliminar notificación anterior si existe
        this.clearNotification();
        
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        
        // Añadir clase según el tipo
        if (type === 'error') {
            notification.style.backgroundColor = 'var(--wrong-color)';
        } else if (type === 'success') {
            notification.style.backgroundColor = 'var(--correct-color)';
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Establecer temporizador para eliminar
        this.notificationTimeout = setTimeout(() => {
            this.clearNotification();
        }, 3000);
    }
    
    /**
     * Elimina cualquier notificación activa
     */
    clearNotification() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = null;
        }
    }
    
    /**
     * Actualiza las estadísticas finales en la pantalla de fin del juego
     * @param {number} score - Puntuación final
     * @param {number} correctAnswers - Respuestas correctas
     * @param {number} wrongAnswers - Respuestas incorrectas
     * @param {number} level - Nivel alcanzado
     * @param {number} maxStreak - Racha máxima
     */
    updateFinalStats(score, correctAnswers, wrongAnswers, level, maxStreak) {
        this.finalScoreElement.textContent = score;
        this.correctAnswersElement.textContent = correctAnswers;
        this.wrongAnswersElement.textContent = wrongAnswers;
        this.finalLevelElement.textContent = level;
        this.maxStreakElement.textContent = maxStreak;
    }
    
    /**
     * Muestra el diálogo de pausa
     */
    showPauseModal() {
        this.pauseModal.classList.remove('hidden');
    }
    
    /**
     * Oculta el diálogo de pausa
     */
    hidePauseModal() {
        this.pauseModal.classList.add('hidden');
    }
    
    /**
     * Actualiza la UI de configuración
     * @param {boolean} soundEnabled - Sonido habilitado
     * @param {number} soundVolume - Volumen de efectos (0-1)
     * @param {boolean} musicEnabled - Música habilitada
     * @param {number} musicVolume - Volumen de música (0-1)
     * @param {boolean} crtEffectEnabled - Efecto CRT habilitado
     * @param {string} difficulty - Dificultad
     */
    updateSettingsUI(soundEnabled, soundVolume, musicEnabled, musicVolume, crtEffectEnabled, difficulty) {
        // Actualizar interruptores
        document.getElementById('sound-toggle').checked = soundEnabled;
        document.getElementById('music-toggle').checked = musicEnabled;
        document.getElementById('crt-effect-toggle').checked = crtEffectEnabled;
        
        // Actualizar controles de volumen
        document.getElementById('sound-volume').value = soundVolume * 100;
        document.getElementById('music-volume').value = musicVolume * 100;
        
        // Actualizar selector de dificultad
        document.getElementById('difficulty-selector').value = difficulty;
        
        // Actualizar efecto CRT
        const crtEffect = document.querySelector('.crt-effect');
        if (crtEffect) {
            crtEffect.style.display = crtEffectEnabled ? 'block' : 'none';
        }
        
        // Actualizar selector de idioma en ajustes
        if (this.languageSelectorSettings) {
            this.languageSelectorSettings.value = currentLanguage;
        }
    }
    
    /**
     * Inicializa la pantalla de categorías
     */
    initCategoriesScreen() {
        const categoriesGrid = document.getElementById('categories-grid');
        if (!categoriesGrid || !window.gameData || !window.gameData.categories) return;
        
        // Limpiar el contenido actual
        categoriesGrid.innerHTML = '';
        
        // Añadir todas las categorías
        window.gameData.categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');
            
            // Si está bloqueada, añadir clase adicional
            if (!category.unlocked) {
                categoryCard.classList.add('locked');
            }
            
            // Estilos personalizados
            categoryCard.style.borderColor = category.color;
            
            // Obtener el nombre traducido de la categoría
            const translatedName = (window.getText || function(key) { return key; })(category.id) || category.name;
            
            // Contenido
            categoryCard.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <div class="category-name">${translatedName}</div>
                ${!category.unlocked ? `<div class="lock-icon">🔒<br>${(window.getText || function(key) { return key; })('categoryLocked')} ${category.unlockLevel}</div>` : ''}
            `;
            
            // Añadir evento solo si está desbloqueada
            if (category.unlocked) {
                categoryCard.addEventListener('click', () => {
                    // Reproducir sonido de clic
                    if (window.audio) window.audio.play('click');
                    
                    // Aquí se podría implementar la selección de categoría
                    // Por ahora solo mostraremos la información
                    this.showNotification(`${(window.getText || function(key) { return key; })('categoryLabel')} ${translatedName}`);
                });
            }
            
            categoriesGrid.appendChild(categoryCard);
        });
    }
    
    /**
     * Genera y muestra la lista de logros
     */
    initAchievementsScreen() {
        const achievementsGrid = document.getElementById('achievements-grid');
        if (!achievementsGrid || !window.gameData || !window.gameData.achievements) return;
        
        // Limpiar el contenido actual
        achievementsGrid.innerHTML = '';
        
        // Separar logros desbloqueados y bloqueados
        const unlockedAchievements = [];
        const lockedAchievements = [];
        
        window.gameData.achievements.forEach(achievement => {
            if (window.game && window.game.unlockedAchievements && window.game.unlockedAchievements.includes(achievement.id)) {
                unlockedAchievements.push(achievement);
            } else {
                lockedAchievements.push(achievement);
            }
        });
        
        // Contador de logros totales
        const totalCount = document.createElement('div');
        totalCount.className = 'achievements-counter';
        totalCount.innerHTML = `
            <span>${(window.getText || function(key) { return key; })('achievements')} ${unlockedAchievements.length}/${window.gameData.achievements.length}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${(unlockedAchievements.length / window.gameData.achievements.length) * 100}%"></div>
            </div>
        `;
        achievementsGrid.appendChild(totalCount);
        
        // Si hay logros desbloqueados, mostrarlos primero
        if (unlockedAchievements.length > 0) {
            const unlockTitle = document.createElement('h3');
            unlockTitle.textContent = (window.getText || function(key) { return key; })('achievementsUnlocked');
            unlockTitle.className = 'achievements-section-title';
            achievementsGrid.appendChild(unlockTitle);
            
            unlockedAchievements.forEach(achievement => {
                const achievementCard = this.createAchievementCard(achievement, false);
                achievementsGrid.appendChild(achievementCard);
            });
        } else {
            // Si no hay logros desbloqueados, mostrar mensaje
            const noAchievementsMsg = document.createElement('div');
            noAchievementsMsg.className = 'no-achievements-message';
            noAchievementsMsg.innerHTML = `
                <p>${(window.getText || function(key) { return key; })('noAchievementsUnlocked')}</p>
                <p>${(window.getText || function(key) { return key; })('unlockMoreAchievements')}</p>
            `;
            achievementsGrid.appendChild(noAchievementsMsg);
        }
        
        // Mostrar logros bloqueados
        if (lockedAchievements.length > 0) {
            const lockedTitle = document.createElement('h3');
            lockedTitle.textContent = (window.getText || function(key) { return key; })('achievementsLocked');
            lockedTitle.className = 'achievements-section-title';
            achievementsGrid.appendChild(lockedTitle);
            
            lockedAchievements.forEach(achievement => {
                const achievementCard = this.createAchievementCard(achievement, true);
                achievementsGrid.appendChild(achievementCard);
            });
        }
    }
    
    /**
     * Crea una tarjeta de logro
     * @param {Object} achievement - Datos del logro
     * @param {boolean} locked - Si el logro está bloqueado
     * @returns {HTMLElement} - Elemento de la tarjeta de logro
     */
    createAchievementCard(achievement, locked) {
        const card = document.createElement('div');
        card.className = 'achievement-card';
        card.dataset.id = achievement.id;
        
        if (locked) {
            card.classList.add('locked');
        } else {
            card.classList.add('unlocked');
        }
        
        // Obtener progreso si está disponible
        let progressHTML = '';
        if (locked && typeof game !== 'undefined') {
            // Intentamos extraer el progreso basado en la condición del logro
            const progressInfo = this.getAchievementProgress(achievement);
            if (progressInfo) {
                progressHTML = `
                    <div class="achievement-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${progressInfo.percentage}%"></div>
                        </div>
                        <div class="progress-text">${progressInfo.current}/${progressInfo.target}</div>
                    </div>
                `;
            }
        }
        
        // Contenido de la tarjeta
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${progressHTML}
        `;
        
        return card;
    }
    
    /**
     * Obtiene información de progreso para un logro
     * @param {Object} achievement - El logro del que obtener progreso
     * @returns {Object|null} - Información de progreso o null si no se puede calcular
     */
    getAchievementProgress(achievement) {
        if (!game) return null;
        
        // Extraer valores de la condición
        const condition = achievement.condition;
        let current = 0;
        let target = 0;
        
        // Procesar diferentes tipos de condiciones
        if (condition.includes('correctAnswers')) {
            current = window.game.correctAnswers || 0;
            target = parseInt(condition.match(/\d+/)[0]);
            return { current, target, percentage: Math.min(100, (current / target) * 100) };
        } 
        else if (condition.includes('streak')) {
            current = window.game.streak || 0;
            target = parseInt(condition.match(/\d+/)[0]);
            return { current, target, percentage: Math.min(100, (current / target) * 100) };
        }
        else if (condition.includes('level')) {
            current = window.game.level || 1;
            target = parseInt(condition.match(/\d+/)[0]);
            return { current, target, percentage: Math.min(100, (current / target) * 100) };
        }
        else if (condition.includes('correctAnswersByCategory')) {
            // Determinar qué categoría
            const categoryMatch = condition.match(/correctAnswersByCategory\.(\w+)/);
            if (categoryMatch && categoryMatch[1]) {
                const category = categoryMatch[1];
                current = window.game.correctAnswersByCategory && window.game.correctAnswersByCategory[category] || 0;
                target = parseInt(condition.match(/\d+/)[0]);
                return { current, target, percentage: Math.min(100, (current / target) * 100) };
            }
        }
        else if (condition.includes('score')) {
            current = window.game.score || 0;
            target = parseInt(condition.match(/\d+/)[0]);
            return { current, target, percentage: Math.min(100, (current / target) * 100) };
        }
        
        return null;
    }
}

// Exportar la clase UI
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
