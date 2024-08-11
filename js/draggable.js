import Window from "./window.js";

/**
 * 
 * @param {Window} window 
 */
export function makeDraggable(wmwindow) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (wmwindow.dragArea) {
      // if present, the header is where you move the DIV from:
      wmwindow.dragArea.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      wmwindow.container.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      if(wmwindow.isMaximized) {
        wmwindow.unmaximize()
        return
      }
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      wmwindow.container.style.top = (wmwindow.container.offsetTop - pos2) + "px";
      wmwindow.container.style.left = (wmwindow.container.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  