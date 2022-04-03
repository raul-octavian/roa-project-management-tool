<template>
  <div class="home">
    <h1 class="text text--center">Welcome to the Project Management app</h1>
    <div class="home-content">
      <div v-if="user?.name">
        <project-cards />
      </div>
      <div v-else class="home-content--glass">
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
    const user = userData()

    return {
      user
    }
  }
}
</script>
<style scoped>
.home-content--glass {
  padding: var(--base-6) var(--base-8);
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass);
  box-shadow: 0 2px 5px 0 var(--primary-transparent);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
