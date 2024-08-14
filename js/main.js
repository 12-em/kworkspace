import { makeDraggable } from "./draggable.js"
import { makeResizable } from "./resizable.js"
import Window from "./window.js"
import Manifest from "../apps/manifest.js"
import { AppConfig } from "./appkit/appconfig.js"
/**
 * @type {Array<Window>}
 */
export let windows = []

let appConfigs = []

/**
 * 
 * @param {AppConfig} config 
 */
function onAppLoaded(config) {
    // FOR TESTING PURPOSES
    createWindow(config)
}

export function init() {
    Manifest.onAppLoaded = onAppLoaded
    Manifest.importConfigs()
}

/**
 * 
 * @param {AppConfig} config 
 * @returns The created window
 */
export function createWindow(config) {
    let content = document.createElement('div')
    content.classList.add('window-content')
    config.parseSourceFile(html => content.innerHTML = html)
    // TODO update
    let win = new Window(config.appName, content)
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