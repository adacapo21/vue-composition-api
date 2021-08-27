<template>
  <section class="section">
    <div class="container">
      <div class="notification is-info is-size-3">
        <p>
          An application with Vue.js 3, Composition API, TypeScript, Vue Router and Vue Test Utils!
        </p>
      </div>
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          <spinner />
        </template>
      </suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from '../components/Timeline.vue'
import Spinner from '../components/Spinner.vue'

export default defineComponent({
  name: 'App',
  components: {
    Timeline,
    Spinner
  }
})
</script>
