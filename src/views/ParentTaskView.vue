<template>
    <div class="home">
        <h1>{{ parentTaskStore.task.attributes.title }}</h1>
        <span class="badge bg-primary rounded-pill"> {{ parentTaskStore.task.attributes.status }}</span>
    </div>
    <div class="tasks container">
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <ol class="list-group list-group-numbered">
        <div v-for="task in parentTaskStore.task.attributes.subtask" :key="task" class="">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ task.title }}</div>
              <!-- <div><button type="button" class="btn btn-default" @click="viewTask(task.id)">View</button></div> -->
            </div>
            <!-- <span class="badge bg-primary rounded-pill"> {{ task.attributes.status }}</span> -->
          </li>
        </div>
      </ol>
    </div>
</template>

<script setup>
    import {useParentTaskStore} from '../store/parenttask-store.js'

    const parentTaskStore = useParentTaskStore()
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
</style>