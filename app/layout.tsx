import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "the wu lab - Handcrafted Energy Jewelry",
  description: "Discover handcrafted energy jewelry and BaZi analysis",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">the wu lab</h1>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
