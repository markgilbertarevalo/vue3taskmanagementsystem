<template>
  <div class="home">
    <h1>Tasks</h1>
    <div>
      <input v-model="filter" v-on:keyup="search" placeholder="Type something...">
      <button type="button" class="btn btn-primary" @click="changeSort">{{ sort }}</button>
      <button type="button" class="btn btn-primary" @click="addTask">Add Task</button>
    </div>
    <div class="container tasks" >
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <ol class="list-group list-group-numbered">
        <div v-for="task in taskStore.tasks" :key="task" class="">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ task.attributes.title }}</div>
              <div>
                <img width="150" height="150" class="rounded" :src="taskStore.postImage(task.attributes.image)" alt="" />
              </div>
              <div><button type="button" class="btn btn-default" @click="viewTask(task.id)">View</button></div>
            </div>
            <span class="badge bg-primary rounded-pill"> {{ task.attributes.status }}</span>
          </li>
        </div>
      </ol>
    </div>
  </div>
</template>

<script setup>
    import {ref} from 'vue';
    import axios from 'axios'
    import router from '@/router';
    import {useUserStore} from '../store/user-store'
    import {useTaskStore} from '../store/task-store'
    import {useParentTaskStore} from '../store/parenttask-store.js'
    import { onMounted } from 'vue';

    const userStore = useUserStore()
    const taskStore = useTaskStore()
    const parentTaskStore = useParentTaskStore()
    
    const sort = ref('-created_at');
    const isSort = ref(true); // A boolean flag to track the current value
    const filter = ref('')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token

    const changeSort = async () => {
      if (isSort.value) {
        sort.value = 'created_at';
      } else {
        sort.value = '-created_at';
      }

      // Toggle the boolean flag
      isSort.value = !isSort.value;

     
      await taskStore.fetchTasks(sort, filter)
    };

    const search = async () => {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
      await taskStore.fetchTasks(sort, filter)
    };

    const addTask = async () => {
      
      router.push('/addtask')
    }

    const viewTask = async (id) => {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
      await parentTaskStore.fetchTask(id)
      router.push('/task')
    }
    
    onMounted(async()=>{
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
      await taskStore.fetchTasks(sort, filter) 
    })
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
</style>
