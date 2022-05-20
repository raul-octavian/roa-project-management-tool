<template>
  <div class="view-basic">
    <edit-project />
  </div>
</template>

<script>
import { EditProject } from '@/components/EditProject.vue'

export default {
  components: {
    EditProject
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
