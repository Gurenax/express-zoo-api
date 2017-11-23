const express = require('express')
const SeaCritter = require('../models/sea-critters')

const router = express.Router()

// GET all seaCritters
router.get('/sea-critters', (req, res) => {
  const seaCritters = SeaCritter.all()
  res.json(seaCritters)
})

// DELETE specific seaCritter
router.delete('/sea-critters/:id', (req, res) => {
  const id = req.params.id
  const seaCritter = SeaCritter.destroy(id)
  
  // If seaCritter was found and deleted
  if (seaCritter) {
    res.status(200).json(seaCritter)
  }
  // If seaCritter was not deleted
  else {
    res.status(204).json({ error: `The Sea Critter with id '${id}' was not deleted`})
  }
})

// UPDATE specific seaCritter
router.patch('/sea-critters/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  const seaCritter = SeaCritter.update(id, attributes)

  console.log('Update!')

  // If seaCritter was found and deleted
  if (seaCritter) {
    res.status(200).json(seaCritter)
  }
  // If seaCritter was not deleted
  else {
    res.status(204).json({ error: `The Sea Critter with id '${id}' was not updated`})
  }
})

// GET specific seaCritter
router.get('/sea-critters/:id', (req, res) => {
  const id = req.params.id
  const seaCritter = SeaCritter.find(id)
  
  // If seaCritter was found
  if (seaCritter) {
    res.json(seaCritter)
  }
  // If seaCritter was not found
  else {
    res.status(404).json({ error: `The Sea Critter with id '${id}' was not found`})
  }
})

// POST new seaCritter
router.post('/sea-critters', (req, res) => {
  const attributes = req.body
  const newSeaCritter = SeaCritter.create(attributes)
  res.status(201).json(newSeaCritter)
})

module.exports = router
