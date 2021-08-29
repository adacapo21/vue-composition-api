<template>
    <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal">
        Modal
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="hide"
    >
    </button>
  </div>
  <section class="section">
    <div class="container">
      <nav-bar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import { useModal } from './useModal'

export default defineComponent({
  name: 'App',
  components: { NavBar },
  setup () {
    const modal = useModal()
    const hide = () => {
      modal.hideModal()
    }
    const style = computed(() => {
      return {
        display: modal.show.value ? 'block' : 'none'
      }
    })
    return {
      style,
      hide
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
