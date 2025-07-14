import { ref, readonly } from "vue"

export const useBlog = () => {
  const blogs = ref([])

  // Initial blog data
  const initialBlogs = [
    {
      id: 1,
      title: "Getting Started with Vue.js",
      description:
        "Learn the fundamentals of Vue.js and build your first reactive application. This comprehensive guide covers components, directives, and the Vue ecosystem.",
      image: "/placeholder.svg?height=200&width=400",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Nuxt.js 3 Features Overview",
      description:
        "Explore the powerful features of Nuxt.js 3 including auto-imports, server-side rendering, and the new Nitro engine for better performance.",
      image: "/placeholder.svg?height=200&width=400",
      date: "2024-01-20",
    },
    {
      id: 3,
      title: "Building Responsive Web Applications",
      description:
        "Master the art of creating responsive web applications that work seamlessly across all devices using modern CSS techniques and frameworks.",
      image: "/placeholder.svg?height=200&width=400",
      date: "2024-01-25",
    },
  ]

  // Initialize blogs from localStorage or use initial data
  const initializeBlogs = () => {
    if (process.client) {
      const storedBlogs = localStorage.getItem("blogs")
      if (storedBlogs) {
        blogs.value = JSON.parse(storedBlogs)
      } else {
        blogs.value = [...initialBlogs]
        saveToLocalStorage()
      }
    }
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem("blogs", JSON.stringify(blogs.value))
    }
  }

  // Get all blogs
  const getAllBlogs = () => {
    return blogs.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Get blog by ID
  const getBlogById = (id) => {
    return blogs.value.find((blog) => blog.id === Number.parseInt(id))
  }

  // Add new blog
  const addBlog = (blogData) => {
    const newBlog = {
      id: Date.now(),
      ...blogData,
      date: blogData.date || new Date().toISOString().split("T")[0],
    }
    blogs.value.push(newBlog)
    saveToLocalStorage()
    return newBlog
  }

  // Update blog
  const updateBlog = (id, blogData) => {
    const index = blogs.value.findIndex((blog) => blog.id === Number.parseInt(id))
    if (index !== -1) {
      blogs.value[index] = { ...blogs.value[index], ...blogData }
      saveToLocalStorage()
      return blogs.value[index]
    }
    return null
  }

  // Delete blog
  const deleteBlog = (id) => {
    const index = blogs.value.findIndex((blog) => blog.id === Number.parseInt(id))
    if (index !== -1) {
      blogs.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  return {
    blogs: readonly(blogs),
    initializeBlogs,
    getAllBlogs,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog,
  }
}
