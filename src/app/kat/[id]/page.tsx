'use client'

import Link from 'next/link'
import { ArrowLeft, Home, CheckCircle2, Clock, Circle, Edit, Plus } from 'lucide-react'
import ProgressRing from '@/components/ProgressRing'

// Mock veriler
const floorData: Record<string, {
  name: string
  completed: number
  total: number
  units: number
  cost: number
  status: 'completed' | 'in-progress' | 'pending'
  apartments: Array<{
    id: number
    number: string
    type: '3+1' | '2+1'
    area: number
    progress: number
    cost: number
    status: 'completed' | 'in-progress' | 'pending'
  }>
}> = {
  bodrum: {
    name: 'Bodrum Kat',
    completed: 12,
    total: 40,
    units: 4,
    cost: 450000,
    status: 'in-progress',
    apartments: [
      { id: 1, number: 'B-01', type: '2+1', area: 85, progress: 100, cost: 85000, status: 'completed' },
      { id: 2, number: 'B-02', type: '3+1', area: 120, progress: 75, cost: 120000, status: 'in-progress' },
      { id: 3, number: 'B-03', type: '2+1', area: 85, progress: 60, cost: 85000, status: 'in-progress' },
      { id: 4, number: 'B-04', type: '3+1', area: 120, progress: 30, cost: 120000, status: 'in-progress' },
    ]
  },
  '1': {
    name: '1. Kat',
    completed: 50,
    total: 50,
    units: 5,
    cost: 520000,
    status: 'completed',
    apartments: [
      { id: 1, number: '101', type: '3+1', area: 125, progress: 100, cost: 125000, status: 'completed' },
      { id: 2, number: '102', type: '2+1', area: 90, progress: 100, cost: 90000, status: 'completed' },
      { id: 3, number: '103', type: '3+1', area: 125, progress: 100, cost: 125000, status: 'completed' },
      { id: 4, number: '104', type: '2+1', area: 90, progress: 100, cost: 90000, status: 'completed' },
      { id: 5, number: '105', type: '3+1', area: 125, progress: 100, cost: 125000, status: 'completed' },
    ]
  },
  '2': {
    name: '2. Kat',
    completed: 35,
    total: 60,
    units: 5,
    cost: 580000,
    status: 'in-progress',
    apartments: [
      { id: 1, number: '201', type: '3+1', area: 125, progress: 100, cost: 125000, status: 'completed' },
      { id: 2, number: '202', type: '2+1', area: 90, progress: 80, cost: 90000, status: 'in-progress' },
      { id: 3, number: '203', type: '3+1', area: 125, progress: 70, cost: 125000, status: 'in-progress' },
      { id: 4, number: '204', type: '2+1', area: 90, progress: 50, cost: 90000, status: 'in-progress' },
      { id: 5, number: '205', type: '3+1', area: 125, progress: 20, cost: 125000, status: 'in-progress' },
    ]
  },
  '3': {
    name: '3. Kat',
    completed: 28,
    total: 70,
    units: 5,
    cost: 610000,
    status: 'in-progress',
    apartments: [
      { id: 1, number: '301', type: '3+1', area: 125, progress: 80, cost: 125000, status: 'in-progress' },
      { id: 2, number: '302', type: '2+1', area: 90, progress: 60, cost: 90000, status: 'in-progress' },
      { id: 3, number: '303', type: '3+1', area: 125, progress: 40, cost: 125000, status: 'in-progress' },
      { id: 4, number: '304', type: '2+1', area: 90, progress: 30, cost: 90000, status: 'pending' },
      { id: 5, number: '305', type: '3+1', area: 125, progress: 10, cost: 125000, status: 'pending' },
    ]
  },
  '4': {
    name: '4. Kat',
    completed: 20,
    total: 60,
    units: 5,
    cost: 590000,
    status: 'pending',
    apartments: [
      { id: 1, number: '401', type: '3+1', area: 125, progress: 0, cost: 125000, status: 'pending' },
      { id: 2, number: '402', type: '2+1', area: 90, progress: 0, cost: 90000, status: 'pending' },
      { id: 3, number: '403', type: '3+1', area: 125, progress: 0, cost: 125000, status: 'pending' },
      { id: 4, number: '404', type: '2+1', area: 90, progress: 0, cost: 90000, status: 'pending' },
      { id: 5, number: '405', type: '3+1', area: 125, progress: 0, cost: 125000, status: 'pending' },
    ]
  }
}

