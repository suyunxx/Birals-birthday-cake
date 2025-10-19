const candles = document.querySelectorAll('.candle');
let blown = false;

// Trigger confetti only after blowing candles
candles.forEach(candle => {
  candle.addEventListener('click', () => {
    if (!blown) {
      blown = true;
      startConfetti();
      candles.forEach(c => c.style.background = 'gray'); // extinguish candles
    }
  });
});

// Basic confetti animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random()*360}, 100%, 50%)`
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;
  });
  requestAnimationFrame(updateConfetti);
}
