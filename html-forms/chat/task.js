class Bot {
    constructor(chatWidgetContainer, secondsBotWrap) {
        this.container = chatWidgetContainer

        this.chatWidgetSide = chatWidgetContainer.querySelector('.chat-widget__side')

        this.chatWidgetMessagesContainer = chatWidgetContainer.querySelector('.chat-widget__messages-container')

        this.chatWidgetAllMessages = chatWidgetContainer.querySelector('.chat-widget__messages')

        this.inputMessageString = chatWidgetContainer.querySelector('.chat-widget__input')

        this.secondsBotWrap = secondsBotWrap * 1000
        
        this.timerBot = 0
        this.timerBotWrap = 0

        this.messageOnPause = 'Так что хотели-то?..'
        this.messageFinish = 'Чао!'

        this.registerEvents()
    }

    sendMessage(textMessage, isClient=false) {
        const timeStampNow = new Date().toLocaleString()

        const htmlInput = `<div class="message${isClient ? ' message_client': ''}">
        <div class="message__time">${timeStampNow}</div>
        <div class="message__text">
          ${textMessage}
        </div>
      </div>`

      this.chatWidgetAllMessages.innerHTML += htmlInput

      this.chatWidgetMessagesContainer.scrollTo(0, this.chatWidgetMessagesContainer.scrollHeight)

    }

    getBotAwswer() {
        const messagesRandom = [
            'Я сплю...',
            'ААААААААА <= Псих.',
            'Вы не купили ни одного товара, чтобы с нами так разговаривать!',
            'Где ваша совесть?',
            'Мы ничего не будем вам продавать!',
            'Какого???',
            'К сожалению все операторы сейчас заняты. Не пишите нам больше.',
        ]

        const indexMessage = Math.floor(Math.random() * messagesRandom.length)
        
        return messagesRandom[indexMessage]
    }

    setTimerToSleep() {
        clearTimeout(this.timerBot)
        clearTimeout(this.timerBotWrap)
        
        this.timerBot = setTimeout(() => {
            this.sendMessage(this.messageOnPause)

            this.timerBotWrap = (setTimeout(() => {
                this.sendMessage(this.messageFinish)
                this.container.classList.remove('chat-widget_active')
            }, this.secondsBotWrap))

        }, this.secondsBotWrap)

      }
    
    registerEvents() {
        let bot = this

        this.chatWidgetSide.addEventListener('click', () => {
            this.sendMessage('Возможно я вам отвечу. Но это не точно...')

            bot.setTimerToSleep()

            this.container.classList.add('chat-widget_active')
        })
    
        this.inputMessageString.addEventListener('keyup', function(event) {

            bot.setTimerToSleep()

            if (event.key == 'Enter' && bot.inputMessageString.value.trim().length > 0) {
                bot.sendMessage(bot.inputMessageString.value, true)

                bot.inputMessageString.value = ''

                bot.sendMessage(bot.getBotAwswer())
            }
        });

    }
} 

new Bot(document.querySelector('.chat-widget'), 30)