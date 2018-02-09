const arrayOf = require('immutable-array.of')
const push = require('immutable-array.push')
const every = require('immutable-array.every')

function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = push(p, this.ps)
    obj.iterable = this.iterable
    return obj
}

function FilterIterable (iterable) {
    this.iterable = iterable
    this.ps = arrayOf([])
}

function apply (value) {
    return every(p => p(value), this.ps) ? {value} : undefined
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
