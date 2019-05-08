import Source from './Source'
import Event from './Event'

export default class Base {

  constructor({ sources, events }) {
    this.initSources(sources)
    this.initEvents(events)
  }

  initSources(sources) {
    this.sources = sources instanceof Source ? sources : new Source(sources)
  }

  getSources(key) {
    return this.sources ? this.sources.get(key) : key ? [] : {}
  }

  setSources(name, val) {
    return this.sources.set(name, val)
  }

  initEvents(events) {
    this.events = events instanceof Event ? events : new Event(events)
  }

  getEvent(key) {
    return this.events ? this.events.get(key) : key ? undefined : {}
  }

  addEvent(name, val) {
    this.events.add(name, val)
  }

  emit(name, options, done) {
    this.events.emit(this, name, options, done)
  }
}