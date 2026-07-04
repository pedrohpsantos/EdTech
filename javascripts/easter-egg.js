/**
 * EdTech Documentation - Original Easter Eggs
 */

// EASTER EGG 1: O "Panic Mode" (Susto Acadêmico)
// Acionado digitando: p a n i c o
let panicCode = 'panico';
let panicBuffer = '';

// EASTER EGG 2: Caffeine Rush
// Acionado digitando: c a f e
let coffeeCode = 'cafe';
let coffeeBuffer = '';

document.addEventListener('keydown', (e) => {
  if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;

  const key = e.key.toLowerCase();
  
  // Buffer for Panic
  panicBuffer += key;
  if (panicBuffer.length > panicCode.length) {
    panicBuffer = panicBuffer.slice(-panicCode.length);
  }
  if (panicBuffer === panicCode) {
    triggerAcademicPanic();
    panicBuffer = '';
  }

  // Buffer for Coffee
  coffeeBuffer += key;
  if (coffeeBuffer.length > coffeeCode.length) {
    coffeeBuffer = coffeeBuffer.slice(-coffeeCode.length);
  }
  if (coffeeBuffer === coffeeCode) {
    triggerCaffeineRush();
    coffeeBuffer = '';
  }
});

function triggerAcademicPanic() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = '#d32f2f';
  overlay.style.color = '#fff';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontFamily = 'monospace';
  overlay.style.textAlign = 'center';
  overlay.style.padding = '2rem';
  
  overlay.innerHTML = `
    <h1 style="font-size: 4rem; margin-bottom: 1rem; color: #fff;">🚨 ALERTA CRÍTICO 🚨</h1>
    <h2 style="font-size: 2rem; color: #fff;" id="panic-text">LIMPANDO BANCO DE DADOS DE TESES E DISSERTAÇÕES...</h2>
    <div style="width: 80%; max-width: 600px; height: 30px; background: rgba(0,0,0,0.5); border-radius: 15px; margin-top: 2rem; overflow: hidden; border: 2px solid #fff;">
      <div id="panic-bar" style="width: 0%; height: 100%; background: #ffeb3b; transition: width 0.1s linear;"></div>
    </div>
    <p style="margin-top: 1rem; font-size: 1.5rem; font-weight: bold;" id="panic-pct">0%</p>
  `;
  
  document.body.appendChild(overlay);

  // Adiciona estilo de tremor (Shake) ao body
  if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.innerHTML = `
      @keyframes panicShake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
      }
      .panic-mode {
        animation: panicShake 0.1s infinite;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.classList.add('panic-mode');

  // Progresso da barra de "deleção"
  let pct = 0;
  const bar = document.getElementById('panic-bar');
  const pctText = document.getElementById('panic-pct');
  
  const interval = setInterval(() => {
    pct += Math.random() * 5;
    if (pct >= 99) {
      pct = 99;
      clearInterval(interval);
      
      setTimeout(() => {
        document.body.classList.remove('panic-mode');
        overlay.style.backgroundColor = '#388e3c'; // Muda para verde
        overlay.innerHTML = `
          <h1 style="font-size: 4rem; margin-bottom: 1rem; color: #fff;">😅 CALMA! 😅</h1>
          <h2 style="font-size: 2rem; color: #fff;">Foi só uma brincadeira (Easter Egg).</h2>
          <p style="font-size: 1.2rem; color: #fff; max-width: 600px; line-height: 1.5; margin-top: 1rem;">
            Nossos logs imutáveis e o Isolamento Estrito impedem que qualquer tese seja apagada indevidamente. 
            Seus dados estão protegidos por criptografia de ponta! 🛡️
          </p>
        `;
        
        setTimeout(() => {
          overlay.style.transition = "opacity 1s ease";
          overlay.style.opacity = "0";
          setTimeout(() => overlay.remove(), 1000);
        }, 5000);
        
      }, 1500);
    }
    
    bar.style.width = pct + '%';
    pctText.innerText = Math.floor(pct) + '%';
  }, 50);
}

function triggerCaffeineRush() {
  if (!document.getElementById('coffee-style')) {
    const style = document.createElement('style');
    style.id = 'coffee-style';
    style.innerHTML = `
      @keyframes caffeineVibrate {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px) translateY(2px); }
        50% { transform: translateX(4px) translateY(-2px); }
        75% { transform: translateX(-4px) translateY(-2px); }
      }
      .caffeine-mode {
        animation: caffeineVibrate 0.15s infinite;
        filter: saturate(200%) hue-rotate(10deg);
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.classList.add('caffeine-mode');
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const mug = document.createElement('div');
      mug.innerText = '☕';
      mug.style.position = 'fixed';
      mug.style.fontSize = (Math.random() * 40 + 30) + 'px';
      mug.style.left = (Math.random() * 100) + 'vw';
      mug.style.bottom = '-100px';
      mug.style.zIndex = '9999';
      mug.style.transition = 'all 1.5s ease-out';
      document.body.appendChild(mug);
      
      requestAnimationFrame(() => {
        mug.style.bottom = '120vh';
        mug.style.transform = 'rotate(' + (Math.random() * 720 - 360) + 'deg) scale(' + (Math.random() * 1.5 + 0.5) + ')';
      });
      
      setTimeout(() => mug.remove(), 2000);
    }, i * 150);
  }
  
  setTimeout(() => {
    document.body.classList.remove('caffeine-mode');
  }, 5000);
}
