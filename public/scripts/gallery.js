(() => {
  const buttons = Array.from(document.querySelectorAll('[data-gallery-image]'));
  if (buttons.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Expanded photograph');
  lightbox.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Close photograph">&times;</button>
    <div class="lightbox__inner">
      <img alt="" />
      <div class="lightbox__caption">
        <strong></strong>
        <span></span>
      </div>
    </div>
  `;

  document.body.append(lightbox);

  const closeButton = lightbox.querySelector('.lightbox__close');
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox__caption');
  const captionTitle = caption.querySelector('strong');
  const captionDescription = caption.querySelector('span');
  let activeButton = null;

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    image.removeAttribute('src');
    if (activeButton) activeButton.focus();
  };

  const open = (button) => {
    activeButton = button;
    image.src = button.dataset.galleryImage;
    image.alt = button.dataset.galleryAlt || '';
    const title = button.dataset.galleryTitle || '';
    const location = button.dataset.galleryLocation || '';
    captionTitle.textContent = location ? `${title} | ${location}` : title;
    captionDescription.textContent = button.dataset.galleryDescription || button.dataset.galleryCaption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => open(button));
  });

  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();
