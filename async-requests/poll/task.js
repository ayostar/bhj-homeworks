const pollUrl = 'https://netology-slow-rest.herokuapp.com/poll.php'
const pollContainer = document.querySelector('.poll')

class Poll {

    constructor(incomingContainer, incomingUrl) {
        this.container = incomingContainer
        this.pollTitle = this.container.querySelector('.poll__title')
        this.pollAnswers = this.container.querySelector('.poll__answers')
        this.url = incomingUrl

        this.registerEvents()
    }

    createAlert() {
        const alertElement = document.createElement('div')
        alertElement.className = "poll__alert"
        const alertContent = `<div><p>Спасибо. Ваш голос засчитан!</p><a href='#'>Закрыть</a></div>`

        this.pollAnswers.insertAdjacentElement('afterBegin', alertElement)
        alertElement.insertAdjacentHTML('afterBegin', alertContent) 
    }

    registerEvents() {
        this.createAlert()
        const alertPopup = this.container.querySelector('.poll__alert div a')
        alertPopup.addEventListener('click', () => {
            this.modalWindow.style.visibility = 'hidden'
            this.pollResultRequest()
        })

        const xhr = new XMLHttpRequest()
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == xhr.DONE) {
                this.pollId = xhr.response.id

                this.createButtonContent(xhr.response)
            }
        })
        
        xhr.open('GET', this.url)
        xhr.responseType = 'json'
        xhr.send()
    }

    createButtonContent(incomingData) {
        this.pollTitle.textContent = incomingData.data.title
        incomingData.data.answers.forEach((element, index) => this.createButton(element, index))
    }

    createButton(value, index) {
        const button = document.createElement('button')
        button.className = 'poll__answer' 
        button.textContent = value
        this.pollAnswers.insertAdjacentElement('afterEnd', button)

        button.addEventListener('click', () => {
            this.modalWindow = this.container.querySelector('.poll__alert')
            this.modalWindow.style.visibility = 'visible'
            this.pollAnswer = index
        })
    }

    createPollContent(title, value, total) {
        const pollContent = `<div class=poll__result>
                <div class=poll__result_title>${title}: </div>
                <div class=poll__result_value>${value}%</div>
            </div>`
        this.pollAnswers.insertAdjacentHTML('afterEnd', pollContent)
    }

    pollResultRequest() {
        const data = this

        const xhr = new XMLHttpRequest()
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == xhr.DONE) {
                const answers = Array.from(this.container.querySelectorAll('.poll__answer'))
                answers.forEach(element => this.container.removeChild(element))

                const totalAnswersSum = xhr.response.stat.reduce((acc, item) => acc += item.votes, 0)

                xhr.response.stat.forEach(function(element) {
                    console.log(element)
                    const votePercent =  (element.votes / totalAnswersSum * 100).toFixed(2)
                    data.createPollContent(element.answer, votePercent, totalAnswersSum)
                })
            }
        })

        xhr.open('POST', this.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.responseType = 'json'
        xhr.send(`vote=${this.pollId}&answer=${this.pollAnswer}`)
    }

}

new Poll(pollContainer, pollUrl)
