# T17-T23 — Cart, Checkout, Order, Previous Orders

Son sprint. Bu 7 task'ı birbirine bağlı olarak yapacağız.

## Context
`@00-CONTEXT.md` oku. T09 Redux, T11-T16 API integration bitmiş olmalı.

---

## T17 — Add Product to Shopping Cart

### ProductCard'a + ProductDetail'a "Add to Cart" butonu

`src/components/ProductCard.jsx`'te Link'in dışında (kart'ın altında) bir buton:

```jsx
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/actions/cartActions'
import { toast } from 'react-toastify'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  
  const handleAddToCart = (e) => {
    e.preventDefault()  // Link'in navigate etmesini engelle
    dispatch(addToCart(product))
    toast.success(`${product.name || product.title} added to cart!`)
  }
  
  return (
    <Link to={`...`} className="...">
      {/* Kart içeriği */}
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-primary text-white px-4 py-2 rounded text-sm"
      >
        Add to Cart
      </button>
    </Link>
  )
}
```

### Header'da Sepet Dropdown

`src/layout/Header.jsx`'te ShoppingCart ikonunun yanına count badge + dropdown:

```jsx
const cart = useSelector(s => s.shoppingCart.cart)
const cartCount = cart.reduce((sum, item) => sum + item.count, 0)

<div className="relative group">
  <button className="flex items-center gap-1 text-primary font-bold">
    <ShoppingCart size={16} />
    <span>{cartCount}</span>
  </button>
  
  {/* Dropdown */}
  {cart.length > 0 && (
    <div className="absolute hidden group-hover:flex top-full right-0 bg-white shadow-lg p-4 min-w-[300px] flex-col gap-3 z-50">
      <h3 className="font-bold text-dark">Sepetim ({cartCount} Ürün)</h3>
      {cart.map(item => (
        <div key={item.product.id} className="flex gap-3 items-center border-b pb-2">
          <img src={item.product.images?.[0]?.url} className="w-16 h-16 object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-dark truncate">{item.product.name}</p>
            <p className="text-xs text-text">Adet: {item.count}</p>
            <p className="text-sm text-secondary font-bold">${item.product.price}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <Link to="/cart" className="flex-1 bg-primary text-white text-center py-2 rounded">
          Sepete Git
        </Link>
        <Link to="/order" className="flex-1 bg-success text-white text-center py-2 rounded">
          Siparişi Tamamla
        </Link>
      </div>
    </div>
  )}
</div>
```

**Commit:** `feat(T17): add to cart functionality with header dropdown`

---

## T18 — Shopping Cart Page

### `src/pages/CartPage.jsx`

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { updateCartCount, removeFromCart, toggleCartChecked } from '../store/actions/cartActions'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector(s => s.shoppingCart.cart)
  
  const selectedItems = cart.filter(i => i.checked)
  const subtotal = selectedItems.reduce((sum, i) => sum + (i.product.price * i.count), 0)
  const shipping = subtotal > 100 ? 0 : 30
  const total = subtotal + shipping
  
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
      {/* Sol: Cart Table */}
      <div className="flex-[2] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-dark">Sepetim ({cart.length} Ürün)</h1>
        
        {cart.length === 0 ? (
          <p className="text-text">Sepetiniz boş.</p>
        ) : (
          cart.map(item => (
            <div key={item.product.id} className="flex items-center gap-4 border border-border p-4 rounded">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => dispatch(toggleCartChecked(item.product.id))}
                className="w-5 h-5"
              />
              <img 
                src={item.product.images?.[0]?.url} 
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1">
                <p className="font-bold text-dark">{item.product.name}</p>
                <p className="text-sm text-text">{item.product.description?.slice(0, 60)}...</p>
              </div>
              
              {/* Count controls */}
              <div className="flex items-center gap-2 border border-border rounded">
                <button 
                  onClick={() => dispatch(updateCartCount(item.product.id, -1))}
                  className="px-3 py-2 text-dark"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2">{item.count}</span>
                <button 
                  onClick={() => dispatch(updateCartCount(item.product.id, 1))}
                  className="px-3 py-2 text-dark"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <p className="font-bold text-dark w-20 text-right">
                ${(item.product.price * item.count).toFixed(2)}
              </p>
              
              <button 
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="text-alert"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Sağ: Order Summary */}
      {cart.length > 0 && (
        <div className="flex-1 border border-border rounded p-6 flex flex-col gap-4 h-fit">
          <h2 className="text-xl font-bold text-dark">Sipariş Özeti</h2>
          <div className="flex justify-between text-sm">
            <span className="text-text">Ürünler Toplamı</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text">Kargo Toplamı</span>
            <span className="font-bold">${shipping.toFixed(2)}</span>
          </div>
          {shipping === 0 && (
            <p className="text-xs text-success">✓ 100$+ alışverişte kargo bedava!</p>
          )}
          <hr className="border-border" />
          <div className="flex justify-between text-lg font-bold">
            <span>Toplam</span>
            <span className="text-secondary">${total.toFixed(2)}</span>
          </div>
          <Link 
            to="/order"
            className="bg-primary text-white text-center py-3 rounded font-bold hover:opacity-90"
          >
            Sepeti Onayla
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage
```

### Route
```jsx
<Route path="/cart" component={CartPage} />
```

**Commit:** `feat(T18): shopping cart page with count controls and order summary`

---

## T19 — Order Summary Component

**Not:** Order Summary'yi T18'de zaten CartPage'de yaptık. Ayrıca component olarak çıkarmak istersen:

### `src/components/OrderSummary.jsx`

CartPage'deki summary bölümünü component olarak çıkar, props ile `subtotal, shipping, total` al.

Sonra hem CartPage'de hem OrderPage'de kullan.

**Commit:** `refactor(T19): extract OrderSummary component`

---

## T20 — T21 — Create Order Page (2 Steps)

### `src/pages/OrderPage.jsx`

ProtectedRoute ile korumalı olmalı. Önce bir `ProtectedRoute` component yazalım.

### `src/components/ProtectedRoute.jsx`

```jsx
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector(s => s.client.user)
  const isLoggedIn = !!user?.email
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
```

### OrderPage.jsx (iki step'i içerir)

```jsx
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

function OrderPage() {
  const [step, setStep] = useState(1)  // 1 = Address, 2 = Credit Card
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector(s => s.shoppingCart.cart)
  
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  
  // Address fetch
  useEffect(() => {
    axiosInstance.get('/user/address')
      .then(res => setAddresses(res.data))
      .catch(err => console.error(err))
  }, [])
  
  // Card fetch when step 2
  useEffect(() => {
    if (step === 2) {
      axiosInstance.get('/user/card')
        .then(res => setCards(res.data))
        .catch(err => console.error(err))
    }
  }, [step])
  
  const handlePlaceOrder = async () => {
    // POST /order
    const payload = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: Number(selectedCard.card_no),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: 321,  // UI'dan alınacak (güvenlik için store'da saklanmaz)
      price: cart.filter(i => i.checked).reduce((sum, i) => sum + i.product.price * i.count, 0),
      products: cart.filter(i => i.checked).map(i => ({
        product_id: i.product.id,
        count: i.count,
        detail: 'standard'
      }))
    }
    
    try {
      await axiosInstance.post('/order', payload)
      toast.success('Tebrikler! Siparişiniz başarıyla oluşturuldu.')
      // Cart'ı temizle
      dispatch({ type: 'SET_CART', payload: [] })
      // Home'a yönlendir
      history.push('/')
    } catch (err) {
      toast.error('Sipariş oluşturulamadı.')
    }
  }
  
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Step indicator */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setStep(1)}
          className={`flex-1 py-4 border-b-4 ${step === 1 ? 'border-primary text-primary font-bold' : 'border-border text-text'}`}
        >
          1. Adres Bilgileri
        </button>
        <button 
          onClick={() => setStep(2)}
          disabled={!selectedAddress}
          className={`flex-1 py-4 border-b-4 ${step === 2 ? 'border-primary text-primary font-bold' : 'border-border text-text'}`}
        >
          2. Ödeme Seçenekleri
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[2]">
          {step === 1 && (
            <AddressStep
              addresses={addresses}
              setAddresses={setAddresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              onNext={() => selectedAddress && setStep(2)}
            />
          )}
          {step === 2 && (
            <CardStep
              cards={cards}
              setCards={setCards}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </div>
        
        {/* Order summary sağda */}
        <div className="flex-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}
```

### AddressStep + CardStep inline component'ler

`AddressStep`: react-hook-form ile adres ekleme formu + mevcut adresleri listeleme + seçme.

Fields: title, name, surname, phone, city (İl - dropdown), district (İlçe), neighborhood (Mahalle), address (detay).

Validasyonlar:
- title: required
- name/surname: min 2 char
- phone: TR pattern
- city: required dropdown
- district: required
- neighborhood: required
- address: min 10 char

Mevcut adresleri `flex flex-col gap-4` olarak listele, radio button ile seçim.

`CardStep`: Kart bilgileri formu + mevcut kartları listeleme.

Fields: card_no (16 digit), expire_month (1-12), expire_year (current year+), name_on_card.

### Route
```jsx
<ProtectedRoute path="/order" component={OrderPage} />
```

**Commit:** `feat(T20-T22): order page with address and credit card steps, place order`

---

## T23 — Previous Orders Page

### `src/pages/PreviousOrdersPage.jsx`

```jsx
import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import Spinner from '../components/Spinner'
import { ChevronDown, ChevronUp } from 'lucide-react'

function PreviousOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  
  useEffect(() => {
    axiosInstance.get('/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])
  
  if (loading) return <Spinner />
  
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-dark mb-6">Geçmiş Siparişlerim</h1>
      
      {orders.length === 0 ? (
        <p className="text-text">Henüz siparişiniz bulunmuyor.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order.id} className="border border-border rounded">
              <button
                onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-light"
              >
                <div className="flex-1 text-left">
                  <p className="font-bold text-dark">Sipariş #{order.id}</p>
                  <p className="text-sm text-text">
                    {new Date(order.order_date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <p className="font-bold text-secondary text-lg">${order.price?.toFixed(2)}</p>
                {expandedOrderId === order.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {expandedOrderId === order.id && (
                <div className="p-4 border-t border-border flex flex-col gap-2">
                  <p className="text-sm text-text">
                    Kart: **** {String(order.card_no).slice(-4)} ({order.card_name})
                  </p>
                  <p className="text-sm text-text">
                    Son Kullanma: {order.card_expire_month}/{order.card_expire_year}
                  </p>
                  <div>
                    <p className="font-bold text-dark">Ürünler:</p>
                    {order.products?.map((p, idx) => (
                      <p key={idx} className="text-sm text-text ml-4">
                        • Ürün #{p.product_id} × {p.count} ({p.detail})
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PreviousOrdersPage
```

### Header'a "Previous Orders" linki

User menüsünde (kullanıcı avatar'ına hover'da açılan dropdown'a):

```jsx
{user?.email && (
  <div className="relative group">
    <button className="flex items-center gap-2">
      <Gravatar email={user.email} size={30} className="rounded-full" />
      <span className="text-primary font-bold">{user.name}</span>
    </button>
    <div className="absolute hidden group-hover:flex top-full right-0 bg-white shadow-lg flex-col min-w-[200px] z-50">
      <Link to="/previous-orders" className="px-4 py-3 hover:bg-light">Geçmiş Siparişlerim</Link>
      <button 
        onClick={handleLogout}
        className="px-4 py-3 hover:bg-light text-left"
      >
        Çıkış Yap
      </button>
    </div>
  </div>
)}
```

Logout handler:
```js
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  dispatch(setUser({}))
  history.push('/')
}
```

### Route (korumalı)
```jsx
<ProtectedRoute path="/previous-orders" component={PreviousOrdersPage} />
```

**Commit:** `feat(T23): previous orders page with collapsible order details and logout`

---

## Final Polish

### 1. Tüm sayfaları test et

```
✅ / (Home)
✅ /shop
✅ /shop/kadin/tisort/1
✅ /shop/kadin/tisort/1/cool-shirt/123
✅ /contact
✅ /team
✅ /about
✅ /signup
✅ /login (try: customer@commerce.com / 12345)
✅ /cart
✅ /order (login gerekli)
✅ /previous-orders (login gerekli)
```

### 2. README.md'ye proje açıklaması yaz

```md
# E-Ticaret Projesi - Bandage

## Kurulum
```bash
npm install
npm run dev
```

## Teknolojiler
- React, Vite, Tailwind CSS v4
- Redux + Thunk, React Router v5
- Axios, react-hook-form
- Swiper, lucide-react, react-icons, react-paginate, react-toastify, react-gravatar

## Özellikler
- 11 sayfa (Home, Shop, Product Detail, Contact, Team, About, Sign Up, Login, Cart, Order, Previous Orders)
- Mobile-first responsive tasarım
- Kullanıcı kaydı ve girişi
- API entegrasyonu (workintech-fe-ecommerce.onrender.com)
- Sepet yönetimi ve sipariş oluşturma
- Protected routing

## Demo
https://e-ticaret-sitesi-seven.vercel.app
```

### Final Commit
```bash
git add .
git commit -m "docs: add README with project overview"
git push
```

**Vercel otomatik deploy edecek, sonrasında canlı site tamamen çalışır durumda olacak!** 🎉
