'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockCategories = [
  'Malzeme Gideri',
  'İşçilik Gideri',
  'Makine Kiralama',
  'Proje Gideri',
  'Faturalı Gider',
  'Diğer'
]

const mockPaymentMethods = ['Nakit', 'Banka Transferi', 'Kredi Kartı', 'Çek']

export default function AddCostPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    invoiceNo: '',
    description: '',
    isExpense: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Maliyet başarıyla eklendi! (Demo modu)')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link href="/" className="text-teal-600 hover:text-teal-700 text-2xl">←</Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Maliyet Ekle</h1>
            <p className="text-gray-500">Gelir veya gider kaydı oluşturun</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 animate-slide-up">
          {/* Gelir/Gider Seçimi */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isExpense: true })}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                formData.isExpense
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📉 Gider
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isExpense: false })}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                !formData.isExpense
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📈 Gelir
            </button>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Açıklama *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Örn: 3. Kat için çimento alımı"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Kategori & Tutar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tutar (₺) *</label>
              <input
                type="number"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: 15000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
          </div>

          {/* Ödeme Yöntemi & Tarih */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ödeme Yöntemi</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="">Seçin</option>
                {mockPaymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tarih</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          {/* Fatura No */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Fatura / Fiş No</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Fatura numarası (opsiyonel)"
              value={formData.invoiceNo}
              onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Detaylı Açıklama</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
              placeholder="Ek bilgiler..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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