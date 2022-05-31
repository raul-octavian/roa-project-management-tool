<template>
  <div class="modal">
    <div class="view-basic edit-mode">
      <h1>Edit Card</h1>
      <div v-if="fetchError">
        <p class="error">{{ fetchError }}</p>
      </div>
      <!-- <div v-if="message">
        <p class="message">{{ message }}</p>
      </div> -->
      <div class="form-wrapper">
        <div class="form" action="" @submit.prevent="">
          <h3>Card information:</h3>
          <div class="form__required-fields">
            <div>
              <div>
                <div class="input-group input-group--wide input-group--inline">
                  <input
                    type="checkbox"
                    id="complete"
                    name="complete"
                    :checked="cardIsComplete"
                    v-model="cardIsComplete"
                    @change="
                      updateC(activeCard._id, {
                        isComplete: cardIsComplete,
                      })
                    "
                  />
                  <label class="label" for="complete"
                    ><h5>Card Completed</h5></label
                  >
                </div>
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="
                    updateC(activeCard._id, {
                      isComplete: cardIsComplete,
                    })
                  "
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
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
              <div v-if="projectData?.allowsManualHoursInput">
                <div class="input-group input-group--wide input-group--inline">
                  <input
                    type="checkbox"
                    id="allowManual"
                    name="allowManual"
                    :checked="cardAllowsManualHoursInput"
                    v-model="cardAllowsManualHoursInput"
                    @change="
                      updateC(activeCard._id, {
                        allowsManualHoursInput: cardAllowsManualHoursInput,
                      })
                    "
                  />
                  <label class="label" for="allowManual"
                    >Allows manual hours input</label
                  >
                </div>
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="
                    updateC(activeCard._id, {
                      allowsManualHoursInput: cardAllowsManualHoursInput,
                    })
                  "
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
                <label class="label" for="due_date">Deadline:</label>
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

              <div
                v-if="
                  cardAllowsManualHoursInput &&
                  projectData?.allowsManualHoursInput
                "
              >
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

// composables

import { projectData } from '@/store/store'
import { manageCards } from '@/composables/manageCards'

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
    const activeCard = computed(() => {
      return projectData.value.cards.find((item) => item._id == props.cardId)
    })

    const formatStartDate = computed(() => {
      return activeCard.value?.cardStartDate
        ? new Date(activeCard.value?.cardStartDate).toISOString().substr(0, 10)
        : ''
    })

    const formatDueDate = computed(() => {
      return activeCard.value?.cardDueDate
        ? new Date(activeCard.value?.cardDueDate).toISOString().substr(0, 10)
        : ''
    })

    const daysUntilDeadline = computed(() => {
      const day1 = new Date()
      const day2 = new Date(formatDueDate.value)
      const difference = day2.getTime() - day1.getTime()
      const day = 1000 * 60 * 60 * 24
      const days = difference / day

      if (days < 0 && days > -1) return -1
      if (days < -1) return Math.ceil(days)
      if (days > 0 && days < 1) return 1
      if (days > 1) return Math.ceil(days)

      return Math.floor(days)
    })

    const cardName =
      ref(activeCard.value?.cardName) || ref(activeCard.value?.card_name)
    const stage = ref(activeCard.value?.stage)
    const cardDescription = ref(activeCard.value?.cardDescription)
    const status = ref(activeCard.value?.status)
    const tasks = ref(activeCard.value?.tasks)
    const cardMembers = ref(activeCard.value?.cardMembers)
    const cardStartDate = formatStartDate.value
    const cardDueDate = formatDueDate.value
    const cardAllocatedHours = ref(activeCard.value?.cardAllocatedHours ?? 0)
    const cardUsedHours = ref(activeCard.value?.cardUsedHours ?? 0)
    const cardIsComplete = ref(activeCard.value?.isComplete)
    const cardAllowsManualHoursInput = ref(
      activeCard.value?.allowsManualHoursInput
    )

    const { deleteCard, errorDeletingCard, updateCard, fetchError } =
      manageCards()

    const deleteItem = async (cardId) => {
      await deleteCard(cardId)
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
      errorDeletingCard,
      deleteItem,
      updateC,
      daysUntilDeadline,
      cardAllowsManualHoursInput,
      cardIsComplete
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
.form label {
  margin: 0;
}
.form label h5 {
  font-size: var(--base-1);
}
</style>
