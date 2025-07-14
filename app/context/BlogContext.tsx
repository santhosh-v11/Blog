"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Blog {
  id: number
  title: string
  description: string
  image: string
  date: string
}

interface BlogContextType {
  blogs: Blog[]
  addBlog: (blog: Omit<Blog, "id">) => void
  updateBlog: (id: number, blog: Omit<Blog, "id">) => void
  deleteBlog: (id: number) => void
  getBlogById: (id: number) => Blog | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

const initialBlogs: Blog[] = [
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

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs")
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs))
    } else {
      setBlogs(initialBlogs)
      localStorage.setItem("blogs", JSON.stringify(initialBlogs))
    }
  }, [])

  const saveToLocalStorage = (newBlogs: Blog[]) => {
    localStorage.setItem("blogs", JSON.stringify(newBlogs))
  }

  const addBlog = (blogData: Omit<Blog, "id">) => {
    const newBlog: Blog = {
      id: Date.now(),
      ...blogData,
      date: blogData.date || new Date().toISOString().split("T")[0],
    }
    const updatedBlogs = [...blogs, newBlog]
    setBlogs(updatedBlogs)
    saveToLocalStorage(updatedBlogs)
  }

  const updateBlog = (id: number, blogData: Omit<Blog, "id">) => {
    const updatedBlogs = blogs.map((blog) => (blog.id === id ? { ...blog, ...blogData } : blog))
    setBlogs(updatedBlogs)
    saveToLocalStorage(updatedBlogs)
  }

  const deleteBlog = (id: number) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(updatedBlogs)
    saveToLocalStorage(updatedBlogs)
  }

  const getBlogById = (id: number) => {
    return blogs.find((blog) => blog.id === id)
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
