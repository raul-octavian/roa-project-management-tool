<template>
  <div class="modal">
    <div class="view-basic edit-mode">
      <h1>Edit Card</h1>
      <div v-if="fetchError">
        <p>{{ fetchError }}</p>
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
      <div class="form-wrapper">
        <div class="form" action="" @submit.prevent="">
          <h3>Card information:</h3>
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Name:</label>
              <div class="input-group">
                <input
                  type="text"
                  id="name"
                  class="form__input"
                  name="card_name"
                  required
                  v-model="cardName"
                  @change="updateC(activeCard._id, { cardName: cardName })"
                />
                <button
                  class="button--no-text button-toggle constructive-action"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="form__fields">
            <div>
              <label class="label" for="description">Description:</label>
              <div class="input-group">
                <textarea
                  id="description"
                  class="form__input"
                  name="card_description"
                  v-model="cardDescription"
                  @change="
                    updateC(activeCard._id, {
                      cardDescription: cardDescription,
                    })
                  "
                ></textarea>
                <button
                  class="button--no-text button-toggle constructive-action"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="form__timeSchedule">
            <div class="form__timeSchedule--division">
              <div>
                <label class="label" for="start_date">Start date:</label>
                <div class="input-group">
                  <input
                    type="date"
                    id="start_date"
                    name="card_start_date"
                    min=""
                    max=""
                    v-model="cardStartDate"
                    @change="
                      updateC(activeCard._id, {
                        cardStartDate: cardStartDate,
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>

              <div>
                <label class="label" for="due_date">Due date:</label>
                <div class="input-group">
                  <input
                    type="date"
                    id="due_date"
                    name="card_due_date"
                    min=""
                    max=""
                    v-model="cardDueDate"
                    @change="
                      updateC(activeCard._id, { cardDueDate: cardDueDate })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
            <div class="form__timeSchedule--division">
              <div>
                <label class="label" for="allocated-hours"
                  >Allocated hours:</label
                >
                <div class="input-group">
                  <input
                    type="number"
                    id="allocated-hours"
                    name="card_allocated_hours"
                    v-model="cardAllocatedHours"
                    @change="
                      updateC(activeCard._id, {
                        cardAllocatedHours: cardAllocatedHours,
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>

              <div>
                <label class="label" for="used-hours">Used hours:</label>
                <div class="input-group">
                  <input
                    type="number"
                    id="used-hours"
                    name="card_used_Hours"
                    v-model="cardUsedHours"
                    @change="
                      updateC(activeCard._id, {
                        cardUsedHours: cardUsedHours,
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <SlideInOut entry="top" exit="top" :duration="300">
            <members-list v-if="membersOpen" :cardId="cardId" />
          </SlideInOut>
          <SlideInOut entry="top" exit="top" :duration="300">
            <task-list v-if="tasksOpen" :cardId="cardId" />
          </SlideInOut>

          <div class="form__actions">
            <button
              type="button"
              class="secondary-action"
              @click="$emit('toggleEdit')"
            >
              Close
            </button>
          </div>

          <div class="destructive__actions">
            <button
              type="button"
              class="destructive-action"
              @click="deleteItem(activeCard._id)"
            >
              Delete card
            </button>
          </div>
        </div>
        <div class="aside-menu">
          <ul>
            <li>
              <button
                class="
                  secondary-action secondary-action--no-borders
                  icon-button
                "
                @click="membersOpen = !membersOpen"
              >
                <font-awesome-icon icon="user" class="icon"></font-awesome-icon>
                Members
              </button>
            </li>
            <li>
              <button
                class="
                  secondary-action secondary-action--no-borders
                  icon-button
                "
                @click="tasksOpen = !tasksOpen"
              >
                <font-awesome-icon
                  icon="clipboard-check"
                  class="icon"
                ></font-awesome-icon>
                Tasks
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// vue comps
import { ref, computed } from 'vue'

// components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SlideInOut } from 'vue3-transitions'
import MembersList from './MembersList.vue'
import TaskList from './TaskList.vue'
import { projectData } from '@/composables/getOneFullProject'
import { deleteCard } from '@/composables/deleteCard'

// composables
import { updateCardSections } from '@/composables/updateCard'

// stores
// import { useActiveProjectStore } from '@/store/activeProject'
export default {
  components: {
    FontAwesomeIcon,
    MembersList,
    TaskList,
    SlideInOut
  },
  props: ['cardId'],
  setup(props, { emit }) {
    const membersOpen = ref(false)
    const tasksOpen = ref(false)
    // const activeCard = ref(props.card)
    // const { getFullProject } = getOneFullProject()
    // getFullProject()

    // activeCard.value = cards.value.find((item) => item._id == props.card._id)
    const activeCard = computed(() => {
      return projectData.value.cards.find((item) => item._id == props.cardId)
    })

    const cardStatic = { ...activeCard.value }

    const formatStartDate = computed(() => {
      return activeCard.value?.cardStartDate
        ? new Date(activeCard.value?.cardStartDate).toISOString().substr(0, 10)
        : ''
    })

    const formaDueDate = computed(() => {
      return activeCard.value?.cardDueDate
        ? new Date(activeCard.value?.cardDueDate).toISOString().substr(0, 10)
        : ''
    })

    const cardName =
      ref(activeCard.value?.cardName) || ref(activeCard.value?.card_name)
    const stage = ref(activeCard.value?.stage)
    const cardDescription = ref(activeCard.value?.cardDescription)
    const status = ref(activeCard.value?.status)
    const tasks = ref(activeCard.value?.tasks)
    const cardMembers = ref(activeCard.value?.cardMembers)
    const cardStartDate = formatStartDate.value
    const cardDueDate = formaDueDate.value
    const cardAllocatedHours = ref(activeCard.value?.cardAllocatedHours)
    const cardUsedHours = ref(activeCard.value?.cardUsedHours)

    const { updateCard, fetchError } = updateCardSections()
    const { deleteOneCard, fetchDeleteError } = deleteCard()

    const deleteItem = async (cardId) => {
      await deleteOneCard(cardId)
      emit('toggleEdit')
    }

    const updateC = (cardId, payload) => {
      updateCard(cardId, payload)
    }

    return {
      membersOpen,
      tasksOpen,
      cardName,
      stage,
      cardDescription,
      status,
      tasks,
      cardMembers,
      cardStartDate,
      cardDueDate,
      cardAllocatedHours,
      cardUsedHours,
      activeCard,
      fetchError,
      updateCard,
      projectData,
      fetchDeleteError,
      deleteItem,
      updateC
    }
  }
}
</script>

<style lang="css" scoped>
.edit-mode button {
  margin-bottom: 0;
}
.view-basic {
  display: block;
}
.destructive__actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--base-3);
  padding-bottom: var(--base-3);
  margin: var(--base-3) 0;
  border-top: 2px solid var(--accent);
}

.destructive__actions button {
  background: var(--accent);
  color: var(--quaternary-color);
  transition: all 300ms ease-in-out;
}
.destructive__actions button:hover {
  background: var(--primary-bg);
  color: var(--accent);
}
</style>
