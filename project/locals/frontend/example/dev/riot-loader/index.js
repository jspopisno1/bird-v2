
var tag = require('./my-tag.tag')

var riot = require('riot')

console.log(tag)
riot.mount('#root', tag, {
    name: 'liang'
})