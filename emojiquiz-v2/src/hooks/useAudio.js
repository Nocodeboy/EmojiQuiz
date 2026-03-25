import { useRef, useCallback, useEffect, useState } from 'react';

const SOUNDS = {
  click: '/sounds/click.mp3',
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  gameOver: '/sounds/game-over.mp3',
  levelUp: '/sounds/level-up.mp3',
  countdown: '/sounds/countdown.mp3',
  powerup: '/sounds/powerup.mp3',
  achievement: '/sounds/achievement.mp3',
};

export function useAudio() {
  const audioCache = useRef({});
  const bgMusicRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(() =>
    localStorage.getItem('emojiQuiz_soundEnabled') !== 'false'
  );
  const [musicEnabled, setMusicEnabled] = useState(() =>
    localStorage.getItem('emojiQuiz_musicEnabled') !== 'false'
  );
  const [soundVolume, setSoundVolume] = useState(() =>
    parseFloat(localStorage.getItem('emojiQuiz_soundVolume') || '0.7')
  );
  const [musicVolume, setMusicVolume] = useState(() =>
    parseFloat(localStorage.getItem('emojiQuiz_musicVolume') || '0.4')
  );

  const getAudio = useCallback((name) => {
    if (!audioCache.current[name] && SOUNDS[name]) {
      audioCache.current[name] = new Audio(SOUNDS[name]);
    }
    return audioCache.current[name];
  }, []);

  const play = useCallback((name) => {
    if (!soundEnabled) return;
    try {
      const audio = getAudio(name);
      if (audio) {
        audio.volume = soundVolume;
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    } catch {}
  }, [soundEnabled, soundVolume, getAudio]);

  const playBgMusic = useCallback(() => {
    if (!musicEnabled) return;
    try {
      if (!bgMusicRef.current) {
        bgMusicRef.current = new Audio('/sounds/background.mp3');
        bgMusicRef.current.loop = true;
      }
      bgMusicRef.current.volume = musicVolume;
      bgMusicRef.current.play().catch(() => {});
    } catch {}
  }, [musicEnabled, musicVolume]);

  const stopBgMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emojiQuiz_soundEnabled', String(soundEnabled));
    localStorage.setItem('emojiQuiz_musicEnabled', String(musicEnabled));
    localStorage.setItem('emojiQuiz_soundVolume', String(soundVolume));
    localStorage.setItem('emojiQuiz_musicVolume', String(musicVolume));

    if (bgMusicRef.current) {
      bgMusicRef.current.volume = musicVolume;
      if (!musicEnabled) bgMusicRef.current.pause();
    }
  }, [soundEnabled, musicEnabled, soundVolume, musicVolume]);

  return {
    play, playBgMusic, stopBgMusic,
    soundEnabled, setSoundEnabled, musicEnabled, setMusicEnabled,
    soundVolume, setSoundVolume, musicVolume, setMusicVolume,
  };
}
