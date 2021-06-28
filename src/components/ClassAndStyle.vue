<template>
  <div :class="{red: isRed}">test</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {
      isRed: true,
    }
  },
}
</script>

<style scoped>

.red {
  color: red;
}
</style>
