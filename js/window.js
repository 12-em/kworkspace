import { Point, Rect } from "./utils.js"

export default class Window {
    /**
     * @type { boolean }
     */
    isResizing
    /**
     * @type { boolean }
     */
    hasFocus

    /**
     * @type { boolean }
     */
    isMaximized
    /**
     * @type { string }
     */
    title

    /**
     * @type { HTMLDivElement }
     */
    content

    /**
     * @type { HTMLDivElement }
     */
    container

    /**
     * @type { HTMLDivElement }
     */
    #titleBar

    /**
     * @type { HTMLDivElement }
     */
    #closeButton
    /**
     * @type { HTMLDivElement }
     */
    #maxButton
    /**
     * @type { HTMLDivElement }
     */
    #minButton

    /**
     * @type { HTMLDivElement }
     */
    dragArea

    /**
     * @type { Rect }
     */
    #lastSize

    /**
     * @type { Function }
     */
    _onFocus
    /**
     * 
     * @param {string} title 
     * @param {HTMLDivElement} content 
     */
    constructor(title, content) {
        this.title = title
        this.content = content

        this.#createContainer()
        this.#createTitleBar()

        this.container.appendChild(content)
    }

    #createContainer() {
        let win = this
        this.container = document.createElement('div')
        this.container.classList.add('window-container')
        this.container.onmousedown = function() {
            win.focus()
        }
    }

    #createTitleBar() {
        let win = this
        this.#titleBar = document.createElement('div')
        this.#titleBar.classList.add('window-titlebar')

        this.dragArea = document.createElement('div')
        this.dragArea.classList.add('window-dragarea')
        this.dragArea.innerText = this.title
        this.dragArea.onmousedown = function() {
            console.log("unmzing");
            
             if(win.isMaximized) win.unmaximize() 
            }
        this.dragArea.ondblclick = function() { win.toggleMaximize() }

        this.container.appendChild(this.#titleBar)

        this.#closeButton = document.createElement('div')
        this.#closeButton.classList.add('titlebar-button', 'close')
        let closeIcon = document.createElement('span')
        closeIcon.classList.add('material-symbols-outlined')
        closeIcon.innerText = 'close'
        this.#closeButton.appendChild(closeIcon)
        this.#closeButton.onclick = function() { win.close() }

        this.#minButton = document.createElement('div')
        this.#minButton.classList.add('titlebar-button')
        let minIcon = document.createElement('span')
        minIcon.classList.add('material-symbols-outlined')
        minIcon.innerText = 'remove'
        this.#minButton.appendChild(minIcon)
        this.#minButton.onclick = function() { win.minimize() }

        this.#maxButton = document.createElement('div')
        this.#maxButton.classList.add('titlebar-button')
        let maxIcon = document.createElement('span')
        maxIcon.classList.add('material-symbols-outlined')
        maxIcon.innerText = 'expand_content'
        this.#maxButton.appendChild(maxIcon)
        this.#maxButton.onclick = function() { win.toggleMaximize() }

        this.#titleBar.appendChild(this.#closeButton)
        this.#titleBar.appendChild(this.dragArea)
        this.#titleBar.appendChild(this.#maxButton)
        this.#titleBar.appendChild(this.#minButton)
    }

    setFocusCallback(callback) {
        this._onFocus = callback
    }

    focus() {
        this._onFocus()
        this.hasFocus = true
        this.container.style.zIndex = 1
    }

    unfocus() {
        this.hasFocus = false
        this.container.style.zIndex =
            parseInt(this.container.style.zIndex - 1)
    }

    minimize() {
        // TODO
    }

    unminimize() {
        // TODO
    }

    toggleMaximize() {
        if(!this.isMaximized) {
            this.maximize()
        } else {
            this.unmaximize()    
        }
    }

    maximize() {
        this.isMaximized = true
        let win = this
        let launcher = document.querySelector('#launcher-area')
        let marginLeft = launcher.clientWidth
        console.log(marginLeft);

        let desktop = document.querySelector('#draggable-area')
        let width = desktop.clientWidth
        

        this.#maxButton.classList.add('checked')
        this.#maxButton.childNodes.item(0).innerText = 'collapse_content'
        this.container.classList.add('animated')
        let w = parseFloat(this.container.clientWidth)
        let h = parseFloat(this.container.clientHeight)
        let x = parseFloat(this.container.style.left)
        let y = parseFloat(this.container.style.top)
        this.#lastSize = new Rect(x, y, w, h)

        this.container.style.left = marginLeft + 'px'
        
        this.container.style.top = 0
        this.container.style.width = (width - marginLeft) + 'px'
        this.container.style.height = '100%'

        setTimeout(function() {
            win.container.classList.remove('animated')
        }, 200)
    }

    unmaximize() {
        this.isMaximized = false
        let win = this
        this.#maxButton.classList.remove('checked')
        this.#maxButton.childNodes.item(0).innerText = 'expand_content'

        this.container.classList.add('animated')
        
        this.container.style.left = this.#lastSize.x + 'px'
        this.container.style.top = this.#lastSize.y + 'px'
        this.container.style.width = this.#lastSize.w + 'px'
        this.container.style.height = this.#lastSize.h + 'px'

        setTimeout(function() {
            win.container.classList.remove('animated')
        }, 200)
    }

    close() {
        let me = this
        this.container.classList.add('closing')
        setTimeout(function() {me.container.remove()}, 3000)
        
    }
}