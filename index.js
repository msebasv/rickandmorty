const application = document.querySelector('.container-card')

const url = 'https://rickandmortyapi.com/api/character'

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((character) => {
      const card = document.createElement('div')
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
      application.appendChild(card)
      card.appendChild(title)
      card.appendChild(image)
      card.appendChild(status)
      card.appendChild(buttonDetail)
    })
  })
  .catch((err) => console.log(err))
