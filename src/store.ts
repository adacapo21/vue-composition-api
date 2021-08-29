import { reactive, readonly } from 'vue'
import { Post } from './mocks'
import axios from 'axios'
// ref works well with a number, string or a boolean
// reactive works well with objects

// create an array of Posts where posts are stored
interface PostsState {
  ids: string[] // [1, 2, 3, 4]
  all: Map<string, Post> // Map string(the id of post, to a post)
  loaded: boolean
}

interface State {
  posts: PostsState
}
class Store {
  private state: State

  constructor (initial: { posts: { all: Map<any, any>; loaded: boolean; ids: any[] } }) {
    this.state = reactive(initial) // initialise state
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

const store = new Store({
  posts: {
    all,
    ids: [],
    // ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
})

export function useStore () {
  return store
}
