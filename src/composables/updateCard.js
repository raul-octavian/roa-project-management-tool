import { uri } from '@/composables/uri'
import { getOneFullProject, projectData } from './getOneFullProject'
import { userData } from '@/store'
import { ref } from 'vue'
import { token } from './setUser'

const updateCardSections = () => {
  const user = userData()
  const fetchError = ref('')

  const updateCard = async (cardId, payload) => {
    console.log(payload)
    try {
      const response = await fetch(
        `${uri}projects/cards/${cardId}/update`,
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
