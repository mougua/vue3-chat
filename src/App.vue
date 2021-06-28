<template>
	<button @click="showlog">showlog</button>
	<div v-if="counter>10">miao</div>
	<div v-else>san</div>
	<a v-bind:href="url" target="_blank">URL</a>
	<p>{{ message }}</p>
	<button @click="reverseMessage">reverseMesasge</button>
	<div v-once>v-once: {{ counter }}</div>
	<div>counter: {{ counter }}</div>
	<div>2counter: {{ doubleCounter }}</div>
	<button @[action]="debouncedAddOne">debouncedAddOne</button>
	<button @[action]="throttledAddOne">throttledAddOne</button>
	<div v-bind:title="counter">喵喵喵喵喵</div>
	<todo-list></todo-list>
	<watch-demo></watch-demo>
</template>

<script>
	import _ from 'lodash'
	import TodoList from './components/TodoList.vue'
	import WatchDemo from './components/WatchDemo.vue'

	export default {
		components: {
			TodoList,
			WatchDemo,
		},
		created() {
			this.debouncedAddOne = _.debounce(this.addOne, 1000)
			this.throttledAddOne = _.throttle(this.addOne, 1000)
		},
		data() {
			return {
				counter: 1,
				message: "abcde",
				url: "https://mougua.myqnapcloud.cn:5001",
				action: "click",

			}
		},
		computed: {
			doubleCounter: {
				get() {
					return this.counter * 2
				}
			}
		},
		methods: {
			reverseMessage() {
				this.message = this.message
					.split('')
					.reverse()
					.join('')
			},
			addOne() {
				this.counter++
			},
			showlog() {
				console.log(this.$data.counter)
				console.log(this.counter)
			},
		},
	}
</script>

<style>
	/* 	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	} */
</style>