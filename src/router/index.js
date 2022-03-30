import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userInfo } from '@/composables/updateUserInformation'

const userExist = userInfo.value.email || ''

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projectDetails/:project',
    name: 'project',
    props: true,
    meta: {
      requiredStuff: true
    },
    component: () =>
      import(
        /* webpackChunkName: "projectDetails" */ '../views/ProjectDetails.vue'
      )
  },

  {
    path: '/createProject',
    name: 'createProject',
    meta: {
      requiredStuff: true
    },
    component: () =>
      import(
        /* webpackChunkName: "createProject" */ '../views/CreateProject.vue'
      )
  },

  {
    path: '/editProject',
    name: 'editProject',
    meta: {
      requiredStuff: true
    },
    component: () =>
      import(
        /* webpackChunkName: "createProject" */ '../views/EditProject.vue'
      )
  },

  {
    path: '/userInfo',
    name: 'userInfo',
    meta: {
      requiredStuff: true
    },
    component: () =>
      import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  },
  {
    path: '/login',
    name: 'login-user',
    component: () =>
      import(/* webpackChunkName: "userInfo" */ '../views/LoginUser.vue')
  },
  {
    path: '/register',
    name: 'register-user',
    component: () =>
      import(/* webpackChunkName: "userInfo" */ '../views/RegisterUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

console.log('login-user', userExist)

router.beforeEach(async (to, from, next) => {
  const reqstuff = await to.matched.some(record => record.meta.requiredStuff)
  if (reqstuff && !userInfo.value?.email) {
    next('/login')
  } else {
    next()
  }
})

export default router
