<template>
  <div>
    <div class="view-basic">
      <h1>Create account</h1>

      <div class="form-wrapper">
        <form @submit.prevent="createAccount" action="" class="register-form">
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Full name:</label>
              <input
                type="text"
                id="name"
                class="form__input"
                value=""
                name="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label class="label" for="email">Email:</label>
              <input
                type="email"
                id="email"
                class="form__input"
                value=""
                name="email"
                placeholder="email"
                required
              />
            </div>
            <div>
              <label class="label" for="username">Username:</label>
              <input
                type="text"
                id="username"
                class="form__input"
                value=""
                name="username"
                placeholder="Username"
              />
            </div>

            <div>
              <label class="label" for="password">Password:</label>
              <input
                type="text"
                id="password"
                class="form__input"
                value=""
                name="password"
                placeholder="password"
              />
            </div>

            <div>
              <label class="label" for="repeat-password"
                >Repeat-Password:</label
              >
              <input
                type="text"
                id="repeat-password"
                class="form__input"
                value=""
                name="repeat-password"
                placeholder="repeat-password"
              />
            </div>
          </div>
          <div class="form__actions">
            <button type="submit" class="primary-action">Create account</button>
            <router-link to="/login">
              <button onclick="login" class="secondary-action">Login</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const auth = ref(false)
    return {
      auth
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
  width: clamp(300px, 20vw, 1072px);
}
</style>
