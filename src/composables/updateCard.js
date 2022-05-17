import { uri } from '@/composables/uri'
import { getOneFullProject, projectData } from './getOneFullProject'
import { ref } from 'vue'
import { token } from './setUser'

const updateCardSections = () => {
  const fetchError = ref('')

  const updateCard = async (cardId, payload) => {
    console.log(payload, projectData.value._id, `${uri}projects/${projectData.value._id}/cards/${cardId}/update`)
    try {
      const response = await fetch(
        `${uri}projects/${projectData.value._id}/cards/${cardId}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            payload
          )
        }
      )
      const data = await response.json()

      if (data.error) {
        fetchError.value = data.error
      } else {
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  return { updateCard, fetchError }
}

export { updateCardSections }
