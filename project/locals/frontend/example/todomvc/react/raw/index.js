var initer = require('initers/react/app-no-router')


var TodoModel = require('./TodoModel.js')
var model = new TodoModel('react-todos');
var TodoApp = require('./TodoApp.js');

require('todo-app.css')
require('base.css')

initer.init({
    Page: TodoApp,
    props: {
        model: model
    }
}, function(render) {
    model.subscribe(render)
    render()
})