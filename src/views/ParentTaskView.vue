<template>
    <div class="row">
        <div class="col-sm-12-col-md-12 col-lg-12 col-xl-2 offset-xl-3">
            <img width="150" height="150" class="rounded" :src="parentTaskStore.postImage(parentTaskStore.task.attributes.image)" alt="" />
        </div>
        <div class="col-sm-12-col-md-12 col-lg-12 col-xl-2">
            <h1>{{ parentTaskStore.task.attributes.title }}</h1>
            <span class="badge bg-primary rounded-pill"> {{ parentTaskStore.task.attributes.status }}</span>
        </div>
        <div class="col-sm-12-col-md-12 col-lg-12 col-xl-4">
            <div>
              <button type="button" class="btn btn-default btn-lg" @click="back">Back</button>
              <button type="button" class="btn btn-primary" @click="addSubTask">Add Sub Task</button>
            </div>
            
        </div>
    </div>
    
    <div class="tasks container">
      <!-- <EventCard v-for="event in events" :key="event.id" :event="event" /> -->
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="task in parentTaskStore.task.attributes.subtask" :key="task">
            <td><p class="tdTitle">{{ task.title }}</p></td>
            <td>
                <button type="button" class="btn btn-warning btntable" @click="editTask(task.id)">Edit</button>
                <button type="button" class="btn btn-danger btntable" @click="deleteTask(task.id)">Delete</button>
            </td>
            <td><span class="badge bg-primary rounded-pill"> {{ task.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
    import {useParentTaskStore} from '../store/parenttask-store.js'
    import { useUserStore } from '@/store/user-store';
    import { useEditSubTaskStore } from '@/store/editsubtask-store'
    import axios from 'axios'
    import Swal from '@/sweetalert2';
    import router from '@/router';

    const userStore = useUserStore()
    const parentTaskStore = useParentTaskStore()
    const editSubTaskStore = useEditSubTaskStore()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token

    const addSubTask = async () => {
      
      router.push('/addsubtask')
    }

    const editTask = async (id) => {
      await editSubTaskStore.fetchTask(id)
      router.push('/editsubtask/')
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
                    await axios.delete('api/subtask/' + id + '')

                    await parentTaskStore.fetchTask(parentTaskStore.task.id)

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

    const back = () =>{
        router.push('/')
    }
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
  .btntable{
    margin-left: 10px ;
    margin-top: 4px;
  }
  .tdTitle{
    margin-top: 8px;
  }
</style>