var Settings = {

    initIfNot: () => {
        if (localStorage.getItem('settings') == undefined) {
            localStorage.setItem('settings', '{}')
        }

    },

    getVersion: () => {
        let settings = JSON.parse(localStorage.getItem('settings'));
        return settings.version || 0;
    },
    
    setVersion: (version) => {
        let settings = JSON.parse(localStorage.getItem('settings'));
        settings.version = version;
        localStorage.setItem('settings', JSON.stringify(settings))
    }


}

Settings.initIfNot();