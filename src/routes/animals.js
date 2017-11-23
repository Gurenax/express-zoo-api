const express = require('express')
const Animal = require('../models/animals')

const router = express.Router()

// GET all animals
router.get('/animals', (req, res) => {
  const animals = Animal.all()
  res.json(animals)
})

// DELETE specific animal
router.delete('/animals/:id', (req, res) => {
  const id = req.params.id
  const animal = Animal.destroy(id)
  
  // If animal was found and deleted
  if (animal) {
    res.status(200).json(animal)
  }
  // If animal was not deleted
  else {
    res.status(204).json({ error: `The animal with id '${id}' was not deleted`})
  }
})

// UPDATE specific animal
router.patch('/animals/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  const animal = Animal.update(id, attributes)

  console.log('Update!')

  // If animal was found and deleted
  if (animal) {
    res.status(200).json(animal)
  }
  // If animal was not deleted
  else {
    res.status(204).json({ error: `The animal with id '${id}' was not updated`})
  }
})

// GET specific animal
router.get('/animals/:id', (req, res) => {
  const id = req.params.id
  const animal = Animal.find(id)
  
  // If animal was found
  if (animal) {
    res.json(animal)
  }
  // If animal was not found
  else {
    res.status(404).json({ error: `The animal with id '${id}' was not found`})
  }
})

// POST new animal
router.post('/animals', (req, res) => {
  const attributes = req.body
  const newAnimal = Animal.create(attributes)
  res.status(201).json(newAnimal)
})

module.exports = router
