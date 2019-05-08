import _ from 'lodash'

const buildTree = ({ data = [], parentId, pidField = "parentId", idField = 'id', nodeOrder, exclude }) => {
  return data.reduce((results, { ...item }) => {
    if (item[idField] === exclude) return results
    if (item[pidField] === parentId || (!parentId && !item[pidField])) {
      let children = buildTree({ data, parentId: item[idField], pidField, idField, nodeOrder, exclude })
      if (nodeOrder && children.length) {
        children.sort((a, b) => Number(a[nodeOrder] || 999) - Number(b[nodeOrder] || 999))
      }
      if (children.length) {
        item.children = children
      }
      results.push(item)
    }
    return results
  }, [])
}

export default class Source {
  constructor(sources = {}) {
    this._sources = sources
  }

  set(name, value) {
    const obj = value ? { [name]: value } : name
    this._sources = Object.assign({}, this._sources, obj)
  }

  get(name) {
    return name ? _.get(this._sources, name) : this._sources
  }

  build(name, data, options) {
    const val = buildTree({ data, ...options })
    this.set(name, val)
  }
}
