<template>
  <div class="view-basic">
    <div class="edit-mode">
      <!-- <h1>Hello {{ user.name }}</h1> -->
      <div class="form-wrapper">
        <div class="form" action="" @submit.prevent="">
          <h3>User information:</h3>
          <p v-if="message">{{ message }}</p>
          <p v-if="fetchError">{{ fetchError }}</p>
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
                  v-model="user.value.name"
                  @blur="updateUser({ name: user.value.name })"
                />
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateUser({ name: user.value.name })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
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
                  v-model="user.value.username"
                  @blur="updateUser({ username: user.value.username })"
                />

                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateUser({ username: user.value.username })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div>
            <label class="label" for="name">Email:</label>
            <p>{{ user.value.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { userData } from '@/store'
// import { uri } from '../composables/uri'
// import { createProjectComp } from '@/composables/createProject'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  userInfo,
  updateUserInformation
} from '../composables/updateUserInformation'

export default {
  components: {
    FontAwesomeIcon
  },
  setup() {
    const { updateUser, message, fetchError, getUser } = updateUserInformation()

    getUser()
    const userData = computed(() => userInfo)
    const user = userData
    // const { createProject, projectRequest, project, fetchError } =
    //   createProjectComp()

    return {
      updateUser,
      message,
      fetchError,
      user
    }
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  margin: var(--base-6) auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
.form__required-fields {
  border-bottom: 1px solid var(--primary-transparent-focus);
  margin-bottom: var(--base-4);
}
p {
  color: var(--secondary-color);
}
button {
  margin-bottom: 0;
}
</style>