const statusConfig = {
  completed: {
    label: 'Tamamlandı',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: CheckCircle2
  },
  'in-progress': {
    label: 'Devam Ediyor',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: Clock
  },
  pending: {
    label: 'Bekliyor',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    icon: Circle
  }
}

const floorColors = ['#0D9488', '#2563EB', '#7C3AED', '#EA580C', '#DB2777']

export default function FloorDetailPage({ params }: { params: { id: string } }) {
  const floor = floorData[params.id as string] || floorData.bodrum
  const percentage = floor.total > 0 ? Math.round((floor.completed / floor.total) * 100) : 0
  const colorIndex = Object.keys(floorData).indexOf(params.id as string)
  const color = floorColors[colorIndex] || floorColors[0]
  const status = statusConfig[floor.status]
  const StatusIcon = status.icon

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Link href="/">
          <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-40 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-800 text-lg">İnşaat Monitör</h1>
                  <p className="text-xs text-slate-500">Kadir Apartmanı</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex-1">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-200"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span>Katlar</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">{floor.name}</span>
          </div>
        </header>
        
        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
                  {floor.name}
                </h1>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text} ${status.border} border`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{status.label}</span>
                </div>
              </div>
              <p className="text-slate-500">
                {floor.units} daire — {floor.cost.toLocaleString('tr-TR')} ₺ toplam maliyet
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Daire Ekle</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-100 rounded-xl">
                  <Home className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Daire Sayısı</p>
                  <p className="text-xl font-bold text-slate-800">{floor.units}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tamamlanan</p>
                  <p className="text-xl font-bold text-emerald-600">{floor.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Toplam İş</p>
                  <p className="text-xl font-bold text-slate-800">{floor.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-100 rounded-xl">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Maliyet</p>
                  <p className="text-xl font-bold text-slate-800">{(floor.cost / 1000).toFixed(0)}K ₺</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Genel İlerleme</h2>
                <p className="text-sm text-slate-500 mt-1">{floor.completed}/{floor.total} iş tamamlandı</p>
              </div>
              <ProgressRing 
                percentage={percentage} 
                size={100} 
                strokeWidth={8}
                color={color}
              />
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
          </div>

          {/* Apartments Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Daireler</h2>
                <p className="text-sm text-slate-500 mt-1">{floor.units} daire listesi</p>
              </div>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Düzenle
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {floor.apartments.map((apt) => {
                const aptStatus = statusConfig[apt.status]
                const AptStatusIcon = aptStatus.icon
                return (
                  <div 
                    key={apt.id} 
                    className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{apt.number}</h3>
                        <p className="text-sm text-slate-500">{apt.type}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${aptStatus.bg} ${aptStatus.text} ${aptStatus.border} border`}>
                        <AptStatusIcon className="w-3 h-3" />
                        <span>{aptStatus.label}</span>
                      </div>
                    </div>
                    
                    {/* Progress Ring */}
                    <div className="flex items-center justify-center mb-4">
                      <ProgressRing 
                        percentage={apt.progress} 
                        size={80} 
                        strokeWidth={6}
                        color={color}
                        label={`${apt.progress}%`}
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Alan:</span>
                        <span className="font-medium text-slate-700">{apt.area} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Maliyet:</span>
                        <span className="font-medium text-slate-700">{apt.cost.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
