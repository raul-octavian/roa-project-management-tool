<template>
  <div class="home">
    <!-- <RegisterUser /> -->
    <h1>Home</h1>

    <p v-for="project in projects" :key="project.id">
      {{ project.name }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
// import RegisterUser from '@/components/RegisterUser.vue'
import { ref } from 'vue'

export default {
  name: 'home-view',
  components: {
    // RegisterUser
  },
  setup () {
    const projects = ref([])

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
      getData
    }
  }
}
</script>
