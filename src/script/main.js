const contentInner = document.querySelector('.content_inner');
const section = document.querySelector('.content_section');

window.addEventListener('scroll', () => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;

    const startScroll = sectionTop;
    const endScroll = sectionTop + sectionHeight;

    if (scrollY >= startScroll && scrollY <= endScroll) {
        const progress = (scrollY - startScroll) / (sectionHeight);
        const maxTranslate = contentInner.scrollHeight - sectionHeight;
        const translateY = -progress * maxTranslate;
        contentInner.style.transform = `translateY(${translateY}px)`;
    }
});