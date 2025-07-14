<template>
  <article class="card">
    <img 
      :src="blog.image" 
      :alt="blog.title"
      class="card-image"
      @error="handleImageError"
    />
    
    <div class="card-content">
      <h2 class="card-title">{{ blog.title }}</h2>
      <p class="card-description">{{ blog.description }}</p>
      <time class="card-date">{{ formatDate(blog.date) }}</time>
      
      <div class="card-actions">
        <NuxtLink 
          :to="`/edit/${blog.id}`" 
          class="btn btn-secondary btn-small"
        >
          Edit
        </NuxtLink>
        <button 
          @click="$emit('delete', blog.id)"
          class="btn btn-danger btn-small"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = '/placeholder.svg?height=200&width=400'
}
</script>
