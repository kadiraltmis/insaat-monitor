'use client'

import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Shield, 
  PlusCircle,
  AlertCircle,
  Zap,
  Activity
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
    border: 'border-emerald-200'
  },
  progress: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    border: 'border-blue-200'
  },
  money: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    border: 'border-purple-200'
  },
  security: {
    bg: 'bg-teal-100',
    icon: 'text-teal-600',
    border: 'border-teal-200'
  },
  add: {
    bg: 'bg-orange-100',
    icon: 'text-orange-600',
    border: 'border-orange-200'
  },
  alert: {
    bg: 'bg-red-100',
    icon: 'text-red-600',
    border: 'border-red-200'
  },
  quick: {
    bg: 'bg-indigo-100',
    icon: 'text-indigo-600',
    border: 'border-indigo-200'
  },
  default: {
    bg: 'bg-slate-100',
    icon: 'text-slate-600',
    border: 'border-slate-200'
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
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-800 text-lg">Son Aktiviteler</h3>
        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          Tümünü Gör
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const IconComponent = iconMap[activity.icon] || Activity
          const colors = typeColors[activity.type]
          const isLast = index === activities.length - 1
          
          return (
            <div 
              key={activity.id} 
              className={`flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors ${isLast ? '' : 'border-b border-gray-50'}`}
            >
              <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.border} border`}>
                <IconComponent className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 text-sm leading-snug">
                  {activity.text}
                </p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
