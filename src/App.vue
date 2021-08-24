<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
  <section class="section">
    <div class="container">
      <div class="notification is-info is-size-3">
        <p>
          Learn to build this application with Vue.js 3,
          the Composition API, TypeScript, Vue Router and Vue Test Utils!
        </p>
      </div>
      <timeline />
<!--      <router-view />-->
    </div>
  </section>
<!--  <router-view/>-->
</template>

<script>
import { defineComponent } from 'vue'
import Timeline from './components/Timeline'

export default defineComponent({
  name: 'App',
  components: {
    Timeline
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
