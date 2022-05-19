<template>
  <div class="task-list">
    <h3>Add or remove tasks</h3>
    <ul v-if="cardTasks">
      <div v-if="message">
        <p class="message">{{ message }}</p>
      </div>
      <li v-for="task in cardTasks" :key="task._id">
        <div class="task-info">
          <label for="task">
            <div class="input-group input-group--wide">
              <input
                type="checkbox"
                id="task"
                name="task"
                :checked="task.status"
                v-model="task.status"
                @click="taskStatus = !taskStatus"
                @blur="updateTask(task._id, { status: task.status })"
              />
              <div class="task-info__container">
                <input
                  type="text"
                  id="name"
                  class="form__input input--no-borders"
                  name="card_name"
                  required
                  v-model="task.taskName"
                  @change="updateTask(task._id, { taskName: task.taskName })"
                />
                <div class="input-group input-group--wide">
                  <textarea
                    id="task-description"
                    class="form__input textarea--no-borders"
                    name="task description"
                    v-model="task.taskDescription"
                    @change="
                      updateTask(task._id, {
                        taskDescription: task.taskDescription,
                      })
                    "
                  />
                </div>
              </div>
              <button class="button--no-text button-toggle constructive-action">
                <font-awesome-icon icon="save" class="icon"></font-awesome-icon>
              </button>
            </div>
          </label>
          <button class="button--no-text destructive-action">
            <font-awesome-icon
              icon="trash"
              class="icon"
              @click="removeTask(task._id)"
            ></font-awesome-icon>
          </button>
        </div>
      </li>
    </ul>
    <div>
      <h4>Add a new task</h4>
      <p v-if="error" class="error">{{ error }}</p>
      <label class="label" for="name">Task name</label>
      <div class="input-group">
        <input
          @focus="taskName = ''"
          type="text"
          id="name"
          class="form__input"
          name="task_name"
          v-model="taskName"
        />
        <button class="button--no-text constructive-action">
          <font-awesome-icon
            icon="add"
            class="icon"
            @click="addTask"
          ></font-awesome-icon>
        </button>
      </div>
      <label class="label" for="task-description">Task description</label>
      <div class="input-group">
        <textarea
          @focus="taskDescription = ''"
          id="task-description"
          class="form__input"
          name="task-description"
          v-model="taskDescription"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// vue native
import { computed, ref } from 'vue'
import { projectData } from '@/store/store'
import { manageTasks } from '@/composables/manageTasks'
export default {
  components: {
    FontAwesomeIcon
  },
  props: ['cardId'],
  setup(props) {
    const activeCard = computed(() => {
      return projectData.value.cards.find((item) => item._id == props.cardId)
    })
    const cardTasks = computed(() => activeCard.value?.tasks)
    const activeCardId = computed(() => activeCard.value?._id)
    const error = ref('')
    const {
      addTaskToCard,
      removeTaskFromCard,
      taskDescription,
      taskName,
      updateTask,
      message
    } = manageTasks()

    const addTask = async () => {
      if (taskName.value) {
        await addTaskToCard(activeCardId.value)
        error.value = ''
      } else {
        error.value = 'Task name cant be an empty field'
      }
      taskName.value = ''
      taskDescription.value = ''
      // await getFullProject(activeProjectId)
    }

    const removeTask = async (taskId) => {
      await removeTaskFromCard(activeCardId.value, taskId)
      // await getFullProject(activeProjectId)
    }
    return {
      cardTasks,
      addTask,
      removeTask,
      taskDescription,
      taskName,
      updateTask,
      message,
      error
    }
  }
}
</script>

<style lang="css" scoped>
.edit-mode .form .task-list input.input--no-borders,
.edit-mode .form .task-list textarea.textarea--no-borders {
  background: none;
  border-radius: 0;
  padding: var(--base-sm);
  border: none;
  color: var(--primary-color);
  transition: 300ms all ease-in-out;
  width: 100%;
}
.edit-mode .form .task-list input.input--no-borders:focus,
.edit-mode .form .task-list textarea.textarea--no-borders:focus {
  border-radius: var(--base-xs);
  padding: var(--base-sm);
  border: 1px solid var(--primary-transparent);
  color: var(--primary-color);
}

.edit-mode .form .task-list textarea.textarea--no-borders {
  resize: both;
  min-height: 40px;
  line-height: 20px;
}

.task-info__container {
  width: 100%;
}

button {
  margin-bottom: 0;
}
</style>
