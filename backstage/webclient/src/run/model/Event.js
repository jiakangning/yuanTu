import _ from 'lodash'

export default class Event {
  constructor(events) {
    this._events = {}
    this.init(events)
  }

  init(events = {}) {
    _.forIn(events, (fn, key) => {
      if (!this._events[key]) {
        this._events[key] = []
      }
      this._events[key].push(fn)
    })
  }

  get(key) {
    return key ? this._events[key] : this._events
  }

  add(key, val) {
    this.init({ [key]: val })
  }

  async emit(context, name, options, done) {
    const callback = this._events[name]
    if (!callback || !callback.length) return
    callback.forEach(item => item.call(context, options, done))
  }
}
