// Leaderboard management module
class Leaderboard {
    constructor() {
        this.apiUrl = '/api/leaderboard';
    }

    // Submit score to leaderboard
    async submitScore(scoreData) {
        try {
            console.log('Submitting score data:', scoreData);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scoreData)
            });

            console.log('Submit response status:', response.status);
            console.log('Submit response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Submit error response:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('Submit success response:', result);
            return result;
        } catch (error) {
            console.error('Error submitting score:', error);
            throw error;
        }
    }

    // Get top scores
    async getTopScores() {
        try {
            console.log('Fetching leaderboard from:', this.apiUrl);
            const response = await fetch(this.apiUrl);
            
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Leaderboard data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            throw error;
        }
    }

    // Show score submission modal
    showScoreSubmissionModal(gameData) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content score-submission">
                <h2>🏆 ¡Excelente Puntuación!</h2>
                <div class="score-summary">
                    <div class="final-score">${gameData.score.toLocaleString()} puntos</div>
                    <div class="game-stats">
                        <span>Nivel: ${gameData.level}</span>
                        <span>Logros: ${gameData.achievementsUnlocked}</span>
                    </div>
                </div>
                <div class="player-name-input">
                    <label for="playerName">Tu nombre para el ranking:</label>
                    <input type="text" id="playerName" maxlength="20" placeholder="Ingresa tu nombre">
                </div>
                <div class="modal-buttons">
                    <button id="submitScoreBtn" class="btn btn-primary">
                        💾 Guardar en Ranking
                    </button>
                    <button id="skipScoreBtn" class="btn btn-secondary">
                        ⏭️ Omitir
                    </button>
                </div>
                <div id="submissionStatus" class="submission-status"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        const submitBtn = modal.querySelector('#submitScoreBtn');
        const skipBtn = modal.querySelector('#skipScoreBtn');
        const nameInput = modal.querySelector('#playerName');
        const statusDiv = modal.querySelector('#submissionStatus');

        submitBtn.addEventListener('click', async () => {
            const playerName = nameInput.value.trim();
            
            if (!playerName) {
                statusDiv.innerHTML = '<span class="error">⚠️ Por favor ingresa tu nombre</span>';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Guardando...';

            try {
                const result = await this.submitScore({
                    playerName,
                    score: gameData.score,
                    level: gameData.level,
                    categoriesCompleted: gameData.categoriesCompleted || [],
                    achievementsUnlocked: gameData.achievementsUnlocked || 0,
                    gameMode: gameData.gameMode || 'normal'
                });

                statusDiv.innerHTML = `<span class="success">✅ ¡Puntuación guardada! Posición: #${result.rank || '?'}</span>`;
                
                setTimeout(() => {
                    document.body.removeChild(modal);
                    this.showLeaderboard();
                }, 2000);

            } catch (error) {
                statusDiv.innerHTML = '<span class="error">❌ Error al guardar. Inténtalo de nuevo.</span>';
                submitBtn.disabled = false;
                submitBtn.textContent = '💾 Guardar en Ranking';
            }
        });

        skipBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Auto-focus name input
        nameInput.focus();
    }

    // Show leaderboard screen
    async showLeaderboard() {
        try {
            const scores = await this.getTopScores();
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content leaderboard">
                    <h2>🏆 Ranking de Campeones</h2>
                    <div class="leaderboard-list">
                        ${this.renderScoresList(scores)}
                    </div>
                    <div class="modal-buttons">
                        <button id="closeLeaderboardBtn" class="btn btn-primary">
                            ✨ Cerrar
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('#closeLeaderboardBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

        } catch (error) {
            console.error('Error showing leaderboard:', error);
            
            // Show more specific error message
            let errorMessage = '❌ Error al cargar el ranking. ';
            if (error.message.includes('fetch')) {
                errorMessage += 'Problemas de conexión.';
            } else if (error.message.includes('500')) {
                errorMessage += 'Error del servidor.';
            } else if (error.message.includes('404')) {
                errorMessage += 'API no encontrada.';
            } else {
                errorMessage += 'Inténtalo más tarde.';
            }
            
            alert(errorMessage + '\n\nDetalles: ' + error.message);
        }
    }

    renderScoresList(scores) {
        if (!scores || scores.length === 0) {
            return '<div class="no-scores">🎯 ¡Sé el primero en el ranking!</div>';
        }

        return scores.map(score => `
            <div class="score-item rank-${score.rank}">
                <div class="rank">#${score.rank}</div>
                <div class="player-info">
                    <div class="player-name">${this.escapeHtml(score.playerName)}</div>
                    <div class="player-stats">
                        Nivel ${score.level} • ${score.achievementsUnlocked} logros
                    </div>
                </div>
                <div class="player-score">${score.score.toLocaleString()}</div>
                <div class="score-date">${this.formatDate(score.timestamp)}</div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        });
    }
}

// Make available globally
window.Leaderboard = Leaderboard;