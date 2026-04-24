# T08 & T10 — Sign Up ve Login Forms

Birlikte yapıyoruz çünkü react-hook-form ve axios instance ikisinde de gerekli.

## Context
`@00-CONTEXT.md` oku.

## Kurulum

```bash
npm install react-hook-form axios
```

Eğer axios zaten kuruluysa tekrar kurma.

## Görev 1: Axios Instance

### `src/api/axiosInstance.js` oluştur

```js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor — localStorage'dan token ekle
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default axiosInstance
```

## Görev 2: T08 — Sign Up Form

### `src/pages/SignUpPage.jsx`

**İskelet:**
- Full width bg-white, py-12, items-center flex flex-col
- `max-w-md mx-auto px-4 flex flex-col gap-6`
- Başlık: "Sign Up" (text-3xl font-bold text-dark text-center)
- Form (react-hook-form kullan):

**Form Alanları:**

1. **Name** (input type="text"): 
   - min 3 karakter (required, minLength: 3)
   - error: "Name must be at least 3 characters"

2. **Email** (input type="email"):
   - required + pattern ile email validasyonu
   - error: "Please enter a valid email"

3. **Password** (input type="password"):
   - required, min 8 karakter
   - pattern: en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter
   - error mesajı pattern'e göre

4. **Password Validation** (input type="password"):
   - `watch('password')` ile karşılaştır, eşit olmalı
   - error: "Passwords do not match"

5. **Role** (select): 
   - Component mount olduğunda `GET /roles` isteği at (useEffect + axiosInstance)
   - response'u state'e koy, select options olarak render et
   - default seçili: Customer role id

6. **Eğer role === 'store' seçilirse**, 4 ek alan görünür:
   - **Store Name**: min 3 karakter
   - **Store Phone**: TR telefon pattern `/^(\+90|0)?5\d{9}$/`
   - **Store Tax ID**: pattern `/^T\d{4}V\d{6}$/` (TXXXXVXXXXXX formatı)
   - **Store Bank Account (IBAN)**: IBAN pattern

7. **Submit butonu**: bg-primary text-white rounded px-10 py-3
   - Submit sırasında disabled + spinner göster (bir mini spinner component, sadece CSS ile `animate-spin` class'ı)

**Form Submission:**
```js
const onSubmit = async (data) => {
  setLoading(true)
  try {
    // Eğer role === 'store' ise payload: { name, email, password, role_id, store: { name: store_name, phone, tax_no, bank_account } }
    // Değilse: { name, email, password, role_id }
    const payload = data.role_id === 'store_id' 
      ? { name, email, password, role_id, store: { name: data.store_name, phone: data.store_phone, tax_no: data.store_tax_id, bank_account: data.store_bank_account } }
      : { name, email, password, role_id }
    
    await axiosInstance.post('/signup', payload)
    toast.success("You need to click link in email to activate your account!")
    history.goBack()  // useHistory'den
  } catch (err) {
    toast.error("An error occurred. Please try again.")
    // form sayfada kalır
  } finally {
    setLoading(false)
  }
}
```

### Route Ekle
```jsx
<Route path="/signup" component={SignUpPage} />
```

## Görev 3: T10 — Login Form

```bash
npm install react-gravatar md5
```

### `src/pages/LoginPage.jsx`

**İskelet:** SignUp'ın sade versiyonu.

**Form Alanları (react-hook-form):**
1. **Email**: required + email pattern
2. **Password**: required (validation yok, sadece required)
3. **Remember Me** (checkbox): bg-primary

**Form Submission:**
```js
const onSubmit = async (data) => {
  setLoading(true)
  try {
    const res = await axiosInstance.post('/login', { 
      email: data.email, 
      password: data.password 
    })
    
    // Token'ı kaydet (Remember Me işaretliyse)
    if (data.rememberMe) {
      localStorage.setItem('token', res.data.token)
    }
    
    // User bilgisini store'a kaydet (T09'dan sonra action dispatch edilecek)
    // Şimdilik localStorage'a da yaz
    localStorage.setItem('user', JSON.stringify(res.data))
    
    // Önceki sayfaya dön
    history.goBack()
    
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed. Please check your credentials.")
    // form sayfada kalır, user input'u kaybolmaz
  } finally {
    setLoading(false)
  }
}
```

**Mock test kullanıcıları not olarak ekle (yorum):**
```js
// Test users (password: 12345):
// customer@commerce.com
// store@commerce.com
// admin@commerce.com
```

### Route Ekle
```jsx
<Route path="/login" component={LoginPage} />
```

### Header Update (Gravatar)

`Header.jsx`'te, eğer localStorage'da user varsa "Login / Register" yerine avatar + isim göster:

```jsx
import Gravatar from 'react-gravatar'

// State veya basit bir check (T09'dan sonra Redux'tan alınacak)
const [user, setUser] = useState(() => {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
})

// Render:
{user ? (
  <div className="flex items-center gap-2">
    <Gravatar email={user.email} size={30} className="rounded-full" />
    <span className="text-primary font-bold text-sm">{user.name}</span>
  </div>
) : (
  <Link to="/login" className="flex items-center gap-1 text-primary font-bold">
    <User size={16} /> Login / Register
  </Link>
)}
```

## Toast Container

`App.jsx`'e toast container ekle (yoksa):

```jsx
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// App component return'ünde:
<>
  <Header />
  <PageContent />
  <Footer />
  <ToastContainer position="top-right" />
</>
```

## Kalite Kriterleri
- react-hook-form kullan (`register`, `handleSubmit`, `formState: { errors }`, `watch`)
- Her error mesajı input'un altında text-alert text-xs görünmeli
- Submit sırasında button disabled + spinner
- Toast messages Türkçe ya da İngilizce (tutarlı)
- Shirt kod, clean structure

## Test
- `/signup` ve `/login` sayfaları açılmalı
- Hatalı email girişinde validation çalışmalı
- "store" role seçilince ekstra alanlar açılmalı
- Test credentials ile login ol, toast göster, header'da avatar belirsin
- Console'da network isteği göz at

## Commit
```bash
git add .
git commit -m "feat(T08,T10): add signup and login forms with react-hook-form and axios instance"
git push
```
