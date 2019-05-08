
function expandArray (input) {
  const { id, moduleId } = input
  if (moduleId && moduleId.length) {
    let results = []
    moduleId.forEach(v => {
      let obj = {}
      obj.roleId = id
      if (v.children && v.children.length) {
        v.children.forEach(item => {
          results.push(Object.assign(obj, { moduleId: v.id, cmdId: item.id }))
        })
      } else {
        results.push(Object.assign(obj, { moduleId: v.id, cmdId: null }))
      }
    })
    return results
  } else {
    return []
  }
}

const input = {
  id: 1,
  moduleId: [
    {
      id: 2,
      children: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    },
    {
      id: 3
    },
    {
      id: 4,
      children: [
        { id: 11 },
        { id: 10 },
        { id: 9 }
      ]
    },
    {
      id: 5,
      children: [
        { id: 6 },
        { id: 7 },
        { id: 8 }
      ]
    }
  ]
}

const results = expandArray(input)
console.log(results)

