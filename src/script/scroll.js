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
  let firstPetBase = null;
  let pyramidBase = null;

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
    if (pyramid && pyramidBase) {
      const newSize = scrollY * .4;
      const scale = 1 + (newSize / 1000);
      
      // Calculate opacity based on scroll progress
      const maxScroll = 10000; // Same as scrollThreshold
      const fadeStart = maxScroll * 0.7; // Start fading at 70% of max scroll
      const fadeProgress = Math.max(0, Math.min(1, (scrollY - fadeStart) / (maxScroll - fadeStart)));
      const opacity = 1 - fadeProgress;
      
      pyramid.style.transform = `scale(${scale})`;
      pyramid.style.opacity = opacity;
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