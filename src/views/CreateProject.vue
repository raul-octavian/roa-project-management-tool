<template>
  <div>
    <div class="view-basic">
      <div class="create-project">
        <h1>Create New Project</h1>
        <div class="form-wrapper">
          <form action="" @submit.prevent="createProject()">
            <div class="form__required-fields">
              <div>
                <label class="label" for="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  class="form__input"
                  name="name"
                  placeholder="Project name"
                  required
                  v-model="name"
                />
              </div>
            </div>
            <div class="form__fields">
              <div>
                <label class="label" for="description">Description:</label>
                <textarea
                  onfocus="this.value=''; this.onfocus=null;"
                  id="description"
                  type="text"
                  class="form__input"
                  name="description"
                  v-model="description"
                ></textarea>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="task"
                  name="allowManual"
                  v-model="allowsManualHoursInput"
                />
                <label class="label" for="allowManual"
                  >Allows manual hours input</label
                >
              </div>
            </div>
            <div class="form__timeSchedule">
              <div>
                <label class="label" for="start_date">Start date:</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  min=""
                  max=""
                  v-model="startDate"
                />
              </div>
              <div>
                <label class="label" for="due_date">Due date:</label>
                <input
                  type="date"
                  id="due_date"
                  name="dueDate"
                  min=""
                  max=""
                  v-model="dueDate"
                />
              </div>
              <div>
                <label class="label" for="allocated-hours"
                  >Allocated hours:</label
                >
                <input
                  type="number"
                  id="allocated-hours"
                  name="allocatedHours"
                  v-model="allocatedHours"
                />
              </div>
              <div>
                <label class="label" for="used-hours">used hours:</label>
                <input
                  type="number"
                  id="used-hours"
                  name="usedHours"
                  v-model="usedHours"
                />
              </div>
            </div>
            <div class="form__actions">
              <button type="submit" class="primary-action">
                Create project
              </button>
              <router-link to="/">
                <button class="secondary-action">Cancel</button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
// import { userData } from '@/store'
// import { uri } from '../composables/uri'
import { createProjectComp } from '@/composables/createProject'
export default {
  setup() {
    const { createProject, projectRequest, project, fetchError } =
      createProjectComp()

    return {
      project,
      ...toRefs(project),
      createProject,
      fetchError,
      projectRequest
    }
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
.create-project {
  width: clamp(300px, 80%, 1200px);
  padding: var(--base-4) var(--base-5);
  overflow-y: scroll;
  max-height: 70vh;
  padding: var(--base-8);
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass);
  box-shadow: 0 2px 5px 0 var(--primary-transparent);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.create-project h1 {
  text-align: center;
}
</style>
