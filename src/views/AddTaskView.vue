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
                        <input type="file" ref="fileInput" @change="handleFileChange" id="image" accept="image/*">
                        <span v-if="errors" class="text-danger">
                            {{ errors.image ? errors.image[0] : '' }}
                        </span>
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
    import Swal from '@/sweetalert2';

    const userStore = useUserStore()
    let errors = ref([])
    const title = ref([null])
    // Create a ref for the selected file
    const selectedFile = ref(null);

    // Handle file input change
    const handleFileChange = (event) => {
        selectedFile.value = event.target.files[0];
    };

    const submit = async () => {
        errors.value = []
        if (selectedFile.value === null) {
            Swal.fire(
                'No image found?',
                'Please add an image of your choice and complete all other inputs.',
                'warning'
            )
            return null
        }
        try{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token
            
            const formData = new FormData();
                formData.append('image', selectedFile.value || '');
                formData.append('title', title.value || '');

            await axios.post('api/tasks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            
            Swal.fire(
                'New task created!',
                'The task you created was called "' + title.value + '"',
                'success'
            )
            
            router.push('/')
        }catch(err){
            console.log(err)
            errors.value = err.response.data.errors
        }
    }

    const back = () =>{
        router.push('/')
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