<template>
  <div class="home">
    <h1 class="text text--center">Welcome to the Project Management app</h1>
    <div class="home-content">
      <div v-if="user.name">
        <h2>Project:</h2>
        <p v-for="project in projects" :key="project.id">
          {{ project.name }}
        </p>
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
import { computed, ref } from 'vue'
import { userData } from '@/store'

export default {
  name: 'home-view',
  components: {
    // RegisterUser
  },
  setup() {
    const user = userData()
    const projects = ref([])
    const userIsLoggedIn = computed(() => {
      return !!user.name
    })

    const getData = async () => {
      const response = await fetch(
        'http://localhost:4000/api/projects/620cd974bfa355462d3047cd/all'
      )
      const data = await response.json()
      projects.value = data
    }

    // onMounted(() => {
    //   getData()
    // })
    getData()

    return {
      projects,
      getData,
      userIsLoggedIn,
      user
    }
  }
}
</script>
