<template>
  <div class="modal">
    <div class="view-basic edit-mode">
      <h1>Edit Card</h1>
      <div class="form-wrapper">
        <form action="" @submit.prevent="">
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Name:</label>
              <input
                type="text"
                id="name"
                class="form__input"
                value=""
                name="card_name"
                required
              />
            </div>
          </div>
          <div class="form__fields">
            <div>
              <label class="label" for="description">Description:</label>
              <textarea
                onfocus="this.value=''; this.onfocus=null;"
                id="description"
                class="form__input"
                name="card_description"
              >
Card description</textarea
              >
            </div>
          </div>
          <div class="form__timeSchedule">
            <div>
              <label class="label" for="start_date">Start date:</label>
              <input
                type="date"
                id="start_date"
                name="card_start_date"
                value=""
                min=""
                max=""
              />
            </div>
            <div>
              <label class="label" for="due_date">Due date:</label>
              <input
                type="date"
                id="due_date"
                name="card_due_date"
                value=""
                min=""
                max=""
              />
            </div>
            <div>
              <label class="label" for="allocated-hours"
                >Allocated hours:</label
              >
              <input
                type="number"
                id="allocated-hours"
                name="card_allocated_hours"
                value=""
              />
            </div>
            <div>
              <label class="label" for="used-hours">Used hours:</label>
              <input
                type="number"
                id="used-hours"
                name="card_used_Hours"
                value="0"
              />
            </div>
          </div>
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
        </form>
        <div>
          <ul>
            <li>
              <button
                class="
                  secondary-action secondary-action--no-borders
                  icon-button
                "
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon
  },
  setup () {
    return {}
  }
}
</script>

<style lang="css" scoped>
</style>
