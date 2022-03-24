<template>
  <div class="member-list">
    <h3>Add or remove members</h3>
    <ul>
      <li>
        <div
          v-for="member in cardMembers"
          :key="member._id"
          class="member-info"
        >
          <div>
            <p>{{ member?.name }}</p>
            <p>{{ member?.email }}</p>
          </div>

          <button
            class="button--no-text destructive-action"
            @click="removeUser(member.email)"
          >
            <font-awesome-icon icon="trash" class="icon"></font-awesome-icon>
          </button>
        </div>
      </li>
    </ul>
    <div>
      <h4>Add a new member</h4>
      <div v-if="fetchError">
        <p>{{ fetchError }}</p>
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
      <label class="label" for="name">Member email:</label>
      <div class="input-group">
        <input
          type="email"
          id="name"
          class="form__input"
          name="card_name"
          required
          v-model="newMember"
        />
        <button class="button--no-text constructive-action" @click="addUser">
          <font-awesome-icon icon="add" class="icon"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// vue specific
import { ref, computed } from 'vue'

// composables
import { manageUserOnCardAndProject } from '@/composables/manageUserOnCardAndProject'
import { getOneFullProject, projectData } from '@/composables/getOneFullProject'
export default {
  components: {
    FontAwesomeIcon
  },
  props: ['cardId'],
  setup(props) {
    const activeCard = computed(() => {
      return projectData.value.cards.find((item) => item._id == props.cardId)
    })
    const cardMembers = computed(() => activeCard.value?.cardMembers)
    const activeCardId = computed(() => activeCard.value?._id)

    const {
      addUserToCard,
      removeUserFromCard,
      newMember,
      fetchError,
      message
      // activeProjectId
    } = manageUserOnCardAndProject()

    const addUser = async () => {
      await addUserToCard(activeCardId.value)
      // await getFullProject(activeProjectId)
    }

    const removeUser = async (email) => {
      await removeUserFromCard(activeCardId.value, email)
      // await getFullProject(activeProjectId)
    }

    return {
      cardMembers,
      newMember,
      fetchError,
      addUser,
      removeUser,
      projectData,
      activeCard,
      message
    }
  }
}
</script>

<style lang="css" scoped>
button {
  margin-bottom: 0;
}
</style>
