<template>
  <div>
    <router-link v-if="!userInfo.name" to="/login">
      Login {{ userInfo.name }}
    </router-link>
    <router-link v-if="!userInfo.name" to="/register">
      Register {{ userInfo.name }}
    </router-link>
    <LogoutUser v-if="userInfo.name" />

    <router-link v-if="userInfo.name" to="/userInfo">
      {{ userInfo.name }}
    </router-link>
  </div>
</template>

<script>
// import { deleteCookie } from '@/composables/cookie'
import { computed } from 'vue'
import { userInfo } from '@/store/store'
import LogoutUser from '@/components/LogoutUser.vue'

export default {
  components: {
    LogoutUser
  },
  setup() {
    const userName = computed(() => {
      return userInfo.value.name
    })
    return { userName, userInfo }
  }
}
</script>

<style lang="scss" scoped></style>
