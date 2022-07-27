const tabHeaders = Array.from(document.getElementsByClassName('tab'))
const tabHeadersContent = Array.from(document.getElementsByClassName('tab__content'))

tabHeaders.forEach((tabHeader) => {
    tabHeader.addEventListener('click', () => {

        const tabActiveHeader = document.querySelector('.tab_active') // находим активный заголовок   
        const tabActiveHeaderIndex = tabHeaders.indexOf(tabActiveHeader) // находим индекс активного заголовка
        tabActiveHeader.className = 'tab' // отключаем заголовок
        tabHeadersContent[tabActiveHeaderIndex].className = 'tab__content' // отключаем контент заголовка

        tabHeader.className = 'tab tab_active' // показываем кликнутый заголовок
        const tabHeaderIndex = tabHeaders.indexOf(tabHeader) // находим индекс кликнутого заголовка
        tabHeadersContent[tabHeaderIndex].className = 'tab__content tab__content_active' // показываем контент кликнутого заголовка
    })
});