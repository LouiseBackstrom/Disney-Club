const express = require('express')
const characterModel = require('../models/characterModel')
const router = express.Router()
const requireSignIn = require('../auth')


// Create
router.post('/characters', requireSignIn, async (req, res) => {
  
  try {
    const character = new characterModel({...req.body, user: req.session.user})
    const findCharacter = await characterModel.findOne ({ name: req.body.name })
   
    if (!findCharacter) {
      await character.save()
      res.send(character) 
      } else {
        res.status(400).json('Character already exists')
      }

  } catch (err) {
    res.status(500).send(err)
  }
})

// Get all
router.get('/characters/', async (req, res) => {
  
  try {
    const characters = await characterModel.find().populate('user')
    res.send(characters)

  } catch (err) {
    res.status(500).send(err)
  }
})

// Update
router.put('/characters/:id', requireSignIn, async (req, res) => {
  try {
    const character = await characterModel.findOne({ _id: req.params.id })
    
    if (!character) {
      res.status(404).json('No character found')
    } 

    if (req.session.user._id == character.user) {
      const updatedCharacter = new characterModel(Object.assign(character, req.body))
      await updatedCharacter.save()
      res.status(200).json('Your character has been updated')
    }

    if (req.session.user._id !== character.user){
      res.status(403).json('You can not change another users character!')
    } 
  } catch (err) {
    res.status(500).send(err)
  }

})

// Delete
router.delete('/characters/:id', requireSignIn, async (req, res) => {
    
  try {
    const character = await characterModel.findOne({_id: req.params.id})

    if (!character) {
      res.status(404).json('No character found')
    } 

    if (character.user == req.session.user._id){
      await character.remove() 
      res.status(200).json('Your character was removed')
    }

    res.status(403).json('You can not delete another users charcter!')
    
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router