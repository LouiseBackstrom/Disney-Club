const form = document.getElementById('create')
form.addEventListener('submit', createNew)

function createNew(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const character = {}
    for (const pair of formData.entries()) {
        const [key, value] = pair
        character[key] = value
    }

    fetch("/characters", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
    }).then((response) => {

        if(response.status === 400) {
            console.log("Character already exists")
            let createContainer = document.getElementById("message")
            let message = document.createElement("h4")
            message.innerText = "Character already exists"
            createContainer.appendChild(message)
        } else {

    let createContainer = document.getElementById("message")

    let message = document.createElement("h4")
    message.innerText = "A new Disney character has been added!"
    createContainer.appendChild(message)
    }
    setTimeout(function () {
        window.location.reload()
    }, 1500)
})
}

const formUpdate = document.getElementById('updateCharacter')
formUpdate.addEventListener('submit', update)

function update(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const updatedCharacter = {}
    for (const pair of formData.entries()) {
        const [key, value] = pair
        updatedCharacter[key] = value
    }
    const id = document.getElementById("updateId").value
    const name = document.getElementById("updateName").value
    fetch("/characters/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCharacter)
    }).then((response) => {

        if(response.status === 404) {
           console.log('No character found')
           let createContainer = document.getElementById("updateMessage")
           let updateMessage = document.createElement("h4")
           updateMessage.innerText = "No character found"
           createContainer.appendChild(updateMessage)
       }
        if (response.status === 200) {
            let createContainer = document.getElementById("updateMessage")
            let updateMessage = document.createElement("h4")
            updateMessage.innerText = name + " has been updated"
            createContainer.appendChild(updateMessage)
        }
        if (response.status === 403) {
            console.log('You can not change another users character!')
            let createContainer = document.getElementById("updateMessage")
            let updateMessage = document.createElement("h4")
            updateMessage.innerText = "You can not change another users character!"
            createContainer.appendChild(updateMessage)
        }

        setTimeout(function () {
            window.location.reload()
        }, 1500)
    })
}

const deleteform = document.getElementById('deleteCharacter')
deleteform.addEventListener('submit', deleteCharacter)
function deleteCharacter(event) {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData(event.target)
    const deletedCharacter = {}
    for (const pair of formData.entries()) {
        const [key, value] = pair
        deletedCharacter[key] = value
    }
    const id = document.getElementById("deleteId").value
    fetch("/characters/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then((response) => {

        if(response.status === 404) {
           console.log('No character found')
           let createContainer = document.getElementById("updateMessage")
           let updateMessage = document.createElement("h4")
           updateMessage.innerText = "No character found"
           createContainer.appendChild(updateMessage)
       }
        if (response.status === 200) {
            let deletecontainer = document.getElementById("deleteMessage")
            let deleteMessage = document.createElement("h4")
            deleteMessage.innerText = id + " has been deleted"
            deletecontainer.appendChild(deleteMessage)
        }
        if (response.status === 403) {
            console.log('You can not delete another users charcter!')
            let createContainer = document.getElementById("updateMessage")
            let updateMessage = document.createElement("h4")
            updateMessage.innerText = "You can not delete another users charcter!"
            createContainer.appendChild(updateMessage)
        }
    })
    setTimeout(function () {
        window.location.reload()
    }, 1500)
}


fetch("/characters").then((response) => {
    return response.json()
}).then((characters) => {
    allCharacters(characters)
})

function allCharacters(characters) {
    let allCharactersContainer = document.getElementById("getAllCharacters")

    characters.forEach(character => {
        let characterHeadline = document.createElement("h4")
        characterHeadline.innerText = character.name + " in " + character.movie
        let characterName = document.createElement("h5")
        characterName.innerText = "Disney Character: " + character.name
        let characterMovie = document.createElement("h5")
        characterMovie.innerText = "Disney Movie: " + character.movie
        let characterBestFriend = document.createElement("h5")
        characterBestFriend.innerText = "Best Friend: " + character.bestFriend
        let characterId = document.createElement("h5")
        characterId.innerText = "Disney Id : " + character._id
        let userName = document.createElement("h5")
        userName.innerText = "Created By : " + character.username
        
        let characterDiv = document.createElement("div")
        characterDiv.classList.add("all")

        characterDiv.appendChild(characterHeadline)
        characterDiv.appendChild(characterName)
        characterDiv.appendChild(characterMovie)
        characterDiv.appendChild(characterBestFriend)
        characterDiv.appendChild(characterId)
        characterDiv.appendChild(userName)

        allCharactersContainer.appendChild(characterDiv)
    })
}

