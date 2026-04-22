# 🏗️ İnşaat Takip Uygulaması

İnşaat projelerinin iş takibi ve maliyet yönetimi için modern web uygulaması.

## Özellikler
 

- 📊 **Kat Bazlı Takip** - Bodrum, 1-4. katlar için ayrı görünüm
- 🏠 **20 Daire** - 8 adet 3+1, 12 adet 2+1
- ✅ **İş Takibi** - Durum, öncelik, tarih takibi
- 💰 **Maliyet Yönetimi** - Malzeme, işçilik, genel giderler
- 📈 **Raporlama** - İlerleme yüzdesi, toplam maliyet

## Teknoloji

- **Frontend**: Next.js 14 + React + TailwindCSS
- **Backend**: Next.js API Routes
- **Veritabanı**: PostgreSQL + Prisma ORM
- **Kimlik**: NextAuth.js (opsiyonel)

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Veritabanı migrations
npx prisma generate
npx prisma db push

# Geliştirme sunucusu
npm run dev
```

## Veritabanı Şeması

```
Building (1) ──< Floor (N) ──< Unit (N)
                                       │
                              WorkItem (N) ──< CostRecord (N)
```

## Bina Yapısı

| Kat | Birim Sayısı |
|-----|-------------|
| Bodrum | Garaj |
| 1-4. Kat | Her katta 5 birim (2×3+1, 3×2+1) |
| **Toplam** | **20 daire** |

## Lisans

MIT
