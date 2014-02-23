Selector
========

Selector provides two different approaches for selecting DOM elements and then operating on them. Common to both ideas is the idea that Selector just selects elements, and operations are provided from somewhere else following the idea that they are functions that take an element first, and arguments second.

Examples of such a function would be:

```javascript
function parent(el) {
    return el.parentNode
}

function setText(el, val) {
    el.textContent = val
    return el
}
```

Examples of using the functional selector

```javascript
select = require('selector/functional')

select('#test')(parent)(setText, 'Hello, world!')
```

In the functional selector, each call returns a function taking a new function to be applied to the currently selected elements.