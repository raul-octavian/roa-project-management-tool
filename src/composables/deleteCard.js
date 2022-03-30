import { uri } from '@/composables/uri'
import { getOneFullProject, projectData } from './getOneFullProject'
import { userData } from '@/store'
import { ref } from 'vue'

const deleteCard = () => {
  const fetchDeleteError = ref('')
  const user = userData()

  const deleteOneCard = async (cardId) => {
    try {
      const response = await fetch(
        `${uri}projects/cards/${projectData.value._id}/${cardId}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token,
            Connection: 'keep-alive'
          }
        }
      )
      const data = await response.json()

      if (!data.message) {
        fetchDeleteError.value = data.error
      } else {
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchDeleteError.value = err.message
    }
  }
  return { deleteOneCard, fetchDeleteError }
}

export { deleteCard }
