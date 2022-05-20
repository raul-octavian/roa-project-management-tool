<template>
  <div class="view-basic">
    <user-information />
  </div>
</template>

<script>
import UserInformation from '@/components/UserInformation'
export default {
  components: {
    UserInformation
  },
  setup() {
    return {}
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  margin: var(--base-6) auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
</style>
