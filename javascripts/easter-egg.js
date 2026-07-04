/**
 * EdTech Documentation Easter Eggs
 * "Porque documentação também pode ser divertida"
 */

// 1. Console Message Easter Egg
console.log(
  "%c🕵️‍♂️ Olá, Padawan! %c\nVocê achou o console! Se você está lendo isso, a força é forte em você.\nLembre-se: O código não é apenas lógica, é arte pura. 🚀\n\nDica: Já tentou o clássico código da Konami nas setinhas do teclado?",
  "color: #ea80fc; font-size: 22px; font-weight: bold; text-shadow: 1px 1px 2px #4a148c;",
  "color: #b39ddb; font-size: 14px;"
);

// 2. Konami Code Easter Egg
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  // Ignora se estiver digitando na barra de busca
  if (e.target.tagName.toLowerCase() === 'input') return;

  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerKonamiEasterEgg();
      konamiIndex = 0;
    }
  } else {
    // Reseta, mas checa se a tecla pressionada é o início do código (para não frustrar erros rápidos)
    konamiIndex = e.key === konamiCode[0] ? 1 : 0;
  }
});

function triggerKonamiEasterEgg() {
  console.log("%c[EASTER EGG ATIVADO]", "color: #00ff00; font-weight: bold;");
  
  alert("🔓 Acesso Root Temporário Concedido...\nBrincadeira! Parabéns por encontrar o Easter Egg do Konami Code! 🎮✨");
  
  // Chuva de Sparks / Estrelinhas (Seguro para o layout)
  const emojis = ['✨', '🚀', '🎓', '📚', '💜', '🔥'];
  
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div');
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    el.innerHTML = randomEmoji;
    el.style.position = 'fixed';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-50px';
    el.style.fontSize = (Math.random() * 24 + 16) + 'px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none'; // não bloqueia cliques na tela
    
    // Animação CSS inline via transition
    const duration = Math.random() * 3 + 2; 
    el.style.transition = `top ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}s linear`;
    
    document.body.appendChild(el);
    
    // Dispara a animação logo no próximo frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.top = '120vh'; // Cai até passar do fim da tela
        el.style.transform = `rotate(${Math.random() * 1080 - 540}deg)`;
      }, 50);
    });
    
    // Limpa a memória depois da animação
    setTimeout(() => {
      el.remove();
    }, duration * 1000 + 500);
  }
}
