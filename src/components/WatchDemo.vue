<template>
  <div id="watch-demo">
    <p>
      Ask a question
      <input v-model="question">
    </p>
    <p>
      {{ answer }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      question: '',
      answer: '',
    }
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
  methods: {
    getAnswer() {
      this.answer = 'Thinking...'
      axios.
        get('https://yesno.wtf/api')
        .then(res => {
          this.answer = res.data.answer
        })
        .catch(err => {
          this.answer = 'Error!'
        })
    }
  },
}
</script>