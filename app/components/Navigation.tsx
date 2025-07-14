"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            My Blog
          </Link>
          <div className="flex gap-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === "/" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/add"
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === "/add" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Add Post
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
