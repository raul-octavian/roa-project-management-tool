import { computed, reactive, ref } from 'vue'
import { userData } from '@/store'
import { uri } from '../composables/uri'
import { useRouter } from 'vue-router'

const createProjectComp = function () {
  const user = userData()
  const fetchError = ref('')
  const router = useRouter()
  const project = reactive({
    name: 'project One',
    description: 'a small description of the project',

    startDate: new Date().toISOString().substr(0, 10),
    dueDate: '',
    allocatedHours: 0,
    usedHours: 0,

    members: [user.id]
  })
  const projectRequest = computed(() => {
    return {
      name: project.name,
      description: project.description,
      owner: user.id,
      members: project.members,
      timeSchedule: {
        startDate: project.start_Date,
        dueDate: project.due_Date,
        usedHours: project.used_Hours,
        allocatedHours: project.allocated_Hours
      }
    }
  })
  const createProject = async () => {
    try {
      const response = await fetch(`${uri}projects/${user.id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user.token
        },
        body: JSON.stringify(projectRequest.value)
      })
      const data = await response.json()
      router.push('/')

      if (!data._id) {
        fetchError.value = data.error
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { createProject, projectRequest, project, fetchError }
}

export { createProjectComp }
