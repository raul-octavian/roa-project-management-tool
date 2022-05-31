import { uri } from '@/composables/utils/uri'
import { manageProjects } from './manageProjects'
import { ref } from 'vue'
import { projectData, token } from '../store/store'

const manageCards = () => {
  const errorDeletingCard = ref('')
  const fetchError = ref('')
  // create a card

  const createCard = async (projectID, stageName, name, reloadPage, toggleCard, fetchError) => {
    try {
      const response = await fetch(
        `${uri}projects/${projectID.value}/create-card`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          },
          body: JSON.stringify({
            cardName: name.value,
            stage: stageName.value
          })
        }
      )
      const data = await response.json()

      if (!data[0]._id) {
        fetchError.value = data.error
      } else {
        reloadPage()
        toggleCard()
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  // delete a card

  const deleteCard = async (cardId) => {
    try {
      const response = await fetch(
        `${uri}projects/cards/${projectData.value._id}/${cardId}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          }
        }
      )
      const data = await response.json()

      if (!data.message) {
        errorDeletingCard.value = data.error
      } else {
        const { getFullProject, getProjectsForHomeCards } = manageProjects()
        await getProjectsForHomeCards()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      errorDeletingCard.value = err.message
    }
  }

  // update card

  const updateCard = async (cardId, payload) => {
    try {
      const response = await fetch(
        `${uri}projects/${projectData.value._id}/cards/${cardId}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
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
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  // update cards state and index

  const updateCardStateAndIndex = async (id, newStage, index) => {
    try {
      const response = await fetch(
        `${uri}projects/${projectData.value._id}/cards/${id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
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

  return { createCard, deleteCard, errorDeletingCard, updateCard, updateCardStateAndIndex }
}

export { manageCards }
