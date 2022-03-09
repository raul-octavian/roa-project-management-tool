<template>
  <div class="small-modal-group">
    <button
      class="secondary-action secondary-action--no-borders icon-button"
      @click="toggleCard"
    >
      <font-awesome-icon icon="plus" class="icon"></font-awesome-icon>
      Add a {{ use }}
    </button>
    <SlideInOut entry="left" exit="left" :duration="300" @open-card="openCard">
      <CreateCard
        :use="use"
        v-if="showModal"
        @toggle-card="toggleCard"
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
  props: ['use'],
  components: {
    CreateCard,
    SlideInOut,
    FontAwesomeIcon
  },
  setup () {
    const showModal = ref(false)

    const toggleCard = () => {
      showModal.value = !showModal.value
    }

    return { showModal, toggleCard }
  }
}
</script>

<style lang="scss" scoped>
</style>
