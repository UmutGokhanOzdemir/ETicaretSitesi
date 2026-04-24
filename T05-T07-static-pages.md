# T05, T06, T07 — Contact, Team, About Sayfaları

Üç sayfa da kısa olduğu için tek prompt'ta halledeceğiz.

## Context
`@00-CONTEXT.md` oku. Header/Footer değişmez.

## Görev

### T05 — `src/pages/ContactPage.jsx`

**Section 1: Hero (bg-light py-12):**
- Sol: "Contact" (text-primary text-sm font-bold) + "Get in touch today!" (text-5xl font-bold text-dark) + açıklama
- Sağ: Dekoratif görsel (herhangi bir picsum)

**Section 2: Contact Info Cards (bg-white py-20):**
- Flex flex-col md:flex-row gap-8
- 3 kart (ortadaki büyük/öne çıkan - bg-dark text-white, diğerleri bg-white border):
  - Kart 1: Phone ikonu + 2 telefon + "Get Support" butonu
  - Kart 2 (öne çıkan, koyu): Mail ikonu + 2 email + butonu
  - Kart 3: Location ikonu + adres + buton
- Her kart flex flex-col items-center gap-4 p-8

**Section 3: "We Can't Wait to Meet You" (bg-white py-20 text-center):**
- Büyük başlık + "Let's Talk" butonu (bg-primary text-white rounded px-10 py-4)

Route: `<Route path="/contact" component={ContactPage} />`

### T06 — `src/pages/TeamPage.jsx`

**Section 1: Hero Breadcrumb (bg-light py-6):**
- Home > Team

**Section 2: Hero Title (bg-white py-16 text-center):**
- "WHAT WE DO" (text-sm text-primary font-bold)
- "Innovation tailored for you" (text-5xl font-bold)
- Breadcrumb tekrar

**Section 3: Meet Our Team (bg-white py-20):**
- `max-w-[1050px] mx-auto px-4 text-center`
- "Meet Our Team" (text-4xl font-bold) + açıklama
- Team member cards grid (flex flex-wrap justify-center gap-8 mt-12):
  - **3 üye minimum**. Her kart:
    - Fotoğraf (w-[316px] h-[231px] object-cover) - picsum.photos
    - Altında: "İsim" (font-bold text-dark) + "Unvan" (text-text font-bold text-sm) + 3 sosyal medya ikonu (FaFacebook, FaInstagram, FaTwitter - text-primary)
  - Ekip üyeleri:
    1. **Gökhan Özdemir** — Project Manager (LinkedIn profil fotoğrafı yerine `https://i.pravatar.cc/316?img=60`)
    2. **[Senin kendi ismin]** — Full Stack Developer (`https://i.pravatar.cc/316?img=33`)
    3. (Opsiyonel 3-5 üye daha ekle, örn: "John Doe - Designer", "Jane Smith - UI Developer")

Route: `<Route path="/team" component={TeamPage} />`

### T07 — `src/pages/AboutPage.jsx`

**Section 1: Hero (bg-light py-20):**
- Sol: "ABOUT COMPANY" (text-sm font-bold) + "About us" (text-6xl font-bold) + açıklama + "Get Quote Now" butonu
- Sağ: Görsel

**Section 2: Stats (bg-white py-16):**
- Flex flex-col md:flex-row gap-8 justify-around
- 4 kutu: "15K Happy Customers", "150K Monthly Visitors", "15 Countries Worldwide", "100+ Top Partners" - her biri text-4xl font-bold + altında text-sm

**Section 3: Video/Image placeholder (bg-white py-12):**
- Sadece büyük bir görsel (w-full h-[500px] object-cover) + play ikonu overlay

**Section 4: "Problems trying to resolve" text block (bg-white py-12):**
- Sol: küçük başlık + büyük başlık
- Sağ: paragraf + buton

**Section 5: Team (bg-light py-20):**
- "Big Companies Are Here" başlığı
- 6 gri logo placeholder (sadece text olarak "BRAND 1", "BRAND 2" vs.)

**Section 6: CTA (bg-primary py-16 text-white text-center):**
- "WORK WITH US" başlık + "Now Let's grow Yours" + "Button" butonu

Route: `<Route path="/about" component={AboutPage} />`

## Ek Görevler

### Header linklerini aktive et
`src/layout/Header.jsx`'te şu linkler zaten var mı kontrol et, yoksa ekle:
- `<Link to="/">Home</Link>`
- `<Link to="/shop">Shop</Link>`
- `<Link to="/about">About</Link>`
- `<Link to="/team">Team</Link>`
- `<Link to="/contact">Contact</Link>`

Mobile menu'ye de aynı linkleri ekle.

### PageContent.jsx final
Tüm route'lar tanımlanmış olmalı:
```jsx
<Switch>
  <Route exact path="/" component={HomePage} />
  <Route path="/shop" component={ShopPage} />
  <Route path="/product/:id" component={ProductDetailPage} />
  <Route path="/contact" component={ContactPage} />
  <Route path="/team" component={TeamPage} />
  <Route path="/about" component={AboutPage} />
</Switch>
```

## Kalite Kriterleri
- Tüm sayfalar ayrı component
- Mobile-first responsive
- Tailwind only, Flex only
- Fotoğraflar için `https://picsum.photos/seed/XXX/w/h` veya `https://i.pravatar.cc/XXX`

## Test
- `/contact`, `/team`, `/about` — hepsi açılmalı
- Header menüsünden geçişler çalışmalı
- Mobile'da her sayfa düzgün görünmeli

## Commit
```bash
git add .
git commit -m "feat(T05-T07): add Contact, Team, and About pages"
git push
```
