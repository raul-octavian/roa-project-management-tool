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
        <button class="primary-action">New project</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { userData } from '@/store'
// import { uri } from '@/composables/uri'
// import { useProjectStore } from '@/store/projects'
import { getSimpleProjects, projects } from '@/composables/getProjects'

export default {
  name: 'project-list',
  components: {
    // RegisterUser
  },
  setup() {
    const { fetchError, projectStore, getProjects } = getSimpleProjects()
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
  height: 100%;
  /* width: clamp(100px 13vw 250px); */
  min-width: fit-content;
  font-weight: bold;
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 2px 5px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow-y: scroll;
}
.aside-navigation__project-list {
  display: flex;
  flex-direction: column;
  margin-top: var(--base-sm);
}
.aside-navigation__project-list--selected {
  border-radius: var(--base-xs);
}
.aside-navigation__link {
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 200ms ease-in-out;
}

.router-link-exact-active button {
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
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
