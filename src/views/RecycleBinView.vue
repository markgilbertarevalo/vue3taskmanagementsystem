<template>
  <div class="home">
    <h1>Bin</h1>
    <div>
      <input v-model="filter" v-on:keyup="search" placeholder="Search Task Title...">
      <button type="button" class="btn btn-primary btntop" @click="changeSort">Sort</button>
      <button type="button" class="btn btn-danger btntop" @click="deleteAll">Delete All</button>
    </div>
    <div class="container tasks" >
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="task in recycleTaskStore.tasks" :key="task">
            
            <td><img width="70" height="70" class="rounded" :src="taskStore.postImage(task.attributes.image)" alt="" /></td>
            <td><p class="tdTitle">{{ task.attributes.title }}</p></td>
            <td>
                <button type="button" class="btn btn-warning btntable" @click="restoreTask(task.id)">Restore</button>
                <button type="button" class="btn btn-danger btntable" @click="deleteTask(task.id)">Delete</button>
            </td>
            <td><span class="badge bg-primary rounded-pill"> {{ task.attributes.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
    import {ref} from 'vue';
    import axios from 'axios'
    import {useUserStore} from '../store/user-store'
    import {useTaskStore} from '../store/task-store'
    import {useRecycleTaskStore} from '../store/recycletask-store'
    import { onMounted } from 'vue';
    import Swal from '@/sweetalert2'; 

    const userStore = useUserStore()
    const taskStore = useTaskStore()
    const recycleTaskStore = useRecycleTaskStore()
    
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

     
      await recycleTaskStore.fetchTasks(sort, filter)
    };

    const search = async () => {
      await recycleTaskStore.fetchTasks(sort, filter)
    };

    const deleteAll = async () => {
        Swal.fire({
            title: 'Are you sure you want to delete all of it?',
            text: 'You won\t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, do it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed){
                try{
                    await axios.delete('api/trash')

                    await recycleTaskStore.fetchTasks(sort, filter)
                    await taskStore.fetchTasks(sort, filter)
                    Swal.fire(
                        'Success!',
                        'Your bin is empty.',
                        'success'
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
    }

    const restoreTask = async (id) => {
        Swal.fire({
            title: 'Are you sure you want to restore this',
            text: 'You won\t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, do it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed){
                try{
                    await axios.post('api/restore', {
                        id: id,
                    })

                    await recycleTaskStore.fetchTasks(sort, filter)
                    await taskStore.fetchTasks(sort, filter)
                    Swal.fire(
                        'Success!',
                        'Your file has been restored.',
                        'success'
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
    }

    const deleteTask = async (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this',
            text: 'You won\t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed){
                try{
                    await axios.delete('api/delete_task/' + id + '')

                    await recycleTaskStore.fetchTasks(sort, filter)

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }catch(err){
                    console.log(err)
                }
            }
        })
    }
    
    onMounted(async()=>{
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
      await recycleTaskStore.fetchTasks(sort, filter) 
    })
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
    
  }
  .btntable{
    margin-left: 10px ;
    margin-top: 15px;
  }
  .btntop{
    margin-left: 10px ;
  }
  .tdTitle{
    margin-top: 18px;
  }
</style>
