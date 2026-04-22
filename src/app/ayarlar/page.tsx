'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    projectName: 'Yeni Hayat Residence',
    totalUnits: 20,
    currency: 'TRY',
    language: 'tr',
    notifications: true,
    autoBackup: true,
    darkMode: false
  })

  const handleSave = () => {
    alert('Ayarlar kaydedildi! (Demo modu)')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 text-2xl">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ayarlar</h1>
            <p className="text-gray-500">Sistem yapılandırması</p>
          </div>
        </div>

        {/* Proje Ayarları */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            🏗️ Proje Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Proje Adı</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={settings.projectName}
                onChange={(e) => setSettings({ ...settings, projectName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Toplam Birim Sayısı</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  value={settings.totalUnits}
                  onChange={(e) => setSettings({ ...settings, totalUnits: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Para Birimi</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                >
                  <option value="TRY">Türk Lirası (₺)</option>
                  <option value="USD">Amerikan Doları ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sistem Ayarları */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            ⚙️ Sistem Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Dil</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-200">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            🔔 Bildirimler
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium text-gray-800">E-posta Bildirimleri</p>
                <p className="text-sm text-gray-500">Önemli güncellemeler için e-posta al</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium text-gray-800">Otomatik Yedekleme</p>
                <p className="text-sm text-gray-500">Verileri her gün otomatik yedekle</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        {/* Veri Yönetimi */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up animation-delay-300">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            💾 Veri Yönetimi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-2xl">📤</span>
              <p className="font-medium text-gray-800 mt-2">Verileri Dışa Aktar</p>
              <p className="text-sm text-gray-500">JSON formatında indir</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-2xl">📥</span>
              <p className="font-medium text-gray-800 mt-2">Verileri İçe Aktar</p>
              <p className="text-sm text-gray-500">JSON dosyasından yükle</p>
            </button>
          </div>
          <div className="mt-4">
            <button className="w-full p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-left">
              <span className="text-2xl">🗑️</span>
              <p className="font-medium text-red-600 mt-2">Tüm Verileri Sıfırla</p>
              <p className="text-sm text-red-400">Dikkat: Bu işlem geri alınamaz!</p>
            </button>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <button
          onClick={handleSave}
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors animate-slide-up animation-delay-400"
        >
          ✓ Tüm Ayarları Kaydet
        </button>

        {/* Versiyon Bilgisi */}
        <div className="text-center text-gray-400 text-sm animate-fade-in">
          <p>İnşaat Monitör v1.0.0</p>
          <p>Build: 2026.04.22</p>
        </div>
      </div>
    </main>
  )
}