// src/utils/scrollToSection.js
export function scrollToSection(id, { retries = 20, delay = 50 } = {}) {
  if (!id) return;
  let intentos = 0;

  const intentar = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    intentos += 1;
    if (intentos <= retries) setTimeout(intentar, delay);
  };

  intentar();
}

export default scrollToSection;
