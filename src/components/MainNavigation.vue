<template>
  <div class="main-nav">
    <router-link to="/"> Home </router-link>
    <div v-if="project._id" class="project-tag">
      <router-link to="/editProject">
        <button
          class="secondary-action secondary-action--no-borders icon-button"
          @click="tasksOpen = !tasksOpen"
        >
          {{ project.name }}
          <font-awesome-icon icon="edit" class="icon"></font-awesome-icon>
        </button>
      </router-link>
      <div class="info">
        <p>
          Used hours:
          {{ project.timeSchedule.usedHours }}
        </p>
      </div>
      <ul class="member-list">
        <li
          v-for="member in project.members"
          :key="member._id"
          class="member-info"
        >
          <div class="member">
            <div class="avatar" :title="member?.email">
              {{ member?.avatar }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { projectData } from '@/store/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from '@vue/reactivity'
export default {
  components: {
    FontAwesomeIcon
  },
  setup() {
    const project = computed(() => {
      return projectData.value
    })
    return {
      project
    }
  }
}
</script>

<style lang="css" scoped>
.main-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.project-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: var(--base); */
}
.project-tag button {
  margin: 0;
}
.project-tag .info {
  flex-grow: 1;
}
.icon {
  margin-right: 0;
  margin-left: var(--base-sm);
}
</style>
