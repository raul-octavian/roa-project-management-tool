<template>
  <router-link to="/" @click="logout"> Logout </router-link>
</template>

<script>
import { manageUsers } from '../composables/manageUsers'
export default {
  setup() {
    const { logout } = manageUsers()
    return { logout }
  }
}
</script>

<style lang="scss" scoped>
</style>
