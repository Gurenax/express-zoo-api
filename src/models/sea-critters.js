let seaCritters = [
  {
    id: 1,
    name: 'Angler',
    count: 27
  },
  {
    id: 2,
    name: 'Giant isopod',
    count: 4
  },
  {
    id: 3,
    name: 'Fangtooth',
    count: 8
  },
  {
    id: 4,
    name: 'Bathynomus doederleinii',
    count: 11
  },
  {
    id: 5,
    name: 'Ctenophora flaveolata',
    count: 20
  },
  {
    id: 6,
    name: 'Ctenophora ornata',
    count: 85
  }
]

let nextID = seaCritters.length + 1

// WHERE equals to an seaCritter name
function where(query) {
  return seaCritters.filter(seaCritter => {
    return seaCritter.name.toLowerCase() === query.toLowerCase()
  })
}

// SORT seaCritters by name
function sortByName() {
  seaCritters.sort((a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0 // If they are equal
  })
  return seaCritters
}

// READ
// Returns all seaCritter
function all() {
  return seaCritters
}

// Returns a specific seaCritter
function find(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)
  // Find the seaCritter
  let foundSeaCriter = null
  seaCritters.map(seaCritter => {
    if (seaCritter.id === id) {
      foundSeaCriter = seaCritter
    }
  })
  // Return the seaCritter we found, or if not sucessful, null
  return foundSeaCriter
}

// CREATE
function create(attributes) {
  // Create new seaCritter 'record' copying attributes across
  // and assigning it an id
  const newSeaCritter = Object.assign({}, attributes, {
    id: nextID
  })
  // Increment id for next time
  nextID += 1

  // Add to our array that stores our data
  seaCritters.push(newSeaCritter)

  return newSeaCritter
}

// UPDATE
function update(id, attributes) {
  // Find the seaCritter
  const seaCritter = find(id)

  // Copy new values to seaCritter
  Object.assign(seaCritter, attributes)

  return seaCritter
}


// DESTROY
function destroy(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)

  // Delete the seaCritter
  const index = seaCritters.findIndex( seaCritter => seaCritter.id === id)
  
  if (index===-1) return null

  // Remove the seaCritter at index
  removed = seaCritters.splice(index, 1)

  // Return the seaCritter we deleted, or if not sucessful, null
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
