<template>
  <div>
    <div class="view-basic">
      <h1>Create New Project</h1>
      <div class="form-wrapper">
        <form action="">
          <div class="form__required-fields">
            <div>
              <label class="label" for="name">Name:</label>
              <input
                type="text"
                id="name"
                class="form__input"
                value=""
                name="name"
                placeholder="Project name"
                required
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
              >
Project description</textarea
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
                value=""
                min=""
                max=""
              />
            </div>
            <div>
              <label class="label" for="due_date">Due date:</label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value=""
                min=""
                max=""
              />
            </div>
            <div>
              <label class="label" for="allocated-hours"
                >Allocated hours:</label
              >
              <input
                type="number"
                id="allocated-hours"
                name="allocated_hours"
                value=""
              />
            </div>
            <div>
              <label class="label" for="used-hours">used hours:</label>
              <input
                type="number"
                id="used-hours"
                name="used_Hours"
                value="0"
              />
            </div>
          </div>
          <div class="form__actions">
            <button type="submit">Create project</button>
          </div>
        </form>
      </div>
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
.view-basic {
  width: clamp(300px, 80vw, 1900px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--base-8);
}
</style>
