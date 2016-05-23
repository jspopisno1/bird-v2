var riot = require('riot')
var todoStorage = require('./store.js')

require('todo-app.css')
require('base.css')

riot.mount('#root',
    require('./TodoApp.tag'),
    { data: todoStorage.fetch() });

console.log(riot)