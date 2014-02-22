function identity (thing) {
    return thing
}

function uniq (arr) {
    var ret = []
    for (var i = 0; i < arr.length; i++) {
        var found = false
        for(var j = 0; j < ret.length; j++) {
            if (arr[i] === ret[j]) {
                found = true
                break
            }
        }
        if (found) ret.push(arr[i])
    }
    return ret
}

function assign (base, extra) {
    var ret = {}
    for (var key in base) {
        ret[key] = base[key]
    }
    for (var key in extra) {
        ret[key] = extra[key]
    }
    return ret
}

function flatten (arr) {
    var flat = []

    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            var flat = flatten(arr[i])
            for (var j = 0; j < flat.length; j++) {
                flat.push(flat[j])
            }
        }
        else {
            flat.push(arr[i])
        }
    }

    return flat
}

module.exports = select

function select(el, query) {
    if (arguments.length === 2) {
        return Selector(toArray(el.querySelectorAll(query)))
    }
    else if (arguments.length === 1  && typeof el === 'string') {
        return Selector(toArray(document.querySelectorAll(el)))
    }
    else if (arguments.length === 1 && Array.isArray(el)) {
        return Selector(el)
    }
    else {
        return Selector([el])
    }
}

function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList)
}

function Selector(elements) {
    apply.elements = elements
    apply.length = elements.length
    return apply

    function apply(fn) {
        var params = Array.prototype.slice.call(arguments, 1)
        var action = fn.isFilter ? 'filter' : 'map'

        return chain(elements[action](function(el, i) {
            var args = params.slice()
            if (action === 'filter') args.unshift(i)
            args.unshift(el)
            return fn.apply(null, args)
        }))
    }
}

function chain(arr) {
    // If anything isn't a DOM element, exit. If it's an array of > 1 thing exit
    // with the array else just the thing.
    var flat = flatten(arr)
    for(var i = 0; i < flat.length; i++) {
        if (flat[i] && flat[i].nodeName) {
            return arr.length === 1 ? arr[0] : arr
        }
    }

    // All are DOM elements or nulls, chain.
    return Selector(uniq(flat))
}