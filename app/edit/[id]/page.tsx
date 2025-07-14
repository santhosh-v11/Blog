"use client"

import { useRouter } from "next/navigation"
import { useBlog } from "../../context/BlogContext"
import BlogForm from "../../components/BlogForm"
import Link from "next/link"

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getBlogById, updateBlog } = useBlog()

  const blog = getBlogById(Number.parseInt(params.id))

  const handleSubmit = (blogData: any) => {
    updateBlog(Number.parseInt(params.id), blogData)
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/")
  }

  if (!blog) {
    return (
      <div>
        <h1 className="page-title">Edit Blog Post</h1>
        <div className="empty-state">
          <h3>Blog post not found</h3>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/" className="btn btn-primary mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Edit Blog Post</h1>

      <div className="form-container">
        <BlogForm initialData={blog} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
