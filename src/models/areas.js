let areas = [
  {
    id: 1,
    name: 'Savanna'
  },
  {
    id: 2,
    name: 'Forest'
  },
  {
    id: 3,
    name: 'Ocean'
  }
]

let nextID = areas.length + 1

// WHERE equals to an area name
function where(query) {
  return areas.filter(area => {
    return area.name.toLowerCase() === query.toLowerCase()
  })
}

// SORT areas by name
function sortByName() {
  areas.sort((a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0 // If they are equal
  })
  return areas
}

/// CRUDS

// READ
// Returns all areas
function all() {
  return areas
}

// Returns a specific area
function find(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)
  // Find the area
  let foundArea = null
  areas.map(area => {
    if (area.id === id) {
      foundArea = area
    }
  })
  // Return the area we found, or if not sucessful, null
  return foundArea
}

// CREATE
function create(attributes) {
  // Create new area 'record' copying attributes across
  // and assigning it an id
  const newArea = Object.assign({}, attributes, {
    id: nextID
  })
  // Increment id for next time
  nextID += 1

  // Add to our array that stores our data
  areas.push(newArea)

  return newArea
}

// UPDATE
function update(id, attributes) {
  // Find the area
  const area = find(id)

  // Copy new values to area
  Object.assign(area, attributes)

  return area
}

// DESTROY
function destroy(id) {
  // Ensure id is an integer
  id = parseInt(id, 10)

  // Delete the area
  // const index = areas.findIndex((area) => { return area.id === id} )
  const index = areas.findIndex(area => area.id === id)

  if (index === -1) return null

  // Remove the area at index
  removed = areas.splice(index, 1)

  // Return the area we deleted, or if not sucessful, null
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
