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
                            placeholder="Sub Task"
                            v-model:input="title"
                            input-type="text"
                            :error="errors.title ? errors.title[0] : ''"
                        />
                    </div>

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
    import TextInput from '@/components/global/TextInput.vue';
    import {useUserStore} from '../store/user-store'
    import {useParentTaskStore} from '../store/parenttask-store.js'
    import Swal from '@/sweetalert2';

    const parentTaskStore = useParentTaskStore()
    const userStore = useUserStore()
    let errors = ref([])
    const title = ref([null])

    const submit = async () => {
        errors.value = []

        try{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
            
            await axios.post('api/subtask', {
                title: title.value,
                task_id: parentTaskStore.task.id,
            })
            
            Swal.fire(
                'New task created!',
                'The task you created was called "' + title.value + '"',
                'success'
            )
            await parentTaskStore.fetchTask(parentTaskStore.task.id)
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