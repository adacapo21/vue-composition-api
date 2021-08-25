import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { today, thisWeek, thisMonth } from '@/mocks'

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

createApp(App).use(router).mount('#app')
