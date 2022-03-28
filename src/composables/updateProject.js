import { userData } from '@/store'
import { uri } from './uri'
import { ref } from 'vue'
import { getOneFullProject, projectData } from './getOneFullProject'

const updateOneProject = () => {
  const user = userData()
  const userId = user.id
  const fetchError = ref('')
  const message = ref('')
  const projectID = ref(projectData.value._id)

  const updateProject = async (payload) => {
    console.log(payload)
    try {
      const response = await fetch(
        `${uri}projects/${userId}/${projectID.value}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token
          },
          body: JSON.stringify(payload)
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

  return { updateProject, fetchError, message }
}

export { updateOneProject }
