<template>
  <div>
    <div>
      <h1>This is Project details page</h1>
    </div>
    <div class="project-container">
      <Suspense>
        <template #default>
          <ProjectInfo :projectID="projectID" :key="projectID" />
        </template>
        <template #fallback>
          <div>..loading</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import ProjectInfo from '@/components/ProjectInfo.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'project-details',
  components: {
    ProjectInfo
  },
  setup() {
    const route = useRoute()
    const projectID = computed(() => {
      return route.params.project
    })
    return { projectID }
  }
}
</script>

<style lang="scss" scoped></style>
