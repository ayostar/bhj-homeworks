const allReveals = Array.from(document.querySelectorAll('.reveal'))
console.log(allReveals)

window.addEventListener('scroll', () => {
    allReveals.forEach((reveal) => {
        const {top, bottom} = reveal.getBoundingClientRect()
    
        if ((bottom < 0 || top > window.innerHeight)) {
            reveal.classList.remove('reveal_active')
        } else {
            reveal.classList.add('reveal_active')
        }
    })
})