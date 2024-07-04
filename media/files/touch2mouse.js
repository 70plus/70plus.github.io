// Variabili per tenere traccia delle coordinate del tocco
let touchStartX = 0;
let touchStartY = 0;

// Aggiungi gli event listener per gli eventi di tocco
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  if (isWithinCanvas(event.touches[0].clientX, event.touches[0].clientY)) {
    // Previeni il comportamento predefinito
    event.preventDefault();
    // Salva le coordinate iniziali del tocco
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;

    // Genera l'evento mousedown
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touchStartX,
      clientY: touchStartY
    });
    canvas.dispatchEvent(mouseEvent);
  }
}

function handleTouchMove(event) {
  if (isWithinCanvas(event.touches[0].clientX, event.touches[0].clientY)) {
    // Previeni il comportamento predefinito
    event.preventDefault();
    // Calcola lo spostamento del tocco
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Genera gli eventi del mouse corrispondenti
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: touchX,
      clientY: touchY,
      movementX: deltaX,
      movementY: deltaY
    });
    canvas.dispatchEvent(mouseMoveEvent);

    // Aggiorna le coordinate iniziali del tocco
    touchStartX = touchX;
    touchStartY = touchY;
  }
}

function handleTouchEnd(event) {
  if (isWithinCanvas(event.changedTouches[0].clientX, event.changedTouches[0].clientY)) {
    // Previeni il comportamento predefinito
    event.preventDefault();
    // Genera l'evento mouseup
    const mouseUpEvent = new MouseEvent('mouseup', {
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY
    });
    canvas.dispatchEvent(mouseUpEvent);
  }
}

function isWithinCanvas(x, y) {
  // Logica per verificare se le coordinate (x, y) sono all'interno del canvas
  const rect = canvas.getBoundingClientRect();
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

