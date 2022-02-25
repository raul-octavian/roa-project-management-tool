<template>
  <div>
    <div class="view-basic">
      <h1>Login</h1>
      <div class="form-wrapper">
        <form action="" class="login-form">
          <div class="form__required-fields">
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
          </div>
          <div class="form__actions">
            <button type="submit" class="primary-action">Login</button>
            <router-link to="/register">
              <button class="secondary-action">Register</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
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
  width: clamp(300px, 20vw, 1072px);
}
</style>
