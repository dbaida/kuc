const toggleItem = (header, accordion, isSingle) => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    if (isSingle) {
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });
    }

    if (!isActive || !isSingle) {
      item.classList.toggle('active');
    }
  };

const onAccordionClick = (e, accordion, isSingle) => {
  if (e.target.classList.contains('accordion-header')) {
    toggleItem(e.target, accordion, isSingle);
  }
};

const onAccordionKeydown = (e, accordion, isSingle) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('accordion-header')) {
    e.preventDefault();
    toggleItem(e.target, accordion, isSingle);
  }
};

document.querySelectorAll('.accordion').forEach(accordion => {
    const isSingle = accordion.dataset.single === 'true';

    accordion.addEventListener('click', e => {
        onAccordionClick(e, accordion, isSingle);
    });
    accordion.addEventListener('keydown', e => {
        e.preventDefault();
        onAccordionKeydown(e, accordion, isSingle);
    });
  });
  