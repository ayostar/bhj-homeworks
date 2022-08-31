class CardEditor {
    constructor(container) {
        this.container = container
        this.editor = this.container.querySelector('#editor')
        this.dataKey = this.editor.className
        this.storage = new DataStorage()

        this.editor.value = this.storage.readData(this.dataKey)

        this.createButtonClear()

        this.registerEvents()
    }

    createButtonClear() {
        const buttonElement = document.createElement('button')
        buttonElement.className = "card__clear"
        buttonElement.textContent = "Очистить"

        this.container.insertAdjacentElement('beforeEnd', buttonElement)
    }

    registerEvents() {
        this.container.addEventListener('change', () => {
            this.storage.saveData(this.dataKey, this.editor.value)   
        })

        this.clear = this.container.querySelector('.card__clear')

        this.clear.addEventListener('click', () => {
            this.editor.value = '' 
            this.storage.saveData(this.dataKey, this.editor.value)   
        })

    }
}


const cardContainer = document.querySelector('.card')
new CardEditor(cardContainer)