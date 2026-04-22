'use client'

import { Search, Bell, Plus, Calendar, Menu } from 'lucide-react'
import { useState } from 'react'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left side - Mobile menu + Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ara..."
            className="pl-12 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Center - Date */}
      <div className="hidden lg:flex items-center gap-2 text-slate-500">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{currentDate}</span>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Hızlı Ekle</span>
        </button>
        
        <button className="relative p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="flex items-center gap-3 p-1.5 pl-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">K</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-slate-800 text-sm leading-none">Kadir</p>
            <p className="text-xs text-slate-500 leading-none mt-0.5">Yönetici</p>
          </div>
        </button>
      </div>
    </header>
  )
}
