import { makeDraggable } from "./draggable.js"
import { makeResizable } from "./resizable.js"
import Window from "./window.js"

/**
 * @type {Array<Window>}
 */
export let windows = []

export function init() {}

export function createWindow(title) {
    // TODO update
    let win = new Window(title, document.createTextNode('kys'))
    win.setFocusCallback(onWindowFocused)

    windows.push(win)

    document.getElementById('draggable-area').appendChild(win.container)
    makeDraggable(win)
    makeResizable(win)

    return win
}

function onWindowFocused() {
    // focus
    windows.forEach(window => {
        if(window.hasFocus)
        window.unfocus()
    })
}