class Product {   
    constructor (id, title, image) {
        this.id = id
        this.title = title
        this.image = image
    }
}

class BasketProduct extends Product {
    constructor (id, title, image, quantity) {
        super(id, title, image)

        this.quantity = quantity
    }
}

class Basket {

    #basketinitialProductsArray

    constructor(containerBasket) {
        this.container = containerBasket
        this.cartProducts = this.container.querySelector('.cart__products')

        this.basketData = window.localStorage
        this.storageKey = 'CART'

        this.#basketinitialProductsArray = []

        this.readBasket()
    }

    readBasket() {
        const dataFromKey = this.basketData.getItem(this.storageKey)

        const currentProductsInBasket = dataFromKey ? JSON.parse(dataFromKey) : []

        currentProductsInBasket.forEach(product => this.addToBasket({
            id: product.id,
            title: product.title,
            image: product.image,
        }, product.quantity))
    }

    saveBasket() {
        this.basketData.setItem(this.storageKey, JSON.stringify(this.#basketinitialProductsArray))
    }

    addToBasket(product, amount) {
        const indexProduct = this.#basketinitialProductsArray.findIndex(value => value.id === product.id)

        if (indexProduct >= 0) {
            this.#basketinitialProductsArray[indexProduct].quantity += amount
            const cartProduct = this.cartProducts.querySelector(`.cart__product[data-id="${product.id}"]`)
            cartProduct.querySelector('.cart__product-count').textContent = this.#basketinitialProductsArray[indexProduct].quantity
        } else {
            const newBasketProduct = new BasketProduct(product.id, product.title, product.image, amount)
            this.#basketinitialProductsArray.push(newBasketProduct)

            const publishProduct = this.create(newBasketProduct)

            this.cartProducts.insertAdjacentElement('beforeEnd', publishProduct) 
            
            this.container.className = 'cart cart_active'
        }

        this.saveBasket()
    }

    removeFromBasket(product, amount=0) {

        const cartProduct = this.container.querySelector(`.cart__product[data-id="${product.id}"]`)

        const indexProduct = this.#basketinitialProductsArray.findIndex(value => value.id === product.id)
        if (indexProduct >= 0) {
            if (this.#basketinitialProductsArray[indexProduct].quantity - amount <= 0 || amount === 0){

                this.#basketinitialProductsArray.splice(indexProduct, 1)

                this.cartProducts.children[indexProduct].remove() 
                
                if (this.#basketinitialProductsArray.length <= 0) {
                    this.container.className = 'cart'
                }
            } else {

                this.#basketinitialProductsArray[indexProduct].quantity -= amount
                cartProduct.querySelector('.cart__product-count').textContent = this.#basketinitialProductsArray[indexProduct].quantity
            }

            this.saveBasket()
        } else {
            alert(`Продукта "${product.title}" нет в корзине.`)
        }
    }

    create(basketProduct) {

        const productHtmlElement = document.createElement('div')
        productHtmlElement.className = 'cart__product'
        productHtmlElement.dataset.id = basketProduct.id
        // <div class="cart__product" data-id="1">
        
        const productImage = `<img class="cart__product-image" src="${basketProduct.image}">`

        const productCount = `<div class="cart__product-count">${basketProduct.quantity}</div>`

        productHtmlElement.insertAdjacentHTML('afterBegin', productImage)
        // <img class="cart__product-image" src="image.png">

        productHtmlElement.insertAdjacentHTML('beforeEnd', productCount)
        //<div class="cart__product-count">20</div>
    
        return productHtmlElement
    }

}

class ListProduct extends Product {

    constructor (id, title, image, quantity, quantityMax=25) {
        super(id, title, image)
        this.quantity = quantity
        this.quantityMax = quantityMax
    }
}

class InitialProductsList {
    
    #initialProductsArray

    constructor(containerAllProducts) {

        this.#initialProductsArray = []

        this.container = containerAllProducts

        this.basket = new Basket(document.querySelector('.cart'))

        this.arrayAllProducts = Array.from(this.container.querySelectorAll('.product'))


        // формирование массива из возможных продуктов для дальнейшей регистрации событий
        this.arrayAllProducts.forEach(product => {
            const id = product.dataset.id
            const title = product.querySelector('.product__title').textContent.trim()
            const image = product.querySelector('.product__image').src
            const quantity = product.querySelector('.product__quantity-value').textContent.trim()

            const newProduct = new ListProduct(id, title, image, quantity)

            this.addInitialProduct(newProduct)
        })
        console.log(this.#initialProductsArray)

        this.registerEvents()    
    }

    addInitialProduct(product) {
        this.#initialProductsArray.push(product)
    }

    registerEvents() {

        const container = this.container

        this.#initialProductsArray.forEach((product) => {

            const currentProduct = container.querySelector(`.product[data-id="${product.id}"]`)

            const quantityIncrease = currentProduct.querySelector('.product__quantity-control_inc')
            const quantityDecrease = currentProduct.querySelector('.product__quantity-control_dec')
            const quantityValue = currentProduct.querySelector('.product__quantity-value')
            const productAdd = currentProduct.querySelector('.product__add')
            const productRemove = currentProduct.querySelector('.product__remove')

            quantityIncrease.addEventListener('click', () => {
                if (++product.quantity > product.quantityMax) {
                    product.quantity = product.quantityMax
                }

                quantityValue.textContent = product.quantity
            })

            quantityDecrease.addEventListener('click', () => {
                if (--product.quantity < 1) {
                    product.quantity = 1
                }

                quantityValue.textContent = product.quantity
            })

            productAdd.addEventListener('click', () => {
                this.basket.addToBasket({id: product.id, title: product.title, image: product.image}, Number(product.quantity))
            })

            productRemove.addEventListener('click', () => {
                this.basket.removeFromBasket({id: product.id, title: product.title, image: product.image}, Number(product.quantity))
            })
        })
    }
}

new InitialProductsList(document.querySelector('.products'))