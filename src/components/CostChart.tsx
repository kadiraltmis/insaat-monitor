'use client'

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'

interface CostData {
  name: string
  value: number
  color: string
}

interface TrendData {
  month: string
  planned: number
  actual: number
}

interface CostChartProps {
  data?: CostData[]
  trendData?: TrendData[]
}

const defaultData: CostData[] = [
  { name: 'İşçilik', value: 35, color: '#0D9488' },
  { name: 'Malzeme', value: 45, color: '#2563EB' },
  { name: 'Makine', value: 12, color: '#7C3AED' },
  { name: 'Diğer', value: 8, color: '#EA580C' },
]

const defaultTrendData: TrendData[] = [
  { month: 'Oca', planned: 180000, actual: 175000 },
  { month: 'Şub', planned: 200000, actual: 210000 },
  { month: 'Mar', planned: 220000, actual: 235000 },
  { month: 'Nis', planned: 250000, actual: 245000 },
  { month: 'May', planned: 280000, actual: 290000 },
  { month: 'Haz', planned: 300000, actual: 315000 },
]

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
        <p className="font-bold text-slate-800 mb-1">{payload[0].name}</p>
        <p className="text-lg font-bold text-slate-900">
          {payload[0].value.toLocaleString('tr-TR')}%
        </p>
      </div>
    )
  }
  return null
}

export default function CostChart({ data = defaultData, trendData = defaultTrendData }: CostChartProps) {
  const totalSpend = 2450000 // Mock total
  const budget = 2800000
  const percentUsed = Math.round((totalSpend / budget) * 100)
  
  const trend = totalSpend > budget ? 'over' : 'under'
  const diff = Math.abs(budget - totalSpend)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Maliyet Özeti</h3>
            <p className="text-xs text-slate-500">Bütçe kullanım oranı</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            trend === 'under' 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {trend === 'under' ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5" />
            )}
            <span>Bütçe {trend === 'under' ? 'altında' : 'üstünde'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400">
                  <Percent className="w-4 h-4" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{percentUsed}%</p>
                <p className="text-xs text-slate-500">Kullanıldı</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600">{item.name}</span>
                <span className="text-sm font-semibold text-slate-800 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">Toplam Bütçe</span>
              <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded-lg">2026</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">₺{budget.toLocaleString('tr-TR')}</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-teal-600">Harcama</span>
              <span className="text-xs text-teal-500 bg-white px-2 py-1 rounded-lg">Bu ay</span>
            </div>
            <p className="text-2xl font-bold text-teal-700">₺{totalSpend.toLocaleString('tr-TR')}</p>
          </div>

          <div className={`bg-gradient-to-br rounded-2xl p-5 ${
            trend === 'under' 
              ? 'from-emerald-50 to-emerald-100/50' 
              : 'from-red-50 to-red-100/50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${
                trend === 'under' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {trend === 'under' ? 'Tasarruf' : 'Aşım'}
              </span>
              <span className={`text-xs px-2 py-1 rounded-lg ${
                trend === 'under' 
                  ? 'text-emerald-500 bg-white' 
                  : 'text-red-500 bg-white'
              }`}>
                {Math.round((1 - percentUsed / 100) * 100)}%
              </span>
            </div>
            <p className={`text-2xl font-bold ${
              trend === 'under' ? 'text-emerald-700' : 'text-red-700'
            }`}>
              ₺{diff.toLocaleString('tr-TR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
