import { Window } from "./window.js";
/**
 * 
 * @param {Window} window 
 */
export function makeResizable(window) {
    window.container.addEventListener('mousemove', (e) => {
        if (window.isResizing) return; // Don't change cursor if already resizing
    
        const rect = window.container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
        const isTopEdge = offsetY < 10;
        const isBottomEdge = offsetY > rect.height - 10;
        const isLeftEdge = offsetX < 10;
        const isRightEdge = offsetX > rect.width - 10;
    
        window.container.style.cursor = getCursorStyle(isTopEdge, isBottomEdge, isLeftEdge, isRightEdge);
    });
    
    window.container.addEventListener('mousedown', (e) => {
        const rect = window.container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
    
        const isTopEdge = offsetY < 10;
        const isBottomEdge = offsetY > rect.height - 10;
        const isLeftEdge = offsetX < 10;
        const isRightEdge = offsetX > rect.width - 10;
    
        if (isBottomEdge || isLeftEdge || isRightEdge) {
            window.isResizing = true;
            document.body.style.cursor = getCursorStyle(isTopEdge, isBottomEdge, isLeftEdge, isRightEdge);
    
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(document.defaultView.getComputedStyle(window.container).width, 10);
            const startHeight = parseInt(document.defaultView.getComputedStyle(window.container).height, 10);
            const startLeft = parseInt(document.defaultView.getComputedStyle(window.container).left, 10);

            function doResize(e) {
                if (isRightEdge) {
                    window.container.style.width = startWidth + e.clientX - startX + 'px';
                }
                if (isLeftEdge) {
                    window.container.style.width = startWidth - e.clientX + startX + 'px';
                    window.container.style.left = startLeft + e.clientX - startX + 'px';
                }
                if (isBottomEdge) {
                    window.container.style.height = startHeight + e.clientY - startY + 'px';
                }
            }
    
            function stopResize() {
                window.isResizing = false;
                document.body.style.cursor = 'default';
                document.removeEventListener('mousemove', doResize);
                document.removeEventListener('mouseup', stopResize);
            }
    
            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        }
    });
    
    function getCursorStyle(isTopEdge, isBottomEdge, isLeftEdge, isRightEdge) {
        if (isTopEdge && isLeftEdge || isBottomEdge && isRightEdge) {
            return 'nwse-resize';
        }
        if (isTopEdge && isRightEdge || isBottomEdge && isLeftEdge) {
            return 'nesw-resize';
        }
        if (isBottomEdge) {
            return 'ns-resize';
        }
        if (isLeftEdge || isRightEdge) {
            return 'ew-resize';
        }
        return 'default';
    }
}