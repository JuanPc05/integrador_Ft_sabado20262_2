// src/core/ScrollToHash.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    let intentos = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearInterval(timer);
      } else if (++intentos > 30) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;