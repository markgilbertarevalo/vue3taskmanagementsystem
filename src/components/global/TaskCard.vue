<script setup>
    import { defineProps } from 'vue'

    defineProps({
        task: {
            type: Object,
            required: true,
        },
    })
</script>

<template>
  <RouterLink
    class="task-link"
    :to="{ name: 'event-details', params: { id: event.id } }"
  >
    <div class="task-card">
      <h2>{{ task.title }}</h2>
      <!-- <span>@{{ event.time }} on {{ event.date }}</span> -->
    </div>
  </RouterLink>
</template>

<style scoped>
.task-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.task-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.task-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>