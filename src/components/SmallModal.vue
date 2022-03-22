<template>
  <div class="small-modal-group">
    <button
      class="secondary-action secondary-action--no-borders icon-button"
      @click="toggleCard"
    >
      <font-awesome-icon icon="plus" class="icon"></font-awesome-icon>
      Add a {{ use }}
    </button>
    <SlideInOut entry="left" exit="left" :duration="300">
      <CreateCard
        :use="use"
        :projectID="projectID"
        :stage-name="stageName"
        v-if="showModal"
        @toggle-card="toggleCard"
        @reload="reload"
        :class="
          use == 'card' ? 'small-modal--bottom-right' : 'small-modal--top-left'
        "
      />
    </SlideInOut>
  </div>
</template>

<script>
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SlideInOut } from 'vue3-transitions'
import CreateCard from './CreateCard.vue'
export default {
  props: ['use', 'projectID', 'stageName'],
  components: {
    CreateCard,
    SlideInOut,
    FontAwesomeIcon
  },
  setup(_, { emit }) {
    const showModal = ref(false)

    const toggleCard = () => {
      showModal.value = !showModal.value
    }
    const reload = () => {
      emit('reload')
    }

    return { showModal, toggleCard, reload }
  }
}
</script>

<style lang="scss" scoped>
</style>
