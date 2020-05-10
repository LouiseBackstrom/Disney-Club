const express = require('express')
const characterModel = require('../models/characterModel')
const router = express()


// Create
router.post('/characters', async (req, res) => {
  const character = new characterModel(req.body)

  try {
    await character.save()
    res.send(character)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Read
router.get('/characters', async (req, res) => {
    const characters = await characterModel.find({})
  
    try {
      res.send(characters)
    } catch (err) {
      res.status(500).send(err)
    }
  })

// Update
router.put('/characters/:id', async (req, res) => {

  try {
    const id = req.params.id
    const character = await characterModel.findByIdAndUpdate(id, req.body)
    await character.save()
    res.json({
      old: character,
      new: req.body  
    })
  
  } catch (err) {
    if (err.code = 11000) {
      res.status(400).json('Character has already been created')
    } else {
    res.status(500).send(err)
  }
}
})

// Delete
router.delete('/characters/:id', async (req, res) => {
    try {
      const character = await characterModel.findByIdAndDelete(req.params.id)
  
      if (!character) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = router