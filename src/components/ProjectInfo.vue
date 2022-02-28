<template>
  <div>Project information</div>

  <div class="project-wrapper">
    <div v-for="(stage, index) in data" :key="index" class="project-stage">
      <h3>{{ index }}</h3>
      <div class="cards">
        <draggable
          :list="stage"
          group="cards"
          item-key="id"
          :move="changeStage"
          @start="drag = true"
          @end="endStage"
          :data-stage="index"
        >
          <template #item="{ element }">
            <div class="card">
              <h4>{{ element.name }}</h4>
            </div>
          </template>
        </draggable>
      </div>
      <SmallModal />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import draggable from 'vuedraggable'

import SmallModal from './SmallModal.vue'
export default {
  components: {
    draggable,
    SmallModal
  },
  setup () {
    const data = reactive({
      backlog: ref([
        { id: 1, name: 'card1', stage: 'backlog' },
        { id: 2, name: 'card2', stage: 'backlog' },
        { id: 3, name: 'card3', stage: 'backlog' },
        { id: 4, name: 'card3', stage: 'backlog' },
        { id: 5, name: 'card3', stage: 'backlog' },
        { id: 6, name: 'card3', stage: 'backlog' },
        { id: 7, name: 'card3', stage: 'backlog' },
        { id: 8, name: 'card3', stage: 'backlog' },
        { id: 9, name: 'card3', stage: 'backlog' },
        { id: 10, name: 'card3', stage: 'backlog' }
      ]),
      todo: ref([]),
      inProgress: ref([]),
      done: ref([])
    })

    const changeStage = (env, item) => {
      // console.log('stage activated')
      // console.log(env)
      // console.log('item on move', item)
    }
    const endStage = (env) => {
      const oldStage = env
      const newStage = env.to.dataset.stage
      const id = env.item._underlying_vm_.id
      let filterData = []

      if (oldStage !== newStage) {
        filterData = data[newStage].filter((item) => item.id === id)
        filterData[0].stage = newStage
      }
    }

    return {
      // ...toRefs(data),
      data,
      // todo,
      // inProgress,
      // done,
      changeStage,
      endStage
    }
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
  width: 80vw;
  min-height: 80vh;
}
.project-stage {
  background: var(--primary-transparent);
  min-width: 300px;
  max-height: 700px;
  padding: var(--base-1);
}
.cards {
  margin-top: 0;
  max-height: 50vh;
  overflow-y: scroll;
  margin-bottom: var(--base-4);
}
.card {
  background: #fff;
  padding: var(--base-sm);
  margin-bottom: var(--base-sm);
}
.card h4 {
  margin: 0;
}
</style>
