export default function (value) {
  return {
    result: undefined,
    string(callback) {
      if (this.result === undefined && typeof value === 'string') {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    number(callback) {
      if (this.result === undefined && typeof value === 'number') {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    boolean(callback) {
      if (this.result === undefined && typeof value === 'boolean') {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    array(callback) {
      if (this.result === undefined && Array.isArray(value)) {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    function(callback) {
      if (this.result === undefined && typeof value === 'function') {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    object(callback) {
      if (this.result === undefined && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.result = typeof callback === "function" ? callback(value) : (callback || value)
      }
      return this
    },
    fail(callback) {
      if (this.result === undefined) {
        this.result = typeof callback === "function" ? callback(value) : (typeof callback !== "undefined" ? callback : value)
      }
      return this
    },
    build() {
      if (this.result === undefined) return value
      return this.result
    }
  }
}