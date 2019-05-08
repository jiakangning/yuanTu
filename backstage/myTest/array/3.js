
function compressArray (id, input) {
  let result = {
    id: id,
    moduleId: []
  }
  input.forEach(item => {
    if (moduleId.find(v => v.id !== item.moduleId)) {

    }
  })
}

const input = [
  { roleId: 1, moduleId: 1, cmdId: 1 },
  { roleId: 1, moduleId: 1, cmdId: 2 },
  { roleId: 1, moduleId: 2, cmdId: 3 },
  { roleId: 1, moduleId: 2, cmdId: 4 },
  { roleId: 1, moduleId: 3, cmdId: null },
  { roleId: 1, moduleId: 4, cmdId: 5 },
  { roleId: 1, moduleId: 4, cmdId: 6 },
  { roleId: 1, moduleId: 4, cmdId: 7 }
]

const results = compressArray(input)
console.log(results)

