'use client'

import Link from 'next/link'

// Mock veriler
const monthlyData = [
  { month: 'Ocak', income: 320000, expense: 280000 },
  { month: 'Şubat', income: 450000, expense: 310000 },
  { month: 'Mart', income: 380000, expense: 290000 },
  { month: 'Nisan', income: 520000, expense: 340000 },
  { month: 'Mayıs', income: 410000, expense: 320000 },
  { month: 'Haziran', income: 480000, expense: 350000 }
]

const categorySummary = [
  { name: 'Mekanik Tesisat', amount: 450000, percentage: 28, color: 'bg-teal-500' },
  { name: 'Elektrik Tesisatı', amount: 380000, percentage: 24, color: 'bg-blue-500' },
  { name: 'Sıva İşleri', amount: 290000, percentage: 18, color: 'bg-purple-500' },
  { name: 'İzolasyon', amount: 220000, percentage: 14, color: 'bg-orange-500' },
  { name: 'Diğer', amount: 260000, percentage: 16, color: 'bg-gray-400' }
]

export default function ReportsPage() {
  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0)
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0)
  const balance = totalIncome - totalExpense
  const maxValue = Math.max(...monthlyData.map(m => Math.max(m.income, m.expense)))

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 text-2xl">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Raporlar</h1>
            <p className="text-gray-500">Maliyet ve ilerleme özetleri</p>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 text-sm">Toplam Gelir</p>
            <p className="text-2xl font-bold text-green-600 mt-2">{(totalIncome / 1000000).toFixed(2)}M ₺</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 text-sm">Toplam Gider</p>
            <p className="text-2xl font-bold text-red-600 mt-2">{(totalExpense / 1000000).toFixed(2)}M ₺</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 text-sm">Net Bakiye</p>
            <p className="text-2xl font-bold text-teal-600 mt-2">{(balance / 1000000).toFixed(2)}M ₺</p>
          </div>
        </div>

        {/* Aylık Grafik */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Aylık Gelir-Gider Özeti</h2>
          <div className="flex items-end justify-around h-64 gap-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex gap-2 w-full justify-center">
                  <div
                    className="w-8 bg-teal-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.income / maxValue) * 180}px` }}
                    title={`Gelir: ${data.income.toLocaleString()} ₺`}
                  />
                  <div
                    className="w-8 bg-red-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.expense / maxValue) * 180}px` }}
                    title={`Gider: ${data.expense.toLocaleString()} ₺`}
                  />
                </div>
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-500 rounded" />
              <span className="text-sm text-gray-600">Gelir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded" />
              <span className="text-sm text-gray-600">Gider</span>
            </div>
          </div>
        </div>

        {/* Kategori Dağılımı */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up animation-delay-200">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Kategori Bazlı Harcamalar</h2>
            <div className="space-y-4">
              {categorySummary.map((cat) => (
                <div key={cat.name} className="flex items-center gap-4">
                  <div className={`${cat.color} w-4 h-4 rounded`} />
                  <span className="flex-1 text-gray-700 font-medium">{cat.name}</span>
                  <span className="text-gray-500">{(cat.amount / 1000).toFixed(0)}K ₺</span>
                  <span className="text-sm text-gray-400 w-12 text-right">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* İlerleme Raporu */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Kat Bazlı İlerleme</h2>
            <div className="space-y-4">
              {[
                { name: 'Bodrum Kat', progress: 72 },
                { name: '1. Kat', progress: 85 },
                { name: '2. Kat', progress: 68 },
                { name: '3. Kat', progress: 91 },
                { name: '4. Kat', progress: 54 }
              ].map((floor) => (
                <div key={floor.name} className="flex items-center gap-4">
                  <span className="flex-1 text-gray-700 font-medium">{floor.name}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${floor.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-12 text-right">{floor.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Butonu */}
        <div className="flex gap-4 animate-slide-up animation-delay-300">
          <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors">
            📥 Excel'e Aktar
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
            🖨️ Yazdır
          </button>
        </div>
      </div>
    </main>
  )
}