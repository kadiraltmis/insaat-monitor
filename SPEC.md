# İnşaat Takip Uygulaması — SPEC.md

> **Amaç:** Kadir için 4 kat + bodrumlu bina projesinin iş takibi ve maliyet takibini yürüten web/mobil uygulama.

---

## 1. Bina Yapısı

```
Bodrum (Kat 0)  →  Depo / Teknik Oda (iş kalemi bazlı takip)
Kat 1            →  2 daire 3+1  +  3 daire 2+1
Kat 2            →  2 daire 3+1  +  3 daire 2+1
Kat 3            →  2 daire 3+1  +  3 daire 2+1
Kat 4            →  2 daire 3+1  +  3 daire 2+1
──────────────────────────────────────────
Toplam: 25 birim
  - 3+1:  8 birim
  - 2+1: 17 birim
```

---

## 2. Veritabanı Şeması

### 2.1 Entity Relationship

```
Building (1) ──< Floor (N) ──< Unit (N)
                                     │
                              WorkItem (N) ──< CostRecord (N)
```

### 2.2 Tablolar

#### buildings
| Alan           | Tip          | Açıklama              |
|----------------|--------------|-----------------------|
| id             | UUID         | PK                    |
| name           | VARCHAR(100) | "Kadir Apartmanı"     |
| created_at     | TIMESTAMP    |                       |

#### floors
| Alan           | tip          | açıklama              |
|----------------|--------------|-----------------------|
| id             | UUID         | PK                    |
| building_id    | UUID         | FK → buildings        |
| floor_number   | INT          | 0=bodrum … 4           |
| label          | VARCHAR(20)  | "Bodrum", "1. Kat"    |

#### units
| Alan           | tip          | açıklama              |
|----------------|--------------|-----------------------|
| id             | UUID         | PK                    |
| floor_id       | UUID         | FK → floors           |
| unit_number    | VARCHAR(10)  | "101", "2+1-A"        |
| type           | ENUM         | '3p1' | '2p1'          |
| area_sqm       | DECIMAL(6,2) | m² cinsinden alan     |

#### work_items
| Alan           | tip          | açıklama              |
|----------------|--------------|-----------------------|
| id             | UUID         | PK                    |
| unit_id        | UUID         | FK → units (nullable) |
| floor_id       | UUID         | FK → floors (nullable)|
| category       | VARCHAR(50)  | "Kaba İşler", "Tesisat", "Boyama"... |
| name           | VARCHAR(200) | "Tavuk demiri bağlama"|
| status         | ENUM         | todo|in_progress|done|blocked |
| priority       | ENUM         | low|medium|high|urgent   |
| due_date       | DATE         | planlanan bitiş        |
| completed_at   | TIMESTAMP    | fiili bitiş           |
| notes          | TEXT         | serbest not           |

#### cost_records
| Alan           | tip          | açıklama              |
|----------------|--------------|-----------------------|
| id             | UUID         | PK                    |
| work_item_id   | UUID         | FK → work_items       |
| description    | VARCHAR(300) | "5 torba çimento alındı" |
| amount         | DECIMAL(12,2)| TL cinsinden          |
| receipt_url    | TEXT         | fiş/foto linki        |
| recorded_at    | TIMESTAMP    |                      |

---

## 3. Kullanıcı Arayüzü Akışı

```
┌─────────────────────────────────────────────────────┐
│                   ANASAYFA                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Bina     │  │ İş Takibi│  │ Maliyet  │         │
│  │ Özeti    │  │          │  │          │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  İlerleme: ██████░░░░ 68%                          │
│  Toplam Maliyet: ₺4.320.000                        │
└─────────────────────────────────────────────────────┘
          │              │              │
          ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │ KAT LİSTESİ│  │ İŞ LİSTESİ│  │ MALİYET  │
   │(bodrum-4) │  │(filtrelenebilir)│RAPORLARI │
   └──────┬────┘   └──────┬────┘  └──────────┘
          │              │
          ▼              ▼
   ┌──────────┐   ┌──────────┐
   │ BİRİM    │   │ İŞ DETAYI │
   │ LİSTESİ │   │ + Maliyet │
   │ (25 birim)│  │ Kaydı     │
   └──────┬────┘   └──────────┘
          │
          ▼
   ┌──────────┐
   │ BİRİM    │
   │ DETAY    │
   │ (işler + │
   │ maliyetler)│
   └──────────┘
```

