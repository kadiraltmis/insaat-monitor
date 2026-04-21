export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🏗️ İnşaat Takip
          </h1>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Toplam Birim */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Toplam Birim</p>
                <p className="text-3xl font-bold text-gray-900">20</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
            </div>
          </div>

          {/* Tamamlanan İş */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tamamlanan</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          {/* Devam Eden */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Devam Eden</p>
                <p className="text-3xl font-bold text-yellow-600">0</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
          </div>

          {/* Toplam Maliyet */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Toplam Maliyet</p>
                <p className="text-3xl font-bold text-red-600">₺0</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kat Bazlı Görünüm */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Kat Bazlı Durum</h2>
          <div className="space-y-4">
            {['Bodrum', '1. Kat', '2. Kat', '3. Kat', '4. Kat'].map((floor, i) => (
              <div key={floor} className="flex items-center gap-4">
                <span className="w-20 font-medium text-gray-700">{floor}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: '0%' }}
                  />
                </div>
                <span className="w-12 text-right text-sm text-gray-500">0%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 text-left transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-semibold">Yeni İş Ekle</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-left transition-colors">
            <span className="text-2xl mb-2 block">💸</span>
            <span className="font-semibold">Maliyet Ekle</span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-left transition-colors">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="font-semibold">Raporları Gör</span>
          </button>
        </div>
      </div>
    </main>
  );
}
