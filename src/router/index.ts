import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import Home from '../views/Home.vue'
import NewPost from '../components/NewPost.vue'
import ShowPost from '../components/ShowPost.vue'
import EditPost from '../components/EditPost.vue'
import { Store } from '../store'

export function routerWithStore (store: Store) {
  const router = createRouter({
    history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vuejs-composition-api-course' : undefined),
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/posts/new',
        component: NewPost,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/posts/:id',
        component: ShowPost
      },
      {
        path: '/posts/:id/edit',
        component: EditPost,
        meta: {
          requiresAuth: true
        }
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().authors.currentUserId

    if (!to.meta.requiresAuth) {
      next()
      return
    }

    if (to.meta.requiresAuth && auth) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  })

  return router
}
