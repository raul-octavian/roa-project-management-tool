<template>
  <div class="home">
    <h1 class="text text--center">Welcome to the Project Management app</h1>
    <div class="home-content">
      <div v-if="user?.name">
        <project-cards />
      </div>
      <div v-else>
        <h2>Log in or register to create or access your projects</h2>
        <div class="home__button-container">
          <div>
            <router-link to="/register">
              <button class="primary-action">Register</button>
            </router-link>
          </div>
          <div>
            <router-link to="/login">
              <button class="secondary-action">Login</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import RegisterUser from '@/components/RegisterUser.vue'

import { userData } from '@/store'

import ProjectCards from '@/components/ProjectCards.vue'

export default {
  name: 'home-view',
  components: {
    ProjectCards
  },
  setup() {
    // const { projects, fetchError, projectStore, getProjects } =
    //   getSimpleProjects()
    const user = userData()
    // const projects = ref([])
    // const fetchError = ref('')

    // const getProjects = async () => {
    //   try {
    //     const response = await fetch(`${uri}projects/${user.id}/all`)
    //     const data = await response.json()
    //     projects.value = data
    //   } catch (err) {
    //     fetchError.value = err.message
    //   }
    // }

    // onMounted(() => {
    //   getProjects()
    // })

    return {
      user
    }
  }
}
</script>
