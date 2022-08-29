const uploadForm = document.getElementById('form')

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const progressBar = document.getElementById('progress')

    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            progressBar.value = e.loaded
            progressBar.max = e.total
        }        
    }

    const formData = new FormData(uploadForm)

    xhr.open('POST', uploadForm.getAttribute('action'))
    xhr.send(formData)
})