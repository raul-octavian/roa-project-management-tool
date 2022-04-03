<template>
  <div class="login-container">
    <LoginUser />
  </div>
</template>

<script>
import LoginUser from '@/components/LoginUser.vue'
export default {
  name: 'login-user',
  components: {
    LoginUser
  },

  setup() {
    return {}
  }
}
</script>

<style lang="css" scoped>
.login-container {
  width: fit-content;
  margin: var(--base-8) auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--base-6);
  border-radius: var(--base-1);
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 4px 32px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
