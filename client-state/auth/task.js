class Login {

    constructor() {
        this.dataKey = 'signin__form'
        this.container = document.querySelector('.card')
        this.userForm = this.container.querySelector('#' + this.dataKey)
        this.signinUser= this.container.querySelector('.signin')
        this.welcomeUser = this.container.querySelector('#welcome')
        this.logoutBtn = this.container.querySelector('#logout__btn')

        this.errorWindow = this.userForm.querySelector('.error')
        this.errorMessage = this.userForm.querySelector('.error p')

        this.storage = new Storage()

        this.userId = this.storage.readItem(this.dataKey)

        if (this.userId) {
            this.showWelcome()
        }

        this.progressBar = this.userForm.querySelector('#loader')

        this.registerEvents()
    }

    showError(message) {
        const closeButton = this.errorWindow.querySelector('.error div a')
        closeButton.addEventListener('click', () => {
            this.errorWindow.style.visibility = 'hidden'
            this.userForm.signin__btn.disabled = false
        })

        this.errorWindow.style.visibility = 'visible'
        this.errorMessage.textContent = message
        // this.userForm.reset()
    }

    showWelcome() {
        this.welcomeUser.querySelector('#user_id').textContent = this.userId
        this.signinUser.classList.remove('signin_active')
        this.welcomeUser.classList.add('welcome_active')
    }

    hideWelcome() {
        this.welcomeUser.querySelector('#user_id').textContent = ''
        this.storage.removeItem(this.dataKey)
        this.welcomeUser.classList.remove('welcome_active')
        this.signinUser.classList.add('signin_active')
        this.userForm.reset()
        this.userForm.signin__btn.disabled = false
    }

    registerEvents() {
        this.userForm.addEventListener('submit', (e) => {
            e.preventDefault()

            this.userForm.signin__btn.disabled = true
            this.progressBar.classList.add('loader_active')

            const xhr = new XMLHttpRequest()
            const method = 'POST'
            const url = this.userForm.getAttribute('action')
            const params = new FormData(this.userForm)

            xhr.open(method, url, true)

            xhr.onreadystatechange = function () {
                if(xhr.status != 200) {
                    this.progressBar.classList.remove('loader_active')
                    this.showError(`Ошибка: ${xhr.status} - ${xhr.statusText}.`)
                    this.userForm.signin__btn.disabled = false
                }
            }

            xhr.send(params)

            xhr.addEventListener('load', () => {      
                const answer = JSON.parse(xhr.response)

                this.progressBar.classList.remove('loader_active')

                if (!answer.success) {
                    this.showError('Неверные логин/пароль.')
                    return
                } else {
                    this.userId = answer.user_id
                    this.showWelcome()
                    this.storage.saveItem(this.dataKey, this.userId)    
                }
            })

            xhr.addEventListener('error', () => {
                this.progressBar.classList.remove('loader_active')
                this.showError(`Ошибка: ${xhr.status} - ${xhr.statusText}.`)
                this.userForm.signin__btn.disabled = false
            })

        })

        this.logoutBtn.addEventListener('click', (e) => {
            this.hideWelcome()
        })
    }
}

new Login()