import { useState, useEffect } from 'react';
const useTheme = () => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema')
      ? localStorage.getItem('tema')
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    document.documentElement.setAttribute('data-bs-theme', tema);
    localStorage.setItem('tema', tema);
  }, [tema]);
  const toggleTheme = () => {
    if (tema === 'dark') {
      setTema('light');
    } else {
      setTema('dark');
    }
  };
  return { tema, toggleTheme };
};
export default useTheme;
