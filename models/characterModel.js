const mongoose = require('mongoose')

let CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    movie: {
        type: String,
        required: true
      },
    bestFriend:{
        type: String,
        required: true
      },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

const Character = mongoose.model('character', CharacterSchema)
module.exports = Character
