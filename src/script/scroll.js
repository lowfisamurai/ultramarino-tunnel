document.addEventListener("DOMContentLoaded", () => {
  const heroBanner = document.getElementById('scroll_lock_hero');
  const scrollThreshold = 5340.5;
  const arches = document.querySelectorAll('svg[class^="arch"]');
  const baseSizes = Array.from(arches).map((svg) => {
    const styles = window.getComputedStyle(svg);
    return {
      width: parseFloat(styles.width),
      height: parseFloat(styles.height),
    };
  });
  const galhoDireita = document.querySelector(".galho_direita");
  const galhoEsquerda = document.querySelector(".galho_esquerda");
  const lightTunnel = document.querySelector(".light_tunnel");
  const firstPet = document.querySelector(".first_pet");
  let firstPetBase = null;

  window.addEventListener("scroll", () => {
    if (heroBanner) {
      if (window.scrollY < scrollThreshold) {
        heroBanner.classList.add('fixed');
        heroBanner.classList.remove('d-none');
      } else {
        heroBanner.classList.remove('fixed');
        heroBanner.classList.add('d-none');
      }
    }

const sectionTop = heroBanner.offsetTop;
const sectionHeight = heroBanner.offsetHeight;
const scrollY = window.scrollY;
const maxScroll = Math.max(1, sectionHeight);

// Base scroll scaling speed for arches and lightTunnel
const baseSpeed = 0.5;

// Light tunnel update using same proportional logic
if (lightTunnel) {
  const percentLight = Math.min(1, scrollY * baseSpeed / maxScroll); // unified proportion

  // Inverted opacity: starts at 1, ends at 0
  const opacity = (1 - percentLight) * 0.9;
  const finalOpacity = Math.max(Math.min(opacity, 1), 0);

  const radius = 20 + percentLight * 10;
  lightTunnel.style.background = `radial-gradient(
    circle at 50% 50%,
    rgba(255,255,255,${finalOpacity}) 0%,
    rgba(255,255,255,${finalOpacity}) ${radius}%, #fff 100%)`;

  lightTunnel.style.opacity = finalOpacity;
}

// Responsive arches
arches.forEach((svg, i) => {
  const base = baseSizes[i];

  // Faster for last SVG
  const speed = (i === arches.length - 1) ? baseSpeed * 10 : baseSpeed;
  const newSize = scrollY * speed;

  svg.style.width = `${base.width + newSize}px`;
  svg.style.height = `${base.height + newSize}px`;
});

    // Responsive first_pet
    if (firstPet && firstPetBase) {
      const newSize = scrollY * 0.5;
      firstPet.style.width = `${firstPetBase.width + newSize}px`;
      firstPet.style.height = `${firstPetBase.height + newSize}px`;
    }

    // Animated branches
    const percentBranch = Math.min(1, scrollY / (maxScroll * 0.5));
    if (galhoDireita)
      galhoDireita.style.transform = `translateX(${percentBranch * 120}vw)`;
    if (galhoEsquerda)
      galhoEsquerda.style.transform = `translateX(${-percentBranch * 120}vw)`;
  });

  if (firstPet) {
    const styles = window.getComputedStyle(firstPet);
    firstPetBase = {
      width: parseFloat(styles.width),
      height: parseFloat(styles.height),
    };
  }
});