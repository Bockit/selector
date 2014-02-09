var identity = require('lodash.identity')
var flatten = require('lodash.flatten')
var assign = require('lodash.assign')
var uniq = require('lodash.uniq')
var props = {}

module.exports = Selector

Selector.attach = function(_props) {
    props = assign(props, _props)
}

function Selector(elements) {
    apply.elements = elements
    Object.keys(props).forEach(function(k) {
        apply[k] = function() {
            args = Array.prototype.slice.call(arguments)
            args.unshift(props[k])
            return apply.apply(null, args)
        }
    })
    return apply

    function apply(fn) {
        var params = Array.prototype.slice.call(arguments, 1)

        return chain(elements.map(function(el) {
            var args = params.slice()
            args.unshift(el)
            return fn.apply(null, args)
        }))
    }
}

function chain(arr) {
    // IDEA
    //
    // If they're all nulls and elements, return a chained Selector without the
    // nulls and the normal thing applied to the rest
    //
    // If there are non-elements AND non-nulls, return the result as it was.
    //
    // Therefore to filter, return null from a function for an element.

    // If anything isn't a DOM element, exit. If it's an array of > 1 thing exit
    // with the array else just the thing.
    var flat = flatten(arr)
    for(var i = 0; i < flat.length; i++) {
        if (!(flat[i] === null || (flat[i] && flat[i].nodeName))) {
            return arr.length === 1 ? arr[0] : arr
        }
    }

    // All are DOM elements or nulls, chain.
    return Selector(uniq(flat.filter(identity)))
}