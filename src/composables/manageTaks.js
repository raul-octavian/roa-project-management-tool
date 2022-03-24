import { uri } from '@/composables/uri'
import { ref, computed } from 'vue'
import { userData } from '@/store'
// import { useActiveProjectStore } from '@/store/activeProject'
import { getOneFullProject, projectData } from '@/composables/getOneFullProject'

const manageTasks = () => {
  const user = userData()
  // const activeProject = useActiveProjectStore()
  const activeProjectId = projectData.value._id
  const fetchError = ref('')
  const message = ref('')
  const taskName = ref('')
  const taskDescription = ref('')
  const reqBody = computed(() => {
    return {
      taskName: taskName.value,
      taskDescription: taskDescription.value
    }
  })

  const addTaskToCard = async (cardId) => {
    try {
      const response = await fetch(
        `${uri}projects/${user.id}/${activeProjectId}/${cardId}/create-task`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(reqBody.value)
        }
      )
      const data = await response.json()

      if (!data._id) {
        message.value = data.message
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const updateTask = async (taskId, payload) => {
    try {
      const response = await fetch(
        `${uri}projects/tasks/${taskId}/update`,
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

      if (!data._id) {
        message.value = data.message
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  const removeTaskFromCard = async (cardId, taskId) => {
    try {
      const response = await fetch(
        `${uri}projects/tasks/${cardId}/${taskId}/delete`,
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

      if (!data._id) {
        message.value = data.message
        // console.log(projectData.value.cards[1].cardMembers.length)
        const { getFullProject } = getOneFullProject()
        await getFullProject(projectData.value._id)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }
  return {
    addTaskToCard,
    removeTaskFromCard,
    updateTask,
    taskName,
    taskDescription,
    message
  }
}

export { manageTasks }
