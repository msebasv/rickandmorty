const application = document.querySelector('.container-card')
const url = 'https://rickandmortyapi.com/api/character'
const modalContainer = document.querySelector('.modal-container')
const btnNext = document.getElementById('btnNext')
const btnPrev = document.getElementById('btnPrev')

let nextPage = null
let prevPage = null

const generateCharacterCard = (character) => {
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
    getCharacterById(character.id)
  })
  application.appendChild(card)
  card.appendChild(title)
  card.appendChild(image)
  card.appendChild(status)
  card.appendChild(buttonDetail)
}

const generateCharacterModal = (character) => {
  const modal = document.createElement('div')
  modal.className = 'modal'
  const imageModal = new Image()
  imageModal.src = character.image
  imageModal.className = 'image-modal'
  const buttonClose = document.createElement('p')
  buttonClose.innerHTML = 'Close modal'
  buttonClose.addEventListener('click', (e) => {
    e.preventDefault()
    modalContainer.style.visibility = 'hidden'
    modalContainer.removeChild(modal)
  })
  buttonClose.className = 'close-modal'
  const containerInformation = document.createElement('div')
  containerInformation.className = 'container-information'
  const name = document.createElement('h1')
  name.innerHTML = character.name
  const status = document.createElement('p')
  status.innerHTML = character.status
  const gender = document.createElement('p')
  gender.innerHTML = character.gender
  const origin = document.createElement('p')
  origin.innerHTML = character.origin.name
  const location = document.createElement('p')
  location.innerHTML = character.location.name
  modalContainer.appendChild(modal)
  modal.appendChild(imageModal)
  modal.appendChild(containerInformation)
  containerInformation.appendChild(name)
  containerInformation.appendChild(status)
  containerInformation.appendChild(gender)
  containerInformation.appendChild(origin)
  containerInformation.appendChild(location)
  containerInformation.appendChild(buttonClose)
}

btnNext.addEventListener('click', () => {
  fetch(nextPage)
  .then((res) => res.json())
  .then((characters) => {
    document.querySelectorAll('.card').forEach((card) => application.removeChild(card))

    nextPage = characters.info.next
    prevPage = characters.info.prev
    characters.results.forEach((character) => generateCharacterCard(character));
  }).catch((err) => console.log(err))
})

btnPrev.addEventListener('click', () => {
  fetch(prevPage)
  .then((res) => res.json())
  .then((characters) => {
    document.querySelectorAll('.card').forEach((card) => application.removeChild(card))

    nextPage = characters.info.next
    prevPage = characters.info.prev
    characters.results.forEach((character) => generateCharacterCard(character));
  }).catch((err) => console.log(err))
})

const getCharacterById = (id) => {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((character) => generateCharacterModal(character))
    .catch((err) => console.log(err))
}

const initialice = () => {
  fetch(url)
  .then((res) => res.json())
  .then((characters) => {
    nextPage = characters.info.next
    prevPage = characters.info.prev
    characters.results.forEach((character) => generateCharacterCard(character));
  }).catch((err) => console.log(err))
}

initialice();