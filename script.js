document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ script.js cargado y ejecutado");
  
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;
    let current = 0;
    let interval;
    const counter = document.getElementById('counter');
    const bar = document.getElementById('progress-bar');
    const nav = document.querySelector('nav');
    let hideTimeout;
  
    // Actualiza el contador y la barra de progreso
    function update() {
      counter.textContent = `${current + 1} / ${total}`;
      bar.style.width = `${((current + 1) / total) * 100}%`;
    }
  
    // Reinicia la animación de fade-out del contador
    function resetCounterAnimation() {
      counter.classList.remove('fade-counter');
      // Fuerza reflow para reiniciar la animación
      void counter.offsetWidth;
      counter.classList.add('fade-counter');
    }
  
    // Muestra el slide indicado
    function show(index) {
      slides.forEach(s => s.classList.remove('active'));
      current = index;
      slides[current].classList.add('active');
      update();
      resetCounterAnimation();
    }
  
    // Muestra u oculta la barra de navegación inferior
    function showNav() {
      nav.classList.add('visible');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        nav.classList.remove('visible');
      }, 2000);
    }
  
    // Botones de navegación
    document.getElementById('nextBtn')
      .addEventListener('click', () => show((current + 1) % total));
  
    document.getElementById('prevBtn')
      .addEventListener('click', () => show((current - 1 + total) % total));
  
    // Play / Pause automático
    document.getElementById('playPause')
      .addEventListener('click', function() {
        if (interval) {
          clearInterval(interval);
          interval = null;
          this.textContent = '▶';
        } else {
          interval = setInterval(() => show((current + 1) % total), 4000);
          this.textContent = '❚❚';
        }
      });
  
    // Navegación con teclado
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') show((current + 1) % total);
      if (e.key === 'ArrowLeft')  show((current - 1 + total) % total);
      if (e.key === ' ')           document.getElementById('playPause').click();
    });
  
    // Mostrar barra de navegación al mover el mouse
    document.addEventListener('mousemove', showNav);
  
    // Inicialización: arranca en la slide marcada con .active
    const initial = Array.from(slides).findIndex(s => s.classList.contains('active'));
    show(initial >= 0 ? initial : 0);
  });
  