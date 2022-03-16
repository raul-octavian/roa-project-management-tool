<template>
  <h2>Project:</h2>
  <p v-for="project in projects" :key="project.id">
    {{ project.name }}
  </p>
</template>

<script>
import { onMounted, ref } from 'vue'
import { userData } from '@/store'
import { uri } from '@/composables/uri'
import { useProjectStore } from '@/store/projects'
// import { getSimpleProjects } from '@/composables/getProjects'

export default {
  name: 'home-view',
  components: {
    // RegisterUser
  },
  setup() {
    // const { projects, fetchError, projectStore, getProjects } =
    //   getSimpleProjects()
    const user = userData()
    const projects = ref([])
    const fetchError = ref('')
    const projectStore = useProjectStore()

    const getProjects = async () => {
      try {
        if (user?.id) {
          const response = await fetch(`${uri}projects/${user.id}/all`)
          const data = await response.json()
          projects.value = data
          projects.value.forEach((item) => {
            projectStore.setSimpleProject(item)
          })
        }
      } catch (err) {
        fetchError.value = err.message
      }
    }

    onMounted(() => {
      getProjects()
    })

    return {
      projects,
      getProjects,
      user,
      fetchError
    }
  }
}
</script>

<style lang="css" scoped>
</style>
