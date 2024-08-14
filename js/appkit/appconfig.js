import { Point } from "../utils.js";

export class AppConfig {
    /**
     * @type { string }
     */
    appName

    /** 
     * @type { string }
     */
    iconUrl

    /**
     * @type { string }
     */
    sourceFile

    /**
     * @type { Point }
     */
    initialSize

    /**
     * 
     * @param {string} appName 
     * @param {string} iconUrl 
     * @param {string} sourceFile 
     */
    constructor(appName, iconUrl, sourceFile) {
        this.appName = appName
        this.iconUrl = iconUrl
        this.sourceFile = sourceFile
    }

    /**
     * Parses the source file and returns its contents to insert into the window container
     * @param {(html: string) => void} onLoaded 
     */
    parseSourceFile(onLoaded) {
        fetch(this.sourceFile)
        .then(response => response.text())
        .then(html => onLoaded(html))
    }
}