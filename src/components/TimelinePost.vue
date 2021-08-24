<template>
  <a
    :key="post.id"
    class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM YYYY') }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Post } from '../mocks'
export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  setup (props) {
    return {
      to: `/posts/${props.post.id}`
    }
  }
})
</script>
