'use client'

import Link from 'next/link'
import { Home, CheckCircle2, ArrowRight, TrendingUp, Building2, Users, Calendar } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import StatCard from '@/components/StatCard'
import FloorCard from '@/components/FloorCard'
import RecentActivity from '@/components/RecentActivity'
import CostChart from '@/components/CostChart'

// Mock veriler
const stats = {
  totalUnits: 20,
  completed: 145,
  inProgress: 98,
  totalCost: 2.45
}

const floors = [
  { id: 'bodrum', name: 'Bodrum Kat', completed: 12, total: 40, status: 'in-progress' as const },
  { id: '1', name: '1. Kat', completed: 50, total: 50, status: 'completed' as const },
  { id: '2', name: '2. Kat', completed: 35, total: 60, status: 'in-progress' as const },
  { id: '3', name: '3. Kat', completed: 28, total: 70, status: 'in-progress' as const },
  { id: '4', name: '4. Kat', completed: 20, total: 60, status: 'pending' as const },
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <TopBar />
        
        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
              <span className="text-slate-300">/</span>
              <span className="text-teal-600 font-medium">Genel Bakış</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
                  Kadir Apartmanı
                </h1>
                <p className="text-slate-500 mt-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>20 daireli apartman inşaatı — Genel görünüm</span>
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">26 Nisan 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Toplam Birim"
              value={stats.totalUnits}
              icon={<Building2 className="w-6 h-6 text-white" />}
              variant="teal"
            />
            <StatCard
              title="Tamamlanan İş"
              value={stats.completed}
              icon={<CheckCircle2 className="w-6 h-6 text-white" />}
              trend="+%12 bu ay"
              trendDirection="up"
              variant="blue"
            />
            <StatCard
              title="Devam Eden"
              value={stats.inProgress}
              icon={
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              variant="purple"
            />
            <StatCard
              title="Toplam Maliyet"
              value={stats.totalCost.toFixed(2)}
              prefix="₺"
              suffix="M"
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              trend="+%8 bu ay"
              trendDirection="up"
              variant="orange"
            />
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">5</p>
                <p className="text-xs text-slate-500">Kat</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">45%</p>
                <p className="text-xs text-slate-500">Genel İlerleme</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-xs text-slate-500">Aktif İşçi</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">₺2.45M</p>
                <p className="text-xs text-slate-500">Toplam Harcama</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Floor Cards - Takes 2 columns */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Kat Bazlı İlerleme</h2>
                  <p className="text-sm text-slate-500 mt-1">Her katın tamamlanma oranı ve durumu</p>
                </div>
                <Link 
                  href="/kat/bodrum" 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25 text-sm font-medium"
                >
                  Tüm Katlar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {floors.map((floor, index) => (
                  <FloorCard key={floor.id} floor={floor} index={index} />
                ))}
              </div>
            </div>

            {/* Recent Activity - Takes 1 column */}
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Cost Chart */}
          <CostChart />

          {/* Quick Actions Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/isler/ekle" className="group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-teal-500/25 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">Yeni İş Ekle</p>
                    <p className="text-teal-100 text-sm mt-1">Görev ve iş tanımlayın</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/maliyet/ekle" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">Maliyet Girişi</p>
                    <p className="text-blue-100 text-sm mt-1">Harcama kaydedin</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/raporlar" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">Rapor Oluştur</p>
                    <p className="text-purple-100 text-sm mt-1">Özet ve detay raporları</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
