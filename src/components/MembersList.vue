<template>
  <div class="member-list">
    <h3>Add or remove members</h3>
    <ul>
      <li>
        <div v-for="member in members" :key="member._id" class="member-info">
          <div>
            <p>{{ member?.name }}</p>
            <p>{{ member?.email }}</p>
          </div>

          <button
            v-if="project.owner != member._id"
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
        <button
          :disabled="!newMember"
          class="button--no-text constructive-action"
          @click="addUser"
        >
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
import { computed } from 'vue'

// composables
import { manageUserOnCardAndProject } from '@/composables/manageUserOnCardAndProject'
import { projectData } from '@/composables/getOneFullProject'
export default {
  components: {
    FontAwesomeIcon
  },
  props: ['cardId'],
  setup(props) {
    const activeCard = computed(() => {
      return projectData.value.cards.find((item) => item._id == props?.cardId)
    })
    const members = computed(() => {
      return props.cardId
        ? activeCard.value?.cardMembers
        : projectData.value.members
    })
    const activeCardId = computed(() => activeCard.value?._id)
    const project = computed(() => projectData.value)

    const {
      addUserToCard,
      removeUserFromCard,
      addUserToProject,
      removeUserFromProject,
      newMember,
      fetchError,
      message
      // activeProjectId
    } = manageUserOnCardAndProject()

    const addUser = async () => {
      if (activeCard.value) {
        await addUserToCard(activeCardId.value)
      } else {
        await addUserToProject(projectData.value?._id)
      }
      // await getFullProject(activeProjectId)
    }

    const removeUser = async (email) => {
      if (activeCard.value) {
        await removeUserFromCard(activeCardId.value, email)
      } else {
        await removeUserFromProject(projectData.value?._id, email)
      }
      // await getFullProject(activeProjectId)
    }

    return {
      members,
      newMember,
      fetchError,
      addUser,
      removeUser,
      projectData,
      activeCard,
      message,
      project
    }
  }
}
</script>

<style lang="css" scoped>
button {
  margin-bottom: 0;
}
</style>
