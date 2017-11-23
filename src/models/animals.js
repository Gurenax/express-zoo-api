let animals = [
  {
    id: 1,
    name: 'Meercat',
    count: 27
  },
  {
    id: 2,
    name: 'Rhinoceros',
    count: 4
  },
  {
    id: 3,
    name: 'Giraffe',
    count: 8
  }
]

// Returns all animals
function all() {
  return animals
}

// Returns a specific animal
function find(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)
  // let foundAnimal = null
  // animals.map( animal => {s
  //   i
  // })
  // Return the animal we found, or if not sucessfull, null
  return animals[id] === undefined ? null : animals[id]
}

module.exports = {
  all, find
}