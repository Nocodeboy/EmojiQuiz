import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from './hooks/useGame.js';
import { useAudio } from './hooks/useAudio.js';
import StartScreen from './components/screens/StartScreen.jsx';
import GameScreen from './components/screens/GameScreen.jsx';
import GameOverScreen from './components/screens/GameOverScreen.jsx';
import HowToPlayScreen from './components/screens/HowToPlayScreen.jsx';
import CategoriesScreen from './components/screens/CategoriesScreen.jsx';
import AchievementsScreen from './components/screens/AchievementsScreen.jsx';
import SettingsScreen from './components/screens/SettingsScreen.jsx';
import DailyChallengeScreen from './components/screens/DailyChallengeScreen.jsx';
import PauseModal from './components/ui/PauseModal.jsx';
import Notification from './components/ui/Notification.jsx';
import Background from './components/ui/Background.jsx';
import CRTEffect from './components/ui/CRTEffect.jsx';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [notification, setNotification] = useState(null);
  const [crtEnabled, setCrtEnabled] = useState(() =>
    localStorage.getItem('emojiQuiz_crt') !== 'false'
  );
  const [background, setBackground] = useState(() =>
    localStorage.getItem('emojiQuiz_background') || 'neon-grid'
  );

  const game = useGame();
  const audio = useAudio();
  const { t } = useTranslation();

  const showNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const handleStartGame = useCallback(() => {
    audio.play('click');
    game.startGame();
    audio.playBgMusic();
    setScreen('game');
  }, [audio, game]);

  const handleGameOver = useCallback(() => {
    audio.play('gameOver');
    audio.stopBgMusic();
    game.endGame();
    setScreen('gameover');
  }, [audio, game]);

  const handlePlayAgain = useCallback(() => {
    audio.play('click');
    handleStartGame();
  }, [audio, handleStartGame]);

  const handleMainMenu = useCallback(() => {
    audio.play('click');
    audio.stopBgMusic();
    game.setIsPlaying(false);
    game.setIsGameOver(false);
    setScreen('start');
  }, [audio, game]);

  const handleNavigate = useCallback((target) => {
    audio.play('click');
    setScreen(target);
  }, [audio]);

  // Watch for game over
  useEffect(() => {
    if (game.isGameOver && game.isPlaying) {
      handleGameOver();
    }
  }, [game.isGameOver, game.isPlaying, handleGameOver]);

  // Watch for level up notifications
  useEffect(() => {
    if (game.level > 1 && game.isPlaying) {
      audio.play('levelUp');
      showNotification(`${t('notifLevelUp')}${game.level}!`);
    }
  }, [game.level]);

  // Watch for new achievements
  useEffect(() => {
    if (game.newAchievement) {
      audio.play('achievement');
      showNotification(`${t('notifAchievementUnlocked')}${game.newAchievement.name}`);
    }
  }, [game.newAchievement]);

  useEffect(() => {
    localStorage.setItem('emojiQuiz_crt', String(crtEnabled));
    localStorage.setItem('emojiQuiz_background', background);
  }, [crtEnabled, background]);

  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartScreen onPlay={handleStartGame} onNavigate={handleNavigate} />;
      case 'game':
        return (
          <GameScreen
            game={game}
            audio={audio}
            onPause={() => game.setIsPaused(true)}
            showNotification={showNotification}
          />
        );
      case 'gameover':
        return (
          <GameOverScreen
            game={game}
            onPlayAgain={handlePlayAgain}
            onMainMenu={handleMainMenu}
          />
        );
      case 'howtoplay':
        return <HowToPlayScreen onBack={() => handleNavigate('start')} />;
      case 'categories':
        return <CategoriesScreen level={game.level} onBack={() => handleNavigate('start')} />;
      case 'achievements':
        return (
          <AchievementsScreen
            unlockedIds={game.unlockedAchievements}
            onBack={() => handleNavigate('start')}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            audio={audio}
            crtEnabled={crtEnabled}
            setCrtEnabled={setCrtEnabled}
            background={background}
            setBackground={setBackground}
            onBack={() => handleNavigate('start')}
          />
        );
      case 'daily':
        return (
          <DailyChallengeScreen
            audio={audio}
            game={game}
            onBack={() => handleNavigate('start')}
            showNotification={showNotification}
          />
        );
      default:
        return <StartScreen onPlay={handleStartGame} onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Background type={background} />
      {crtEnabled && <CRTEffect />}
      <div id="game-container" role="main">
        {renderScreen()}
      </div>
      {game.isPaused && (
        <PauseModal
          onContinue={() => { audio.play('click'); game.setIsPaused(false); }}
          onRestart={handlePlayAgain}
          onExit={handleMainMenu}
        />
      )}
      {notification && <Notification message={notification} />}
    </>
  );
}
