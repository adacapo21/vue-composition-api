import { reactive, readonly, provide, inject, App } from 'vue'
import { Post } from './mocks'
import axios from 'axios'

// create an array of Posts where posts are stored
interface BaseState<T> {
  ids: string[] // [1, 2, 3, 4]
  all: Map<string, T> // Map string(the id of post, to a post | Author)
  loaded: boolean
}

export interface User {
  id: string
  username: string
  password: string
}
export type Author = Omit<User, 'password'>

interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined
}
type PostsState = BaseState<Post>
export const storeKey = Symbol('store')

interface State {
  posts: PostsState
  authors: AuthorsState
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
    const response = await axios.post<Author>('/users', user)
    this.state.authors.all.set(response.data.id, response.data)
    this.state.authors.ids.push(response.data.id)
    this.state.authors.currentUserId = response.data.id
  }

  async createPost (post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(response.data.id, response.data)
    this.state.posts.ids.push(response.data.id)
    console.log('Store Posts 222222', this.state.posts.ids)
  }

  async signIn (user: User) {
    const response = await axios.post<Author>('/sign_in', user)
    this.state.authors.all.set('1', response.data)
    this.state.authors.ids.push('1')
    this.state.authors.currentUserId = '1'
  }

  signOut () {
    this.state.authors.currentUserId = undefined
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
    loaded: false
  },
  authors: {
    all: new Map<string, Author>(),
    ids: [],
    loaded: false,
    currentUserId: '1'
  }
})

// use
// composables
// provide inject
export function useStore (): Store {
  const _store = inject<Store>(storeKey)
  if (!_store) {
    throw Error('Did you forgot to call provide?')
  }

  return _store
}

// store.getState().posts.loaded
