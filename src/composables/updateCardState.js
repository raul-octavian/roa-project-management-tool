import { ref } from 'vue'
import { uri } from '@/composables/uri'
import { userData } from '@/store'
import { token } from './setUser'

const updateOneCard = function () {
  const fetchError = ref('')
  const user = userData()

  const updateCard = async (id, newStage, index) => {
    try {
      const response = await fetch(
        `${uri}projects/cards/${id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify({
            stage: newStage,
            index: index
          })
        }
      )
      const data = await response.json()

      if (data[0].error) {
        fetchError.value = data.error
      } else {
        // toggleCard()
        // reloadPage()
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { updateCard }
}
export { updateOneCard }
