export class Window {
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
    #isMaximized
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
        this.#isMaximized = !this.#isMaximized

        if(this.#isMaximized) {
            this.#maxButton.classList.add('checked')
            this.#maxButton.childNodes.item(0).innerText = 'collapse_content'
        } else {
            this.#maxButton.classList.remove('checked')
            this.#maxButton.childNodes.item(0).innerText = 'expand_content'
        }
    }

    close() {
        this.container.classList.add('closing')
        setTimeout(function() {this.container.remove()}, 3000)
        
    }
}