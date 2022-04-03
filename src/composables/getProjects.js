import { ref } from 'vue'
import { userData } from '@/store'
import { uri } from '@/composables/uri'
import { useProjectStore } from '@/store/projects'
const projects = ref([])

const getSimpleProjects = () => {
  const user = userData()
  const fetchError = ref('')
  const projectStore = useProjectStore()

  const getProjects = async () => {
    try {
      const response = await fetch(`${uri}projects/${user.id}/all`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token
          }
        })
      const data = await response.json()

      if (data.error) {
        fetchError.value = data.error
        return
      }
      projects.value = data
      projectStore.setSimpleProject(projects.value)
    } catch (err) {
      fetchError.value = err.message
    }
  }
  return { getProjects, fetchError, projectStore, user }
}
export { getSimpleProjects, projects }
