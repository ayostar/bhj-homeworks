class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.timerElement = container.querySelector('.status__timer')

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    window.addEventListener('keyup', (keyboard_event) => {
    const keyDown = keyboard_event.key.toLowerCase()
    const currentSymbol = this.currentSymbol.textContent.toLowerCase()
    keyDown == currentSymbol ? this.success() : this.fail()
  })
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setTime(numSeconds) {
    this.timerElement.textContent = numSeconds

    let newRound = this
    
    this.timerId = setInterval(function() { // setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени.
      if (--newRound.timerElement.textContent == 0) {
        newRound.fail();
      } 
    }, 1000)  
  }

  setNewWord() {
    clearTimeout(this.timerId)

    const word = this.getWord()

    this.renderWord(word)
    this.setTime(word.length)
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

