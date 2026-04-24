# T02 — Home Page'i Tamamla

## Context
`@00-CONTEXT.md` dosyasını oku. Proje Vite + React + Tailwind v4 + React Router v5 + Swiper kullanıyor. Figma Bandage tasarımına uyuyoruz. Mobile-first, Flex-only, sadece Tailwind class.

## Mevcut Durum
`src/layout/Header.jsx` ve `src/pages/HomePage.jsx` kısmen yazılmış durumda:
- ✅ Header (top bar + main nav + mobile menu) çalışıyor
- ✅ Hero Slider (2 slide) çalışıyor  
- ✅ Editor's Pick kategori kartları çalışıyor
- ⏳ Eksikler: Bestseller Products, Yeşil CTA banner, Blog Posts, Footer detayları

## Görev

### 1. `src/data/mockProducts.js` oluştur

8 adet mock ürün verisi olsun. Her ürün şu alanları içersin:
```js
{
  id: 1,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: 16.48,
  newPrice: 6.48,
  colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42'],
  image: "https://picsum.photos/seed/product{id}/350/400"
}
```

### 2. `src/components/ProductCard.jsx` oluştur

Props: `product` (yukarıdaki şekilde)

Figma tasarımı:
- Dikey kart, beyaz arka plan
- Üstte ürün görseli (h-[427px])
- Altta içerik kutusu (p-[25px_25px_35px], gap-2, items-center - ORTALANMIŞ)
  - Ürün adı (font-bold, text-base, text-dark)
  - Department (text-sm, text-text, font-bold)
  - Fiyat satırı (flex, gap-1): eski fiyat (muted, line-through) + yeni fiyat (secondary yeşil, bold)
  - 4 renk yuvarlağı (w-4 h-4 rounded-full, inline-style ile background color)
- Hover'da scale-105 transition

### 3. `src/components/BlogCard.jsx` oluştur

Props: `post` objesi ({ image, tags:[], title, description, date, comments })

Figma tasarımı:
- Beyaz kart, shadow-sm
- Üstte görsel (h-[300px])
- Sol üst köşede "NEW" etiketi (bg-alert, beyaz yazı, px-2 py-1, rounded)
- Altta (p-[25px_25px_35px], gap-2):
  - tags satırı: ilk tag primary renkli (text-disabled-blue), diğerleri text-text; arasında `,`
  - başlık (text-xl, text-dark)
  - açıklama (text-sm, text-text, max-w-[280px])
  - alt satır: sol tarafta calendar ikonu + tarih, sağ tarafta chart ikonu + yorum sayısı (tümü text-xs)
  - "Learn More →" linki (text-text, font-bold, text-sm)

### 4. `src/pages/HomePage.jsx`'e şu section'ları ekle (mevcut Hero + Editor's Pick'in altına):

**A. Bestseller Products Section:**
- `bg-white py-20`
- Başlık bloğu (center): "Featured Products" (text-xl, text-text, font-normal) + "BESTSELLER PRODUCTS" (text-2xl, font-bold) + tagline
- 4 sütun (mobile: 1, md: 2, lg: 4) ProductCard grid'i (flex flex-wrap, gap-8)
- `mockProducts`'tan ilk 4'ü map et

**B. Yeşil CTA Banner ("Vita Classic" benzeri):**
Bu Figma'daki `container-fluid` section — 2 sütun:
- Mobile: tek sütun, stack
- Desktop (md:): Sol yarı kadın fotoğrafı (bg-cover, h-[682px]), sağ yarı metin bloğu
- Metin bloğu: "SUMMER 2020" (text-muted, font-bold) + "Part of the Urban oddities 2020" (text-4xl md:text-5xl font-bold) + açıklama (text-text) + 2 buton yan yana:
  - "BUY NOW" (bg-success, text-white)
  - "READ MORE" (border border-success, text-success)
- Arka plan resmi: `https://picsum.photos/seed/bandage-cta/800/682`

