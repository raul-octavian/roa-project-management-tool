<template>
  <div>
    <div class="view-basic">
      <create-project />
    </div>
  </div>
</template>

<script>
import CreateProject from '@/components/CreateProject.vue'
import { onMounted } from 'vue'
import { projectData } from '@/store/store'
export default {
  components: {
    CreateProject
  },
  setup() {
    onMounted(() => {
      projectData.value = {}
    })
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
</style>
