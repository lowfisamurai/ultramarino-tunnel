document.addEventListener("DOMContentLoaded", () => {
  const heroBanner = document.getElementById('scroll_lock_hero');
  const scrollThreshold = 10000;
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
  const pyramid = document.querySelector(".pyramid");
  const lazuli = document.querySelector('.lazuli');
  const bgPyramid = document.querySelector(".pyramid_background");
  let firstPetBase = null;
  let pyramidBase = null;

  window.addEventListener("scroll", () => {
    const sectionTop = heroBanner.offsetTop;
    const sectionHeight = heroBanner.offsetHeight;
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, sectionHeight);

    // Base scroll scaling speed for arches and lightTunnel
    const baseSpeed = 0.5;

    // Calculate the maximum size increase across all arches
    let maxSizeIncrease = 0;
    arches.forEach((svg, i) => {
      const speed = (i === arches.length - 1) ? baseSpeed * 10 : baseSpeed;
      const newSize = scrollY * speed;
      maxSizeIncrease = Math.max(maxSizeIncrease, newSize);
    });

    // Light tunnel update using the same scaling logic as arches
    if (lightTunnel) {
      // Calculate opacity based on the maximum arch size increase
      const maxArchWidth = baseSizes[0].width + maxSizeIncrease;
      const initialArchWidth = baseSizes[0].width;
      const scaleProgress = (maxArchWidth - initialArchWidth) / initialArchWidth;
      
      // Invert the scale progress for opacity (1 to 0)
      const opacity = Math.max(0, 1 - (scaleProgress * 0.05));
      
      // Calculate radius based on the same scaling
      const baseRadius = 20;
      const maxRadius = 80;
      const radius = baseRadius + (scaleProgress * (maxRadius - baseRadius));

      lightTunnel.style.background = `radial-gradient(
        circle at 50% 50%,
        rgba(0,0,0,${opacity}) 0%,
        rgba(0,0,0,${opacity}) ${radius}%, #000 100%)`;

      lightTunnel.style.opacity = opacity;
    }

    // Responsive arches
    arches.forEach((svg, i) => {
      const base = baseSizes[i];
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

    // Animated branches using the same scaling logic as firstPet
    if (galhoDireita || galhoEsquerda) {
      const newSize = scrollY * 0.2; // Same scaling factor as firstPet
      const translateX = newSize * 2; // Adjust multiplier to control movement distance
      
      if (galhoDireita) {
        galhoDireita.style.transform = `translateX(${translateX}px)`;
      }
      if (galhoEsquerda) {
        galhoEsquerda.style.transform = `translateX(${-translateX}px)`;
      }
    }

    // Pyramid zoom animation
    if (pyramid && pyramidBase && bgPyramid && lazuli) {
      const newSize = scrollY * 0.3;
      let scale = 1 + (newSize / 1000);
      if (scale > 3) scale = 3; // Stop scaling at 300%

      pyramid.style.transform = `scale(${scale})`;

      // Fade bgPyramid when pyramid scale reaches 3
      const fadeStart = 6667;
      const fadeEnd = 10000;

      let opacity = 1;
      if (scrollY > fadeStart) {
        opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
        opacity = Math.max(opacity, 0);
      }
      bgPyramid.style.opacity = opacity;

      // Lazuli fade in when pyramid stops
      if (scale >= 3) {
        lazuli.style.opacity = 1;
      } else {
        lazuli.style.opacity = 0;
      }

      // After bgPyramid opacity is 0, animate pyramid down and lazuli to center with scale up
      if (scrollY > fadeEnd) {
        const postFadeStart = fadeEnd;
        const postFadeEnd = 13000;
        const progress = Math.min((scrollY - postFadeStart) / (postFadeEnd - postFadeStart), 1);

        // Pyramid: move down off-screen
        const maxTranslateY = window.innerHeight * 1.5; // adjust if needed
        const translateY = progress * maxTranslateY;
        pyramid.style.transform = `scale(3) translateY(${translateY}px)`;

        // Lazuli: move to center and scale up
        const lazuliScale = 1 + progress * 0.8; // scales up to 1.5x
        const lazuliTranslateY = -progress * 50; // adjust as needed for centering effect
        lazuli.style.transform = `translateY(${lazuliTranslateY}%) scale(${lazuliScale})`;
      } else {
        // Reset position if before fadeEnd
        pyramid.style.transform = `scale(${scale})`;
        lazuli.style.transform = `translateY(0%) scale(1)`;
      }
    }
  });

  if (firstPet) {
    const styles = window.getComputedStyle(firstPet);
    firstPetBase = {
      width: parseFloat(styles.width),
      height: parseFloat(styles.height),
    };
  }

  if (pyramid) {
    const styles = window.getComputedStyle(pyramid);
    pyramidBase = {
      width: parseFloat(styles.width),
      height: parseFloat(styles.height),
    };
  }
});