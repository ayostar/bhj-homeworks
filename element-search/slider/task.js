// находим массив всех слайдов
const slidersAll = Array.from(document.querySelectorAll('.slider__item'))
console.log(slidersAll)
// находим массив всех точек
const slidersAllDot = Array.from(document.querySelectorAll('.slider__dot'))

// находим первый элемент коллекции класса предыдущий
const slidePrev = document.getElementsByClassName('slider__arrow_prev')[0] 

// находим первый элемент коллекции класса следующий
const slideNext = document.getElementsByClassName('slider__arrow_next')[0]

const slideOn = ' slider__item_active'
const dotOn = ' slider__dot_active'


// показываем точку активного слайда при загрузке страницы
function showInitialActiveDot() {
    // Метод findIndex() возвращает индекс в массиве, если элемент удовлетворяет условию
    // проверяющей функции. В противном случае возвращается -1.
    const activeSlideIndex = slidersAll.findIndex(slide => slide.className.includes('slider__item_active'))
    if (activeSlideIndex != -1) {
        return slidersAllDot[activeSlideIndex].className += dotOn
    } else console.log('Активного слайда в разметке нет')
}

// гасим слайд и точку
function hideActiveSlideDotIndex() {
    const activeSlideIndex = slidersAll.findIndex(slide => slide.className.includes('slider__item_active'))

    if (activeSlideIndex != -1) {
        slidersAll[activeSlideIndex].className = 'slider__item'
        slidersAllDot[activeSlideIndex].className = 'slider__dot'
        return activeSlideIndex
    } else 
    console.log('Активного слайда в разметке нет')
    return -1   
}


function nextSlide(searchDirection) {
    // гасим слайд и точку
    const activeSlideIndex = hideActiveSlideDotIndex()

    if (activeSlideIndex != -1) {
        let showSlideByIndex

        if (searchDirection) {
            // Слайд вперед
            showSlideByIndex = (activeSlideIndex == (slidersAll.length - 1)) ? 0 : (activeSlideIndex + 1)
            // console.log(activeSlideIndex, slidersAll.length-1)
        } else {
            // Слайд назад
            showSlideByIndex = (activeSlideIndex == 0) ? (slidersAll.length - 1) : (activeSlideIndex - 1)
        }

        // Показ активного слайда и точки
        slidersAll[showSlideByIndex].className += slideOn
        slidersAllDot[showSlideByIndex].className += dotOn
    }
}

showInitialActiveDot()

slidePrev.onclick = () => {
    nextSlide(false)
}

slideNext.onclick = () => {
    nextSlide(true)
}

for (let dot of slidersAllDot) {
    dot.onclick = () => {
        hideActiveSlideDotIndex()
        slidersAll[slidersAllDot.indexOf(dot)].className += slideOn
        dot.className += dotOn
}
}