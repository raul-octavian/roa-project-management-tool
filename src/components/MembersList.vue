<template>
  <div class="member-list">
    <h3>Add or remove members</h3>
    <ul v-if="members">
      <li>
        <div v-for="member in members" :key="member._id" class="member-info">
          <div class="member">
            <div class="avatar">{{ member?.avatar }}</div>
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
    <div class="add-member__container">
      <h4>Add a new member</h4>
      <div v-if="fetchError">
        <p class="error">{{ fetchError }}</p>
      </div>
      <div v-if="message">
        <p class="message">{{ message }}</p>
      </div>
      <label class="label" for="name">Member email:</label>
      <div class="input-group">
        <input
          @focus="newMember = ''"
          type="email"
          id="name"
          class="form__input"
          name="card_name"
          required
          v-model="newMember"
          @keyup.enter="addUser"
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
import { projectData } from '@/store/store'
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
.member {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.member-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: 0;
  height: 100%;
  align-items: flex-start;
}
.input-group {
  width: 100%;
}
.add-member__container {
  width: 100%;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: var(--base-xs);
  background: var(--primary-transparent);
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
