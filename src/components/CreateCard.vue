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
          <p>{{ fetchError }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue-demi'
import { uri } from '@/composables/uri'
import { userData } from '@/store'
import { useActiveProjectStore } from '@/store/activeProject'
export default {
  props: ['use', 'projectID', 'stageName'],
  setup(props, { emit }) {
    const use = ref(props.use)
    const projectID = ref(props.projectID)
    const stageName = ref(props.stageName)
    const activeProject = useActiveProjectStore()

    const user = userData()
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

    const addCard = async () => {
      try {
        const response = await fetch(
          `${uri}projects/${projectID.value}/create-card`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': user.token
            },
            body: JSON.stringify({
              card_name: name.value,
              stage: stageName.value
            })
          }
        )
        const data = await response.json()

        if (!data[0]._id) {
          fetchError.value = data.error
        } else {
          toggleCard()
          reloadPage()
        }
      } catch (err) {
        fetchError.value = err.message
      }
    }

    const addStage = async () => {
      debugger
      try {
        const response = await fetch(
          `${uri}projects/${projectID.value}/add-stage`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': user.token
            },
            body: JSON.stringify({
              name: name.value
            })
          }
        )
        const data = await response.json()

        if (!data._id) {
          console.log('no data')
          fetchError.value = data.error
        } else {
          toggleCard()
          reloadPage()
        }
      } catch (err) {
        fetchError.value = err.message
      }
    }

    const add = () => {
      if (use.value == 'stage') {
        addStage()
      } else {
        addCard()
      }
    }

    return { toggleCard, placeholder, name, fetchError, add }
  }
}
</script>

<style lang="css" scoped>
</style>
