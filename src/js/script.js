// *** CAROUSEL ***

const initCarousel = () => {
  const carousel = document.querySelector('.carousel__container');
  const prevButton = document.querySelector('.carousel__button--prev');
  const nextButton = document.querySelector('.carousel__button--next');
  const firstItem = document.querySelector('.carousel__item');
  const scrollAmount = firstItem ? firstItem.clientWidth : 260;
  const anchorLinks = document.querySelectorAll('.carousel__anchor');

  if (!carousel) {
    return;
  }

  prevButton?.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextButton?.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
  });

  const updateActiveAnchor = () => {
    const currentIndex = Math.round(carousel.scrollLeft / scrollAmount);

    anchorLinks.forEach((link, index) => {
      const isActive = index === currentIndex;
      link.classList.toggle('is-active', isActive);
    });
  };

  carousel.addEventListener('scroll', updateActiveAnchor, { passive: true });
  updateActiveAnchor();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}
