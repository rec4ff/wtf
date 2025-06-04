const content = document.querySelector('.DNI_content1');
let startX = 0;
let currentX = 0;
let isDragging = false;
let isFlipped = false;

content.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

content.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const diffX = currentX - startX;
  const progress = Math.abs(diffX) / content.offsetWidth;

  content.style.transition = 'none';

  if (!isFlipped && diffX < 0) {
    // Frente → Dorso (deslizar izquierda)
    const angle = Math.min(180, Math.abs(diffX) / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${angle}deg)`;
  } else if (isFlipped && diffX > 0) {
    // Dorso → Frente (deslizar derecha)
    const angle = Math.min(180, diffX / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${180 - angle}deg)`;
  }
});

content.addEventListener('touchend', () => {
  if (!isDragging) return;

  const diffX = currentX - startX;
  const progress = Math.abs(diffX) / content.offsetWidth;

  content.style.transition = 'transform 0.5s ease';

  if (!isFlipped && diffX < 0 && progress > 0.2) {
    // Completar frente → dorso
    isFlipped = true;
    content.style.transform = 'rotateY(-180deg)';
  } else if (isFlipped && diffX > 0 && progress > 0.2) {
    // Completar dorso → frente
    isFlipped = false;
    content.style.transform = 'rotateY(0deg)';
  } else {
    // Cancelar gesto, volver al estado original
    content.style.transform = isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  }

  isDragging = false;
});
