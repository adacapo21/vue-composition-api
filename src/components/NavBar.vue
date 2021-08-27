<template>
  <div class="navbar">
    <div class="navbar-end">
      <div
        class="buttons"
      >
        <router-link
          class="button"
          to="/posts/new"
        > New Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>
