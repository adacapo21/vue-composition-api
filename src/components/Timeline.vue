<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
  name: 'Timeline',
  setup () {
    // eslint-disable-next-line no-undef
    const periods = ['Today', 'This Week', 'This Month']
    // make period it, reactive
    const currentPeriod = ref<Period>('Today')

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      // posts,
      periods,
      setPeriod,
      currentPeriod
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
