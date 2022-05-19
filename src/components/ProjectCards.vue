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
      <article
        :key="project.id"
        class="card card__content"
        :class="showDeadline(project.dueDate) < 0 ? 'overdue' : ''"
      >
        <main class="card__body">
          <div class="card__extra-info">
            <p v-if="project.usedHours" class="" title="progress">
              {{ project.usedHours }}hr used
            </p>
            <p v-if="project.availableHours" class="" title="remaining hours">
              {{ project.availableHours }}hr to go
            </p>
          </div>
          <h3 class="title--primary">{{ project.name }}</h3>
          <h5
            v-if="showDeadline(project.dueDate) > 0"
            :class="showDeadline(project.dueDate) < 3 ? 'alert' : ''"
          >
            {{ showDeadline(project.dueDate) }} days to deadline
          </h5>
          <h5 v-if="showDeadline(project.dueDate) < 0" class="alert">
            {{ -1 * showDeadline(project.dueDate) }} days over deadline
          </h5>
          <h5 v-if="showDeadline(project.dueDate) == 0">Set deadline</h5>

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
import { onMounted, computed } from 'vue'
// import { uri } from '@/composables/uri'
// import { useProjectStore } from '@/store/projects'
import { manageProjects } from '@/composables/manageProjects'
import { projects, userInfo } from '@/store/store'

export default {
  name: 'home-view',
  components: {},
  setup() {
    const { fetchError, projectStore, getProjectsForHomeCards } =
      manageProjects()

    const showDeadline = (date) => {
      const daysUntilDeadline = computed(() => {
        const formatDueDate = computed(() => {
          return date ? new Date(date).toISOString().substr(0, 10) : ''
        })
        if (formatDueDate.value) {
          const day1 = new Date()
          const day2 = new Date(formatDueDate.value)
          const difference = day2.getTime() - day1.getTime()
          const day = 1000 * 60 * 60 * 24
          const days = difference / day

          if (days < 0 && days > -1) return -1
          if (days < -1) return Math.ceil(days)
          if (days > 0 && days < 1) return 1
          if (days > 1) return Math.ceil(days)

          return Math.floor(days)
        }
        return 0
      })
      return daysUntilDeadline.value
    }

    onMounted(() => {
      getProjectsForHomeCards()
    })

    return {
      projects,
      getProjectsForHomeCards,
      userInfo,
      fetchError,
      projectStore,
      showDeadline
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
  box-shadow: 0 4px 32px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.card__extra-info {
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 2px;
}
.description {
  max-height: 100px;
  overflow: hidden;
}
h5 {
  margin: 0;
}
.overdue {
  border: 1px solid var(--accent);
}
</style>
