import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CounterView from '../views/CounterView.vue'
import MessagesView from '../views/MessagesView.vue'
import MessageCompose from '../components/MessageCompose.vue'
import MessageDetail from '../components/MessageDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/counter',
      name: 'counter',
      component: CounterView
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: MessagesView
    },
    {
      path: '/compose',
      name: 'compose',
      component: MessageCompose
    },
    {
      path: '/detail',
      name: 'detail',
      component: MessageDetail,
      props: true
    },
  ]
})

export default router
