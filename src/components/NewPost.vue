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
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PostWriter
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const authorId = store.getState().authors.currentUserId
    if (!authorId) {
      throw Error('Current User ID was not found')
    }
    const newPost: Post = {
      id: '-1',
      title: 'Enter your Title...',
      created: moment().subtract(1, 'second'),
      authorId: '1'
    }

    const save = async (post: Post) => {
      await store.createPost(post)
      router.push('/')
    }
    return {
      newPost,
      save,
      store
    }
  }
})
</script>
