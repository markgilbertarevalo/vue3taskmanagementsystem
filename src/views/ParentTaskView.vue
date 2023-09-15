<template>
    <div class="row">
        <div class="col-sm-12-col-md-2 col-lg-2 col-xl-2 offset-xl-3">
            <img width="150" height="150" class="rounded" :src="parentTaskStore.postImage(parentTaskStore.task.attributes.image)" alt="" />
        </div>
        <div class="col-sm-12-col-md-2 col-lg-2 col-xl-2">
            <h1>{{ parentTaskStore.task.attributes.title }}</h1>
            <span class="badge bg-primary rounded-pill"> {{ parentTaskStore.task.attributes.status }}</span>
        </div>
        <div class="col-sm-12-col-md-4 col-lg-4 col-xl-4">
            <div><button type="button" class="btn btn-primary" @click="addSubTask">Add Sub Task</button></div>
        </div>
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
    //import axios from 'axios'
    import router from '@/router';

    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
    const parentTaskStore = useParentTaskStore()

    const addSubTask = async () => {
      
      router.push('/addsubtask')
    }
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
</style>