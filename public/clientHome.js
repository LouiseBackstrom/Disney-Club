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
        userName.innerText = "Created By : " + character.user.user

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



