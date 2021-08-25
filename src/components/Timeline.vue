<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        :data-test="period"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <timeline-post v-for="post in posts"
                   :key="post.id"
                   class="panel-block"
                   :post="post">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM YYYY') }}</div>
    </timeline-post>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import { Post } from '@/mocks'
import { useStore } from '@/store'
import TimelinePost from '@/components/TimelinePost.vue'

type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
  name: 'Timeline',
  components: { TimelinePost },
  async setup () {
    const periods = ['Today', 'This Week', 'This Month']
    // make period it, reactive
    const currentPeriod = ref<Period>('Today')
    const store = useStore() // reference to store

    if (!store.getState().posts.loaded) {
      await store.getPosts()
    }

    const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id)
      if (!thePost) {
        throw Error('This post was not found')
      }
      return acc.concat(thePost)
    }, [])

    const posts = computed(() => {
      return allPosts.filter(post => {
        // currentPeriod is the ref
        if (currentPeriod.value === 'Today') {
          // if post is after yesterday's post
          return post.created.isAfter(moment().subtract(1, 'day'))
        }
        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }
        if (currentPeriod.value === 'This Month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }
        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      posts,
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
