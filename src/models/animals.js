let animals = [
  {
    id: 1,
    name: 'Meerkat',
    count: 27,
    area: 1
  },
  {
    id: 2,
    name: 'Rhinoceros',
    count: 4,
    area: 2
  },
  {
    id: 3,
    name: 'Giraffe',
    count: 8,
    area: 3
  }
]

let nextID = animals.length + 1

// WHERE equals to an animal name
function where(query) {
  return animals.filter(animal => {
    return animal.name.toLowerCase() === query.toLowerCase()
  })
}

// SORT animals by name
function sortByName() {
  animals.sort((a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0 // If they are equal
  })
  return animals
}

/// CRUDS

// READ
// Returns all animals
function all() {
  return animals
}

// Returns a specific animal
function find(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)
  // Find the animal
  let foundAnimal = null
  animals.map(animal => {
    if (animal.id === id) {
      foundAnimal = animal
    }
  })
  // Return the animal we found, or if not sucessful, null
  return foundAnimal
}

// CREATE
function create(attributes) {
  // Create new animal 'record' copying attributes across
  // and assigning it an id
  const newAnimal = Object.assign({}, attributes, {
    id: nextID
  })
  // Increment id for next time
  nextID += 1

  // Add to our array that stores our data
  animals.push(newAnimal)

  return newAnimal
}

// UPDATE
function update(id, attributes) {
  // Find the animal
  const animal = find(id)

  // Copy new values to animal
  Object.assign(animal, attributes)

  return animal
}

// DESTROY
function destroy(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)

  // Delete the animal
  // const index = animals.findIndex((animal) => { return animal.id === id} )
  const index = animals.findIndex(animal => animal.id === id)

  if (index === -1) return null

  // Remove the animal at index
  removed = animals.splice(index, 1)

  // Return the animal we deleted, or if not sucessful, null
  return removed[0]
}

module.exports = {
  all,
  find,
  create,
  destroy,
  update,
  sortByName,
  where
}
