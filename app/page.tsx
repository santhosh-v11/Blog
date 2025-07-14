"use client"

import Link from "next/link"
import { useBlog } from "./context/BlogContext"
import BlogCard from "./components/BlogCard"

export default function HomePage() {
  const { blogs, deleteBlog } = useBlog()

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-title">Latest Blog Posts</h1>
        <Link href="/add" className="btn btn-primary">
          Add New Post
        </Link>
      </div>

      {sortedBlogs.length > 0 ? (
        <div className="card-grid">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No blog posts yet</h3>
          <p>Start by creating your first blog post!</p>
          <Link href="/add" className="btn btn-primary mt-4 inline-block">
            Create First Post
          </Link>
        </div>
      )}
    </div>
  )
}
