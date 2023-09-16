<template>
    <div class="container">
        
    <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
            
            <div class="col-md-8 col-lg-6 col-xl-4">
                <form>
                    <!-- First Name input -->
                    <div class="form-outline mb-4">
                        <TextInput
                            label="Title"
                            placeholder="Task"
                            v-model:input="title"
                            input-type="text"
                            :error="errors.title ? errors.title[0] : ''"
                        />
                        <!-- <input type="text" v-model="title" class="form-control form-control-lg"
                            placeholder="Enter a valid First Name" />
                        <span v-if="errors" class="text-danger">
                            {{ errors.title ? errors.title[0] : '' }}
                    </span> -->
                    </div>

                    

                    <select  v-model="status" class="form-select form-select-lg mb-3" aria-label="Large select example">
                        <!-- <option selected>{{ status }}</option> -->
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <div class="">
                        <button type="button" class="btn btn-default btn-lg" @click="back"
                            >Back</button>
                        <button type="button" class="btn btn-primary btn-lg" @click="submit"
                            >Submit</button>
                    </div>
                    
                </form>
            </div>
      </div>
    </div>
    
 
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import axios from 'axios'
    import router from '@/router';
    //import { useRoute } from 'vue-router';
    import TextInput from '@/components/global/TextInput.vue';
    import {useUserStore} from '../store/user-store'
    import { useParentTaskStore } from '@/store/parenttask-store';
    //import { onMounted } from 'vue';
    import Swal from '@/sweetalert2';
    import {useEditSubTaskStore} from '../store/editsubtask-store'

    const parentTaskStore = useParentTaskStore()
    const editSubTaskStore = useEditSubTaskStore()
    const userStore = useUserStore()

    //const route = useRoute()
    let errors = ref([])
    const title = ref(editSubTaskStore.task.attributes.title||'')
    const status = ref(editSubTaskStore.task.attributes.status||'');
    const id = editSubTaskStore.task.id

    const submit = async () => {
        errors.value = []
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
        let data = new FormData()
        console.log(id)
        data.append('title', title.value || '')
        data.append('status', status.value || '')
        data.append('id', id)

        try{
            
            await axios.post('api/subtasks/?_method=PUT', data)
            //await editSubTaskStore.fetchTask(id)
            await parentTaskStore.fetchTask(parentTaskStore.task.id)
            Swal.fire(
                'Sub Task Updated!',
                'The task you updated was called "' + title.value + '"',
                'success'
            )

            //editTaskStore.clearTask()
            
            router.push('/task')
        }catch(err){
            console.log(err)
            errors.value = err.response.data.errors
        }
    }

    const back = () =>{
        router.push('/task')
    }
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
  .btn{
    margin-left: 5px;
    margin-right: 5px;
  }
</style>