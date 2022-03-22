<template>
  <div class="project-wrapper">
    <div
      v-for="(stage, key, index) in project.stagesData"
      :key="index"
      class="project-stage"
    >
      <h3>{{ key }}</h3>
      <div class="cards">
        <draggable
          :list="stage"
          group="cards"
          item-key="id"
          :move="changeStage"
          @start="drag = true"
          @end="endStage"
          :data-stage="key"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
              <button
                class="button--no-text constructive-action"
                @click="editModal = !editModal"
              >
                <font-awesome-icon icon="edit" class="icon"></font-awesome-icon>
              </button>
            </div>
          </template>
        </draggable>
      </div>
      <SmallModal use="card" :projectID="projectID" :stage-name="key" />
    </div>
    <div class="project-stage">
      <h3>
        <SmallModal use="stage" :projectID="projectID" />
      </h3>
    </div>
  </div>
  <edit-card v-if="editModal" @toggleEdit="editModal = !editModal" />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, reactive, ref, toRef, watch, toRefs } from 'vue'
import { uri } from '@/composables/uri'
import { userData } from '@/store'
import { useActiveProjectStore } from '@/store/activeProject'
import draggable from 'vuedraggable'
import EditCard from '../components/EditCard.vue'

import SmallModal from './SmallModal.vue'
export default {
  components: {
    draggable,
    SmallModal,
    EditCard,
    FontAwesomeIcon
  },
  props: ['projectID'],
  async setup(props) {
    const data = reactive({
      backlog: ref([
        { id: 1, name: 'card1', stage: 'backlog' },
        { id: 2, name: 'card2', stage: 'backlog' },
        { id: 3, name: 'card3', stage: 'backlog' },
        { id: 4, name: 'card3', stage: 'backlog' },
        { id: 5, name: 'card3', stage: 'backlog' },
        { id: 6, name: 'card3', stage: 'backlog' },
        { id: 7, name: 'card3', stage: 'backlog' },
        { id: 8, name: 'card3', stage: 'backlog' },
        { id: 9, name: 'card3', stage: 'backlog' },
        { id: 10, name: 'card3', stage: 'backlog' }
      ]),
      todo: ref([]),
      inProgress: ref([]),
      done: ref([])
    })
    const editModal = ref(false)

    const changeStage = (env, item) => {
      // console.log('stage activated')
      // console.log(env)
      // console.log('item on move', item)
    }
    const endStage = (env) => {
      const oldStage = env
      const newStage = env.to.dataset.stage
      const id = env.item._underlying_vm_.id
      let filterData = []

      if (oldStage !== newStage) {
        filterData = data[newStage].filter((item) => item.id === id)
        filterData[0].stage = newStage
      }
    }

    const fetchError = ref('')
    const user = userData()
    let projectData = reactive({})
    const projectID = toRef(props, 'projectID')
    const activeProject = useActiveProjectStore()
    const project = computed(() => {
      return activeProject.getActiveProject
    })

    const getFullProject = async (project) => {
      try {
        const response = await fetch(`${uri}projects/${project}`)
        const data = await response.json()
        const members = await data.members
        if (!members.find((item) => item._id == user.id)) {
          projectData = {
            message:
              'You are trying to access a project on witch you are not a member, contact project owner to add you to the member list'
          }
        } else {
          projectData = data
          projectData.stagesData = {}
          projectData.stages.forEach((item) => {
            projectData.stagesData[item] = []
            projectData.cards.forEach((card) => {
              if (card.stage == item) {
                projectData.stagesData[item].push(card)
              }
            })
          })
          console.log(projectData)
          activeProject.setActiveProject(projectData)
        }
      } catch (err) {
        fetchError.value = err.message
      }
    }

    watch(projectID, async (currentValue, oldValue) => {
      await getFullProject(currentValue)
    })
    await getFullProject(projectID.value)

    // const populateData = computed(() => {
    //   project.stages.forEach((item) => {
    //     ;[item] = []
    //     // compData[item] = project?.cards.find((card) => card.stage == item)
    //   })
    //   return compData
    // })

    return {
      // ...toRefs(data),
      data,
      // todo,
      // inProgress,
      // done,
      changeStage,
      endStage,
      editModal,
      getFullProject,
      ...toRefs(projectData),
      project
      // populateData
    }
  }
}
</script>

<style lang="css" scoped>
.project-wrapper {
  padding: var(--base-5);
  display: flex;
  gap: var(--base-3);
  overflow-x: scroll;
  overflow-y: auto;
  height: auto;
  min-width: 80vw;
  min-height: 80vh;
}
.project-stage {
  background: var(--primary-bg);
  min-width: 300px;
  padding: var(--base-1);
}
.cards {
  margin-top: 0;
  max-height: 50vh;
  overflow-y: scroll;
  margin-bottom: var(--base-4);
}
.card {
  background: #fff;
  padding: var(--base-sm) 0 var(--base-sm) var(--base-sm);
  margin-bottom: var(--base-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card h4 {
  margin: 0;
}
</style>
