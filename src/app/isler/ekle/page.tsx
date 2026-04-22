'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockFloors = [
  { id: 'bodrum', name: 'Bodrum Kat' },
  { id: '1', name: '1. Kat' },
  { id: '2', name: '2. Kat' },
  { id: '3', name: '3. Kat' },
  { id: '4', name: '4. Kat' }
]

const mockCategories = [
  'Mekanik Tesisat',
  'Elektrik Tesisatı',
  'Sıva İşleri',
  'İzolasyon',
  'Boyama',
  'Zemin Kaplama',
  'Kapı & Pencere',
  'Merkezi Sistem'
]

export default function AddJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    floor: '',
    category: '',
    unit: '',
    cost: '',
    status: 'Başlamadı',
    startDate: '',
    endDate: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('İş kalemi başarıyla eklendi! (Demo modu)')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 text-2xl">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Yeni İş Ekle</h1>
            <p className="text-gray-500">İş kalemi oluşturun</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 animate-slide-up">
          {/* İş Adı */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">İş Adı *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Örn: 3. Kat Mekanik Tesisat"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Kat & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Kat *</label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              >
                <option value="">Seçin</option>
                {mockFloors.map((floor) => (
                  <option key={floor.id} value={floor.id}>{floor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Kategori *</label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Seçin</option>
                {mockCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Birim & Maliyet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Birim</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: Daire 301"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tahmini Maliyet (₺)</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: 25000"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
          </div>

          {/* Tarihler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Başlangıç Tarihi</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bitiş Tarihi</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Notlar</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
              placeholder="Ek notlar..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              ✓ Kaydet
            </button>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition-colors"
            >
              İptal
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}