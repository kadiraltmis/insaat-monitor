'use client'

import { TrendingUp, TrendingDown, Home, CheckCircle2, Clock, Wallet } from 'lucide-react'
import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: string
  trendDirection?: 'up' | 'down'
  prefix?: string
  suffix?: string
  variant?: 'teal' | 'blue' | 'purple' | 'orange'
}

const variantConfig = {
  teal: {
    gradient: 'from-teal-500 to-teal-600',
    shadow: 'shadow-teal-500/25',
    hoverShadow: 'hover:shadow-teal-500/40',
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    ring: 'ring-teal-100'
  },
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/25',
    hoverShadow: 'hover:shadow-blue-500/40',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    ring: 'ring-blue-100'
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/25',
    hoverShadow: 'hover:shadow-purple-500/40',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    ring: 'ring-purple-100'
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/25',
    hoverShadow: 'hover:shadow-orange-500/40',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    ring: 'ring-orange-100'
  }
}

const defaultIcons = {
  teal: <Home className="w-6 h-6 text-white" />,
  blue: <CheckCircle2 className="w-6 h-6 text-white" />,
  purple: <Clock className="w-6 h-6 text-white" />,
  orange: <Wallet className="w-6 h-6 text-white" />
}

export default function StatCard({ 
  title, 
  value, 
  icon,
  trend, 
  trendDirection = 'up',
  prefix = '',
  suffix = '',
  variant = 'teal'
}: StatCardProps) {
  const config = variantConfig[variant]
  const displayIcon = icon || defaultIcons[variant]

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="flex items-start justify-between relative">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-1 mt-3">
            {prefix && <span className="text-lg font-semibold text-slate-400">{prefix}</span>}
            <p className="text-4xl font-bold text-slate-800 tracking-tight">{value}</p>
            {suffix && <span className="text-lg font-semibold text-slate-400">{suffix}</span>}
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1.5 mt-4 text-sm font-semibold ${
              trendDirection === 'up' ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {trendDirection === 'up' ? (
                <div className="p-1 bg-emerald-100 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1 bg-red-100 rounded-full">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
              )}
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className={`p-4 bg-gradient-to-br ${config.gradient} rounded-2xl ${config.shadow} group-hover:${config.hoverShadow} transition-shadow`}>
          {displayIcon}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className={`absolute bottom-0 right-0 w-20 h-20 ${config.bg} rounded-full -translate-y-1/2 translate-x-1/2 opacity-50`} />
    </div>
  )
}
