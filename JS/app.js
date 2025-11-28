// ANIMACIONES EN SCROLL
const animatedItems = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: "0px 0px -30% 0px",
  threshold: 0.25
});

animatedItems.forEach(item => observer.observe(item));


function startCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  // Ajuste de velocidad según el tamaño del número
  let speed;

  if (target >= 1000) {
    speed = target / 80;   // velocidad normal
  } else if (target >= 100) {
    speed = target / 150;   // un poco más lento
  } else {
    speed = target / 200;   // números pequeños: mucho más lento
  }

  function update() {
    if (count < target) {
      count += speed;
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  }

  update();
}

function checkCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !counter.classList.contains("counted")) {
      counter.classList.add("counted");
      startCounter(counter);
    }
  });
}

window.addEventListener("scroll", checkCounters);
window.addEventListener("load", checkCounters);