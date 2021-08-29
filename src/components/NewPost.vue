<template>
    <post-writer
    :post="newPost"
    @save="save"
  />
</template>

<script lang="ts">
import PostWriter from '../components/PostWriter.vue'
import { defineComponent } from 'vue'
import { Post } from 'src/mocks'
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

    const save = (post: Post) => {
      console.log('post', post)
    }
    return {
      newPost,
      save
    }
  }
})
</script>
