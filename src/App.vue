<template>
	<button @click="showlog()">showlog</button>
	<div v-if="counter>10">miao</div>
	<div v-else>san</div>
	<a v-bind:href="url" target="_blank">URL</a>
	<p>{{ message }}</p>
	<button v-on:click="reverseMessage()">reverseMesasge</button>
	<div v-once>v-once: {{ counter }}</div>
	<div>counter: {{ counter }}</div>
	<div>2counter: {{ doubleCounter }}</div>
	<button @[action]="debouncedAddOne()">debouncedAddOne</button>
	<button @[action]="throttledAddOne()">throttledAddOne</button>
	<div v-bind:title="counter">喵喵喵喵喵</div>
	<TodoList></TodoList>
</template>

<script>
	import TodoList from './components/TodoList.vue'
	import _ from 'lodash'

	export default {
		components: {
			TodoList
		},
		created() {
			this.debouncedAddOne = _.debounce(this.addOne, 2000)
			this.throttledAddOne = _.throttle(this.addOne, 2000)
		},
		data() {
			return {
				counter: 0,
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
			reverseMesasge() {
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
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
