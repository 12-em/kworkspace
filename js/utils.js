export class Point {
    /**
     * @type {number}
     */
    x

    /**
     * @type {number}
     */
    y
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

export class Rect {
    /**
     * @type {number}
     */
    x

    /**
     * @type {number}
     */
    y

    /**
     * @type {number}
     */
    w

    /**
     * @type {number}
     */
    h

    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}