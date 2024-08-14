import Window from "./window.js";

/**
 * 
 * @param {Window} wmwindow 
 */
export function makeDraggable(wmwindow) {
  let startX = 0, startY = 0, currentX = 0, currentY = 0, initialX = 0, initialY = 0;
  let isDragging = false;
  let animationFrameId = null;

  if (wmwindow.dragArea) {
      wmwindow.dragArea.onmousedown = dragMouseDown;
  } else {
      wmwindow.container.onmousedown = dragMouseDown;
  }

  // Promote the container to its own layer for better performance
  wmwindow.container.style.willChange = 'transform';

  function dragMouseDown(e) {
      if (wmwindow.isMaximized) {
          wmwindow.unmaximize();
          return;
      }
      e = e || window.event;
      e.preventDefault();

      const transform = wmwindow.container.style.transform;
      const matrix = new WebKitCSSMatrix(transform); // Parse the current transform matrix

      initialX = matrix.m41;
      initialY = matrix.m42;

      startX = e.clientX;
      startY = e.clientY;

      isDragging = true;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
      if (!isDragging) return;

      e = e || window.event;
      e.preventDefault();

      currentX = initialX + (e.clientX - startX);
      currentY = initialY + (e.clientY - startY);

      // Use requestAnimationFrame to update the transform
      if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(() => {
              wmwindow.container.style.transform = `translate(${currentX}px, ${currentY}px)`;
              wmwindow.lastSize.x = currentX
              wmwindow.lastSize.y = currentY              
              animationFrameId = null;
          });
      }
  }

  function closeDragElement() {
      isDragging = false;
      document.onmouseup = null;
      document.onmousemove = null;

      if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
      }
  }
}