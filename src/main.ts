import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { today, thisWeek, thisMonth, Post } from '@/mocks'
import 'highlight.js/styles/atom-one-dark.css'
import random from 'lodash/random'
import { store, storeKey, User, Author } from './store'
import { routerWithStore } from './router'

function delay () {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay()
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}
// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === '/posts') {
    const id = random(100, 10000)
    await delay()
    const post: Post = {
      ...payload,
      title: payload.title,
      created: payload.created,
      id: id.toString(),
      authorId: payload.authorId
    }
    return Promise.resolve<{ data: Post}>({
      data: post
    })
  }
  if (url === '/users') {
    const id = random(100, 10000)
    await delay()
    const author: Author = {
      id: id.toString(),
      username: payload.username
    }
    return Promise.resolve({
      data: author
    })
  }

  if (url === '/sign_in') {
    if (payload.username !== 'user123' || payload.password !== 'pass42') {
      return
    }

    await delay()
    const author: Author = {
      id: '1',
      username: payload.username
    }
    return Promise.resolve({
      data: author
    })
  }
}
const app = createApp(App)
const router = routerWithStore(store)
app.use(router)
app.use(store) // use provide as plugin
app.mount('#app')
