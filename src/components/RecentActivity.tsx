'use client'

import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Shield, 
  PlusCircle,
  AlertCircle,
  Zap,
  Activity,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react'

interface ActivityItem {
  id: number
  text: string
  time: string
  icon: string
  type: 'success' | 'progress' | 'money' | 'security' | 'add' | 'alert' | 'quick' | 'default'
}

interface RecentActivityProps {
  activities?: ActivityItem[]
}

const iconMap: Record<string, React.ElementType> = {
  '✓': CheckCircle2,
  '🔧': Zap,
  '💰': DollarSign,
  '✅': Shield,
  '➕': PlusCircle,
  '⚠️': AlertCircle,
  '🔄': Clock,
  '⚡': Activity,
  '📋': Activity,
  '🔵': Clock,
  '🟢': CheckCircle2,
  '🟡': Clock,
  '🔴': AlertCircle
}

const typeColors = {
  success: {
    bg: 'bg-emerald-100',
    icon: 'text-emerald-600',
    border: 'border-emerald-200',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  progress: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-400 to-blue-600'
  },
  money: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'from-purple-400 to-purple-600'
  },
  security: {
    bg: 'bg-teal-100',
    icon: 'text-teal-600',
    border: 'border-teal-200',
    gradient: 'from-teal-400 to-teal-600'
  },
  add: {
    bg: 'bg-orange-100',
    icon: 'text-orange-600',
    border: 'border-orange-200',
    gradient: 'from-orange-400 to-orange-600'
  },
  alert: {
    bg: 'bg-red-100',
    icon: 'text-red-600',
    border: 'border-red-200',
    gradient: 'from-red-400 to-red-600'
  },
  quick: {
    bg: 'bg-indigo-100',
    icon: 'text-indigo-600',
    border: 'border-indigo-200',
    gradient: 'from-indigo-400 to-indigo-600'
  },
  default: {
    bg: 'bg-slate-100',
    icon: 'text-slate-600',
    border: 'border-slate-200',
    gradient: 'from-slate-400 to-slate-600'
  }
}

const defaultActivities: ActivityItem[] = [
  { id: 1, text: '3. Kat tesviye işi tamamlandı', time: '10 dakika önce', icon: '✓', type: 'success' },
  { id: 2, text: '2. Kat mekanik tesisat başladı', time: '1 saat önce', icon: '🔧', type: 'progress' },
  { id: 3, text: 'Maliyet girişi: 45.000 ₺', time: '2 saat önce', icon: '💰', type: 'money' },
  { id: 4, text: 'Bodrum kat izolasyon onaylandı', time: '3 saat önce', icon: '✅', type: 'security' },
  { id: 5, text: 'Yeni iş eklendi: 4. Kat sıva', time: '5 saat önce', icon: '➕', type: 'add' },
  { id: 6, text: 'Elektrik malzemesi tedarikçi onayı', time: '6 saat önce', icon: '⚠️', type: 'alert' },
  { id: 7, text: '2. Kat ara muayene raporu', time: '8 saat önce', icon: '📋', type: 'quick' }
]

export default function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Son Aktiviteler</h3>
            <p className="text-xs text-slate-500">Son 24 saat</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
          <MoreHorizontal className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {activities.map((activity, index) => {
          const IconComponent = iconMap[activity.icon] || Activity
          const colors = typeColors[activity.type]
          
          return (
            <div 
              key={activity.id} 
              className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
            >
              <div className={`relative`}>
                <div className={`p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                  <IconComponent className={`w-4 h-4 ${colors.icon}`} />
                </div>
                {/* Timeline dot */}
                {index < activities.length - 1 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-4 bg-slate-200 mt-1" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 pt-1">
                <p className="font-medium text-slate-800 text-sm leading-snug group-hover:text-slate-900 transition-colors">
                  {activity.text}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all">
          Tüm Aktiviteleri Gör
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
