keyPopup = 'popup'

const subscribeModal = document.getElementById('subscribe-modal')
const subscribeModalClose = document.querySelector('.modal__close_times')

subscribeModal.classList.add('modal_active')


subscribeModalClose.onclick = () => {
    subscribeModal.classList.remove('modal_active')
    setCookie(keyPopup, false)
}

function setCookie(name, value) {
    let incomingCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) 
    document.cookie = incomingCookie
}

function getCookie(name) {
    const pairs = document.cookie.split('; ')

    if (pairs != '') {
        const cookie = pairs.find(p => p.startsWith(name + '='))
        const match = cookie.substr(name.length + 1)
        console.log(match)
        return match
    } else return false

}

if (!getCookie(keyPopup)) {
    console.log(getCookie(keyPopup))
    subscribeModal.classList.add('modal_active')
}