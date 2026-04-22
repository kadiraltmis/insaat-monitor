'use client'

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'

interface CostData {
  month: string
  planned: number
  actual: number
  labor: number
  material: number
}

interface CostChartProps {
  data?: CostData[]
  type?: 'area' | 'bar'
}

const defaultData: CostData[] = [
  { month: 'Oca', planned: 180000, actual: 175000, labor: 70000, material: 105000 },
  { month: 'Şub', planned: 200000, actual: 210000, labor: 85000, material: 125000 },
  { month: 'Mar', planned: 220000, actual: 235000, labor: 95000, material: 140000 },
  { month: 'Nis', planned: 250000, actual: 245000, labor: 100000, material: 145000 },
  { month: 'May', planned: 280000, actual: 290000, labor: 115000, material: 175000 },
  { month: 'Haz', planned: 300000, actual: 315000, labor: 125000, material: 190000 },
]

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
  return value.toString()
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
        <p className="font-bold text-slate-800 mb-2">{label} 2026</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-800">
              {entry.value.toLocaleString('tr-TR')} ₺
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function CostChart({ data = defaultData, type = 'area' }: CostChartProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Maliyet Özeti</h3>
          <p className="text-sm text-slate-500 mt-1">Aylık harcama detayları</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-slate-600">Planlanan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-slate-600">Gerçekleşen</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="planned" 
                name="Planlanan"
                stroke="#0D9488" 
                strokeWidth={2}
                fill="url(#plannedGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                name="Gerçekleşen"
                stroke="#94A3B8" 
                strokeWidth={2}
                fill="url(#actualGradient)" 
                strokeDasharray="5 5"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="labor" name="İşçilik" fill="#0D9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="material" name="Malzeme" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
