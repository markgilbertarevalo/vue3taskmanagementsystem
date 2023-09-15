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
            
              <div class="form-outline mb-3">
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
              

              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="button" class="btn btn-primary btn-lg" @click="login"
                  style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? </p>
                    <router-link to="register" class="link-success">
                            Register
                    </router-link>
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
    import {useUserStore} from '../store/user-store'
    //import {useTaskStore} from '../store/task-store'
    import TextInput from '../components/global/TextInput.vue'

    const userStore = useUserStore()
    //const taskStore = useTaskStore()
    let errors =ref([])
    let email = ref(null)
    let password = ref(null)

    //let taskParam = {'filter[title]': '', 'sort': '-created_at'}
  
    const login = async () => {
        errors.value = []
        
        try{
            let res = await axios.post('api/login', {
                email: email.value,
                password: password.value,
            })

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            //console.log(res)
            userStore.setUserDetails(res)
            //await taskStore.fetchTasks(taskParam) 
            router.push('/')
        }catch(err){
            errors.value = err.response.data.errors
            console.log(err)
        }
    }
</script>

<style scope>
  .h-custom {
  height: calc(100% - 73px);
  }
  @media (max-width: 450px) {
  .h-custom {
  height: 100%;
  }
  }
</style>