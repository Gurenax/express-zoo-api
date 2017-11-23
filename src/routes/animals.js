const express = require('express')
const Animal = require('../models/animals')

const router = express.Router()

// // GET all animals with WHERE query
// router.get('/animals/q/:query', (req, res) => {
//   const query = req.params.query
//   console.log(query)
//   // const animals = Animal.all()
//   const queriedAnimal = Animal.where(query)
//   res.json(queriedAnimal)
// })

// GET all animals
router.get('/animals', (req, res) => {
  // When the q variable is indiicated in the url, get the query string
  let query = req.url.replace('/animals','')
  query = query.replace(new RegExp(/^\?q=/ig),'')
  console.log(query)

  // If a query string is available, use the WHERE method in Animal
  if(query) {
    const queriedAnimal = Animal.where(query)
    res.json(queriedAnimal)
  }
  // Otherwise, just select all animals
  else {
    // const animals = Animal.all()
    const sortedAnimals = Animal.sortByName()
    res.json(sortedAnimals)
  }
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
