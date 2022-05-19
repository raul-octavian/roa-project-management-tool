<template>
  <div>
    <div>
      <h1>{{ projectData.name }}</h1>
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
import { projectData } from '@/store/store'
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
    return { projectID, projectData }
  }
}
</script>

<style lang="scss" scoped></style>
