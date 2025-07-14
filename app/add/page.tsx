"use client"

import { useRouter } from "next/navigation"
import { useBlog } from "../context/BlogContext"
import BlogForm from "../components/BlogForm"

export default function AddPage() {
  const router = useRouter()
  const { addBlog } = useBlog()

  const handleSubmit = (blogData: any) => {
    addBlog(blogData)
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  return (
    <div>
      <h1 className="page-title">Add New Blog Post</h1>

      <div className="form-container">
        <BlogForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
