const test = require('tape')
const tapSpec = require('tap-spec')

const FilterIterable = require('./')

const emptySet = new Set()
const emptyMap = new Map()
const arraySet = Object.freeze([1, 2, 3, 4, 5])
const arrayMap = [['one', 1], ['two', 2], ['three', 3]]
const set = new Set(arraySet)
const map = new Map(arrayMap)

test('constructor', function (t) {
    t.test('empty set', function (st) {
        const iterable = new FilterIterable(emptySet)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty set', function (st) {
        const iterable = new FilterIterable(set)
        st.deepEqual([...iterable], arraySet,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty map', function (st) {
        const iterable = new FilterIterable(emptyMap)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty string', function (st) {
        const iterable = new FilterIterable(map)
        st.deepEqual([...iterable], arrayMap,
            'must return an iterable with the same values')
        st.end()
    })

    t.end()
})

test('filter', function (t) {
    t.test('empty array', function (st) {
        const iterable = new FilterIterable(emptySet)
            .filter(() => true)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('filter some values', function (st) {
        const iterable = new FilterIterable(map)
            .filter(e => e[1] % 2 === 0)
        const expected = arrayMap
            .filter(e => e[1] % 2 === 0)
        st.deepEqual([...iterable], expected,
            'must filter the values that predicate returns true')
        st.end()
    })
    t.test('filter all', function (st) {
        const iterable = new FilterIterable(set)
            .filter(e => e <= 5)
        st.deepEqual([...iterable], arraySet,
            'must filter all of values')
        st.end()
    })
    t.test('filter any', function (st) {
        const iterable = new FilterIterable(set)
            .filter(e => e > 5)
        st.deepEqual([...iterable], [],
            'must not filter any value')
        st.end()
    })
    t.test('chaining', function (st) {
        const iterable = new FilterIterable(set) // (1 2 3 4 5)
            .filter(e => e !== 3) // (1 2 4 5)
            .filter(e => e !== 4) // (1 2 5)
            .filter(e => e < 2) // (1 5)
        const expected = arraySet
            .filter(e => e !== 3)
            .filter(e => e !== 4)
            .filter(e => e < 2)
        st.deepEqual([...iterable], expected,
            'must behave like Array#filter')
        st.end()
    })

    t.test('using intermediate iterables', function (st) {
        const intermediate = new FilterIterable(set)
            .filter(e => e !== 3) // (1 2 4 5)
        const first = intermediate
            .filter(e => e > 4) // (1 2 4)
        const second = intermediate
            .filter(e => e <= 2) // (4 5)
        const firstExpected = arraySet
            .filter(e => e !== 3)
            .filter(e => e > 4)
        const secondExpected = arraySet
            .filter(e => e !== 3)
            .filter(e => e <= 2)
        st.deepEqual([...first], firstExpected,
            'first result must be correct')
        st.deepEqual([...second], secondExpected,
            'second result must be correct')
        st.end()
    })
    t.end()
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
