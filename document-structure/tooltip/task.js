const allTooltips = document.querySelectorAll('.has-tooltip')
const tooltipActive = 'tooltip_active'
const adjustMargin = 4

function createTooltip(tooltipTargetElement) {
    const createdTooltip = document.createElement('div')
    createdTooltip.textContent = tooltipTargetElement.title
    createdTooltip.className = 'tooltip'
    tooltipTargetElement.insertAdjacentElement('afterEnd', createdTooltip) 
}

function adjustTooltipPostion(tooltip, targetElement, margin) {
    const dataPosition = targetElement.dataset.position ? targetElement.dataset.position : "bottom"
    console.log(dataPosition)
    const positionTargetElement = targetElement.getBoundingClientRect()
    const positionTooltip = tooltip.getBoundingClientRect()

    switch (dataPosition) {
        case "top":
            tooltip.style.left = `${positionTargetElement.left}px`
            tooltip.style.top = `${positionTargetElement.top - positionTooltip.height - margin}px`
            break
        case "left":
            tooltip.style.left = `${positionTargetElement.left - positionTooltip.width - margin}px`
            tooltip.style.top = `${positionTargetElement.top}px`
            break
        case "right":
            tooltip.style.left = `${positionTargetElement.left + positionTargetElement.width + margin}px`
            tooltip.style.top = `${positionTargetElement.top}px`
            break            
        case "bottom":
            tooltip.style.left = `${positionTargetElement.left}px`;
            tooltip.style.top = `${positionTargetElement.bottom + margin}px`
            break
        }
    }

allTooltips.forEach((tooltipTargetElementLink) => {

    createTooltip(tooltipTargetElementLink)

    tooltipTargetElementLink.addEventListener('click', (e) => {
        const currentEventElement = e.currentTarget
        const addedTooltip = currentEventElement.nextElementSibling
        const activeTooltip = document.querySelector('.' + tooltipActive)
        console.log(addedTooltip)
        console.log(activeTooltip)

        if (activeTooltip != addedTooltip) {
            if (activeTooltip) {
                activeTooltip.classList.remove(tooltipActive)
            }

            addedTooltip.classList.add(tooltipActive)
            adjustTooltipPostion(addedTooltip, currentEventElement, adjustMargin)
        } else {
            addedTooltip.classList.remove(tooltipActive)
        }

        e.preventDefault()
    })
})

const windowEvents = ['scroll', 'resize']
windowEvents.forEach((event) => {
    window.addEventListener(event, () => {
        const activeTooltip = document.querySelector('.' + tooltipActive)
        if (activeTooltip) {
            activeTooltip.classList.remove(tooltipActive)      
        }
    })    
})
