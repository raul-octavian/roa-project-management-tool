<template>
  <div v-if="project.owner !== userInfo._id">
    <h1>Only the project owner can change the project settings</h1>
  </div>
  <div v-else class="edit-mode">
    <h1>{{ project.name }}</h1>
    <div class="form-wrapper">
      <div class="form" action="" @submit.prevent="">
        <h3>Project information:</h3>
        <p v-if="message" class="message">{{ message }}</p>
        <p v-if="fetchError" class="error">{{ fetchError }}</p>
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
                @change="updateProject({ name: project.name })"
              />
              <button
                class="button--no-text button-toggle constructive-action"
                @click="updateProject({ name: project.name })"
              >
                <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
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
                @change="updateProject({ description: project.description })"
              ></textarea>
              <button
                class="button--no-text button-toggle constructive-action"
                @click="updateProject({ description: project.description })"
              >
                <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>
            <div class="input-group input-group--wide input-group--inline">
              <input
                type="checkbox"
                id="allowManual"
                name="allowManual"
                :checked="project.allowsManualHoursInput"
                v-model="project.allowsManualHoursInput"
                @click="
                  project.allowsManualHoursInput =
                    !project.allowsManualHoursInput
                "
                @blur="
                  updateProject({
                    allowsManualHoursInput: project.allowsManualHoursInput,
                  })
                "
              />
              <label class="label" for="allowManual"
                >Allows manual hours input</label
              >
            </div>
            <button
              class="button--no-text button-toggle constructive-action"
              @click="
                updateProject({
                  allowsManualHoursInput: project.allowsManualHoursInput,
                })
              "
            >
              <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
            </button>
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
                  @change="
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
                  @change="
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
                  @change="
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

            <div v-if="project.allowsManualHoursInput">
              <label class="label" for="used-hours">Used hours:</label>
              <div class="input-group">
                <input
                  type="number"
                  id="used-hours"
                  name="usedHours"
                  v-model="project.timeSchedule.usedHours"
                  @change="
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
        <div class="form__actions">
          <button type="button" class="secondary-action" @click="back">
            Back
          </button>
        </div>

        <div class="destructive__actions">
          <button type="button" class="destructive-action" @click="deleteP">
            Delete project
          </button>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <button
              class="secondary-action secondary-action--no-borders icon-button"
              @click="membersOpen = !membersOpen"
            >
              <font-awesome-icon icon="user" class="icon"></font-awesome-icon>
              Members
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { projectData, userInfo, activeProjectID } from '@/store/store'
import { manageProjects } from '@/composables/manageProjects'
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
    const router = useRouter()

    const back = () => {
      router.go(-1)
    }
    const membersOpen = ref(false)
    const project = computed(() => projectData.value)
    const {
      deleteProject,
      updateProject,
      // getFullProject,
      message,
      fetchError
    } = manageProjects()

    const deleteP = () => {
      deleteProject()
      router.push('/')
    }

    const formattedStartDate = computed(() => {
      return project.value.timeSchedule?.startDate
        ? new Date(project.value.timeSchedule?.startDate)
          .toISOString()
          .substr(0, 10)
        : ''
    })

    const formattedDueDate = computed(() => {
      return project.value.timeSchedule?.dueDate
        ? new Date(project.value.timeSchedule?.dueDate)
          .toISOString()
          .substr(0, 10)
        : ''
    })

    const startDate = formattedStartDate.value
    const dueDate = formattedDueDate.value

    return {
      project,
      message,
      fetchError,
      startDate,
      dueDate,
      membersOpen,
      back,
      deleteP,
      updateProject,
      userInfo,
      activeProjectID
    }
  }
}
</script>

<style lang="css" scoped>
.edit-mode button {
  margin-bottom: 0;
}

.destructive__actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--base-3);
  padding-bottom: var(--base-3);
  margin: var(--base-3) 0;
  border-top: 2px solid var(--accent);
}

.destructive__actions button {
  background: var(--accent);
  color: var(--quaternary-color);
  transition: all 300ms ease-in-out;
}
.destructive__actions button:hover {
  background: var(--primary-bg);
  color: var(--accent);
}
.form label {
  margin: 0;
}
</style>
