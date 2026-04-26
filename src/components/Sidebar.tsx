'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Wallet,
  FileText,
  Settings,
  ChevronRight,
  HardHat
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/kat/bodrum', label: 'Katlar', icon: Building2 },
  { href: '/isler/ekle', label: 'İşler', icon: ClipboardList },
  { href: '/maliyet/ekle', label: 'Maliyet', icon: Wallet },
  { href: '/raporlar', label: 'Raporlar', icon: FileText },
  { href: '/ayarlar', label: 'Ayarlar', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-800 z-40 flex flex-col shadow-2xl">
      {/* Gradient Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight">İnşaat Monitör</h1>
              <p className="text-teal-200 text-xs mt-0.5">Kadir Apartmanı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Ana Menü
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href))
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
              )}
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-white/70" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Project Stats in Sidebar */}
      <div className="p-4 mx-4 mb-4 bg-white/5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">İlerleme</p>
            <p className="text-slate-400 text-xs">Bu ay</p>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-300 rounded-full transition-all duration-500" style={{ width: '68%' }} />
        </div>
        <p className="text-slate-400 text-xs text-right">68% tamamlandı</p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Versiyon</p>
            <p className="font-semibold text-slate-200 text-sm">v1.0.0</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400">Aktif</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
