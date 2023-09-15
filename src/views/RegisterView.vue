<template>
    <div class="container">
        <section class="vh-100">
    <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Sample image">
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>

                    <!-- First Name input -->
                    <div class="form-outline mb-4">
                        <TextInput
                            label="Firstname"
                            placeholder="John"
                            v-model:input="firstName"
                            input-type="text"
                            :error="errors.first_name ? errors.first_name[0] : ''"
                        />
                    </div>

                    <!-- Last Name input -->
                    <div class="form-outline mb-4">
                        <TextInput
                            label="Lastname"
                            placeholder="Doe"
                            v-model:input="lastName"
                            input-type="text"
                            :error="errors.last_name ? errors.last_name[0] : ''"
                        />
                    </div>
                    
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <TextInput
                            label="Email"
                            placeholder="jdoe@gmail.com"
                            v-model:input="email"
                            input-type="text"
                            :error="errors.email ? errors.email[0] : ''"
                        />
                    </div>
        
                    <!-- Password input -->
                    <div class="form-outline mb-3">
                        <TextInput
                            label="Password"
                            placeholder="password1234"
                            v-model:input="password"
                            input-type="password"
                            :error="errors.password ? errors.password[0] : ''"
                        />
                    </div>
                    
                    <!-- Password input -->
                    <div class="form-outline mb-3">
                        <TextInput
                            label="Confirm Password"
                            placeholder="password1234"
                            v-model:input="confirmPassword"
                            input-type="password"
                        />
                    </div>
                    
        
                    <div class="text-center text-lg-start mt-4 pt-2">
                    <button type="button" class="btn btn-primary btn-lg" @click="register"
                        style="padding-left: 2.5rem; padding-right: 2.5rem;">Submit</button>
                    <p class="small fw-bold mt-2 pt-1 mb-0">Do you have an account? <router-link to="login" class="link-danger">
                                Login
                        </router-link></p>
                    </div>
                    
                </form>
            </div>
      </div>
    </div>
    
  </section>
    </div>
  </template>
  
  <script setup>

    import {ref} from 'vue';
    import axios from 'axios'
    import router from '@/router';
    import TextInput from '@/components/global/TextInput.vue';
    

    let errors = ref([])
    let firstName = ref(null)
    let lastName = ref(null)
    let email = ref(null)
    let password = ref(null)
    let confirmPassword = ref(null)


    const register = async () => {
        errors.value = []

        try{
            let res = await axios.post('api/register', {
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value,
                password_confirmation: confirmPassword.value,
            })
            
            console.log(res)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            
            router.push('/login')
        }catch(err){
            console.log(err)
            errors.value = err.response.data.errors
        }
    }
    
    
  </script>
  
  <style scope>
    .vuejs3-datepicker input {
      border: var(--bs-border-width) solid var(--bs-border-color);
    }
    .h-custom {
    height: calc(100% - 73px);
    }
    @media (max-width: 450px) {
    .h-custom {
    height: 100%;
    }
    }
  </style>
  