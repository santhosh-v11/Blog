import type React from "react"
import "./globals.css"
import { BlogProvider } from "./context/BlogContext"
import Navigation from "./components/Navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BlogProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </BlogProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
