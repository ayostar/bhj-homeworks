const dropdownButtons = Array.from(document.querySelectorAll('.dropdown')) // получаем динамический массив элементов селектора .dropdown


dropdownButtons.forEach((item) => {
    const dropdownList = item.querySelector('.dropdown__list') // находим первый элемент документа, который соответствует селектору .dropdown__list


    const dropdownInitialValue = item.querySelector('.dropdown__value') // находим значение селектора .dropdown__value первичное

    dropdownInitialValue.addEventListener('click', () => {
        // при нажатии показываем выпадающий список, добавляя active. Если уже с active, то убираем
        dropdownList.className = dropdownList.classList.contains('dropdown__list_active') ? 'dropdown__list' : 'dropdown__list dropdown__list_active'

    })

    const dropdownListItems = dropdownList.querySelectorAll('.dropdown__item') // получаем статический Node_list из всех вариантов списка

    dropdownListItems.forEach((dropdownListItem) => {
        
        const getDropdownListLink = dropdownListItem.getElementsByTagName('a')[0] // добираемся до ссылочного тэга a
        console.log(getDropdownListLink)
        // отмменяем стандартное поведение при нажатии на ссылочный тэг
        getDropdownListLink.onclick = function () {
            return false
        }

        // добавляем своё поведение при нажатии
        dropdownListItem.addEventListener('click', function () {

            // получаем очищенный контент каждой ссылки списка
            const dropdownClickedValue = this.querySelector('.dropdown__link').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
            // меняем значение если иное
            if (dropdownInitialValue.textContent != dropdownClickedValue) {
                dropdownInitialValue.textContent = dropdownClickedValue
            }
            // сворачиваем список, убирая показ
            dropdownList.className = 'dropdown__list'
        })
    })
})
