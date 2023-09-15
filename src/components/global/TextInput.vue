<template>
    <!-- <div class="form-outline mb-4"> -->
        <label class="form-label" for="form3Example3">{{ label }}</label>
        <input v-model="inputComputed" class="form-control form-control-lg"
            :placeholder="placeholder" :type="inputType"/>
        <span v-if="error" class="text-danger">
            {{ error }}
        </span>
        
    <!-- </div> -->
</template>

<script setup>
    import { defineProps, defineEmits, toRefs, computed } from 'vue'

    const emit = defineEmits(['update:input'])

    const props = defineProps({
        label: String,
        //labelColor: { type: Boolean, default: true },
        input: String,
        placeholder: { type: String, default: '' },
        inputType: String,
        error: String
    })

    const { label, input, placeholder, error } = toRefs(props)

    const inputComputed = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>