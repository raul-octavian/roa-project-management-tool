import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projectDetails',
    name: 'project',
    component: () =>
      import(
        /* webpackChunkName: "projectDetails" */ '../views/ProjectDetails.vue'
      )
  },

  {
    path: '/createProject',
    name: 'createProject',
    component: () =>
      import(
        /* webpackChunkName: "createProject" */ '../views/CreateProject.vue'
      )
  },

  {
    path: '/userInfo',
    name: 'userInfo',
    component: () =>
      import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
