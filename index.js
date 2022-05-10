const application = document.querySelector('.container-card')

const url = 'https://rickandmortyapi.com/api/character'

const modalContainer = document.querySelector('.modal-container')
const btnNext = document.getElementById('btnNext')
const btnPrev = document.getElementById('btnPrev')

const getData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((character) => {
        const card = document.createElement('div')
        card.setAttribute('id', character.id)
        card.className = 'card'
        const image = new Image()
        image.src = character.image
        image.className = 'image-character'
        const title = document.createElement('h1')
        title.innerHTML = character.name
        title.className = 'title'
        const status = document.createElement('p')
        status.innerHTML = character.status
        status.className = 'status'
        const buttonDetail = document.createElement('button')
        buttonDetail.innerHTML = 'Detail'
        buttonDetail.className = 'button-detail'
        buttonDetail.addEventListener('click', (e) => {
          e.preventDefault()
          modalContainer.style.visibility = 'visible'
          getDataId(character.id)
        })
        application.appendChild(card)
        card.appendChild(title)
        card.appendChild(image)
        card.appendChild(status)
        card.appendChild(buttonDetail)
      }, printPagination(data.info))
    })
    .catch((err) => console.log(err))
}

const getDataId = (id) => {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const modal = document.createElement('div')
      modal.className = 'modal'
      const imageModal = new Image()
      imageModal.src = data.image
      imageModal.className = 'image-modal'
      const buttonClose = document.createElement('p')
      buttonClose.innerHTML = 'Close modal'
      buttonClose.addEventListener('click', (e) => {
        e.preventDefault()
        modalContainer.style.visibility = 'hidden'
      })
      buttonClose.className = 'close-modal'
      const containerInformation = document.createElement('div')
      containerInformation.className = 'container-information'
      const name = document.createElement('h1')
      name.innerHTML = data.name
      const status = document.createElement('p')
      status.innerHTML = data.status
      const gender = document.createElement('p')
      gender.innerHTML = data.gender
      const origin = document.createElement('p')
      origin.innerHTML = data.origin.name
      const location = document.createElement('p')
      location.innerHTML = data.location.name
      modalContainer.appendChild(modal)
      modal.appendChild(imageModal)
      modal.appendChild(containerInformation)
      containerInformation.appendChild(name)
      containerInformation.appendChild(status)
      containerInformation.appendChild(gender)
      containerInformation.appendChild(origin)
      containerInformation.appendChild(location)
      containerInformation.appendChild(buttonClose)
    })
    .catch((err) => console.log(err))
}

getData(url)

const printPagination = (info) => {
  btnNext.addEventListener('click', () => {
    getData(info.next)
    console.log(info.next)
  })
}
