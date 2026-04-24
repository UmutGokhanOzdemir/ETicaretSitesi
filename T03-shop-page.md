# T03 — Shop Page

## Context
`@00-CONTEXT.md` oku. T02 bitti. Header ve Footer reusable, tekrar yazma.

## Görev

### 1. `src/pages/ShopPage.jsx` oluştur

Figma tasarımına göre 3 section'dan oluşur:

**A. Breadcrumb Section (bg-light py-6):**
- `max-w-[1050px] mx-auto px-4`
- Flex justify-between items-center
- Sol: "Shop" başlığı (text-2xl font-bold text-dark)
- Sağ: Breadcrumb (flex gap-2 text-sm font-bold text-dark): "Home" (text-dark) → ChevronRight ikonu (text-muted) → "Shop" (text-muted)

**B. Category Cards Section (bg-white py-12):**
- `max-w-[1050px] mx-auto px-4`
- Flex flex-col md:flex-row gap-8 (5 kategori kartı yan yana desktop'ta)
- 5 adet `CategoryCard` component:
  - CLOTHS, BAGS, SHOES, ACCESSORIES, WATCHES
  - Her biri: h-[223px], bg-cover, position relative, cursor-pointer
  - Üzerinde koyu overlay (bg-black/40)
  - İçerik (absolute inset-0 flex flex-col items-center justify-center text-white):
    - "5 Items" (text-base font-bold)
    - Kategori adı (text-lg font-bold)
  - Arka plan resmi: `https://picsum.photos/seed/{category-name}/210/223`

### 2. `src/components/CategoryCard.jsx` oluştur

Props: `{ title, itemCount, image }`

Yukarıdaki yapıyı component olarak çıkar. HomePage'deki Editor's Pick'ten farklı olduğu için ayrı bir component.

**C. Filter Bar Section (bg-light py-6):**
- `max-w-[1050px] mx-auto px-4`
- Flex flex-col md:flex-row justify-between items-center gap-4
- Sol: "Showing all 12 Results" (text-sm text-text)
- Orta: "Views:" yazısı + 2 ikon button (grid ve list view ikonları - Lucide'dan `LayoutGrid` ve `List`) - border rounded
- Sağ: 2 select elementi + 1 buton:
  - Select 1: "Popularity" (default seçili), options: Popularity, Price: Low to High, Price: High to Low
  - Select 2: "Filter" 
  - Buton: "Filter" (bg-primary text-white px-6 py-2 rounded)

**D. Products Grid (bg-white py-12):**
- `max-w-[1050px] mx-auto px-4`
- Flex flex-wrap gap-8 justify-center
- 12 adet `ProductCard` (T02'de oluşturulmuş olan) - `mockProducts`'tan map et, yoksa yeni mock ekle
- Mobile: 1 kolon (w-full), Tablet (md): 2 kolon (w-[48%]), Desktop (lg): 4 kolon (w-[23%])

**E. Pagination (bg-white py-12):**
- `max-w-[1050px] mx-auto px-4 flex justify-center`
- 3 buton yan yana (border):
  - "First" (disabled, text-muted, border-border, px-6 py-4)
  - 1, 2, 3 sayı butonları (2 seçili: bg-primary text-white, diğerleri: bg-white text-primary border)
  - "Next" (bg-primary text-white, px-6 py-4)
- Her buton border-l:0 (grup halinde görünsün)

### 3. Route Ekle

`src/layout/PageContent.jsx`'e:
```jsx
import ShopPage from '../pages/ShopPage'
// ...
<Route path="/shop" component={ShopPage} />
```

### 4. Header'daki "Shop" linkini aktive et

Zaten `<Link to="/shop">` varsa bırak, yoksa düzelt.

## Mock Data

Shop sayfasında 12 ürün gösterilecek. `src/data/mockProducts.js`'i 12 ürüne çıkar (T02'de 8 vardı, 4 daha ekle). Her birine farklı `picsum.photos` seed'i ver.

## Kalite Kriterleri
- Sadece `.jsx`, Tailwind, Flex
- Mobile-first responsive
- ProductCard ve CategoryCard component'leri reusable olsun
- Console temiz

## Test
1. `http://localhost:5173/shop` → tüm sayfa render olmalı
2. Header'dan "Shop" linkine tıklandığında sayfaya gitmeli
3. Mobile'da hepsi tek sütun, desktop'ta grid düzeninde
4. ProductCard hover'da biraz büyümeli

## Commit
```bash
git add .
git commit -m "feat(T03): add Shop Page with categories, filter bar, product grid, and pagination"
git push
```
