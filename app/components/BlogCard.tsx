"use client"

import Link from "next/link"
import type { Blog } from "../context/BlogContext"

interface BlogCardProps {
  blog: Blog
  onDelete: (id: number) => void
}

export default function BlogCard({ blog, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      onDelete(blog.id)
    }
  }

  return (
    <article className="card">
      <img
        src={blog.image || "/placeholder.svg"}
        alt={blog.title}
        className="card-image"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg?height=200&width=400"
        }}
      />

      <div className="card-content">
        <h2 className="card-title">{blog.title}</h2>
        <p className="card-description">{blog.description}</p>
        <time className="card-date">{formatDate(blog.date)}</time>

        <div className="card-actions">
          <Link href={`/edit/${blog.id}`} className="btn btn-secondary btn-small">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger btn-small">
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
