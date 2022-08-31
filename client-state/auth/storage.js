class Storage {
    constructor() {
        this.localStorage = window.localStorage
    }

    readItem(dataKey) {
        const data = this.localStorage.getItem(dataKey)
        try {
            return JSON.parse(data)
        } catch {
            return null
        }
    }

    saveItem(dataKey, data) {
        try {
            this.localStorage.setItem(dataKey, JSON.stringify(data))
        } catch(e) {
            return e.code
        }
    }

    removeItem(dataKey) {
        try {
            this.localStorage.removeItem(dataKey)
        } catch(e) {
            return e.code
        }
    }
}