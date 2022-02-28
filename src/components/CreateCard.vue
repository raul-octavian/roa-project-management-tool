<template>
  <div class="small-modal">
    <form action="">
      <h4>Create card</h4>
      <div class="form__required-fields">
        <div>
          <label class="label" for="name">Name:</label>
          <input
            type="text"
            id="name"
            class="form__input"
            value=""
            name="name"
            placeholder="Card name"
            required
          />
        </div>
      </div>

      <div class="form__actions">
        <button type="submit" class="primary-action" @click="$emit('openCard')">
          Add card
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="css" scoped>
</style>
