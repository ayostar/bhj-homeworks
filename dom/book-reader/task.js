// const book = window.book
const book = document.getElementById('book')

const bookControls = Array.from(document.querySelectorAll('.book__controls'))

bookControls.forEach((bookControl) => {
    const controls = Array.from(bookControl.querySelectorAll('.book__control'))

    const controlsMapping = [
        {
            nameClass: 'book__control_font-size',
            activeClass: 'font-size_active',
            style: 'size',
            styleClass: 'book_fs-',
        },
        {
            nameClass: 'book__control_color',
            activeClass: 'color_active',
            style: 'text-color',
            styleClass: 'book_color-',
        },
        {
            nameClass: 'book__control_background',
            activeClass: 'color_active',
            style: 'bg-color',
            styleClass: 'book_bg-',
        },
    ]

    controls.forEach((control, index) => {

        const buttonsAll = control.querySelectorAll('a')

        buttonsAll.forEach((button) => {

            button.addEventListener('click', (event) => {                

                const buttonCurrent = control.querySelector('.' + controlsMapping[index].activeClass)
                console.log(buttonCurrent)

                if (buttonCurrent != button) {

                    const attributeCurrent = buttonCurrent.getAttribute('data-' + controlsMapping[index].style)
                    if (attributeCurrent) {
                        book.classList.remove(controlsMapping[index].styleClass + attributeCurrent)
                    }

                    buttonCurrent.classList.remove(controlsMapping[index].activeClass)
    
                    button.classList.add(controlsMapping[index].activeClass)
                    
                    const attributeActivate = button.getAttribute('data-' + controlsMapping[index].style)
                    if (attributeActivate) {
                        book.classList.add(controlsMapping[index].styleClass + attributeActivate)
                    }
    
                }

                event.preventDefault()
            })
        })
    })

})