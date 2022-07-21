'use strict'

// function counter(i = 0) {
//     let j = i
//     return function increment() {
//         j++
//         return j
//     }
// }

function timestampSeconds() {
    const seconds = new Date().getTime() / 1000
    console.log(seconds)
    return seconds
}

const imgSize = 50
const clickRate = 0
let clickInterval = 0

// const addClick = counter()

const imgContent = document.getElementById('cookie')
const clickerCounterContent = document.getElementById('clicker__counter')
const clickerRateContent = document.getElementById('clicker__rate')

imgContent.onclick = () => {
    // clickerCounterContent.textContent = addClick()
    let addClick = +clickerCounterContent.textContent + 1
    clickerCounterContent.textContent = addClick  

    if (clickerCounterContent.textContent == 1) {        
        let clickInterval = timestampSeconds()
        clickerRateContent.textContent = 1
        console.log(clickInterval)
    } else {
        const nowSeconds = timestampSeconds()
        const value = 1 / (nowSeconds - clickInterval)
        
        clickerRateContent.textContent = new Intl.NumberFormat('ru', { minimumFractionDigits: 3}).format(value)
        
        clickInterval = nowSeconds
    }

    imgContent.width += imgSize
    imgContent.height += imgSize

    setTimeout(function originalSize() {
        imgContent.width -= imgSize
        imgContent.height -= imgSize
    }, 100)
}