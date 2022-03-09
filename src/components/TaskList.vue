<template>
  <div class="task-list">
    <h3>Add or remove tasks</h3>
    <ul>
      <li>
        <div class="task-info">
          <input type="checkbox" id="task" name="task" />
          <label for="task"> <p>Task name</p></label>
          <button class="button--no-text destructive-action">
            <font-awesome-icon icon="trash" class="icon"></font-awesome-icon>
          </button>
        </div>
      </li>
    </ul>
    <div>
      <h4>Add a new task</h4>
      <label class="label" for="name">Task</label>
      <div class="input-group">
        <input
          type="text"
          id="name"
          class="form__input"
          value=""
          name="card_name"
          required
        />
        <button class="button--no-text constructive-action">
          <font-awesome-icon icon="add" class="icon"></font-awesome-icon>
        </button>
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

<style lang="scss" scoped>
</style>
