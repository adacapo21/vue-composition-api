import { reactive, readonly, provide, inject, App } from 'vue'
import { Post } from './mocks'
import axios from 'axios'
import { initial } from 'lodash'
// ref works well with a number, string or a boolean
// reactive works well with objects

// create an array of Posts where posts are stored
interface PostsState {
  ids: string[] // [1, 2, 3, 4]
  all: Map<string, Post> // Map string(the id of post, to a post)
  loaded: boolean
}

export interface User {
  id: string
  username: string
  password: string
}

export const storeKey = Symbol('store')

interface State {
  posts: PostsState
}
export class Store {
  private state: State

  constructor (initial: State) {
    this.state = reactive(initial) // initialise state
  }

  install (app: App) {
    app.provide(storeKey, this)
  }

  getState () {
    return readonly(this.state) // read only the variable values
  }

  async getPosts () {
    const response = await axios.get<Post[]>('/posts')
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true
    }

    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }

    this.state.posts = postsState
  }

  async createUser (user: User) {
    const response = await axios.post<User>('/users', user)
    // this.state.authors.all.set(response.data.id, response.data)
    // this.state.authors.ids.push(response.data.id)
    // this.state.authors.currentUserId = response.data.id
    console.log(response)
  }

  async createPost (post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(response.data.id, response.data)
    this.state.posts.ids.push(response.data.id)
    console.log('Store Posts 222222', this.state.posts)
  }
}

const all = new Map<string, Post>()
// all.set(today.id, today)
// all.set(thisWeek.id, thisWeek)
// all.set(thisMonth.id, thisMonth)

export const store = new Store({
  posts: {
    all,
    ids: [],
    // ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
})

// use
// composables
// provide inject
export function useStore (): Store {
  const _store = inject<Store>(storeKey)
  console.log('1111111111111', _store)
  if (!_store) {
    throw Error('Did you forgot to call provide?')
  }

  return _store
}

// store.getState().posts.loaded
