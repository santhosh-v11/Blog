<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title" class="form-label">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-input"
        required
        placeholder="Enter blog post title"
      />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description *</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-textarea"
        required
        placeholder="Enter blog post description"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="image" class="form-label">Image URL</label>
      <input
        id="image"
        v-model="formData.image"
        type="url"
        class="form-input"
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div class="form-group">
      <label for="date" class="form-label">Date *</label>
      <input
        id="date"
        v-model="formData.date"
        type="date"
        class="form-input"
        required
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? 'Update Post' : 'Create Post' }}
      </button>
      <NuxtLink to="/" class="btn btn-secondary">
        Cancel
      </NuxtLink>
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, computed, reactive, watchEffect } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit'])

const isEditing = computed(() => !!props.initialData)

const formData = reactive({
  title: '',
  description: '',
  image: '/placeholder.svg?height=200&width=400',
  date: new Date().toISOString().split('T')[0]
})

// Initialize form data
watchEffect(() => {
  if (props.initialData) {
    Object.assign(formData, props.initialData)
  }
})

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }
}
</style>
