<template>
  <div>
    <div class="view-basic">
      <h1>Create account</h1>
      {{ userInfo }}
      <p v-for="(error, index) in populateErrors" :key="index">
        {{ error }}
      </p>

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
import { computed, reactive, ref, toRefs } from 'vue'
import { uri } from '../composables/uri'
export default {
  setup() {
    const auth = ref(false)

    const userInfo = ref({})
    const repeatPassword = ref('1234567890')
    const userReq = reactive({
      name: ref('Johny One'),
      password: ref('1234567890'),
      username: ref('johnyOne'),
      email: ref('johnyOne@test.com')
    })

    const passwordsMarch = computed(() => {
      return userReq.password !== repeatPassword.value
    })

    const passwordLength = computed(() => {
      return userReq.password.length < 10
    })

    const populateErrors = computed(() => {
      const err = []
      if (passwordsMarch.value) {
        err.push('Passwords do not match, pleas try again')
      }
      if (passwordLength.value) {
        err.push('Password must be at least 10 characters long')
      }
      return err
    })

    const createAccount = async () => {
      // const requestOptions = {
      //   method: 'POST',
      //   header: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      //   body: JSON.stringify(userReq)
      // }

      if (!populateErrors.value.length) {
        // console.log(requestOptions)
        const response = await fetch(
          `${uri}user/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userReq)
          }
          // requestOptions
        )
        const data = await response.json()
        userInfo.value = data
      }
    }
    return {
      auth,
      ...toRefs(userReq),
      repeatPassword,
      createAccount,
      userInfo,
      populateErrors
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
