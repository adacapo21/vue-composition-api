<template>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">New Post</div>
          <label>
            <input
              type="text"
              class="input"
              v-model="title"
            >
          </label>
        </div>
      </div>
    </div>
     <div class="columns">
      <div class="column">
        <div
          contenteditable
          ref="contentEditable"
          @input="handleInput"
        ></div>
      </div>
      <div class="column">
        <div v-html="html" />
      </div>
     </div>
</template>

<script lang="ts">
import { Post } from '../mocks'
import { defineComponent, ref, PropType, onMounted, watchEffect, watch } from 'vue'
import { parse } from 'marked'
import highlight from 'highlight.js'
import debounce from 'lodash/debounce'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },

  setup (props) {
    const title = ref(props.post.title)
    const content = ref('##Title \n Enter you post content...')
    const html = ref('')
    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value
        }
      })
    }
    watch(content, debounce(parseHtml, 250), { immediate: true })
    // watch(content, debounce((newVal) => {
    //   parseHtml(newVal)
    // }, 250), { immediate: true })

    const contentEditable = ref<HTMLDivElement | null>(null)
    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error('This should never happen')
      }
      content.value = contentEditable.value.innerText || ''
    }
    onMounted(() => {
      if (!contentEditable.value) {
        throw Error('This should never happen')
      }
      contentEditable.value.innerText = content.value
    })

    return {
      title,
      content,
      contentEditable,
      html,
      handleInput
    }
  }
})
</script>

<style scoped>
.column {
  overflow-x: scroll;
}
</style>
