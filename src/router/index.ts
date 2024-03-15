import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import App from '@/App.vue'
import AddQuestions from '@/views/AddQuestions.vue'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add question',
    component: AddQuestions
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