### 3.1 Sayfa Detayları

**Anasayfa:** Proje özeti, genel ilerleme, toplam maliyet, son aktiviteler

**Kat Görünümü:** 5 tab (bodrum … 4. kat) — her katta birim kartları, o kattaki iş özeti

**Birim Detayı:**
- Birim bilgisi (tip, m², kat)
- İş kalemleri listesi (checkbox ile tamamlama)
- Yeni iş ekleme formu
- Maliyet kayıtları özeti

**İş Takibi:** Tüm işler filtrele (kat, birim, kategori, durum, öncelik), sırala

**Maliyet Raporu:** Kategori bazlı toplam, birim bazlı toplam, zaman çizelgesi grafiği, iş kalemi bazlı döküm

**Ayarlar:** Bina bilgisi, birim listesi, kategori yönetimi, kullanıcı

---

## 4. Teknoloji Önerileri

### Web Uygulaması (Önerilen)

| Katman        | Teknoloji                       |
|---------------|---------------------------------|
| Frontend      | Next.js 14 (App Router) + TailwindCSS |
| Mobil         | React Native (gelecek aşama)   |
| Backend       | Next.js API Routes (Edge)       |
| Veritabanı    | PostgreSQL (Neon veya Supabase) |
| ORM           | Prisma                          |
| Kimlik        | NextAuth.js                     |
| Hosting       | Vercel                          |
| Dosya depolama| Supabase Storage (fiş fotoğrafları) |
| Bildirim      | Telegram Bot API (doğrudan)     |

### Alternatif (Hızlı MVP)

| Katman        | Teknoloji                       |
|---------------|---------------------------------|
| Frontend      | React + Vite + TailwindCSS      |
| Backend       | Firebase (Firestore + Functions)|
| Kimlik        | Firebase Auth                   |
| Hosting       | Firebase Hosting                 |

---

## 5. Minimum Viable Product (MVP)

### 5.1 Kapsam

**Mutlak minimum — sadece sahada kullanılabilir olacak:**

1. **Bina + Kat + Birim kurulumu**
   - Manuel veya seed data ile 25 birimi oluştur

2. **İş kalemi ekleme**
   - Birime veya kattaki genele bağlı iş
   - Kategori (Kaba İşler, Tesisat, İç Cephe, Dış Cephe, Çatı, Kapı/Pencere, Diğer)
   - Durum (Yapılacak, Yapımda, Tamamlandı, Engelli)
   - Öncelik (Düşük, Orta, Yüksek, Acil)
   - Planlanan tarih

3. **İş durumu güncelleme**
   - Tek tıkla durum değiştirme
   - Tamamlandı = tarih otomatik kayıt

4. **Maliyet kaydı ekleme**
   - İş kalemine bağlı
   - Tutar + açıklama
   - Fotoğraf yükleme (opsiyonel)

5. **Raporlama**
   - Genel ilerleme (yüzde)
   - Toplam maliyet
   - Kat bazlı özet

### 5.2 Dışlanan (v2)

- Çok kullanıcı / rol yönetimi
- Takvim görünümü
- Gantt şeması
- Mobil uygulama
- Telegram bildirimi (v2)
- Tahmin / bütçe karşılaştırma

### 5.3 Sonraki Evreler (v2+)

- Telegram bot bildirimleri
- Mobil uygulama (React Native)
- Fatura/fiş OCR okuma
- Bütçe planı vs gerçekleşen karşılaştırma
- Grafikler ve trend analizi
- Çok proje desteği

---

## 6. Veri Örneği (Seed)

```
Bina: "Kadir Apartmanı"
Katlar: Bodrum, 1. Kat, 2. Kat, 3. Kat, 4. Kat
Birimler:
  3+1 (8 adet): 101, 102, 201, 202, 301, 302, 401, 402
  2+1 (17 adet): 103, 104, 105, 203, 204, 205, 303, 304, 305, 403, 404, 405

Örnek iş kalemleri:
  - "Tavuk demiri bağlama" (Kaba İşler, tüm birimler)
  - "Şap dökümü" (Kaba İşler)
  - "Elektrik tesisatı" (Tesisat)
  - "Su tesisatı" (Tesisat)
  - "Alçı sıva" (İç Cephe)
  - "Boyama" (İç Cephe)
  - "Kapı montajı" (Kapı/Pencere)
```

---

_Bu doküman projenin kaynak referansıdır. Geliştirme başladığında güncellenecektir._