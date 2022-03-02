<template>
  <div class="small-modal">
    <form action="" @submit.prevent="">
      <h4>Create {{ use }}</h4>
      <div class="form__required-fields">
        <div>
          <label class="label" for="name">Name:</label>
          <input
            type="text"
            id="name"
            class="form__input"
            value=""
            name="name"
            :placeholder="placeholder"
            required
          />
        </div>
      </div>

      <div class="form__actions">
        <button type="submit" class="primary-action" @click="toggleCard">
          Add card
        </button>
        <button type="submit" class="secondary-action" @click="toggleCard">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue-demi'
export default {
  props: ['use'],
  setup (props, { emit }) {
    const use = ref(props.use)
    const toggleCard = () => {
      emit('toggle-card')
    }

    const placeholder = computed(() => {
      return use.value + ' name'
    })

    return { toggleCard, placeholder }
  }
}
</script>

<style lang="css" scoped>
</style>
