const strikesToWin = 10
const missesToLose = 7

let killedMoles
let lostMoles


let winGameCounter = document.getElementById('win-game__counter')
winGameCounter.textContent = strikesToWin
let loseGameCounter = document.getElementById('lose-game__counter')
loseGameCounter.textContent = missesToLose
const wins = document.getElementById('dead')
const losses = document.getElementById('lost')

function restart() {
    lostMoles = 0
    killedMoles = 0
    wins.textContent = killedMoles
    losses.textContent = lostMoles
}

restart();

for (holeIndex = 1; holeIndex <= 9; holeIndex++) {
    const hole = document.getElementById('hole'+holeIndex)
    hole.onclick = () => {
        if (hole.classList.contains('hole_has-mole')) {
            killedMoles++
            wins.textContent = killedMoles

            if (killedMoles == strikesToWin) {
                alert(`Вы убили - ${killedMoles} кротов. Победа!`)
                restart()
            }
        } else {
            lostMoles++
            losses.textContent = lostMoles

            if (lostMoles == missesToLose) {
                alert(`Вы промазали - ${lostMoles} раз. Проигрышь!`)
                restart()
            }
        }
    }
}