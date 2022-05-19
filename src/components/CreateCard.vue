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
            name="name"
            :placeholder="placeholder"
            required
            v-model="name"
          />
        </div>
      </div>

      <div class="form__actions">
        <button class="primary-action" @click="add">Add {{ use }}</button>
        <button class="secondary-action" @click="toggleCard">Cancel</button>
        <div v-if="fetchError">
          <p class="error">{{ fetchError }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue-demi'
import { manageCards } from '@/composables/manageCards'
import { manageStages } from '@/composables/manageStages'
export default {
  props: ['use', 'projectID', 'stageName'],
  setup(props, { emit }) {
    const use = ref(props.use)
    const projectID = ref(props.projectID)
    const stageName = ref(props.stageName)
    const name = ref('')
    const fetchError = ref('')
    const toggleCard = () => {
      emit('toggle-card')
    }
    const reloadPage = () => {
      emit('reload')
    }

    const placeholder = computed(() => {
      return use.value + ' name'
    })

    const { createCard } = manageCards()
    const { createStage } = manageStages()

    const add = () => {
      if (use.value == 'stage') {
        createStage(projectID, name, reloadPage, toggleCard)
      } else {
        createCard(
          projectID,
          stageName,
          name,
          reloadPage,
          toggleCard,
          fetchError
        )
      }
    }

    return { toggleCard, placeholder, name, fetchError, add }
  }
}
</script>

<style lang="css" scoped>
</style>
