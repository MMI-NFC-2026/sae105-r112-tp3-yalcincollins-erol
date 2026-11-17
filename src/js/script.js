// *** CAROUSEL ***

const getScrollStep = (carousel) => {
  const firstItem = carousel.querySelector('.carousel__item');
  const style = window.getComputedStyle(carousel);
  const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;

  return firstItem ? firstItem.getBoundingClientRect().width + gap : 260;
};

const getItemIndexFromScroll = (carousel, items) => {
  const scrollStep = getScrollStep(carousel);

  return items.findIndex((item) => {
    const itemPosition = item.offsetLeft;
    const itemEnd = itemPosition + scrollStep;

    return carousel.scrollLeft >= itemPosition && carousel.scrollLeft < itemEnd;
  });
};

const initCarousel = () => {
  const carousel = document.querySelector('.carousel__container');
  const prevButton = document.querySelector('.carousel__button--prev');
  const nextButton = document.querySelector('.carousel__button--next');
  const anchorLinks = document.querySelectorAll('.carousel__anchor');
  const items = [...document.querySelectorAll('.carousel__item')];

  if (!carousel) {
    return;
  }

  const scrollAmount = getScrollStep(carousel);

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
      carousel.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    });
  });

  const updateActiveAnchor = () => {
    const currentIndex = getItemIndexFromScroll(carousel, items);

    anchorLinks.forEach((link, index) => {
      link.classList.toggle('is-active', index === currentIndex);
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
