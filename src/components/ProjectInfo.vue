<template>
  <div class="project-wrapper">
    {{ fetchError }}
    <div
      v-for="(stage, key, index) in project.stagesData"
      :key="index"
      class="project-stage"
    >
      <div class="project-stage__header">
        <h3>{{ key }}</h3>
        <button
          class="button--no-text destructive-action far-left"
          title="delete stage"
          @click="
            deleteStage({
              name: key,
            })
          "
        >
          <font-awesome-icon icon="trash" class="icon"></font-awesome-icon>
        </button>
      </div>
      <div class="cards">
        <draggable
          :list="stage"
          group="cards"
          item-key="id"
          @start="drag = true"
          @end="endStage"
          :data-stage="key"
        >
          <template #item="{ element }">
            <div class="card" @click="toggleEditCard(element)">
              <h4>{{ element.cardName }}</h4>
              <button
                class="button--no-text constructive-action"
                @click="toggleEditCard(element)"
              >
                <font-awesome-icon icon="edit" class="icon"></font-awesome-icon>
              </button>
            </div>
          </template>
        </draggable>
      </div>
      <SmallModal
        use="card"
        :projectID="projectID"
        :stage-name="key"
        @reload="reload"
      />
    </div>
    <div class="project-stage">
      <h3>
        <SmallModal use="stage" :projectID="projectID" @reload="reload" />
      </h3>
    </div>
  </div>
  <teleport to="body">
    <edit-card
      v-if="editModal"
      @toggleEdit="editModal = !editModal"
      :cardId="card._id"
      :key="card._id"
    />
  </teleport>
</template>

<script>
// vue specific
import { computed, ref, toRef, watch } from 'vue'

// modules
// import { uri } from '@/composables/uri'
import { getOneFullProject, projectData } from '@/composables/getOneFullProject'
import { updateOneCard } from '@/composables/updateCardState'
import { manageStages } from '@/composables/manageStages'

// // stores
// import { userData } from '@/store'
// import { useActiveProjectStore } from '@/store/activeProject'

// components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    const projectID = toRef(props, 'projectID')
    const card = ref('')

    const toggleEditCard = (element) => {
      card.value = element
      editModal.value = !editModal.value
    }
    const { getFullProject, fetchError } = getOneFullProject()
    const { deleteStage } = manageStages()

    const editModal = ref(false)

    // const changeStage = (env, item) => {
    //   // console.log('stage activated')
    //   // console.log(env)
    //   // console.log('item on move', item)
    // }
    const endStage = (env) => {
      const oldStage = env
      const newStage = env.to.dataset.stage
      const id = env.item._underlying_vm_._id
      const cards = project.value.stagesData[newStage]

      // console.log(env.item._underlying_vm_._id)
      const { updateCard } = updateOneCard(id, newStage)
      let filterData = []

      if (oldStage !== newStage) {
        filterData = Array.from(cards).map((item) => {
          return {
            ...item,
            stage: newStage
          }
        })

        filterData.forEach((item, index) => {
          updateCard(item._id, item.stage, index)
        })
      }
    }

    const project = computed(() => {
      return projectData.value
    })

    const reload = () => {
      getFullProject(projectID.value)
    }
    watch(projectID, (currentValue, oldValue) => {
      getFullProject(currentValue)
    })
    await getFullProject(projectID.value)

    return {
      // changeStage,
      endStage,
      card,
      toggleEditCard,
      editModal,
      getFullProject,
      // ...toRefs(projectData),
      project,
      reload,
      fetchError,
      projectData,
      deleteStage
    }
  }
}
</script>

<style lang="css" scoped>
.project-wrapper {
  padding: var(--base-5);
  display: flex;
  gap: var(--base-3);
  overflow-y: auto;
  height: auto;
  min-width: 80vw;
  min-height: 80vh;
}
.project-stage {
  min-width: 300px;
  padding: var(--base-1) 0 var(--base-1) var(--base-1);
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 4px 32px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.cards {
  margin-top: 0;
  max-height: 50vh;
  overflow-y: scroll;
  margin-bottom: var(--base-4);
}
.card {
  padding: var(--base-sm) 0 var(--base-sm) var(--base-sm);
  margin-bottom: var(--base-sm);
  margin-right: var(--base-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 1px 3px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.card h4 {
  margin: 0;
}
.card button {
  margin-bottom: 0;
}
.card:hover .constructive-action {
  border: none;
  color: var(--secondary-color);
}
.far-left {
  margin-left: auto;
}

.project-stage__header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.project-stage__header button {
  margin-bottom: 0;
}
</style>
