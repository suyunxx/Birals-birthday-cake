// Candles blow detection
const miniCandles = document.querySelectorAll('.mini-candle');
const numberCandle = document.querySelector('.number-candle');

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream=>{
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function detectBlow(){
    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a,b)=>a+b,0);
    if(sum > 1200){
      miniCandles.forEach(c=>c.style.boxShadow='none');
      numberCandle.style.boxShadow='none';
      triggerConfetti();
    } else {
      miniCandles.forEach(c=>c.style.boxShadow='0 0 10px #fff');
      numberCandle.style.boxShadow='0 0 10px #fff';
    }
    requestAnimationFrame(detectBlow);
  }
  detectBlow();
}).catch(err=>console.log('Mic access denied', err));

// Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confettiParticles = [];
function triggerConfetti(){
  for(let i=0;i<120;i++){
    confettiParticles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height/2,
      r: Math.random()*6+2,
      d: Math.random()*10+5,
      color: `hsl(${Math.random()*360}, 100%, 70%)`,
      tilt: Math.random()*10-10
    });
  }
}
function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiParticles.forEach((p,i)=>{
    ctx.beginPath();
    ctx.fillStyle=p.color;
    ctx.moveTo(p.x+p.tilt, p.y);
    ctx.lineTo(p.x+p.tilt+p.r/2, p.y+p.r);
    ctx.lineTo(p.x+p.tilt-p.r/2, p.y+p.r);
    ctx.fill();
    p.y+=2;
    if(p.y>canvas.height) confettiParticles.splice(i,1);
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

// Balloons pop
const balloons = document.querySelectorAll('.balloon');
balloons.forEach(b=>{
  b.addEventListener('click',()=>{
    b.remove();
    const audio = new Audio('pop.mp3'); // add pop.mp3 to repo
    audio.play();
  });
});
