'use client'

import Link from 'next/link'

// Mock veriler
const floorData = {
  bodrum: { name: 'Bodrum Kat', completed: 12, total: 40, units: 4, cost: 450000 },
  '1': { name: '1. Kat', completed: 28, total: 50, units: 5, cost: 520000 },
  '2': { name: '2. Kat', completed: 35, total: 60, units: 5, cost: 580000 },
  '3': { name: '3. Kat', completed: 40, total: 70, units: 5, cost: 610000 },
  '4': { name: '4. Kat', completed: 30, total: 60, units: 5, cost: 590000 }
}

const mockTasks = [
  { id: 1, name: 'Mekanik Tesisat', status: 'Tamamlandı', cost: 45000, progress: 100 },
  { id: 2, name: 'Elektrik Tesisatı', status: 'Devam Ediyor', cost: 32000, progress: 75 },
  { id: 3, name: 'Sıva İşleri', status: 'Başlamadı', cost: 28000, progress: 0 },
  { id: 4, name: 'İzolasyon', status: 'Devam Ediyor', cost: 18000, progress: 60 }
]

export default function FloorDetailPage({ params }: { params: { id: string } }) {
  const floor = floorData[params.id as keyof typeof floorData] || floorData.bodrum
  const percentage = Math.round((floor.completed / floor.total) * 100)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 text-2xl">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{floor.name}</h1>
            <p className="text-gray-500">Detaylı görünüm</p>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">Toplam İş</p>
            <p className="text-2xl font-bold text-gray-800">{floor.total}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">Tamamlanan</p>
            <p className="text-2xl font-bold text-green-600">{floor.completed}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">Birim Sayısı</p>
            <p className="text-2xl font-bold text-blue-600">{floor.units}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <p className="text-gray-500 text-sm">Maliyet</p>
            <p className="text-2xl font-bold text-purple-600">{(floor.cost / 1000).toFixed(0)}K ₺</p>
          </div>
        </div>

        {/* İlerleme */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Genel İlerleme</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-teal-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xl font-bold text-teal-600">{percentage}%</span>
          </div>
        </div>

        {/* İş Listesi */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">İş Kalemleri</h2>
            <Link href="/isler/ekle" className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors">
              + Yeni Ekle
            </Link>
          </div>
          <div className="space-y-3">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{task.cost.toLocaleString()} ₺</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === 'Tamamlandı' ? 'bg-green-100 text-green-700' :
                    task.status === 'Devam Ediyor' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geri Dön */}
        <div className="text-center animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  )
}