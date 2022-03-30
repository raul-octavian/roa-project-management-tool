import { uri } from '@/composables/uri'
import { projectData, getOneFullProject } from './getOneFullProject'
import { ref } from 'vue'
import { userData } from '@/store'

const manageStages = () => {
  const fetchError = ref('')
  const user = userData()

  const deleteStage = async (payload) => {
    console.log('delete stage', payload)
    try {
      const response = await fetch(
        `${uri}projects/${projectData.value._id}/remove-stage`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(payload)
        }
      )
      const data = await response.json()
      if (!data.message) {
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
      } else {
        fetchError.value = data.message
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  return { deleteStage, fetchError }
}

export { manageStages }
