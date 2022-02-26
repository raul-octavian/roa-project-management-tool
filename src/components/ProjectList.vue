<template>
  <div class="aside-navigation">
    <div class="aside-navigation__project-list">
      <router-link class="aside-navigation__link" to="/projectDetails">
        Project
      </router-link>
    </div>
    <div>
      <router-link class="create-project" to="/createProject">
        Create project
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="css" scoped>
.aside-navigation {
  border-right: 2px solid var(--tertiary-color);
  min-height: calc(100vh - 50px);
  width: clamp(100px 13vw 250px);
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
  background: var(--secondary-color);
  color: var(--primary-bg);
}
</style>
