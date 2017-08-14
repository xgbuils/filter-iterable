function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = this.ps.concat([p])
    obj.iterable = this.iterable
    return obj
}

function FilterIterable (iterable) {
    this.iterable = iterable
    this.ps = []
}

Object.defineProperties(FilterIterable.prototype, {
    filter: {
        value: filter
    },
    [Symbol.iterator]: {
        * value () {
            for (const val of this.iterable) {
                if (this.ps.every(p => p(val))) {
                    yield val
                }
            }
        }
    }
})

module.exports = FilterIterable
