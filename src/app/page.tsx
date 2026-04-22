'use client'

import Link from 'next/link'
import { Home, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react'
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
    <div className="flex min-h-screen bg-slate-50">
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
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Kadir Apartmanı
            </h1>
            <p className="text-slate-500 mt-1">
              20 daireli apartman inşaatı — Genel görünüm
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <StatCard
              title="Toplam Birim"
              value={stats.totalUnits}
              icon={<Home className="w-6 h-6 text-white" />}
            />
            <StatCard
              title="Tamamlanan İş"
              value={stats.completed}
              icon={<CheckCircle2 className="w-6 h-6 text-white" />}
              trend="+%12 bu ay"
              trendDirection="up"
            />
            <StatCard
              title="Devam Eden"
              value={stats.inProgress}
              icon={
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            />
            <StatCard
              title="Toplam Maliyet"
              value={stats.totalCost.toFixed(2)}
              prefix="₺"
              suffix="M"
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              trend="+%8 bu ay"
              trendDirection="up"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Floor Cards - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Kat Bazlı İlerleme</h2>
                  <p className="text-sm text-slate-500 mt-1">Her katın tamamlanma oranı</p>
                </div>
                <Link 
                  href="/kat/bodrum" 
                  className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Tüm Katlar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Quick Stats Footer */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-teal-600">4</p>
              <p className="text-sm text-slate-500 mt-1">Kat</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">45%</p>
              <p className="text-sm text-slate-500 mt-1">Genel İlerleme</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-slate-500 mt-1">Aktif İşçi</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">₺2.45M</p>
              <p className="text-sm text-slate-500 mt-1">Toplam Harcama</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
