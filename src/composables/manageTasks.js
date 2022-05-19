import { uri } from '@/composables/utils/uri'
import { ref, computed } from 'vue'
// import { useActiveProjectStore } from '@/store/activeProject'
import { manageProjects } from '@/composables/manageProjects'
import { projectData, token, userInfo } from '@/store/store'

const manageTasks = () => {
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
        `${uri}projects/${userInfo.value.id}/${activeProjectId}/${cardId}/create-task`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive',
            'Access-Control-Allow-Private-Network': 'true'
          },
          body: JSON.stringify(reqBody.value)
        }
      )
      const data = await response.json()

      if (!data.error) {
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      } else {
        fetchError.value = data.error
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
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(payload)
        }
      )
      const data = await response.json()

      if (!data.error) {
        message.value = data.message

        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      } else {
        fetchError.value = data.error
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
            'auth-token': token.value,
            Connection: 'keep-alive'
          }
        }
      )
      const data = await response.json()

      if (!data.error) {
        message.value = data.message
        const { getFullProject } = manageProjects()
        await getFullProject(projectData.value._id)
      } else {
        fetchError.value = data.error
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
