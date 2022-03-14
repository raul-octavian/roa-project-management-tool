<template>
  <div>
    <router-link v-if="!user.name" to="/login">
      Login {{ user.name }}
    </router-link>
    <router-link v-if="!user.name" to="/register">
      Register {{ user.name }}
    </router-link>
    <router-link v-if="user.name" to="/" @click="logout"> Logout </router-link>
    <router-link v-if="user.name" to="/user">
      {{ user.name }}
    </router-link>
  </div>
</template>

<script>
import { deleteCookie } from '@/composables/cookie'
import { computed } from 'vue'
import { userData } from '@/store'
export default {
  setup() {
    const user = userData()
    const userLoggedIn = computed(() => {
      return !!user.$state.name
    })
    const userName = computed(() => {
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
