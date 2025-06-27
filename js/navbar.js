document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  const circle = document.getElementById("circle");

  let scrollLock = false;

  function updateCirclePosition(link) {
    const parent = link.parentElement;
    const offsetLeft = parent.offsetLeft;
    const width = parent.offsetWidth;
    circle.style.left = `${offsetLeft}px`;
    circle.style.width = `${width}px`;
  }

  // Al hacer clic
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      scrollLock = true; // Bloqueamos observer momentáneamente
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateCirclePosition(link);

      // Desbloqueamos tras un pequeño tiempo
      setTimeout(() => {
        scrollLock = false;
      }, 1000); // puedes ajustar el tiempo si hace falta
    });
  });

  // Observer para scroll
  const observer = new IntersectionObserver(
    (entries) => {
      if (scrollLock) return; // Si hay scroll por clic, ignorar

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            links.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
            updateCirclePosition(activeLink);
          }
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  sections.forEach(section => observer.observe(section));

  // Al cargar y redimensionar
  const reposition = () => {
    const active = document.querySelector('.nav-link.active');
    if (active) updateCirclePosition(active);
  };
  window.addEventListener('load', reposition);
  window.addEventListener('resize', reposition);
});
