<template>
  <div class="modal">
    <div class="view-basic edit-mode">
      <h1>Edit Card</h1>
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
                  value=""
                  name="card_name"
                  required
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
                >
Card description</textarea
                >
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
                    value=""
                    min=""
                    max=""
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
                    value=""
                    min=""
                    max=""
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
                    value=""
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
                    value="0"
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
            <members-list v-if="membersOpen" />
          </SlideInOut>
          <SlideInOut entry="top" exit="top" :duration="300">
            <task-list v-if="tasksOpen" />
          </SlideInOut>

          <div class="form__actions">
            <button type="submit" class="primary-action">Update card</button>
            <button
              type="submit"
              class="secondary-action"
              @click="$emit('toggleEdit')"
            >
              Cancel
            </button>
          </div>
        </div>
        <div>
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
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SlideInOut } from 'vue3-transitions'
import MembersList from './MembersList.vue'
import TaskList from './TaskList.vue'
export default {
  components: {
    FontAwesomeIcon,
    SlideInOut,
    MembersList,
    TaskList
  },
  setup () {
    const membersOpen = ref(false)
    const tasksOpen = ref(false)

    return { membersOpen, tasksOpen }
  }
}
</script>

<style lang="css" scoped>
</style>
