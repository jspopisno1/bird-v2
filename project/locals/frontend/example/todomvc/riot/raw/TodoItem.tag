<todo-item>
    <div class="view">
        <input class="toggle" type="checkbox" checked={opts.todo.completed} onclick={toggleTodo}>
        <label ondblclick={editTodo}>{opts.todo.title}</label>
        <button class="destroy" onclick={removeTodo}></button>
    </div>
    <input name="todoeditbox" class="edit" type="text" onblur={doneEdit} onkeyup={editKeyUp}>
    <script>
        require('./TodoItem').call(this, opts)
    </script>
</todo-item>
