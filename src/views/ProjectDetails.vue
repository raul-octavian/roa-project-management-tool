<template>
  <div>
    <div>
      <h1>This is Project details page</h1>
    </div>
    <div class="project-container">
      <ProjectInfo />
    </div>
  </div>
</template>

<script>
import ProjectInfo from '@/components/ProjectInfo.vue'
export default {
  name: 'project-details',
  components: {
    ProjectInfo
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
