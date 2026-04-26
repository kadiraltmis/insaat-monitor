'use client'

import Link from 'next/link'
import { ArrowLeft, Home, CheckCircle2, Clock, Circle, Edit, Plus, Building2, ArrowRight, DollarSign, Users, FileText } from 'lucide-react'
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
    icon: CheckCircle2,
    gradient: 'from-emerald-400 to-emerald-600'
  },
  'in-progress': {
    label: 'Devam Ediyor',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: Clock,
    gradient: 'from-amber-400 to-amber-600'
  },
  pending: {
    label: 'Bekliyor',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    icon: Circle,
    gradient: 'from-slate-400 to-slate-600'
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
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Link href="/">
          <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 z-40 flex flex-col shadow-2xl">
            {/* Gradient Header */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800" />
              <div className="absolute inset-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-lg tracking-tight">İnşaat Monitör</h1>
                    <p className="text-teal-200 text-xs mt-0.5">Kadir Apartmanı</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </div>

            {/* Progress in Sidebar */}
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
                <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-300 rounded-full" style={{ width: '68%' }} />
              </div>
              <p className="text-slate-400 text-xs text-right">68% tamamlandı</p>
            </div>

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
          </div>
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 flex items-center gap-4 sticky top-0 z-30">
          <Link href="/" className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors group">
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Home className="w-4 h-4" />
            <span className="text-slate-300">/</span>
            <Link href="/" className="hover:text-teal-600 transition-colors">Katlar</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium">{floor.name}</span>
          </div>
        </header>
        
        <main className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-slate-800">
                  {floor.name}
                </h1>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} ${status.border} border`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{status.label}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{floor.units} daire</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>{(floor.cost / 1000).toFixed(0)}K ₺ toplam maliyet</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Rapor</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-500/25">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Daire Ekle</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Daire Sayısı</p>
                  <p className="text-2xl font-bold text-slate-800">{floor.units}</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tamamlanan</p>
                  <p className="text-2xl font-bold text-emerald-600">{floor.completed}</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Toplam İş</p>
                  <p className="text-2xl font-bold text-slate-800">{floor.total}</p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Maliyet</p>
                  <p className="text-2xl font-bold text-slate-800">{(floor.cost / 1000).toFixed(0)}K ₺</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Genel İlerleme</h2>
                <p className="text-sm text-slate-500 mt-1">{floor.completed}/{floor.total} iş tamamlandı</p>
              </div>
              <div className="flex items-center gap-6">
                <ProgressRing 
                  percentage={percentage} 
                  size={100} 
                  strokeWidth={8}
                  color={color}
                />
                <div>
                  <div className="text-4xl font-bold text-slate-800 mb-1">{percentage}%</div>
                  <div className="text-sm text-slate-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
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
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-sm font-medium">
                <Edit className="w-4 h-4" />
                Düzenle
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {floor.apartments.map((apt) => {
                const aptStatus = statusConfig[apt.status]
                const AptStatusIcon = aptStatus.icon
                return (
                  <div 
                    key={apt.id} 
                    className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative"
                  >
                    {/* Top accent */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                      style={{ backgroundColor: color }}
                    />
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-xl">{apt.number}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-slate-500">{apt.type}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-sm text-slate-500">{apt.area} m²</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${aptStatus.bg} ${aptStatus.text} ${aptStatus.border} border`}>
                        <AptStatusIcon className="w-3 h-3" />
                        <span>{aptStatus.label}</span>
                      </div>
                    </div>
                    
                    {/* Progress Ring */}
                    <div className="flex items-center justify-center mb-4 py-2">
                      <ProgressRing 
                        percentage={apt.progress} 
                        size={90} 
                        strokeWidth={7}
                        color={color}
                        label={`${apt.progress}%`}
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Maliyet:</span>
                        <span className="font-semibold text-slate-700">{apt.cost.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <div className="flex items-center gap-2">
              {Object.keys(floorData).map((key, index) => (
                <Link 
                  key={key}
                  href={`/kat/${key}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    key === params.id 
                      ? 'bg-teal-600 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={floorData[key].name}
                />
              ))}
            </div>

            <div className="text-sm text-slate-500">
              {Object.keys(floorData).indexOf(params.id as string) + 1} / {Object.keys(floorData).length}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
