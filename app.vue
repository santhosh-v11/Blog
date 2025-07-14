<template>
  <div>
    <header class="header">
      <nav class="nav container">
        <h1>My Blog</h1>
        <ul class="nav-links">
          <li>
            <NuxtLink to="/" class="nav-link" active-class="active">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/add" class="nav-link" active-class="active">
              Add Post
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useBlog } from '~/composables/useBlog'
import { onMounted } from 'vue'

const { initializeBlogs } = useBlog()

// Initialize blogs when app starts
onMounted(() => {
  initializeBlogs()
})
</script>
