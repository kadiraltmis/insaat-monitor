'use client'

import { Search, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">İnşaat Monitör</h1>
        <p className="text-gray-500">Kadir Apartmanı — 20 Daire</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ara..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button className="relative p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}
