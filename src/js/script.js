// *** CAROUSEL ***

const getItemScrollPosition = (carousel, item) => {
  const carouselRect = carousel.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  return carousel.scrollLeft + itemRect.left - carouselRect.left - carousel.clientLeft;
};

const getNearestItemIndex = (carousel, items) => {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item, index) => {
    const distance = Math.abs(getItemScrollPosition(carousel, item) - carousel.scrollLeft);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
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

  const scrollToItem = (index) => {
    const target = items[index];

    if (target) {
      carousel.scrollTo({
        left: getItemScrollPosition(carousel, target),
        behavior: 'smooth',
      });
    }
  };

  prevButton?.addEventListener('click', () => {
    scrollToItem(Math.max(0, getNearestItemIndex(carousel, items) - 1));
  });

  nextButton?.addEventListener('click', () => {
    if (items.length > 0) {
      scrollToItem((getNearestItemIndex(carousel, items) + 1) % items.length);
    }
  });

  anchorLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      const target = items[index];

      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToItem(index);
    });
  });

  const updateActiveAnchor = () => {
    const currentIndex = getNearestItemIndex(carousel, items);

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
