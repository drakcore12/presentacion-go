document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ script.js cargado y ejecutado");

  const slides = document.querySelectorAll('.slide');
  const total  = slides.length;
  let current  = 0;
  let interval;
  const counter = document.getElementById('counter');
  const bar     = document.getElementById('progress-bar');
  const nav     = document.querySelector('nav');
  let hideTimeout;

  function update() {
    counter.textContent = `${current + 1} / ${total}`;
    bar.style.width = `${((current + 1) / total) * 100}%`;
  }

  function resetCounterAnimation() {
    counter.classList.remove('fade-counter');
    void counter.offsetWidth; 
    counter.classList.add('fade-counter');
  }

  function show(index) {
    slides[current].classList.remove('active');
    slides[index].classList.add('active');
    current = index;
    update();
    resetCounterAnimation();
  }  

  function showNav() {
    nav.classList.add('visible');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      nav.classList.remove('visible');
    }, 2000);
  }

  document.getElementById('nextBtn')
    .addEventListener('click', () => show((current + 1) % total));

  document.getElementById('prevBtn')
    .addEventListener('click', () => show((current - 1 + total) % total));

  document.getElementById('playPause')
    .addEventListener('click', function () {
      if (interval) {
        clearInterval(interval);
        interval = null;
        this.textContent = '▶';
      } else {
        interval = setInterval(() => show((current + 1) % total), 4000);
        this.textContent = '❚❚';
      }
    });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') show((current + 1) % total);
    if (e.key === 'ArrowLeft')  show((current - 1 + total) % total);
    if (e.key === ' ')          document.getElementById('playPause').click();
  });

  document.addEventListener('mousemove', showNav);

  // Inicialización: encuentra slide con .active o por defecto 0
  slides.forEach((s,i) => {
    if (s.classList.contains('active')) current = i;
  });
  if (!slides[current].classList.contains('active')) {
    slides[0].classList.add('active');
    current = 0;
  }
  update();
  resetCounterAnimation();
});
