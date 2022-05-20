<template>
  <div class="edit-mode">
    <div class="form-wrapper">
      <div class="form" action="" @submit.prevent="">
        <h3>User information:</h3>
        <p v-if="message" class="message">{{ message }}</p>
        <p v-if="fetchError" class="error">{{ fetchError }}</p>
        <div class="form__required-fields">
          <div>
            <label class="label" for="name">Name:</label>
            <div class="input-group">
              <input
                type="text"
                id="name"
                class="form__input"
                name="name"
                required
                v-model="userInfo.name"
                @blur="updateUser({ name: userInfo.name })"
              />
              <button
                class="button--no-text button-toggle constructive-action"
                @click="updateUser({ name: userInfo.name })"
              >
                <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>
            <label class="label" for="name">Username:</label>
            <div class="input-group">
              <input
                type="text"
                id="email"
                class="form__input"
                name="username"
                required
                v-model="userInfo.username"
                @blur="updateUser({ username: userInfo.username })"
              />

              <button
                class="button--no-text button-toggle constructive-action"
                @click="updateUser({ username: userInfo.username })"
              >
                <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
        <div>
          <label class="label" for="name">Email:</label>
          <p>{{ userInfo.email }}</p>
        </div>
        <div class="form__actions">
          <button class="secondary-action" @click="back">back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { userInfo } from '@/store/store'
import { manageUsers } from '@/composables/manageUsers'

export default {
  components: {
    FontAwesomeIcon
  },
  setup() {
    const router = useRouter()
    const { updateUser, message, fetchError, getUser } = manageUsers()

    getUser()
    const back = () => {
      router.go(-1)
    }
    // const { createProject, projectRequest, project, fetchError } =
    //   manageProjects()

    return {
      updateUser,
      message,
      fetchError,
      userInfo,
      back
    }
  }
}
</script>

<style lang="css" scoped>
.form__required-fields {
  border-bottom: 1px solid var(--primary-transparent-focus);
  margin-bottom: var(--base-4);
  padding-bottom: var(--base-4);
}
p {
  color: var(--primary-color);
}
button {
  margin-bottom: 0;
}
</style>
