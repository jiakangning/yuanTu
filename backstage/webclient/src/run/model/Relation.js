import Work from './Work.js'
import _ from 'lodash'

class Relation {

  static Unique = "_______unique_______"

  constructor({ parent, child, field }) {
    this.field = field
    this.data = []
    this.initParent(parent)
    this.initChild(child)
  }

  initParent(parent) {
    this.parent = parent
    this.parent.addEvent(Work.EVENTS.edit, (form) => {
      this.data = _.get(form, this.field, [])
      this.setData()
      this.setSource()
    })
  }

  initChild(child) {
    this.child = child
    this.childRows = this.child.getList().getConfig("rows")
    this.child.addEvent(Work.EVENTS.submit, (form, done) => {
      const uniques = this.data.map(v => v[Relation.Unique])
      const index = uniques.indexOf(form[Relation.Unique])
      if (index === -1) {
        this.data.push(form)
      } else {
        this.data.splice(index, 1, form)
      }
      this.setData()
      this.setSource()
      done()
    })
    this.child.addEvent(Work.EVENTS.delete, rows => {
      const uniques = rows.map(v => v[Relation.Unique])
      this.data = this.data.filter(v => uniques.indexOf(v[Relation.Unique]) === -1)
      this.setData()
      this.setSource()
    })
  }


  getData() {
    return this.data.map(item => {
      let obj = { ...item }
      if (obj[Relation.Unique] !== undefined) {
        delete obj[Relation.Unique]
      }
      return obj
    })
  }

  setData() {
    this.data = this.data.map((item, index) => {
      return Object.assign(item, { [Relation.Unique]: index })
    })
  }

  setSource() {
    this.child.setSources(this.childRows, [].concat(this.data))
    this.parent.getForm().setForm({ [this.field]: this.getData() })
  }
}

export default Relation