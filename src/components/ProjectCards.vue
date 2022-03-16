<template>
  <h2>Projects:</h2>

  <article
    v-for="project in projects"
    :key="project.id"
    class="card card__content"
  >
    <main class="card__body">
      <h1 class="title--primary">{{ project.name }}</h1>
      <h2 class="title--secondary">Progress: {{ project.percentUsed }}</h2>
      <p class="description">
        {{ project.description }}
      </p>
    </main>
    <footer class="footer">
      <div class="expand__indicator">
        <span class="link__text">See more</span>
      </div>
    </footer>
  </article>
</template>

<script>
import { onMounted, ref } from 'vue'
import { userData } from '@/store'
import { uri } from '@/composables/uri'
import { useProjectStore } from '@/store/projects'
import { getSimpleProjects } from '@/composables/getProjects'

export default {
  name: 'home-view',
  components: {
    // RegisterUser
  },
  setup() {
    const { projects, fetchError, projectStore, getProjects } =
      getSimpleProjects()
    const user = userData()
    // const projects = ref([])
    // const fetchError = ref('')
    // const projectStore = useProjectStore()

    // const getProjects = async () => {
    //   try {
    //     if (user?.id) {
    //       const response = await fetch(`${uri}projects/${user.id}/all`)
    //       const data = await response.json()
    //       projects.value = data
    //       projects.value.forEach((item) => {
    //         projectStore.setSimpleProject(item)
    //       })
    //     }
    //   } catch (err) {
    //     fetchError.value = err.message
    //   }
    // }

    onMounted(() => {
      getProjects()
    })

    return {
      projects,
      getProjects,
      user,
      fetchError,
      projectStore
    }
  }
}
</script>

<style lang="css" scoped>
</style>
