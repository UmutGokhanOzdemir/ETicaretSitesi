# T04 — Product Detail Page (UI)

## Context
`@00-CONTEXT.md` oku. Bu aşamada sadece **UI** yapılacak, data hardcoded olacak. Gerçek API bağlantısı T16'da.

## Görev

### 1. `src/pages/ProductDetailPage.jsx` oluştur

Mock data (dosyanın üstünde):
```js
const product = {
  id: 1,
  title: "Floating Phone",
  rating: 4.5,
  ratingCount: 10,
  price: 1139.33,
  stock: "In Stock",
  brand: "Gucci",
  seller: "gogo",
  description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent...",
  colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42'],
  images: [
    "https://picsum.photos/seed/prod1/500/500",
    "https://picsum.photos/seed/prod2/500/500",
    "https://picsum.photos/seed/prod3/500/500",
    "https://picsum.photos/seed/prod4/500/500"
  ]
}
```

**Section 1: Breadcrumb (bg-light py-6):**
Home > Shop (text-dark font-bold, chevron ayırıcılarla, flex gap-2)

**Section 2: Main Product Section (bg-white py-12):**
`max-w-[1050px] mx-auto px-4`, `flex flex-col md:flex-row gap-8`

**Sol (flex-1):** Ana görsel (h-[500px] w-full object-cover) + altta 2 küçük thumbnail (flex gap-4 mt-4, her biri w-[100px] h-[75px])

**Sağ (flex-1 flex flex-col gap-4):**
- Başlık (text-2xl text-dark font-normal)
- Yıldız rating (5 yıldız + rating count text-text font-bold) - Lucide `Star` ikonu kullan, dolu ve boş versiyon
- Fiyat (text-2xl font-bold text-dark)
- "Availability: In Stock" (text-sm font-bold, text-dark + text-primary "In Stock" kısmı)
- HR line
- Açıklama (text-sm text-text)
- HR line
- Renk seçenekleri: 4 yuvarlak (w-8 h-8 rounded-full cursor-pointer)
- Butonlar satırı: "Select Options" (bg-primary text-white px-4 py-2 rounded) + 4 küçük ikon butonu (kalp, göz, sepet) - her biri w-10 h-10 rounded-full border

**Section 3: Description Tabs (bg-white py-12):**
`max-w-[1050px] mx-auto px-4`

3 tab başlığı yan yana (tab-like, tıklandığında altına border geliyor):
- Description (aktif - border-b-2 border-dark)
- Additional Information
- Reviews (0)

Altında 2 kolonlu içerik:
- Sol (flex-1): Büyük başlık "the quick fox jumps over" (text-xl font-bold) + paragraf
- Sağ (flex-1): Aynı tarzda başlık + ul liste (3 bullet point "the quick fox jumps over")

**Section 4: BESTSELLER PRODUCTS (bg-white py-12):**
T02'deki section'un aynısı. Eğer T02'de bu bölüm component olarak ayrılmamışsa, `src/components/BestsellerProducts.jsx` olarak refactor et ve hem HomePage hem ProductDetailPage'de kullan.

### 2. Route Ekle

`src/layout/PageContent.jsx`:
```jsx
import ProductDetailPage from '../pages/ProductDetailPage'
<Route path="/product/:id" component={ProductDetailPage} />
```

Not: T16'da URL şuna dönüşecek: `/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId` — şimdilik basit tut.

### 3. ProductCard'a Link Ekle

`src/components/ProductCard.jsx`'te kart container'ını `<Link to={`/product/${product.id}`}>`  ile sar (react-router-dom'dan).

## Kalite Kriterleri
- `.jsx`, Tailwind only, Flex only
- Mobile-first
- Rating için Lucide Star ikonu (dolu ve boş)
- Butonlar için Lucide ikonları: `Heart`, `Eye`, `ShoppingCart`

## Test
- `/product/1` → sayfa açılmalı
- ProductCard'a tıklayınca detay sayfasına gitmeli
- Mobile'da sol/sağ stack olmalı, desktop'ta yan yana
- 4 renk yuvarlağı doğru renkte görünmeli

## Commit
```bash
git add .
git commit -m "feat(T04): add Product Detail Page UI with tabs and bestseller section"
git push
```
