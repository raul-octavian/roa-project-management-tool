<template>
  <div class="aside-navigation">
    <div class="aside-navigation__project-list">
      <router-link
        v-for="project in projects"
        :key="project.id"
        class="aside-navigation__link"
        :to="{
          name: 'project',
          params: {
            project: project.id,
          },
        }"
      >
        <button class="secondary-action">{{ project.name }}</button>
      </router-link>
    </div>
    <div>
      <router-link class="create-project" to="/createProject/">
        <button class="primary-action">Create project</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { userData } from '@/store'
// import { uri } from '@/composables/uri'
// import { useProjectStore } from '@/store/projects'
import { getSimpleProjects } from '@/composables/getProjects'

export default {
  name: 'project-list',
  components: {
    // RegisterUser
  },
  setup() {
    const { projects, fetchError, projectStore, getProjects } =
      getSimpleProjects()
    const user = userData()

    onMounted(() => {
      getProjects()
    })

    return {
      projects,
      getProjects,
      user,
      fetchError,
      projectStore
    }
  }
}
</script>

<style lang="css" scoped>
.aside-navigation {
  border-right: 2px solid var(--tertiary-color);
  min-height: calc(100vh - 50px);
  /* width: clamp(100px 13vw 250px); */
  min-width: fit-content;
  font-weight: bold;
}
.aside-navigation__project-list {
  display: flex;
  flex-direction: column;
  margin-top: var(--base-sm);
}
.aside-navigation__project-list--selected {
  border-radius: var(--base-xs);
  background: var(--primary-transparent);
}
.aside-navigation__link {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 200ms ease-in-out;
}

.aside-navigation__link:hover {
  background: var(--primary-transparent);
}

.create-project {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: var(--base-xs);
  /* background: var(--secondary-color); */
  /* color: var(--primary-bg); */
}
button {
  margin-bottom: 0;
  margin-right: 0;
  width: 150px;
  overflow: hidden;
}
</style>
