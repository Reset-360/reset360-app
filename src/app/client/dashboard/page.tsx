'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { logoutUser } from '@/services/authService'
import { useRouter } from 'next/navigation'

export default function ClientDashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();

    router.replace('/login');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      {/* Top Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand */}
          <h1 className="text-2xl font-zain font-bold text-violet-600">Reset360</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-violet-600 font-medium">
              Dashboard
            </button>
            <button className="text-gray-700 hover:text-violet-600 font-medium">
              Sessions
            </button>
            <button className="text-gray-700 hover:text-violet-600 font-medium">
              Profile
            </button>

            {/* Avatar Placeholder */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-semibold cursor-pointer hover:bg-violet-300 transition">
                JD
              </div>
              {/* Dropdown (optional) */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <button className="block w-full text-left px-6 py-3 hover:bg-violet-50">
              Dashboard
            </button>
            <button className="block w-full text-left px-6 py-3 hover:bg-violet-50">
              Sessions
            </button>
            <button className="block w-full text-left px-6 py-3 hover:bg-violet-50">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-3 hover:bg-red-50 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome back, Jane!</h2>
        <p className="text-gray-600 mb-8">
          Here’s a quick overview of your recent activity and progress.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-violet-600 mb-2">ADAPTS Score</h3>
            <p className="text-4xl font-bold text-gray-900">82</p>
            <p className="text-sm text-gray-500 mt-2">Last updated 3 days ago</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-violet-600 mb-2">Next Session</h3>
            <p className="text-gray-800 font-medium">October 15, 2025 - 3:00 PM</p>
            <p className="text-sm text-gray-500 mt-2">with Coach Maria</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-violet-600 mb-2">Total Sessions</h3>
            <p className="text-4xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500 mt-2">Keep up the progress!</p>
          </div>
        </div>
      </main>
    </div>
  )
}
