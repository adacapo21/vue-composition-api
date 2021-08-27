<template>
    <post-writer :post="newPost"/>
</template>

<script lang="ts">
import PostWriter from '../components/PostWriter.vue'
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  components: {
    PostWriter
  },

  setup () {
    const newPost = {
      id: '-1',
      title: 'Enter your Title...',
      created: moment().subtract(1, 'second')
    }
    return {
      newPost
    }
  }
})
</script>
