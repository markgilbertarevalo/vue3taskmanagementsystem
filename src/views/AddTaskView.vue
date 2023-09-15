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
                    </div>

                    <div class="form-outline mb-4">
                        <input type="file" id="myfile" name="myfile">
                    </div>

                    <div class="text-center text-lg-start mt-4 pt-2">
                    <button type="button" class="btn btn-primary btn-lg" @click="submit"
                        style="padding-left: 2.5rem; padding-right: 2.5rem;">Submit</button>
                    
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

    const userStore = useUserStore()
    let errors = ref([])
    let title = ref(null)

    const submit = async () => {
        errors.value = []

        try{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
            
            let res = await axios.post('api/tasks', {
                title: title.value,
            })
            
            console.log(res)
            
            
            router.push('/login')
        }catch(err){
            console.log(err)
            errors.value = err.response.data.errors
        }
    }
</script>

<style scoped>
  .tasks {
    margin-top: 50px;
  }
</style>