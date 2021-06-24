<template>
	<div>todo list</div>
	<div id="list-rendering">
		<button @click="add()">add</button>
		<ol>
			<li v-for="todo in todos">
				{{ todo.text }}
			</li>
		</ol>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				todos: [{
						text: '吃饭'
					},
					{
						text: '睡觉'
					},
					{
						text: '打豆豆'
					},
				]
			}
		},
		methods: {
			add() {
				this.todos.push({
					text: '现在时间：' + new Date().toLocaleTimeString()
				})
			}
		}
	}
</script>

<style>
	ol {
		list-style: none;
	}
</style>
