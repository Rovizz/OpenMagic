// Modern interactions: Scroll Reveal & 3D Tilt Cards

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  
  if (document.getElementById('tsparticles')) {
    initParticles();
    init3DCardInteractive();
  }

  // We use a MutationObserver to apply tilt to dynamically injected cards
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        initTiltEffects();
      }
    });
  });
  
  const resultsGrid = document.getElementById('results-grid');
  if (resultsGrid) {
    observer.observe(resultsGrid, { childList: true, subtree: true });
  }
  
  // Also run once just in case
  setTimeout(initTiltEffects, 500);
});

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger effect based on index if multiple items appear
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
}

function initTiltEffects() {
  const cards = document.querySelectorAll('.glow-card');
  
  cards.forEach(card => {
    // Avoid double attaching
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = "true";

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

function init3DCardInteractive() {
  const card = document.querySelector('.magic-card-3d');
  const hero = document.getElementById('hero-section');
  if (!card || !hero) return;

  // Stop the default CSS animation when user interacts
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Calculate mouse position relative to center of the hero section (-1 to 1)
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    // Rotate the card (max 25 degrees) based on cursor
    const rotateX = y * -25; 
    const rotateY = x * 25;
    
    card.style.animation = 'none'; // pause infinite spin
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  hero.addEventListener('mouseleave', () => {
    // Resume animation
    card.style.transform = `rotateX(10deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.animation = 'float-spin 12s cubic-bezier(0.4, 0, 0.2, 1) infinite';
  });
}

function initParticles() {
  if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      particles: {
        number: {
          value: 40,
          density: { enable: true, value_area: 800 }
        },
        color: { value: ["#3b82f6", "#8b5cf6", "#a78bfa"] },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
}
