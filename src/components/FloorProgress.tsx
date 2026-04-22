'use client'

interface FloorProgressProps {
  name: string
  completed: number
  total: number
  color: string
}

export default function FloorProgress({ name, completed, total, color }: FloorProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">{completed}/{total} iş</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">{percentage}% tamamlandı</span>
        {percentage === 100 && (
          <span className="text-xs text-green-600 font-medium">✓ Tamamlandı</span>
        )}
      </div>
    </div>
  )
}