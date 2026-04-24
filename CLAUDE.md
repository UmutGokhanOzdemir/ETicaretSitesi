# PROJE CONTEXT - E-Ticaret Sitesi (Workintech Bandage)

Bu dosya projenin sabit referansıdır. Her prompt'ta Cursor'a bu dosyayı gösterebilirsin (Cursor'da `@00-CONTEXT.md` olarak).

---

## Proje Bilgileri

**Stack:**
- Vite + React 18 (JavaScript, `.jsx` uzantılı)
- Tailwind CSS v4 (Vite plugin ile, `tailwind.config.js` YOK — tema `src/index.css` içinde `@theme` bloğunda)
- React Router v5 (`@5`, v6 DEĞİL — `Switch` kullanılır, `Routes` değil)
- Redux + react-redux + redux-thunk + redux-logger (Vanilla Redux, Redux Toolkit DEĞİL)
- Axios (baseURL: `https://workintech-fe-ecommerce.onrender.com`)
- react-hook-form (form validasyonları için)
- react-toastify (bildirimler)
- lucide-react (genel ikonlar)
- react-icons (sosyal medya ikonları için — Lucide'da marka ikonları yok)
- swiper (slider)
- react-paginate (pagination)
- react-gravatar + md5 (kullanıcı avatarı)

**Kurallar:**
- Sadece **Flex Layout** kullan (Grid kullanma)
- Sadece **Tailwind class'ları** kullan, custom CSS class'ı yazma
- **Mobile-first** yaklaşım (önce mobile stil, sonra `md:` ve `lg:` ile desktop)
- **TEK Header**, **TEK Footer** — tüm sayfalarda aynı, renk değişmez
- Dosya uzantısı **.jsx** (ödevde .js yazıyor ama Vite v8 `.js`'te JSX kabul etmiyor, .jsx kullan)

---

## Figma Renk Paleti

`src/index.css` içinde `@theme` bloğunda tanımlı:

```
--color-primary: #23A6F0       (mavi - linkler, butonlar)
--color-secondary: #23856D     (yeşil - ikinci slide arka plan, fiyat)
--color-success: #2DC071       (parlak yeşil - SHOP NOW gibi CTA butonlar)
--color-dark: #252B42          (koyu - başlıklar, üst bar bg)
--color-text: #737373          (gri - paragraf)
--color-muted: #BDBDBD         (silik gri - üstü çizili fiyat)
--color-alert: #E74040         (kırmızı - NEW etiketi)
--color-alert-orange: #E77C40  (turuncu)
--color-disabled-blue: #8EC2F2 (silik mavi - tarih etiketi)
--color-light: #FAFAFA         (açık gri arkaplan)
--color-border: #E6E6E6        (kenarlık)
--color-input-bg: #F9F9F9      (input arkaplan)
```

Kullanım: `bg-primary`, `text-secondary`, `bg-light` gibi utility class'larla.

**Font:** Montserrat (400, 500, 700, 800) — Google Fonts üzerinden `index.html`'te yüklenir.

---

## Klasör Yapısı (HEDEF)

```
src/
├── api/
│   └── axiosInstance.js          # baseURL + authorization interceptor
├── components/
│   ├── ProductCard.jsx            # ürün kartı (reusable - Home/Shop/Detail)
│   ├── CategoryCard.jsx           # kategori kartı
│   ├── BlogCard.jsx               # blog kartı
│   ├── HeroSlider.jsx             # Swiper slider
│   ├── Spinner.jsx                # loading spinner
│   ├── Breadcrumb.jsx             # Shop > Category navigation
│   ├── ProtectedRoute.jsx         # login gerektiren sayfalar için
│   └── PromoCTA.jsx               # yeşil CTA banner ("In-store or online")
├── layout/
│   ├── Header.jsx                 # TEK header (top bar + main nav + mobile menu)
│   ├── PageContent.jsx            # Switch + Route tanımları
│   └── Footer.jsx                 # TEK footer
├── pages/
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── ContactPage.jsx
│   ├── TeamPage.jsx
│   ├── AboutPage.jsx
│   ├── SignUpPage.jsx
│   ├── LoginPage.jsx
│   ├── CartPage.jsx
│   ├── OrderPage.jsx              # Step 1 Address + Step 2 Card
│   └── PreviousOrdersPage.jsx
├── store/
│   ├── store.js                   # createStore + applyMiddleware(thunk, logger)
│   ├── reducers/
│   │   ├── rootReducer.js
│   │   ├── clientReducer.js
│   │   ├── productReducer.js
│   │   └── shoppingCartReducer.js
│   └── actions/
│       ├── clientActions.js
│       ├── productActions.js
│       └── cartActions.js
├── data/
│   └── mockProducts.js            # API bağlanmadan önce statik data
├── App.jsx                        # Header + PageContent + Footer + ToastContainer
├── main.jsx                       # BrowserRouter + Provider + App
└── index.css                      # Tailwind + @theme bloğu
```

---

## Route Tablosu

| Path | Sayfa | Task | Korumalı? |
|---|---|---|---|
| `/` | HomePage | T02 | Hayır |
| `/shop` | ShopPage | T03 | Hayır |
| `/shop/:gender/:categoryName/:categoryId` | ShopPage (filtered) | T12, T14 | Hayır |
| `/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId` | ProductDetailPage | T04, T16 | Hayır |
| `/contact` | ContactPage | T05 | Hayır |
| `/team` | TeamPage | T06 | Hayır |
| `/about` | AboutPage | T07 | Hayır |
| `/signup` | SignUpPage | T08 | Hayır |
| `/login` | LoginPage | T10 | Hayır |
| `/cart` | CartPage | T18 | Hayır |
| `/order` | OrderPage | T20, T21 | ✅ Evet |
| `/previous-orders` | PreviousOrdersPage | T23 | ✅ Evet |

---

## Redux Store Yapısı (T09'dan)

```js
{
  client: {
    user: {},                     // login sonrası kullanıcı bilgisi
    addressList: [],              // T20'de kullanılır
    creditCards: [],              // T21'de kullanılır
    roles: [],                    // GET /roles sonucu
    theme: 'light',
    language: 'tr'
  },
  product: {
    categories: [],               // T12'de GET /categories
    productList: [],              // T13'te GET /products
    total: 0,                     // total product count
    limit: 25,                    // pagination - default 25
    offset: 0,                    // pagination - default 0
    filter: '',                   // T14 - filter input
    fetchState: 'NOT_FETCHED'     // 'NOT_FETCHED' | 'FETCHING' | 'FETCHED' | 'FAILED'
  },
  shoppingCart: {
    cart: [],                     // [{ count: 1, checked: true, product: {...} }]
    payment: {},
    address: {}
  }
}
```

**Middleware:** `applyMiddleware(thunk, logger)` — logger sadece development'ta.

---

## API Endpoints (workintech-fe-ecommerce.onrender.com)

| Method | Endpoint | Task | Amaç |
|---|---|---|---|
| POST | `/signup` | T08 | Kayıt ol |
| POST | `/login` | T10 | Giriş yap (token döner) |
| GET | `/verify` | T11 | Token doğrula (header: `Authorization: {token}`) |
| GET | `/roles` | T08 | Role listesi (Customer/Store/Admin) |
| GET | `/categories` | T12 | Kategori listesi |
| GET | `/products` | T13 | Ürün listesi (query: `?category=2&filter=siyah&sort=price:asc&limit=25&offset=0`) |
| GET | `/products/:productId` | T16 | Tek ürün detayı |
| GET | `/user/address` | T20 | Kullanıcı adresleri |
| POST | `/user/address` | T20 | Adres ekle |
| PUT | `/user/address` | T20 | Adres güncelle |
| DELETE | `/user/address/:id` | T20 | Adres sil |
| GET | `/user/card` | T21 | Kayıtlı kartlar |
| POST | `/user/card` | T21 | Kart ekle |
| PUT | `/user/card` | T21 | Kart güncelle |
| DELETE | `/user/card/:cardId` | T21 | Kart sil |
| POST | `/order` | T22 | Sipariş oluştur |
| GET | `/order` | T23 | Önceki siparişler |

**Public test kullanıcıları (T10):** (Password: `12345`)
- `customer@commerce.com`
- `store@commerce.com`
- `admin@commerce.com`

---

## Commit Kuralları

Her task tamamlandığında:
```bash
git add .
git commit -m "feat(T0X): task description"
git push
```

Örnek:
- `feat(T02): complete Home Page with all sections`
- `feat(T09): initialize Redux store with reducers and thunk`
- `fix(T10): login form validation edge cases`

---

## Tamamlanan Task'lar

- [x] T01 — Project Setup
- [x] T02 — Home Page (Header ✅, Hero Slider ✅, Editor's Pick ✅, diğerleri devam ediyor)

---

## Önemli Notlar

1. **Tailwind v4 farkları:**
   - `tailwind.config.js` YOK, tema `@theme` bloğunda CSS'te
   - `@tailwind base/components/utilities` YOK, tek satır: `@import "tailwindcss";`
   - Vite plugin: `@tailwindcss/vite`

2. **React Router v5 syntax:**
   - `Switch` (v6'daki `Routes` DEĞİL)
   - `<Route exact path="/" component={HomePage} />` veya `<Route path="/"><HomePage /></Route>`
   - `useHistory` hook (v6'daki `useNavigate` değil)
   - `useParams` aynı

3. **Lucide marka ikonları yok** — Facebook/Twitter/Instagram/YouTube için `react-icons/fa` kullan:
   ```jsx
   import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
   ```

4. **Vite JSX in .js:** Desteklenmiyor. Dosyalar `.jsx` olacak.

5. **Flex-only:** Grid layout KULLANMA. `flex flex-col`, `flex flex-row`, `flex-1`, `flex-[2]` gibi.