**C. Featured Posts Section (Blog):**
- `bg-white py-28`
- Başlık bloğu (center):
  - "Practice Advice" (text-sm, text-primary, font-bold)
  - "Featured Posts" (text-3xl md:text-5xl, font-bold)
  - tagline
- 3 sütun (mobile: 1, md: 3) BlogCard grid (flex flex-wrap md:flex-nowrap gap-8)
- 3 adet statik blog post data'sı inline olarak HomePage içinde tanımla:
  ```js
  const posts = [
    { 
      image: "https://picsum.photos/seed/blog1/348/300",
      tags: ["Google", "Trending", "New"],
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: "10 comments"
    },
    // 2 tane daha benzer
  ]
  ```

### 5. `src/layout/Footer.jsx`'i baştan yaz (Figma detaylı footer)

3 bölümden oluşur:

**Bölüm 1 — Üst (bg-light):**
- Container (max-w-[1050px] mx-auto, px-4 py-10)
- Sol: "Bandage" logo (text-2xl, font-bold)
- Sağ: sosyal medya ikonları (FaFacebook, FaInstagram, FaTwitter) - text-primary, size 24

**Bölüm 2 — Orta (bg-white):**
- `max-w-[1050px] mx-auto, px-4, py-12`
- 5 kolon (mobile: 1, md: 5) - flex flex-col md:flex-row gap-8
- Her kolon: başlık (text-base font-bold text-dark) + altında linkler (text-sm font-bold text-text, flex flex-col gap-2)
- Kolonlar:
  1. "Company Info" → About Us, Carrier, We are hiring, Blog
  2. "Legal" → About Us, Carrier, We are hiring, Blog
  3. "Features" → Business Marketing, User Analytic, Live Chat, Unlimited Support
  4. "Resources" → IOS & Android, Watch a Demo, Customers, API
  5. "Get In Touch" → Email input (bg-input-bg border border-border rounded-l px-4 py-3) + Subscribe butonu (bg-primary text-white px-4 py-3 rounded-r) + "Lore imp sum dolor Amit" (text-xs text-text)

**Bölüm 3 — Alt (bg-light):**
- `max-w-[1050px] mx-auto, px-4, py-6`
- Sol: "Made With Love By Finland All Right Reserved" (text-sm, text-text, font-bold)

### 6. react-icons kurulu değilse kur

```bash
npm install react-icons
```

### 7. Mobile Menu Toggle

`Header.jsx`'te mobile menu şu an her zaman açık. Şunu yap:
- `useState`'ten `isMenuOpen` state'i ekle
- Hamburger ikonuna `onClick` ekle: `() => setIsMenuOpen(!isMenuOpen)`
- Mobile menu'yü `{isMenuOpen && (<nav>...</nav>)}` ile koşullu render et
- Hamburger ikonu açıkken X ikonuna dönsün (`X` from lucide-react)

## Kalite Kriterleri

- Tüm dosyalar `.jsx` olsun
- Sadece Tailwind class kullan, custom CSS yok
- Sadece Flex layout, Grid yok
- Mobile-first breakpoint'ler (`md:`, `lg:`)
- Her Link Router Link olsun (import from 'react-router-dom')
- Console'da error/warning olmasın
- `bg-white`, `bg-light`, `text-dark`, `text-text`, `text-primary`, `text-secondary`, `bg-success` gibi custom class'ları kullan (tema `src/index.css`'te tanımlı)

## Test Kontrolü

Bittikten sonra:
1. `npm run dev` ile başlat
2. `http://localhost:5173/` → tüm section'lar sırayla görünmeli
3. Mobile genişlikte (414px) tüm section'lar tek sütun olmalı
4. Hamburger menü aç/kapa çalışmalı
5. Console'da hata olmamalı

## Commit

Bitince:
```bash
git add .
git commit -m "feat(T02): complete Home Page with all sections and detailed Footer"
git push
```
