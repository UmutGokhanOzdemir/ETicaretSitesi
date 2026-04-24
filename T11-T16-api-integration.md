# T11, T12, T13, T14, T15, T16 — API Integration

Redux kurulduktan sonra tüm API bağlantılarını sırayla yapıyoruz.

## Context
`@00-CONTEXT.md` oku. T09 (Redux) bitmiş olmalı.

## T11 — Auto Login from localStorage

### `src/App.jsx` güncellemesi

App mount olduğunda token varsa verify et, user bilgisini store'a yaz.

```jsx
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { verifyToken } from './store/actions/clientActions'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}
```

`verifyToken` thunk zaten T09'da tanımlandı, hem `/verify` endpoint'ini çağırıyor hem de başarısızlıkta token'ı localStorage'dan siliyor.

**Commit:** `feat(T11): auto-login from localStorage token on app mount`

---

## T12 — Fetch Categories + Header Dropdown

### App mount'ta categories fetch et

`src/App.jsx`'e ekle:

```jsx
useEffect(() => {
  dispatch(verifyToken())
  dispatch(fetchCategories())  // bunu ekle
}, [dispatch])
```

### Header'a Shop Dropdown

`src/layout/Header.jsx`'te "Shop" linkini dropdown'a çevir:

```jsx
const categories = useSelector(s => s.product.categories)

// Desktop menu'de "Shop" satırını:
<div className="relative group">
  <button className="flex items-center gap-1 text-dark font-bold">
    Shop <ChevronDown size={16} />
  </button>
  
  {/* Dropdown - hover'da açılır */}
  <div className="absolute hidden group-hover:flex left-0 top-full bg-white shadow-lg p-8 min-w-[400px] flex-row gap-12 z-50">
    {/* Kadın kolonu */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-dark mb-2">Kadın</h3>
      {categories
        .filter(c => c.gender === 'k')
        .map(cat => (
          <Link
            key={cat.id}
            to={`/shop/kadin/${cat.title}/${cat.id}`}
            className="text-text hover:text-dark"
          >
            {cat.title}
          </Link>
        ))}
    </div>
    
    {/* Erkek kolonu */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-dark mb-2">Erkek</h3>
      {categories
        .filter(c => c.gender === 'e')
        .map(cat => (
          <Link
            key={cat.id}
            to={`/shop/erkek/${cat.title}/${cat.id}`}
            className="text-text hover:text-dark"
          >
            {cat.title}
          </Link>
        ))}
    </div>
  </div>
</div>
```

### HomePage'e Top 5 Categories

`src/pages/HomePage.jsx`'te "Editor's Pick" section'ını Redux data ile güncelle (eğer kategori varsa):

```jsx
const categories = useSelector(s => s.product.categories)
const topCategories = [...categories]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5)
```

Top 5'i Editor's Pick kartları olarak göster. Eğer API henüz boş dönüyorsa mock verilere fallback et.

**Commit:** `feat(T12): fetch categories and add shop dropdown to header`

---

## T13 — Fetch Products on Shop Page

### `src/pages/ShopPage.jsx`

```jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../store/actions/productActions'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'

function ShopPage() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()  // /shop/:gender/:categoryName/:categoryId
  const { productList, total, fetchState, limit, offset, filter } = useSelector(s => s.product)
  
  useEffect(() => {
    dispatch(fetchProducts({ category: categoryId, limit, offset, filter }))
  }, [dispatch, categoryId, limit, offset, filter])
  
  return (
    <div>
      {/* Breadcrumb, CategoryCards, FilterBar - aynı kalsın */}
      
      {/* Products Grid */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          {fetchState === 'FETCHING' && <Spinner />}
          {fetchState === 'FAILED' && <p className="text-alert text-center">Failed to load products</p>}
          {fetchState === 'FETCHED' && (
            <div className="flex flex-wrap gap-8 justify-center">
              {productList.map(product => (
                <div key={product.id} className="w-full md:w-[48%] lg:w-[23%]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
```

### `src/components/Spinner.jsx`

```jsx
function Spinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Spinner
```

### ProductCard API data ile çalışsın

`src/components/ProductCard.jsx`'te product prop'unu API response formatına uyarla:
```js
// API product: { id, name, description, price, images: [{url}], ... }
// Card'da kullan:
product.name, product.price, product.images[0]?.url, product.description
```

**Commit:** `feat(T13): fetch and display products on shop page with loading state`

---

## T14 — Query Parameters (Category, Filter, Sort)

### FilterBar'a functionality ekle

`src/pages/ShopPage.jsx`'te filter bar'ı controlled yap:

```jsx
const [filterInput, setFilterInput] = useState('')
const [sortValue, setSortValue] = useState('')

// URL'yi de güncelle (useHistory):
const history = useHistory()
const location = useLocation()

useEffect(() => {
  const params = new URLSearchParams(location.search)
  const urlFilter = params.get('filter') || ''
  const urlSort = params.get('sort') || ''
  setFilterInput(urlFilter)
  setSortValue(urlSort)
  
  dispatch(fetchProducts({ 
    category: categoryId, 
    limit, 
    offset, 
    filter: urlFilter,
    sort: urlSort
  }))
}, [location.search, categoryId, dispatch, limit, offset])

const handleFilter = () => {
  const params = new URLSearchParams()
  if (filterInput) params.set('filter', filterInput)
  if (sortValue) params.set('sort', sortValue)
  history.push(`${location.pathname}?${params.toString()}`)
}
```

**Filter input:**
```jsx
<input
  type="text"
  placeholder="Search..."
  value={filterInput}
  onChange={(e) => setFilterInput(e.target.value)}
  className="border border-border rounded px-3 py-2"
/>
```

**Sort select:**
```jsx
<select 
  value={sortValue} 
  onChange={(e) => setSortValue(e.target.value)}
  className="border border-border rounded px-3 py-2"
>
  <option value="">Popularity</option>
  <option value="price:asc">Price: Low to High</option>
  <option value="price:desc">Price: High to Low</option>
  <option value="rating:asc">Rating: Low to High</option>
  <option value="rating:desc">Rating: High to Low</option>
</select>
```

**Filter butonu:**
```jsx
<button
  onClick={handleFilter}
  className="bg-primary text-white px-6 py-2 rounded"
>
  Filter
</button>
```

**Commit:** `feat(T14): add filter, sort query parameters with URL sync`

---

## T15 — Pagination

```bash
npm install react-paginate
```

### `src/pages/ShopPage.jsx`'e pagination ekle

```jsx
import ReactPaginate from 'react-paginate'

// ...

const handlePageClick = (event) => {
  const newOffset = event.selected * limit
  dispatch(setOffset(newOffset))
}

// Render:
<div className="flex justify-center py-8">
  <ReactPaginate
    breakLabel="..."
    nextLabel="Next"
    onPageChange={handlePageClick}
    pageRangeDisplayed={3}
    pageCount={Math.ceil(total / limit)}
    previousLabel="First"
    renderOnZeroPageCount={null}
    containerClassName="flex gap-0"
    pageLinkClassName="px-4 py-3 border border-border bg-white text-primary"
    activeLinkClassName="bg-primary text-white"
    previousLinkClassName="px-6 py-3 border border-border bg-light text-muted"
    nextLinkClassName="px-6 py-3 border border-border bg-primary text-white"
    disabledClassName="opacity-50 cursor-not-allowed"
  />
</div>
```

Actions'tan `setOffset`'i import etmeyi unutma.

**Commit:** `feat(T15): add pagination with react-paginate`

---

## T16 — Product Detail Page Implementation

### Route güncelle

`src/layout/PageContent.jsx`:
```jsx
<Route 
  path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
  component={ProductDetailPage} 
/>
{/* Eski /product/:id route'unu koruyabilirsin ya da kaldırabilirsin */}
```

### `src/pages/ProductDetailPage.jsx`'i güncelle

```jsx
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import Spinner from '../components/Spinner'
import { ArrowLeft } from 'lucide-react'

function ProductDetailPage() {
  const { productId } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    axiosInstance.get(`/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [productId])
  
  if (loading) return <Spinner />
  if (!product) return <p className="text-center py-12">Product not found</p>
  
  return (
    <div>
      {/* Back button */}
      <button 
        onClick={() => history.goBack()}
        className="flex items-center gap-2 text-primary font-bold px-4 py-2"
      >
        <ArrowLeft size={20} /> Back
      </button>
      
      {/* Rest of the UI - şimdi real product data ile */}
      {/* product.name, product.price, product.images, product.description, etc. */}
    </div>
  )
}
```

### ProductCard'a doğru link

`src/components/ProductCard.jsx`'te Link'i güncelle:
```jsx
<Link to={`/shop/${product.gender || 'k'}/${product.categoryName || 'tisort'}/${product.category_id}/${slugify(product.name)}/${product.id}`}>
```

`slugify` helper'ı oluştur:
```js
// src/utils/slugify.js
export const slugify = (str) => str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
```

### Card hover effect
ProductCard'da:
```jsx
<Link className="cursor-pointer hover:scale-105 transition-transform">
```

**Commit:** `feat(T16): implement product detail page with real API data and back navigation`

---

## Final Test Checklist

- [ ] `/` — Hero, editor's pick, products render oluyor
- [ ] `/shop` — tüm ürünler geliyor
- [ ] `/shop/kadin/tisort/1` — filtered products
- [ ] `/shop?filter=siyah&sort=price:asc` — query param çalışıyor
- [ ] Pagination sayfa değiştiriyor
- [ ] ProductCard tıklanınca detay sayfasına gidiyor
- [ ] Detail sayfası real data ile doluyor, back butonu çalışıyor
- [ ] Header dropdown kategorileri gösteriyor

## Overall Commit (opsiyonel, yukarıdaki commit'ler yeterli)
```bash
git commit -m "feat(T11-T16): complete API integration for categories, products, and product detail"
```
