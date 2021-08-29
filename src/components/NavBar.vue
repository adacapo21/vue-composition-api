<template>
  <div class="navbar">
    <div class="navbar-end">
      <div
        class="buttons"
      >
      <button
          class="button"
          data-test="sign-up"
          @click="show"
        >
          Sign Up
        </button>
        <router-link
          class="button"
          to="/posts/new"
        > New Post
        </router-link>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <signup />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useModal } from '../useModal'
import Signup from './SignUp.vue'
// import { useStore } from '../mocks'

export default defineComponent({
  name: 'NavBar',
  components: {
    Signup
  },

  setup () {
    const modal = useModal()
    // const store = useStore()
    // const router = useRouter()
    // const auth = computed(() => {
    //   return !!store.getState().authors.currentUserId
    // })
    // const signIn = () => {
    //   modal.component.value = markRaw(Signin)
    //   modal.showModal()
    // }
    const show = () => {
      modal.showModal()
    }
    // const signUp = () => {
    //   modal.component.value = markRaw(Signup)
    //   modal.showModal()
    // }
    // const signOut = () => {
    //   store.signOut()
    //   router.push('/')
    // }
    return {
      // component: modal.component,
      // signIn,
      // signUp,
      // signOut,
      show
    }
  }
})
</script>
