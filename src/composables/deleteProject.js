import { userData } from '@/store'
import { uri } from './uri'
import { ref } from 'vue'
import { getOneFullProject, projectData } from './getOneFullProject'
import { token } from './setUser'

const deleteProject = () => {
  const user = userData()
  const userId = user.id
  const fetchError = ref('')
  const message = ref('')
  const projectID = ref(projectData.value._id)

  const deleteProj = async () => {
    try {
      const response = await fetch(
        `${uri}projects/${projectID.value}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        }
      )
      const data = await response.json()

      if (!data.error) {
        message.value = data.message
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectID.value)
      } else {
        fetchError.value = data.error
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { deleteProj, fetchError, message }
}

export { deleteProject }
