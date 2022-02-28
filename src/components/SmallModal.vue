<template>
  <div class="small-modal-group">
    <button class="secondary-action secondary-action--no-borders icon-button">
      <font-awesome-icon icon="plus" class="icon"></font-awesome-icon>
      Add a card
    </button>
    <!-- <SlideInOut entry="left" exit="left" :duration="200" @open-card="openCard"> -->
    <CreateCard
      v-if="smallModal"
      @openCard="openCard"
      class="small-modal--right"
    />
    <!-- </SlideInOut> -->
  </div>
</template>

<script>
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { SlideInOut } from 'vue3-transitions'
import CreateCard from './CreateCard.vue'
export default {
  components: {
    CreateCard,
    // SlideInOut,
    FontAwesomeIcon
  },
  setup () {
    const smallModal = ref(true)

    const openCard = () => {
      console.log('emit triggered')
      smallModal.value = !smallModal.value
    }
    return { smallModal, openCard }
  }
}
</script>

<style lang="scss" scoped>
</style>
