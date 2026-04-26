'use client'

import { Search, Bell, Plus, Calendar, Menu, Moon, Sun } from 'lucide-react'
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
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left side - Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="relative hidden md:block group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Daire, kat veya iş ara..."
              className="pl-12 pr-4 py-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Center - Project Name & Date */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="text-center">
          <h2 className="font-bold text-slate-800 text-sm">Kadir Apartmanı</h2>
          <div className="flex items-center gap-2 text-slate-500 mt-0.5">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">{currentDate}</span>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Hızlı Ekle</span>
        </button>
        
        <button className="relative p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
          <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>

        <button className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors hidden sm:block">
          <Moon className="w-5 h-5 text-slate-600" />
        </button>
        
        <button className="flex items-center gap-3 p-1.5 pl-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-500 via-teal-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div className="hidden sm:block pr-2">
            <p className="font-semibold text-slate-800 text-sm leading-none">Kadir</p>
            <p className="text-xs text-slate-500 leading-none mt-0.5">Yönetici</p>
          </div>
        </button>
      </div>
    </header>
  )
}
