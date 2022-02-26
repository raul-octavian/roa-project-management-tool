<template>
  <div>Project information</div>

  <div class="project-wrapper">
    <div class="project-stage">
      <h3>backlog</h3>
      <div class="cards">
        <draggable
          :list="backlog"
          group="cards"
          item-key="id"
          :move="changeStage"
          @end="endStage"
          data-stage="backlog"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
              <p>{{ element.stage }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="project-stage">
      <h3>to-do</h3>
      <div class="cards">
        <draggable
          :list="todo"
          group="cards"
          item-key="id"
          :move="changeStage"
          @end="endStage"
          data-stage="todo"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
              <p>{{ element.stage }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="project-stage">
      <h3>in progress</h3>
      <div class="cards">
        <draggable
          :list="inProgress"
          group="cards"
          item-key="id"
          :move="changeStage"
          @end="endStage"
          data-stage="inProgress"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
              <p>{{ element.stage }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="project-stage">
      <h3>done</h3>
      <div class="cards">
        <draggable
          :list="done"
          group="cards"
          item-key="id"
          :move="changeStage"
          @end="endStage"
          data-stage="done"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
              <p>{{ element.stage }}</p>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  setup () {
    const stages = ref(['backlog', 'todo', 'inProgress', 'testing'])
    const backlog = ref([
      { id: 1, name: 'card1', stage: 'backlog' },
      { id: 2, name: 'card2', stage: 'backlog' },
      { id: 3, name: 'card3', stage: 'backlog' }
    ])
    const todo = ref([])
    const inProgress = ref([])
    const done = ref([])

    const changeStage = (env) => {
      console.log('stage activated')
      console.log(env)
    }
    const endStage = (env) => {
      console.log(env.to.dataset.stage)
    }

    return { backlog, todo, inProgress, done, stages, changeStage, endStage }
  }
}
</script>

<style lang="css" scoped>
.project-wrapper {
  padding: var(--base-5);
  display: flex;
  gap: var(--base-3);
  overflow-x: scroll;
  overflow-y: hidden;
  height: auto;
  max-height: 80vh;
  width: 80vw;
}
.project-stage {
  background: var(--primary-transparent);
  min-width: 300px;
  min-height: 700px;
  padding: var(--base-1);
  overflow-y: scroll;
}
.cards {
  margin-top: 0;
  min-height: 100%;
}
.card {
  background: #fff;
  padding: var(--base-sm);
  margin-bottom: var(--base-sm);
}
</style>
