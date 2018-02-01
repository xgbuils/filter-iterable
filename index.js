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

function apply (value) {
    return this.ps.every(p => p(value)) ? {value} : undefined
}

Object.defineProperties(FilterIterable.prototype, {
    filter: {
        value: filter
    },
    [Symbol.iterator]: {
        value () {
            const self = this
            const iterator = this.iterable[Symbol.iterator]()
            let status
            return {
                next () {
                    while (!(status = iterator.next()).done) {
                        status = apply.call(self, status.value)
                        if (status) {
                            return status
                        }
                    }
                    return {done: true}
                }
            }
        }
    }
})

module.exports = FilterIterable
