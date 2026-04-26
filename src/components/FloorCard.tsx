'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Circle, Building2 } from 'lucide-react'
import ProgressRing from './ProgressRing'

interface Floor {
  id: string
  name: string
  completed: number
  total: number
  status: 'completed' | 'in-progress' | 'pending'
}

interface FloorCardProps {
  floor: Floor
  index: number
}

const floorColors = [
  { ring: '#0D9488', bg: '#CCFBF1', gradient: 'from-teal-400 to-teal-600', border: 'border-teal-200' },
  { ring: '#2563EB', bg: '#DBEAFE', gradient: 'from-blue-400 to-blue-600', border: 'border-blue-200' },
  { ring: '#7C3AED', bg: '#EDE9FE', gradient: 'from-purple-400 to-purple-600', border: 'border-purple-200' },
  { ring: '#EA580C', bg: '#FED7AA', gradient: 'from-orange-400 to-orange-600', border: 'border-orange-200' },
  { ring: '#DB2777', bg: '#FCE7F3', gradient: 'from-pink-400 to-pink-600', border: 'border-pink-200' }
]

const statusConfig = {
  completed: {
    label: 'Tamamlandı',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: CheckCircle2,
    border: 'border-emerald-200'
  },
  'in-progress': {
    label: 'Devam Ediyor',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: Clock,
    border: 'border-amber-200'
  },
  pending: {
    label: 'Bekliyor',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    icon: Circle,
    border: 'border-slate-200'
  }
}

export default function FloorCard({ floor, index }: FloorCardProps) {
  const percentage = floor.total > 0 ? Math.round((floor.completed / floor.total) * 100) : 0
  const colorScheme = floorColors[index % floorColors.length]
  const status = statusConfig[floor.status]
  const StatusIcon = status.icon

  return (
    <Link href={`/kat/${floor.id}`} className="block">
      <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Gradient accent on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${colorScheme.gradient} rounded-l-2xl`} />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorScheme.gradient} shadow-lg`}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 transition-colors">
                {floor.name}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {floor.completed}/{floor.total} iş tamamlandı
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text} ${status.border} border`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex items-center gap-5 mb-4">
          <ProgressRing 
            percentage={percentage} 
            size={80} 
            strokeWidth={7}
            color={colorScheme.ring}
            bgColor={colorScheme.bg}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-500">İlerleme</span>
              <span className="font-bold text-slate-800">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full bg-gradient-to-r ${colorScheme.gradient} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`} />
              <span className="text-xs text-slate-500">5 daire</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-xs text-slate-500">
              {floor.id === 'bodrum' ? 'Bodrum' : `${floor.id}. Kat`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-xs font-semibold">Detaylar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
