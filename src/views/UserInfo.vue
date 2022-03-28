<template>
  <h1>user info</h1>
  <div class="view-basic">
    <div class="edit-mode">
      <h1>Hello {{ user.name }}</h1>
      <div class="form-wrapper">
        <div class="form" action="" @submit.prevent="">
          <h3>User information:</h3>
          <p>{{ message }}</p>
          <p>{{ fetchError }}</p>
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Name:</label>
              <div class="input-group">
                <input
                  type="text"
                  id="name"
                  class="form__input"
                  name="name"
                  placeholder="Project name"
                  required
                  v-model="user.name"
                  @blur="updateUser({ name: user.name })"
                />
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateUser({ name: user.name })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="email"
                  class="form__input"
                  name="username"
                  required
                  v-model="user.username"
                  @blur="updateUser({ username: user.username })"
                />
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateUser({ username: user.username })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
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
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  userInfo,
  updateUserInformation
} from '../composables/updateUserInformation'

export default {
  components: {
    // FontAwesomeIcon
  },
  setup() {
    const { updateUser, message, fetchError, getUser } = updateUserInformation()

    getUser()
    const user = computed(() => userInfo)
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
</style>
