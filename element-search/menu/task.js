
const menuHeaders = document.querySelector('.menu_main') // поиск контента по селектор menu_main

let arrayMenuItems = Array.from(menuHeaders.querySelectorAll('.menu__item')) // массив контента по селектору menu__item

if (arrayMenuItems != null) {

    arrayMenuItems.forEach((item) => {
        if (item.querySelector('.menu_sub')) { // если у menu_item есть селектор .menu_sub
            const menuHeaderWithSubMenu = item.getElementsByTagName('a')[0] // получаю по индексу контент первого элемента (основную на под меню)
            menuHeaderWithSubMenu.onclick = function openSubMenu() {  // при нажатии на этот тэг
                console.log(menuHeaderWithSubMenu)
                const clickedMenuItem = item.getElementsByClassName('menu_sub')[0] // находим в массиве закликанный список подменю
                console.log(clickedMenuItem)

                // clickedMenuItem.className += ' menu_active'
                const openedMenuItem = document.getElementsByClassName('menu_sub menu_active')[0] // находим в документе открытый список подменю
                console.log(openedMenuItem)
                

                if (clickedMenuItem == openedMenuItem) {  // если клик по тому же пункту списка подменю
                    clickedMenuItem.className = 'menu menu_sub' // закрываем его видимость
                    return false
                    
                } else if (clickedMenuItem != openedMenuItem) { // если кликаем по другому меню
                    if (openedMenuItem != null) { // проверяем можно ли менять класс видимости, если в документе ещё нет открытого подменю
                        openedMenuItem.className = 'menu menu_sub' // закрываем открытое подменю
                    }
                    clickedMenuItem.className += ' menu_active' // переводим скрытое меню в открытое
                    return false
                }
            }
        }
    })    
} else{
    alert('Что-то не так с основным меню')
}