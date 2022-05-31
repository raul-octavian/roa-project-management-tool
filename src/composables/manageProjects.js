import { computed, reactive, ref } from 'vue'
import { uri } from './utils/uri'
import { useRouter } from 'vue-router'

// import store variables
import { projects, projectData, token, userInfo } from '../store/store'

const manageProjects = () => {
  const fetchError = ref('')
  const router = useRouter()
  const message = ref('')
  const projectID = ref(projectData.value._id)
  const project = reactive({
    name: '',
    description: '',
    startDate: new Date().toISOString().substr(0, 10),
    dueDate: '',
    allocatedHours: 0,
    usedHours: 0,
    members: [userInfo.value._id],
    allowsManualHoursInput: false
  })
  const projectRequest = computed(() => {
    return {
      name: project.name,
      description: project.description,
      owner: userInfo.value._id,
      members: project.members,
      allowsManualHoursInput: project.allowsManualHoursInput,
      timeSchedule: {
        startDate: project.start_Date,
        dueDate: project.due_Date,
        usedHours: project.used_Hours,
        allocatedHours: project.allocated_Hours
      }
    }
  })
  // projectData.value = {}

  const createProject = async () => {
    try {
      const response = await fetch(`${uri}projects/${userInfo.value._id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token.value
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

  const getProjectsForHomeCards = async () => {
    try {
      const response = await fetch(`${uri}projects/${userInfo.value._id}/all`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          }
        })
      const data = await response.json()

      if (data.error) {
        fetchError.value = data.error
        return
      }
      projects.value = data
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const getFullProject = async (project) => {
    try {
      const response = await fetch(`${uri}projects/${project}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          }
        }
      )
      const data = await response.json()
      const members = await data.members
      if (data.error) {
        fetchError.value = data.error
        return
      }
      if (!members.find((item) => item._id == userInfo.value._id)) {
        projectData.value = {
          message:
            'You are trying to access a project on witch you are not a member, contact project owner to add you to the member list'
        }
      } else {
        projectData.value = data
        projectData.value.stagesData = {}
        projectData.value.stages.forEach((item) => {
          projectData.value.stagesData[item] = []
          projectData.value.cards.forEach((card) => {
            if (card.stage == item) {
              projectData.value.stagesData[item].push(card)
            }
          })
          projectData.value.stagesData[item].sort((a, b) => a.index - b.index)
        })

        projectData.value.members.forEach(item => {
          item.avatar = getInitials(item.name.toUpperCase())
        })

        projectData.value.cards.forEach(card => {
          card.cardMembers.forEach(item => {
            item.avatar = getInitials(item.name.toUpperCase())
          })
        })
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const updateProject = async (payload) => {
    try {
      const response = await fetch(
        `${uri}projects/${userInfo.value._id}/${projectID.value}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          },
          body: JSON.stringify(payload)
        }
      )
      const data = await response.json()

      if (!data.error) {
        message.value = data.message
        // const { getFullProject } = manageProjects()
        await getFullProject(projectID.value)
        // const { getProjectsForHomeCards } = manageProjects()
        await getProjectsForHomeCards()
      } else {
        fetchError.value = data.error
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const deleteProject = async () => {
    try {
      const response = await fetch(
        `${uri}projects/${projectID.value}/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value
          }
        }
      )
      const data = await response.json()

      if (!data.error) {
        message.value = data.message
        projectData.value = {}
        await getProjectsForHomeCards()
      } else {
        fetchError.value = data.error
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { createProject, projectRequest, project, fetchError, getProjectsForHomeCards, getFullProject, message, deleteProject, updateProject }
}

const getInitials = function (glue) {
  if (typeof glue == 'undefined') {
    glue = true
  }
  const initials = glue.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g)

  if (glue) {
    return initials.join('')
  }
  return initials
}

export { manageProjects }
