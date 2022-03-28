<template>
  <div class="view-basic">
    <div class="edit-mode">
      <h1>Edit project {{ project.name }}</h1>
      <div class="form-wrapper">
        <div class="form" action="" @submit.prevent="">
          <h3>Project information:</h3>
          <p>{{ message }}</p>
          <p>{{ fetchError }}</p>
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Name:</label>
              <div class="input-group">
                <input
                  type="text"
                  id="name"
                  class="form__input"
                  name="name"
                  placeholder="Project name"
                  required
                  v-model="project.name"
                  @blur="updateProject({ name: project.name })"
                />
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateProject({ name: project.name })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="form__fields">
            <div>
              <label class="label" for="description">Description:</label>
              <div class="input-group">
                <textarea
                  id="description"
                  class="form__input"
                  name="description"
                  v-model="project.description"
                  @blur="updateProject({ description: project.description })"
                ></textarea>
                <button
                  class="button--no-text button-toggle constructive-action"
                  @click="updateProject({ description: project.description })"
                >
                  <font-awesome-icon
                    icon="save"
                    class="icon"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="form__timeSchedule">
            <div class="form__timeSchedule--division">
              <div>
                <label class="label" for="start_date">Start date:</label>
                <div class="input-group">
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    min=""
                    max=""
                    v-model="startDate"
                    @blur="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          startDate: startDate,
                        },
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                    @click="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          startDate: startDate,
                        },
                      })
                    "
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>

              <div>
                <label class="label" for="due_date">Due date:</label>
                <div class="input-group">
                  <input
                    type="date"
                    id="due_date"
                    name="dueDate"
                    min=""
                    max=""
                    v-model="dueDate"
                    @blur="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          dueDate: dueDate,
                        },
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                    @click="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          dueDate: dueDate,
                        },
                      })
                    "
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
            <div class="form__timeSchedule--division">
              <div>
                <label class="label" for="allocated-hours"
                  >Allocated hours:</label
                >
                <div class="input-group">
                  <input
                    type="number"
                    id="allocated-hours"
                    name="allocatedHours"
                    v-model="project.timeSchedule.allocatedHours"
                    @blur="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          allocatedHours: project.timeSchedule.allocatedHours,
                        },
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                    @click="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          allocatedHours: project.timeSchedule.allocatedHours,
                        },
                      })
                    "
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>

              <div>
                <label class="label" for="used-hours">Used hours:</label>
                <div class="input-group">
                  <input
                    type="number"
                    id="used-hours"
                    name="usedHours"
                    v-model="project.timeSchedule.usedHours"
                    @blur="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          usedHours: project.timeSchedule.usedHours,
                        },
                      })
                    "
                  />
                  <button
                    class="button--no-text button-toggle constructive-action"
                    @click="
                      updateProject({
                        timeSchedule: {
                          ...project.timeSchedule,
                          usedHours: project.timeSchedule.usedHours,
                        },
                      })
                    "
                  >
                    <font-awesome-icon
                      icon="save"
                      class="icon"
                    ></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <SlideInOut entry="top" exit="top" :duration="300">
            <members-list v-if="membersOpen" :projectId="project._id" />
          </SlideInOut>
        </div>
        <div>
          <ul>
            <li>
              <button
                class="
                  secondary-action secondary-action--no-borders
                  icon-button
                "
                @click="membersOpen = !membersOpen"
              >
                <font-awesome-icon icon="user" class="icon"></font-awesome-icon>
                Members
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="form-wrapper">
        <form action="" @submit.prevent="">
          <div class="form__required-fields">
            <p>{{ message }}</p>
            <p>{{ fetchError }}</p>
            <div>
              <label class="label" for="name">Name:</label>
              <input
                type="text"
                id="name"
                class="form__input"
                name="name"
                placeholder="Project name"
                required
                v-model="project.name"
                @blur="updateProject({ name: project.name })"
              />
            </div>
          </div>
          <div class="form__fields">
            <div>
              <label class="label" for="description">Description:</label>
              <textarea
                id="description"
                type="text"
                class="form__input"
                name="description"
                v-model="project.description"
                @blur="updateProject({ description: project.description })"
              ></textarea>
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
                @blur="
                  updateProject({
                    timeSchedule: {
                      ...project.timeSchedule,
                      startDate: startDate,
                    },
                  })
                "
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
                @blur="
                  updateProject({
                    timeSchedule: {
                      ...project.timeSchedule,
                      dueDate: dueDate,
                    },
                  })
                "
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
                v-model="project.timeSchedule.allocatedHours"
                @blur="
                  updateProject({
                    timeSchedule: {
                      ...project.timeSchedule,
                      allocatedHours: project.timeSchedule.allocatedHours,
                    },
                  })
                "
              />
            </div>
            <div>
              <label class="label" for="used-hours">used hours:</label>
              <input
                type="number"
                id="used-hours"
                name="usedHours"
                v-model="project.timeSchedule.usedHours"
                @blur="
                  updateProject({
                    timeSchedule: {
                      ...project.timeSchedule,
                      usedHours: project.timeSchedule.usedHours,
                    },
                  })
                "
              />
            </div>
          </div>
          <div class="form__actions">
            <button type="" class="secondary-action">Cancel</button>
          </div>
        </form>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
// import { userData } from '@/store'
// import { uri } from '../composables/uri'
// import { createProjectComp } from '@/composables/createProject'
import { projectData } from '@/composables/getOneFullProject'
import { updateOneProject } from '@/composables/updateProject'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SlideInOut } from 'vue3-transitions'
import MembersList from '@/components/MembersList'

export default {
  components: {
    FontAwesomeIcon,
    MembersList,
    SlideInOut
  },
  setup() {
    const membersOpen = ref(false)
    // const { createProject, projectRequest, project, fetchError } =
    //   createProjectComp()
    const project = computed(() => projectData.value)
    const { updateProject, message, fetchError } = updateOneProject()

    const formattedStartDate = computed(() => {
      return project.value.timeSchedule.startDate
        ? new Date(project.value.timeSchedule.startDate)
          .toISOString()
          .substr(0, 10)
        : ''
    })

    const formattedDueDate = computed(() => {
      return project.value.timeSchedule.dueDate
        ? new Date(project.value.timeSchedule.dueDate)
          .toISOString()
          .substr(0, 10)
        : ''
    })

    const startDate = formattedStartDate.value
    const dueDate = formattedDueDate.value

    return {
      project,
      updateProject,
      message,
      fetchError,
      startDate,
      dueDate,
      membersOpen
      //   ...toRefs(project),
      //   createProject,
      //   fetchError,
      //   projectRequest
      // }
    }
  }
}
</script>

<style lang="css" scoped>
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  margin: var(--base-6) auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
</style>
