<template>
  <div class="card-container">
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
      <article :key="project.id" class="card card__content">
        <main class="card__body">
          <div class="card__extra-info">
            <p v-if="project.percentUsed" class="" title="progress">
              {{ project.percentUsed }} done
            </p>
            <p v-if="project.availableHours" class="" title="remaining hours">
              {{ project.availableHours }}hr to go
            </p>
          </div>
          <h3 class="title--primary">{{ project.name }}</h3>

          <p class="description">
            {{ project.description }}
          </p>
        </main>
        <footer class="footer">
          <button class="secondary-action constructive-action">See more</button>
        </footer>
      </article>
    </router-link>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { userData } from '@/store'
// import { uri } from '@/composables/uri'
// import { useProjectStore } from '@/store/projects'
import { getSimpleProjects, projects } from '@/composables/getProjects'

export default {
  name: 'home-view',
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
button {
  margin-bottom: 0;
  padding-left: 0;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  width: 250px;
  padding: var(--base-2);
  margin: var(--base-3);
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 4px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.card__extra-info {
  display: flex;
  justify-content: flex-end;
  gap: var(--base-1);
  font-size: var(--base-sm);
}

.card__extra-info p {
  font-size: var(--base-sm);
  margin: 0;
  text-align: right;
}
.title--primary {
  width: 100%;
  overflow: hidden;
  text-overflow: clip;
}
</style>
