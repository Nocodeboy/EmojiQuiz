import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialTime, onTimeUp, isActive) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef(null);
  const bonusTimeRef = useRef(0);

  const reset = useCallback((newTime) => {
    setTimeLeft(newTime || initialTime);
    bonusTimeRef.current = 0;
  }, [initialTime]);

  const addTime = useCallback((seconds) => {
    bonusTimeRef.current += seconds;
    setTimeLeft(prev => prev + seconds);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      pause();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, onTimeUp, pause]);

  const percentage = (timeLeft / (initialTime + bonusTimeRef.current)) * 100;

  return { timeLeft, percentage: Math.min(100, percentage), reset, addTime, pause };
}
