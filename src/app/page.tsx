'use client'

import Header from '@/components/Header'
import StatCard from '@/components/StatCard'
import FloorProgress from '@/components/FloorProgress'
import QuickActions from '@/components/QuickActions'

// Mock veriler - gerçek uygulamada API'den gelecek
const stats = {
  totalUnits: 20,
  completed: 145,
  inProgress: 98,
  totalCost: 2450000
}

const floors = [
  { id: 'bodrum', name: 'Bodrum Kat', completed: 12, total: 40 },
  { id: '1', name: '1. Kat', completed: 28, total: 50 },
  { id: '2', name: '2. Kat', completed: 35, total: 60 },
  { id: '3', name: '3. Kat', completed: 40, total: 70 },
  { id: '4', name: '4. Kat', completed: 30, total: 60 }
]

const recentActivities = [
  { id: 1, text: '3. Kat tesviye işi tamamlandı', time: '10 dakika önce', icon: '✓' },
  { id: 2, text: '2. Kat mekanik tesisat başladı', time: '1 saat önce', icon: '🔧' },
  { id: 3, text: 'Maliyet girişi: 45.000 ₺', time: '2 saat önce', icon: '💰' },
  { id: 4, text: 'Bodrum kat izolasyon onaylandı', time: '3 saat önce', icon: '✅' },
  { id: 5, text: 'Yeni iş eklendi: 4. Kat sıva', time: '5 saat önce', icon: '➕' }
]

const quickActions = [
  { label: 'Yeni İş Ekle', icon: '➕', href: '/isler/ekle', color: 'bg-teal-600 hover:bg-teal-700' },
  { label: 'Maliyet Ekle', icon: '💰', href: '/maliyet/ekle', color: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Raporlar', icon: '📊', href: '/raporlar', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Ayarlar', icon: '⚙️', href: '/ayarlar', color: 'bg-gray-600 hover:bg-gray-700' }
]

const floorColors = [
  'bg-teal-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500'
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Header />

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Toplam Birim"
            value={stats.totalUnits}
            icon={<span className="text-2xl">🏠</span>}
            color="turquoise"
          />
          <StatCard
            title="Tamamlanan İş"
            value={stats.completed}
            icon={<span className="text-2xl">✅</span>}
            color="blue"
            trend="+%12 bu ay"
          />
          <StatCard
            title="Devam Eden"
            value={stats.inProgress}
            icon={<span className="text-2xl">🔄</span>}
            color="purple"
          />
          <StatCard
            title="Toplam Maliyet"
            value={`${(stats.totalCost / 1000000).toFixed(1)}M ₺`}
            icon={<span className="text-2xl">💰</span>}
            color="orange"
            trend="+%8 bu ay"
          />
        </div>

        {/* Hızlı İşlemler */}
        <section className="animate-slide-up animation-delay-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hızlı İşlemler</h2>
          <QuickActions actions={quickActions} />
        </section>

        {/* Kat İlerlemeleri */}
        <section className="animate-slide-up animation-delay-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Kat Bazlı İlerleme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {floors.map((floor, index) => (
              <FloorProgress
                key={floor.id}
                name={floor.name}
                completed={floor.completed}
                total={floor.total}
                color={floorColors[index]}
              />
            ))}
          </div>
        </section>

        {/* Son Aktiviteler */}
        <section className="animate-slide-up animation-delay-400">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Son Aktiviteler</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.text}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 py-4 animate-fade-in">
          <p>İnşaat Monitör v1.0 — Tüm hakları saklıdır</p>
        </footer>
      </div>
    </main>
  )
}