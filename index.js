var Selector = require('./selector')

select.attach = function(props) {
    Selector.attach(props)
    return select
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