const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User
