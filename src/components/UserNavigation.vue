<template>
  <div>
    <router-link v-if="!userName" to="/login">
      Login {{ userName }}
    </router-link>
    <router-link v-if="!userName" to="/register">
      Register {{ user.$state.name }}
    </router-link>
    <router-link v-if="userName" to="/" @click="logout"> Logout </router-link>
    <router-link v-if="userLoggedIn" to="/user">
      {{ userName }}
    </router-link>
  </div>
</template>

<script>
import { deleteCookie } from '@/composables/cookie'
import { computed, ref } from 'vue'
import { userData } from '@/store'
export default {
  setup() {
    const user = userData()
    const userLoggedIn = computed(() => {
      console.log(!!userName.value)
      return !!user.$state.name
    })
    const userName = computed(() => {
      console.log(user.$state.name)
      return user.$state.name
    })

    const logout = () => {
      deleteCookie('id')
      deleteCookie('name')
      deleteCookie('username')
      deleteCookie('email')
      deleteCookie('token')

      userLoggedIn.value = false
      user.$reset()
    }

    return { userName, logout, userLoggedIn, user }
  }
}
</script>

<style lang="scss" scoped></style>
