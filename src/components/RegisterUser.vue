<template>
  <div>
    <div class="view-basic">
      <h1>Create account</h1>
      <p v-for="(error, index) in populateErrors" :key="index">
        error: {{ error }}
      </p>
      <p>{{ fetchError }}</p>

      <div class="form-wrapper">
        <form @submit.prevent="createAccount" action="" class="register-form">
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Full name:</label>
              <input
                type="text"
                id="name"
                class="form__input"
                name="name"
                placeholder="John Doe"
                v-model="name"
                required
              />
            </div>
            <div>
              <label class="label" for="email">Email:</label>
              <input
                type="email"
                id="email"
                class="form__input"
                name="email"
                placeholder="email"
                required
                v-model="email"
              />
            </div>
            <div>
              <label class="label" for="username">Username:</label>
              <input
                type="text"
                id="username"
                class="form__input"
                name="username"
                placeholder="Username"
                v-model="username"
              />
            </div>

            <div>
              <label class="label" for="password">Password:</label>
              <input
                type="password"
                id="password"
                class="form__input"
                name="password"
                placeholder="password"
                v-model="password"
              />
            </div>

            <div>
              <label class="label" for="repeat-password"
                >Repeat-Password:</label
              >
              <input
                type="password"
                id="repeat-password"
                class="form__input"
                name="repeat-password"
                placeholder="repeat-password"
                v-model="repeatPassword"
              />
            </div>
          </div>
          <div class="form__actions">
            <button type="submit" class="primary-action">Create account</button>
            <router-link to="/login">
              <button class="secondary-action">Login</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import registerUser from '../composables/registerUser'
export default {
  setup() {
    const {
      populateErrors,
      createAccount,
      repeatPassword,
      passwordsMarch,
      passwordLength,
      userReq,
      fetchError
    } = registerUser()

    return {
      ...toRefs(userReq),
      repeatPassword,
      createAccount,
      populateErrors,
      userReq,
      passwordsMarch,
      passwordLength,
      fetchError
    }
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  min-width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
.form-wrapper {
  border: none;
}
.register-form {
  width: clamp(350px, 20vw, 1072px);
}
</style>
