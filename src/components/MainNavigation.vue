<template>
  <div class="main-nav">
    <router-link to="/"> Home </router-link>
    <router-link to="/editProject">
      <div v-if="project._id" class="project-tag">
        <button
          class="secondary-action secondary-action--no-borders icon-button"
          @click="tasksOpen = !tasksOpen"
        >
          {{ project.name }}
          <font-awesome-icon icon="edit" class="icon"></font-awesome-icon>
        </button>
      </div>
    </router-link>
  </div>
</template>

<script>
import { projectData } from '@/composables/getOneFullProject'
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
.icon {
  margin-right: 0;
  margin-left: var(--base-sm);
}
</style>
