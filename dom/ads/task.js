const allRotators = Array.from(document.querySelectorAll('.rotator'))
const defaultDataspeed = 1000

allRotators.forEach((rotator) => {
    const allCases = Array.from(rotator.querySelectorAll('.rotator__case'))

    if (allCases != -1) {

        let rotatorIndex = 0

        const firstDataSet = allCases[rotatorIndex].dataset
        console.log(firstDataSet.color)
        console.log(allCases[rotatorIndex].style.color)

        // почему-то не работает изначальный стиль, приходится прописывать вручную
        allCases[rotatorIndex].style.color = firstDataSet.color
        
        setTimeout(function tick() {

            allCases[rotatorIndex].classList.remove('rotator__case_active')
            
            // прокрутка по циклу
            if (++rotatorIndex == allCases.length) {
                rotatorIndex = 0
            }

            const nextDataset = allCases[rotatorIndex].dataset
            
            allCases[rotatorIndex].style.color = nextDataset.color

            allCases[rotatorIndex].classList.add('rotator__case_active')

            setTimeout(tick, nextDataset.defaultDataspeed ? nextDataset.defaultDataspeed : defaultDataspeed)
        }, firstDataSet.defaultDataspeed ? firstDataSet.defaultDataspeed : defaultDataspeed)
    }
})