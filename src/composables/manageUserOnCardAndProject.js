import { uri } from '@/composables/utils/uri'
import { ref } from 'vue'
// import { useActiveProjectStore } from '@/store/activeProject'
import { manageProjects } from '@/composables/manageProjects'
import { projectData, token, userInfo } from '@/store/store'

const manageUserOnCardAndProject = () => {
  // const activeProject = useActiveProjectStore()
  const activeProjectId = projectData.value._id
  const fetchError = ref('')
  const newMember = ref('')
  const message = ref('')

  const addUserToCard = async (cardId) => {
    try {
      const response = await fetch(
        `${uri}projects/${userInfo.value._id}/${activeProjectId}/${cardId}/members`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: newMember.value }
          )
        }
      )
      const data = await response.json()

      if (!data._id) {
        message.value = data.message
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const removeUserFromCard = async (cardId, email) => {
    try {
      const response = await fetch(
        `${uri}projects/${userInfo.value._id}/${activeProjectId}/${cardId}/members/remove`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: email }
          )
        }
      )
      const data = await response.json()

      if (!data._id) {
        message.value = data.message
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const addUserToProject = async (projectID) => {
    try {
      const response = await fetch(
        `${uri}projects/${userInfo.value._id}/${projectID}/members`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: newMember.value }
          )
        }
      )
      const data = await response.json()

      if (data.message) {
        message.value = data.message
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const removeUserFromProject = async (projectID, email) => {
    try {
      const response = await fetch(
        `${uri}projects/${userInfo.value._id}/${projectID}/members/remove`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: email }
          )
        }
      )
      const data = await response.json()

      if (data.message) {
        message.value = data.message
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { addUserToCard, removeUserFromCard, newMember, fetchError, activeProjectId, message, addUserToProject, removeUserFromProject }
}

export { manageUserOnCardAndProject }
