<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">Recycle Bin</router-link> |
    <router-link to="/login" @click="logout">Logout</router-link>
  </nav>
  <router-view/>
</template>
<script setup>
  import axios from 'axios';
  import router from '@/router';
  import { useEditSubTaskStore } from './store/editsubtask-store';
  import { useEditTaskStore } from './store/edittask-store';
  import { useParentTaskStore } from './store/parenttask-store';
  import { useTaskStore } from './store/task-store';
  import { useUserStore } from './store/user-store';

  const editSubTaskStore = useEditSubTaskStore()
  const editTaskStore = useEditTaskStore()
  const parentTaskStore = useParentTaskStore()
  const taskStore = useTaskStore()
  const userStore = useUserStore()

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.token

  const logout = async () => {
        try{
            await axios.get('api/logout')

            // console.log(res)
            userStore.clearUser()
            editSubTaskStore.clearTask()
            editTaskStore.clearTask()
            parentTaskStore.clearUser()
            taskStore.clearUser()

            router.push('/login')
        }catch(err){
            console.log(err)
        }
    }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
