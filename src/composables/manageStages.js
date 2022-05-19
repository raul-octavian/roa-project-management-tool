import { uri } from '@/composables/utils/uri'
import { manageProjects } from './manageProjects'
import { ref } from 'vue'

import { projectData, token } from '@/store/store'

const manageStages = () => {
  const fetchError = ref('')

  const createStage = async (projectID, name, reloadPage, toggleCard) => {
    try {
      const response = await fetch(
        `${uri}projects/${projectID.value}/add-stage`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          },
          body: JSON.stringify({
            name: name.value
          })
        }
      )
      const data = await response.json()

      if (!data._id) {
        fetchError.value = data.error
      } else {
        reloadPage()
        toggleCard()
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const deleteStage = async (payload) => {
    try {
      const response = await fetch(
        `${uri}projects/${projectData.value._id}/remove-stage`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(payload)
        }
      )
      const data = await response.json()
      if (!data.message) {
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      } else {
        fetchError.value = data.error
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  return { deleteStage, fetchError, createStage }
}

export { manageStages }
