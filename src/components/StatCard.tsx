'use client'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'turquoise' | 'blue' | 'purple' | 'orange'
  trend?: string
}

const colorClasses = {
  turquoise: 'bg-teal-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500'
}

export default function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {trend && (
            <p className="text-green-600 text-sm mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div className={`${colorClasses[color]} p-4 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}