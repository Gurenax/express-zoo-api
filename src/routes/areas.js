const express = require('express')
const Area = require('../models/areas')

const router = express.Router()

// // GET all areas with WHERE query
// router.get('/areas/q/:query', (req, res) => {
//   const query = req.params.query
//   console.log(query)
//   // const areas = Area.all()
//   const queriedArea = Area.where(query)
//   res.json(queriedArea)
// })

// GET all areas
router.get('/areas', (req, res) => {
  const areas = Area.all()
  res.json(areas)
})

// DELETE specific area
router.delete('/areas/:id', (req, res) => {
  const id = req.params.id
  const area = Area.destroy(id)

  // If area was found and deleted
  if (area) {
    res.status(200).json(area)
  } else {
    // If area was not deleted
    res.status(204).json({ error: `The area with id '${id}' was not deleted` })
  }
})

// UPDATE specific area
router.patch('/areas/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  const area = Area.update(id, attributes)

  console.log('Update!')

  // If area was found and deleted
  if (area) {
    res.status(200).json(area)
  } else {
    // If area was not deleted
    res.status(204).json({ error: `The area with id '${id}' was not updated` })
  }
})

// GET specific area
router.get('/areas/:id', (req, res) => {
  const id = req.params.id
  const area = Area.find(id)

  // If area was found
  if (area) {
    res.json(area)
  } else {
    // If area was not found
    res.status(404).json({ error: `The area with id '${id}' was not found` })
  }
})

// POST new area
router.post('/areas', (req, res) => {
  const attributes = req.body
  const newArea = Area.create(attributes)
  res.status(201).json(newArea)
})

module.exports = router
