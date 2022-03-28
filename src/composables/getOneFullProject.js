import { reactive, ref } from 'vue'
import { userData } from '@/store'
import { uri } from '../composables/uri'
import { useActiveProjectStore } from '@/store/activeProject'

const projectData = ref({})

const getOneFullProject = function () {
  const user = userData()

  const activeProject = useActiveProjectStore()
  const fetchError = ref('')
  const getFullProject = async (project) => {
    try {
      const response = await fetch(`${uri}projects/${project}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token
          }
        }
      )
      const data = await response.json()
      const members = await data.members
      if (data.error) {
        fetchError.value = data.error
        return
      }
      if (!members.find((item) => item._id == user.id)) {
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
        })
        projectData.value.stagesData.sort((a, b) => a.index - b.index)
        activeProject.setActiveProject(projectData.value)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { getFullProject, projectData, fetchError }
}

export { getOneFullProject, projectData }
