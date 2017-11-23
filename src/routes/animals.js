const express = require('express')
const Animal = require('../models/animals')
const Area = require('../models/areas')

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
  let query = req.url.replace('/animals', '')
  query = query.replace(new RegExp(/^\?q=/gi), '')
  console.log(query)

  // If a query string is available, use the WHERE method in Animal
  if (query) {
    const queriedAnimal = Animal.where(query)
    // Populate animal area information
    queriedAnimal.map(animal => {
      animal.area = Area.find(animal.area)
    })
    res.json(queriedAnimal)
  } else {
    // Otherwise, just select all animals
    // const animals = Animal.all()
    const sortedAnimals = Animal.sortByName()
    // Populate animal area information
    sortedAnimals.map(animal => {
      animal.area = Area.find(animal.area)
    })
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
  } else {
    // If animal was not deleted
    res
      .status(204)
      .json({ error: `The animal with id '${id}' was not deleted` })
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
  } else {
    // If animal was not deleted
    res
      .status(204)
      .json({ error: `The animal with id '${id}' was not updated` })
  }
})

// GET specific animal
router.get('/animals/:id', (req, res) => {
  const id = req.params.id
  const animal = Animal.find(id)

  // If animal was found
  if (animal) {
    // Populate animal area information
    animal.area = Area.find(animal.area)
    res.json(animal)
  } else {
    // If animal was not found
    res.status(404).json({ error: `The animal with id '${id}' was not found` })
  }
})

// POST new animal
router.post('/animals', (req, res) => {
  const attributes = req.body
  const newAnimal = Animal.create(attributes)
  res.status(201).json(newAnimal)
})

module.exports = router
