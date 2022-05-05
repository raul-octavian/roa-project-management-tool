import { uri } from '@/composables/uri'
import { ref } from 'vue'
import { userData } from '@/store'
// import { useActiveProjectStore } from '@/store/activeProject'
import { getOneFullProject, projectData } from '@/composables/getOneFullProject'
import { token } from './setUser'

const manageUserOnCardAndProject = () => {
  const user = userData()
  // const activeProject = useActiveProjectStore()
  const activeProjectId = projectData.value._id
  const fetchError = ref('')
  const newMember = ref('')
  const message = ref('')

  const addUserToCard = async (cardId) => {
    try {
      const response = await fetch(
        `${uri}projects/${user.id}/${activeProjectId}/${cardId}/members`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
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
        // console.log('data on delete')
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const removeUserFromCard = async (cardId, email) => {
    try {
      const response = await fetch(
        `${uri}projects/${user.id}/${activeProjectId}/${cardId}/members/remove`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
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
        // console.log('data on delete')
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const addUserToProject = async (projectID) => {
    console.log(projectID)
    try {
      const response = await fetch(
        `${uri}projects/${user.id}/${projectID}/members`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: newMember.value }
          )
        }
      )
      const data = await response.json()

      if (data.message) {
        console.log('if passes', data)
        message.value = data.message
        // console.log('data on delete')
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      } else {
        console.log('else passes')
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const removeUserFromProject = async (projectID, email) => {
    console.log(projectID, email)
    try {
      const response = await fetch(
        `${uri}projects/${user.id}/${projectID}/members/remove`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(
            { email: email }
          )
        }
      )
      const data = await response.json()

      if (data.message) {
        console.log(data)
        message.value = data.message
        // console.log('data on delete')
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { addUserToCard, removeUserFromCard, newMember, fetchError, activeProjectId, message, addUserToProject, removeUserFromProject }
}

export { manageUserOnCardAndProject }
