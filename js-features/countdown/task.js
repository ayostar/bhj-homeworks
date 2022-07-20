
const getTimerTag = document.getElementById('timer')
console.log(getTimerTag)

setTimeout(function tick() {
    if (isNaN(Number(getTimerTag.textContent))) {    // Если формат задан не в виде числа или 'числа'
        const timeArray = getTimerTag.textContent.split(':')     // принимаем, что это вида часы:минуты:секунды
        seconds = (+timeArray[0]) * 60 * 60 + (+timeArray[1]) * 60 + (+timeArray[2])  // преобразуем суммирование в секунды
        seconds--     // уменьшаем на одну
    } else {
        seconds = Number(getTimerTag.textContent) - 1   // иначе преобразуем точно в число уменьшаем на одну
    }
        
    if (seconds < 0) {
        alert('Вы победили в конкурсе!')
        if (document.getElementById('file-download')) {
        document.getElementById('file-download').click() // находим по id файл и по ссылке перекачиваем файл из папки
        return
        } else {
            alert ('Файл для скачивания не найден')
        }
        
    } else {
        let updTime = new Date(null) // создаём экземпляр объекта Date
        updTime.setSeconds(seconds) // секунды переводим в формат Date
        console.log(updTime.toISOString())
        getTimerTag.textContent = updTime.toISOString().substr(11, 8) // переводим в необходимый формат с выборкой с 11 символа 8 символов
        
        setTimeout(tick, 1000) // перезапускаем функцию через 1 секунду
    }
}, 1000)