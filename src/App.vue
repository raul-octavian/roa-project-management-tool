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
      <ProjectList v-if="userInfo?.name && currentPath != '/userInfo'" />
      <router-view />
    </div>
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue'
import UserNavigation from './components/UserNavigation.vue'
import ProjectList from './components/ProjectList.vue'
import { userInfo } from '@/store/store'
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
    const currentPath = computed(() => router.currentRoute.value.path)

    return { userInfo, currentPath }
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
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 4px 32px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
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
  height: calc(100vh - 65px);
}
</style>
