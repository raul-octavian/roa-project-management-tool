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
            <!-- <p class="" title="progress">{{ project.percentUsed }} done</p>
            <p class="" title="remaining hours">
              {{ project.available_hours }} to go
            </p> -->
          </div>
          <h1 class="title--primary">{{ project.name }}</h1>

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
import { getSimpleProjects } from '@/composables/getProjects'

export default {
  name: 'home-view',
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
  min-width: 250px;
  padding: var(--base-2);
  margin: var(--base-3);
  background: var(--primary-bg);
  border-radius: var(--base-sm);
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
</style>
