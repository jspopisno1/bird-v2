var riot = require('riot')
var todoStorage = require('./store')

module.exports = function(opts) {

    var ENTER_KEY = 13;
    var self = this;
    self.todos = opts.data || [];
    riot.route.exec(function(base, filter) {
        self.activeFilter = filter || 'all';
    });

    self.on('update', function() {
        self.remaining = self.todos.filter(function(t) {
            return !t.completed;
        }).length;
        self.allDone = self.remaining === 0;
        self.saveTodos();
    });

    self.saveTodos = () => {
        todoStorage.save(self.todos);
    };

    self.filteredTodos = () => {
        if (self.activeFilter === 'active') {
            return self.todos.filter(function(t) {
                return !t.completed;
            });
        } else if (self.activeFilter === 'completed') {
            return self.todos.filter(function(t) {
                return t.completed;
            });
        } else {
            return self.todos;
        }
    };

    self.addTodo = function(e) {
        console.log (e.which) //@debug;

        if (e.which === ENTER_KEY) {
            var value = e.target.value && e.target.value.trim();
            if (!value) {
                return;
            }
            self.todos.push({ title: value, completed: false });
            e.target.value = '';
        }
    };

    self.removeTodo = (todo) => {
        self.todos.some(function (t) {
            if (todo === t) {
                self.todos.splice(self.todos.indexOf(t), 1);
            }
        });
    };

    self.toggleAll= (e) => {
        self.todos.forEach(function (t) {
            t.completed = e.target.checked;
        });
        return true;
    };

    self.removeCompleted = () => {
        self.todos = self.todos.filter(function(t) {
            return !t.completed;
        });
    };

    riot.route(function(base, filter) {
        self.activeFilter = filter;
        self.update();
    });
}