'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendDirection?: 'up' | 'down'
  prefix?: string
  suffix?: string
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection = 'up',
  prefix = '',
  suffix = ''
}: StatCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            {prefix && <span className="text-xl font-semibold text-slate-400">{prefix}</span>}
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            {suffix && <span className="text-xl font-semibold text-slate-400">{suffix}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${
              trendDirection === 'up' ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {trendDirection === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg shadow-teal-200/50 group-hover:shadow-teal-300/50 transition-shadow">
          {icon}
        </div>
      </div>
    </div>
  )
}
