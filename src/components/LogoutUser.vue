<template>
  <router-link to="/" @click="logout"> Logout </router-link>
</template>

<script>
import { logout } from '../composables/setUser'
export default {
  setup() {
    return { logout }
  }
}
</script>

<style lang="scss" scoped>
</style>
