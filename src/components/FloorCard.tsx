'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react'
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
  { ring: '#0D9488', bg: '#CCFBF1' },
  { ring: '#2563EB', bg: '#DBEAFE' },
  { ring: '#7C3AED', bg: '#EDE9FE' },
  { ring: '#EA580C', bg: '#FED7AA' },
  { ring: '#DB2777', bg: '#FCE7F3' }
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
    bg: 'bg-slate-50',
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
    <Link href={`/kat/${floor.id}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <ProgressRing 
              percentage={percentage} 
              size={70} 
              strokeWidth={6}
              color={colorScheme.ring}
              bgColor={colorScheme.bg}
            />
            <div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors">
                {floor.name}
              </h3>
              <p className="text-sm text-slate-500">{floor.completed}/{floor.total} iş</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text} ${status.border} border`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: colorScheme.ring
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Tamamlanma: {percentage}%</span>
          <div className="flex items-center gap-1 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium">Detaylar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
