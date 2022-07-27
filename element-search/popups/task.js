const popupMain = window.modal_main // Получаю контент изначального окна по id modal_main
const popupSuccess = window.modal_success // Получаю контент желаемого результата по id modal_success

popupMain.className += ' modal_active' // Показываю изначальный popup, мутируя класс modal_main добавлением класса modal_active

const popupMainButton = document.querySelector('.show-success') // получаю селектор состояния текущей кнопки по селектору .show-success

const popupCloseElements = document.querySelectorAll('.modal__close') // получаю статический NodeList по селектору .modal__close для закрытия
console.log(popupCloseElements)

// закрытие только по крестику достигается тем, что сначала при первой итерации цикла срабатывает обрабочик смены цвета кнопки???
for (let element of popupCloseElements) { 
    console.log(element)
    element.onclick = function closePopup() { 
        let popupToClose = element.closest('.modal') 
        popupToClose.className = 'modal' // так как NodeList статический, то при имеющейся разметке страницы и последовательности кода js закрывается только по крестику
    }
}

popupMainButton.onclick = () => {
    popupMain.className = 'modal'
    console.log()
    popupSuccess.className += ' modal_active' // по факту клика переключаю тумблер видимости на желаемый контент
}



// закрытие popup, когда закрываются всё с классом modal__close, в том числе и при нажатии на основную кнопку, т.к. этот класс есть в классах кнопки
// надо исправить разметку???
/* const arrayToClose = Array.from(document.querySelectorAll('.modal__close')) // получаю массив всех элементов страницы по селектору .modal__close для закрытия
console.log(arrayToClose)
arrayToClose.forEach((element) => { // для каждого элемента массива с классом закрытия
    element.onclick = () => { // при клике на такой элемент
        element.closest('.modal').className = 'modal' // для каждого элемента с родителем класса modal, перезаписываю класс modal, убирая класс видимости
    }

})
 */


