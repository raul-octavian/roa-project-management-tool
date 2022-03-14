<template>
  <div>
    <div class="view-basic">
      <h1>Login</h1>
      <div class="form-wrapper">
        <form action="" class="login-form" @submit.prevent="login(userReq)">
          <div class="form__required-fields">
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
          </div>
          <div class="form__actions">
            <button type="submit" class="primary-action">Login</button>
            <router-link to="/register">
              <button class="secondary-action">Register</button>
            </router-link>
          </div>
        </form>
      </div>
      {{ res.error }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'

import loginUser from '../composables/setUser'
export default {
  setup() {
    // const user = userData()
    const userReq = reactive({
      password: ref('1234567890'),
      email: ref('johnyOne@test.com')
    })
    const { res, login } = loginUser()

    return { ...toRefs(userReq), userReq, login, res }
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
.login-form {
  width: clamp(350px, 20vw, 1072px);
}
</style>
