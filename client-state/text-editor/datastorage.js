class DataStorage {

    constructor() {
        this.localStorage = window.localStorage
    }

    readData(dataKey) {
        const localData = this.localStorage.getItem(dataKey)
        try {
            return JSON.parse(localData)
        } catch {
            return null
        }
    }

    saveData(dataKey, localData) {
        try {
            this.localStorage.setItem(dataKey, JSON.stringify(localData))
            console.log(localData)
        } catch(e) {
            return e.code
        }
    }
}