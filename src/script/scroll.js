document.addEventListener("DOMContentLoaded", () => {
  // Cache elements
  const svgs = document.querySelectorAll('svg[class^="arch"]');
  const baseSizes = Array.from(svgs).map((svg) => {
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

  // Get base size for first_pet if it exists
  let firstPetBase = null;
  if (firstPet) {
    const styles = window.getComputedStyle(firstPet);
    firstPetBase = {
      width: parseFloat(styles.width),
      height: parseFloat(styles.height),
    };
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Responsive arches
    svgs.forEach((svg, i) => {
      const base = baseSizes[i];
      const newSize = scrollY * 0.5;
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

    // Light tunnel effect
    if (lightTunnel) {
      const percentLight = Math.min(1, scrollY / maxScroll);
      const radius = 20 + percentLight * 80;
      const opacity = percentLight;
      lightTunnel.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${
        opacity * 0.8
      }) ${radius}%, #fff 100%)`;
      lightTunnel.style.opacity = opacity;
    }
  });
});
