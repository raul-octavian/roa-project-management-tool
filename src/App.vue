<template>
  <div>
    <div class="header">
      <div class="navigation">
        <MainNavigation />
      </div>
      <div class="user-info">
        <UserNavigation />
      </div>
    </div>

    <div class="main-container">
      <ProjectList v-if="user.name && currentPath != '/userInfo'" />
      <router-view />
    </div>
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue'
import UserNavigation from './components/UserNavigation.vue'
import ProjectList from './components/ProjectList.vue'
import { userData } from './store'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  components: {
    MainNavigation,
    UserNavigation,
    ProjectList
  },
  setup() {
    const router = useRouter()
    const user = userData()
    const currentPath = computed(() => router.currentRoute.value.path)
    return { user, currentPath }
  }
}
</script>

<style lang="css">
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom: 2px solid var(--tertiary-color);
  background: var(--primary-bg);
}
.navigation {
  height: fit-content;
}

.user-info {
  margin-left: auto;
}

.main-container {
  margin-top: 50px;
  display: flex;
  gap: 20px;
}
</style>
