import { AppConfig } from "../js/appkit/appconfig.js"

/*
Manifest file
-------------
This file specifies which apps should be loaded.
For each app, add an import statement importing from the app's config file where
it default-exports an AppConfig object.
For examples, take a look at how this is implemented with the core apps.

Note that no apps should have the same name.
*/
const paths = [
    // specify paths here
    "app-list/config.js"
]

export function importConfigs(list) {
    for(let app of list) {
        let module = import(`./${app}`)
        module.then(module => {
            manifest.push(module.config)
        })
    }
}

/**
 * @type { Array<AppConfig }
 * AppConfigs of all loaded apps
 */
let manifest = []

export let Manifest = {
    importConfigs: function() {
        for(let app of paths) {
            let module = import(`./${app}`)
            module.then(module => {
                this.configs.push(module.config)
                this.onAppLoaded(module.config)
            })
        }
    },
    /**
     * @type { Array<AppConfig> }
     */
    configs: [],

    /**
     * @type { (config: AppConfig) => void }
     * Callback when an app has been loaded
     */
    onAppLoaded: function() {}

}

export default Manifest

