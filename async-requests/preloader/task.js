const storageKey = 'preloader'
const requestUrl = 'https://netology-slow-rest.herokuapp.com'
const cardContainer = document.querySelector('.card')

class LocalStorage {
    constructor (dataKey) {
        this.data = window.localStorage
        this.dataKey = dataKey
    }

    read() {
        const readStorage = this.data.getItem(this.dataKey)
        return readStorage ? JSON.parse(readStorage) : {}
    }

    save(incomingData) {
        this.data.setItem(this.dataKey, JSON.stringify(incomingData))
    }

    remove() {
        this.data.removeItem(this.dataKey)
    }

}

class ExchangeRate {
    #currencyClassName
    #currencyArray

    constructor(container, reqUrl, storageKey) {
        this.container = container
        this.items = this.container.querySelector('#items')
        this.url = reqUrl
        this.#currencyClassName = 'item'

        this.dataStorage = new LocalStorage(storageKey)
        this.#currencyArray = this.dataStorage.read()

        if (this.#currencyArray) {
            this.showItems(this.#currencyArray)
        }

        this.registerEvents()
    }

    registerEvents () {
        const xhr = new XMLHttpRequest()

        const container = this.container
        
        xhr.addEventListener('error', () => {
            alert(`Ошибка запроса. Проверьте интернет соединение или ссылку - ${this.url}.`);
            const progressBar = container.querySelector('.loader_active')
            progressBar.className = 'loader'
        })

        xhr.addEventListener('load', () => {
            const newCurrencyArray = xhr.response.response.Valute
            this.showItems(newCurrencyArray)

            this.dataStorage.save(newCurrencyArray)

            const progressBar = container.querySelector('.loader_active')
            progressBar.className = 'loader'
        })

        xhr.open('GET', this.url)
        xhr.responseType = 'json'
        xhr.send()
    }

    createItem(elementData) {
        const itemElement = document.createElement('div')
        itemElement.className = this.#currencyClassName

        const charCode = `<div class="item__code">${elementData.CharCode}</div>`
        const value = `<div class="item__value">${elementData.Value}</div>`
        const currency = `<div class="item__currency">руб.</div>`

        this.items.insertAdjacentElement('beforeBegin', itemElement)

        itemElement.insertAdjacentHTML('afterBegin', currency)
        itemElement.insertAdjacentHTML('afterBegin', value)
        itemElement.insertAdjacentHTML('afterBegin', charCode)
        
    }

    showItems(CurrencyArray) {
        const items = this.items.querySelectorAll(this.#currencyClassName)
        items.forEach(element => this.container.remove(element))

        for (let element in CurrencyArray) {
            this.createItem(CurrencyArray[element])
        }

        const spanElement = document.createElement('div')
        spanElement.className = this.#currencyClassName
        this.items.insertAdjacentElement('beforeBegin', spanElement)
        spanElement.insertAdjacentHTML('afterBegin', `<span>______________________________________________________________'</span>`)
    }
}

new ExchangeRate(cardContainer, requestUrl, storageKey)