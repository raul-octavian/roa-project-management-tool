<template>
  <div>
    <router-link v-if="!user.name" to="/login">
      Login {{ user.name }}
    </router-link>
    <router-link v-if="!user.name" to="/register">
      Register {{ user.name }}
    </router-link>
    <LogoutUser v-if="user.name" />

    <router-link v-if="user.name" to="/userInfo">
      {{ user.name }}
    </router-link>
  </div>
</template>

<script>
// import { deleteCookie } from '@/composables/cookie'
import { computed } from 'vue'
import { userData } from '@/store'
import LogoutUser from '@/components/LogoutUser.vue'

export default {
  components: {
    LogoutUser
  },
  setup() {
    const user = userData()
    const userName = computed(() => {
      return user.$state.name
    })
    return { userName, user }
  }
}
</script>

<style lang="scss" scoped></style>
