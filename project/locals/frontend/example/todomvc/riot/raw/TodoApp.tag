import todoStorage from './store.js'

var riotmap = {
	TodoItem: require('./TodoItem.tag')
}

<todo-app>
	<section class="todoapp">
		<header class="header">
			<h1 onclick={popup}>todos</h1>
			<input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup={addTodo}>
		</header>
		<section class="main" show={todos.length}>
			<input class="toggle-all" type="checkbox" checked={allDone} onclick={toggleAll}>
			<ul class="todo-list">
				<TodoItem class="todo {completed: t.completed, editing: t.editing}"
						  each="{t, i in filteredTodos()}" todo={t} parentview={parent}></TodoItem>
			</ul>
		</section>
		<footer class="footer" show={todos.length}>
			<span class="todo-count">
				<strong>{remaining}</strong> {remaining === 1 ? 'item' : 'items'} left
			</span>
			<ul class="filters">
				<li><a class={selected: activeFilter=='all'} href="#/all">All</a></li>
				<li><a class={selected: activeFilter=='active'} href="#/active">Active</a></li>
				<li><a class={selected: activeFilter=='completed'} href="#/completed">Completed</a></li>
			</ul>
			<button class="clear-completed" onclick={removeCompleted} show="{todos.length > remaining}">
				Clear completed</button>
		</footer>
	</section>
	<footer class="info">
		<p>Double-click to edit a todo</p>
		<p>Written by <a href="http://github.com/txchen">Tianxiang Chen</a></p>
		<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
	</footer>

	<script>
		require('./TodoApp').call(this, opts)
	</script>
</todo-app>