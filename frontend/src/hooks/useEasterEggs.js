import { useState, useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function useEasterEggs() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [hyperdriveActivated, setHyperdriveActivated] = useState(false);
  const [, setLogoClicks] = useState(0); // Removed unused read
  const [, setKeySequence] = useState([]); // Removed unused read
  
  const clickTimeoutRef = useRef(null);
  const hyperdriveTimeoutRef = useRef(null);

  // Konami Code Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence((prev) => {
        const nextSeq = [...prev, e.key].slice(-10); // Keep last 10 keystrokes
        
        // Check if matches exactly
        const isMatch = nextSeq.every((key, index) => 
          key.toLowerCase() === KONAMI_CODE[index].toLowerCase()
        );

        if (isMatch && nextSeq.length === KONAMI_CODE.length) {
          setKonamiActivated(true);
          // Auto-reset after a while
          setTimeout(() => setKonamiActivated(false), 5000);
          return [];
        }
        
        return nextSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Logo Clicks (Hyperdrive) - Logic moved entirely to handler to avoid setState in effect
  const handleLogoClick = () => {
    if (hyperdriveActivated) return; // Ignore clicks if already hyperdrive

    setLogoClicks(prev => {
      const nextClicks = prev + 1;
      
      // Clear idle timeout
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      
      if (nextClicks >= 5) {
        setHyperdriveActivated(true);
        if (hyperdriveTimeoutRef.current) clearTimeout(hyperdriveTimeoutRef.current);
        hyperdriveTimeoutRef.current = setTimeout(() => {
          setHyperdriveActivated(false);
          setLogoClicks(0);
        }, 10000);
        return 0;
      } else {
        // Set idle timeout to reset clicks if user pauses
        clickTimeoutRef.current = setTimeout(() => {
          setLogoClicks(0);
        }, 1500);
        return nextClicks;
      }
    });
  };

  // ASCII Console Message
  useEffect(() => {
    console.log(
      "%c🚀 BEM-VINDO À GOVERNANÇA EDTECH! 🚀", 
      "color: #8b5cf6; font-size: 20px; font-weight: bold; background: #1c093a; padding: 10px; border-radius: 5px;"
    );
    console.log(
      "%cVocê encontrou nosso terminal secreto. Se você está lendo isso, tem olho clínico para detalhes. 😉", 
      "color: #10b981; font-size: 14px;"
    );
    console.log(
      `
      ______    _______             _ 
     |  ____|  |__   __|           | |
     | |__   __| || | ___  ___| |__  
     |  __| / _\` || |/ _ \\/ __| '_ \\ 
     | |___| (_| || |  __/ (__| | | |
     |______\\__,_||_|\\___|\\___|_| |_|
      `
    );
  }, []);

  return {
    konamiActivated,
    hyperdriveActivated,
    handleLogoClick,
  };
}
