"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Blog } from "../context/BlogContext"

interface BlogFormProps {
  initialData?: Blog
  onSubmit: (data: Omit<Blog, "id">) => void
  onCancel: () => void
}

export default function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=200&width=400",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        image: initialData.image,
        date: initialData.date,
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
          placeholder="Enter blog post title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          required
          placeholder="Enter blog post description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          className="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date *
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Post" : "Create Post"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}
