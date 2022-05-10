<template>
  <div
    class="card"
    :class="daysUntilDeadline < 0 ? 'overdue' : ''"
    @click="toggleEditCard"
  >
    <div class="flags">
      <ul class="member-list">
        <li
          v-for="member in card.cardMembers"
          :key="member._id"
          class="member-info"
        >
          <div class="member">
            <div class="avatar avatar--small" :title="member?.email">
              {{ member?.avatar }}
            </div>
          </div>
        </li>
      </ul>
      <h5
        v-if="daysUntilDeadline > 0"
        :class="daysUntilDeadline < 3 ? 'alert' : ''"
      >
        {{ daysUntilDeadline }} days to deadline
      </h5>
      <h5 v-if="daysUntilDeadline < 0" class="alert">
        {{ -1 * daysUntilDeadline }} over deadline
      </h5>
      <h5 v-if="daysUntilDeadline == 0 && !card.isComplete">Set deadline</h5>
      <h5 :class="card.isComplete ? 'completed' : ''" v-if="card.isComplete">
        Completed
      </h5>
    </div>
    <div class="main">
      <h4>{{ card.cardName }}</h4>
      <div class="button-group">
        <button
          class="button--no-text button--no-text--invisible"
          @click.stop="toggleEditCard"
        >
          <font-awesome-icon icon="edit" class="icon"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="extras">
      <div :class="allTasksCompleted ? 'completed' : ''">
        <p>
          <span>{{ totalCompletedTasks }}</span
          >/<span>{{ totalTasks }}</span>
        </p>
      </div>
      <button
        class="icon-button icon-button--fit icon-button--no-borders"
        :class="running ? 'running' : ''"
        @click.stop="running ? stop() : start()"
      >
        <font-awesome-icon
          :icon="!running ? 'play' : 'pause'"
          class="icon"
        ></font-awesome-icon>
        {{ !running ? time : runningTime }}
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { Stopwatch } from '@/composables/stopwatch'
import { computed, ref } from 'vue-demi'
import { updateCardSections } from '@/composables/updateCard'
import { projectData } from '@/composables/getOneFullProject'
import { calculateDeadlines } from '@/composables/calculateDeadlines'
export default {
  components: {
    FontAwesomeIcon
  },
  props: ['element'],
  setup(props, { emit }) {
    // const { time, running, start, stop } = stopwatch()
    const { updateCard } = updateCardSections()

    const toggleEditCard = () => {
      emit('toggleEditCard')
    }
    // const card = ref(props.element)
    const card = computed(() => {
      return projectData.value.cards.find(
        (item) => item._id == props.element._id
      )
    })

    // task status

    const totalTasks = computed(() => {
      return card.value?.tasks.length || 0
    })

    const completedTasks = computed(() => {
      return card.value?.tasks.filter((task) => task.status === true)
    })

    const totalCompletedTasks = computed(() => {
      return completedTasks.value.length || 0
    })

    const allTasksCompleted = computed(() => {
      return (
        totalTasks.value - totalCompletedTasks.value == 0 &&
        totalTasks.value != 0
      )
    })

    // end task status

    // days until due date

    const { daysUntilDeadline } = calculateDeadlines(card)

    // end days until due date

    // stopwatch

    let timeBegan = null
    let started = null
    const running = ref(false)

    let runningHours = 0
    let runningMinutes = 0

    const runningHoursAsNumbers = computed(() => {
      const minutesAsFloat = runningMinutes / 60
      return runningHours + minutesAsFloat
    })

    const hoursAsNumber = computed(() => {
      return card.value.cardUsedHours
    })

    const hoursAsHours = computed(() => {
      return Math.floor(hoursAsNumber.value)
    })
    const minutesAsNumber = computed(() => {
      return hoursAsNumber.value - hoursAsHours.value
    })
    const minutesAsMinutes = computed(() => {
      return Math.round(minutesAsNumber.value * 60)
    })

    const setTime = computed(() => {
      const hour = hoursAsHours.value
      const min = minutesAsMinutes.value
      return hour + ':' + zeroPrefix(min, 2)
    })
    const time = computed(() => {
      return setTime.value
    })
    const runningTime = ref('')

    function start() {
      if (running.value) return
      console.log('start')
      if (timeBegan === null) {
        timeBegan = new Date()
      }

      started = setInterval(clockRunning, 1000)
      running.value = true
    }

    function stop() {
      running.value = false
      updateCard(card.value._id, {
        cardUsedHours: runningHoursAsNumbers.value.toFixed(2)
      })
      clearInterval(started)
    }

    const clockRunning = () => {
      const currentTime = new Date()
      const timeElapsed = new Date(currentTime - timeBegan)
      const hour = hoursAsHours.value + timeElapsed.getUTCHours()
      const min = minutesAsMinutes.value + timeElapsed.getUTCMinutes()
      runningHours = hour
      runningMinutes = min
      runningTime.value = hour + ':' + zeroPrefix(min, 2)
    }

    function zeroPrefix(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }

    // end stopwatch

    return {
      toggleEditCard,
      time,
      running,
      start,
      stop,
      card,
      runningTime,
      totalTasks,
      completedTasks,
      totalCompletedTasks,
      allTasksCompleted,
      daysUntilDeadline
    }
  }
}
</script>

<style lang="css" scoped>
.card {
  padding: var(--base-xs) 0 var(--base-sm) var(--base-sm);
  margin-bottom: var(--base-sm);
  margin-right: var(--base-1);
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: column;
  /* align-items: flex-start; */
  border-radius: var(--base-sm);
  background: var(--primary-bg-glass) rgba(156, 224, 233, 0.25);
  box-shadow: 0 1px 3px 0 var(--primary-transparent);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.card h4 {
  margin: 0;
  overflow: hidden;
}
.card h5 {
  margin: 0;
  text-align: right;
}
.card button {
  margin-bottom: 0;
  margin-right: var(--base-1);
}
.button--no-text--invisible {
  color: var(--primary-transparent);
}

h4:hover ~ .button-group .button--no-text--invisible,
.button--no-text--invisible:hover {
  border: none;
  color: var(--primary-color);
}

.far-left {
  margin-left: auto;
}

.project-stage__header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.project-stage__header button {
  margin-bottom: 0;
}
.icon-button--fit {
  width: fit-content;
}
.icon-button--no-borders {
  border: none;
}
.button-group {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--base-sm);
}

.running {
  border: 1px solid var(--secondary-color);
}

.main,
.extras,
.flags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--base-xs) 0;
}
.flags {
  padding: var(--base-xs);
}
.flags ul {
  margin-left: 0;
  padding-left: 0;
}
.avatar--small {
  width: 20px;
  height: 20px;
  font-size: var(--base-sm);
}
</style>
