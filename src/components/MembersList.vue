<template>
  <div class="member-list">
    <h3>Add or remove members</h3>
    <ul>
      <li>
        <div class="member-info">
          <p>Member name</p>
          <button class="button--no-text destructive-action">
            <font-awesome-icon icon="trash" class="icon"></font-awesome-icon>
          </button>
        </div>
      </li>
    </ul>
    <div>
      <h4>Add a new member</h4>
      <label class="label" for="name">Member email:</label>
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
