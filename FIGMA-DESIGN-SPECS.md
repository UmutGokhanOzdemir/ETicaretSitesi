# 🎨 FIGMA DESIGN SPECS — Master Reference

Bu dosya tüm Figma sayfalarının pixel-perfect ölçülerini içerir. Claude Code bu dosyayı referans alarak Figma ile birebir uyumlu kod yazmalıdır.

**Kaynak:** Figma Ecommerce UI Kit (Demo Version) — captain-design.com  
**Workflow:** Mobile-first, Flex-only, Tailwind utility class'ları (custom CSS yok).

---

## 📐 GLOBAL DESIGN TOKENS

### Renk Paleti (Aktif - Greenery + Pearl 7)
```css
--color-primary: #23A6F0;        /* Mavi - linkler, butonlar, social icons */
--color-secondary: #23856D;      /* Yeşil - 2. slide bg, fiyat */
--color-success: #2DC071;        /* Parlak yeşil - SHOP NOW butonları */
--color-dark: #252B42;           /* Koyu - başlıklar, dark cards */
--color-text: #737373;           /* Gri - paragraf, second-text */
--color-muted: #BDBDBD;          /* Silik gri - placeholder, disabled */
--color-alert: #E74040;          /* Kırmızı - NEW etiketi */
--color-alert-orange: #E77C40;   /* Turuncu */
--color-disabled-blue: #8EC2F2;  /* Silik mavi */
--color-light: #FAFAFA;          /* Açık gri arkaplan */
--color-border: #E6E6E6;         /* Kenarlık */
--color-input-bg: #F9F9F9;       /* Input arkaplan */
--color-select-border: #DDDDDD;  /* Select kenarlığı */
--color-star: #F3CD03;           /* Yıldız ratings (sarı) ⭐ */
```

### Tipografi — Montserrat
```css
font-family: 'Montserrat', sans-serif;
```

| Element | Weight | Size | Line Height | LS |
|---|---|---|---|---|
| h1 | 800 | 58px | 80px | 0.2px |
| h2 | 700 | 40px | 57px | 0.2px |
| h3 | 700 | 24px | 32px | 0.1px |
| h4 | 500 | 20px | 30px | 0.2px |
| h5 | 700 | 16px | 24px | 0.1px |
| h6 | 600 | 14px | 24px | 0.2px |
| btn-text | 700 | 14px | 22-28px | 0.2px |
| paragraph | 400-500 | 14px | 20px | 0.2px |
| small | 400 | 12px | 16px | 0.2px |
| mobile-menu | 400 | 30px | 45px | 0.2px |
| link | 600 | 14px | 24px | 0.2px |
| input-text | 400 | 14px | 28px | 0.2px |
| input-text-lg | 400 | 20px | 28px | 0.2px |

---

## 🧩 COMPONENTS

### 👤 USER / TEAM CARD

**24 farklı kombinasyon** prop'larla kontrol edilir:
- `round`: false (köşeli) / true (border-radius: 20px)
- `dark`: false (#FFFFFF bg) / true (#252B42 bg)
- `padding`: false (image taşar) / true (25px iç padding)
- `circle`: false (square image) / true (128×128 yuvarlak avatar)
- `center`: false (sol hizalı) / true (orta hizalı)

#### Standard Card (round=false, padding=false)
```
Width: 230px
Height: 375px
Background: #FFFFFF veya #252B42
Border-radius: 0 (round=false) / 20px (round=true)

Image cover: 230×231px (top, full width)
Card content padding: 30px
Card content gap: 10px
```

#### Padded Card (padding=true)
```
Width: 230px
Height: 400px (padding eklendiği için daha uzun)
Padding: 25px 25px 0px (top/sides)
Image: 180×231px (border-radius 20px if round)
```

#### Circle Card (circle=true)
```
Width: 230px
Height: 297px (sadece avatar+content, kapak yok)
Padding: 25px 25px 0px
Avatar: 128×128px
Avatar border-radius: 200px (yuvarlak)
```

#### İçerik
```
H5 user-title: 16px/700, color: #252B42 (light) / #FFFFFF (dark)
Small job-description: 12px/400, color: #737373 (light) / #FFFFFF (dark)
Social icons row: gap 20px, icon size 24×24, color: #23A6F0
```

#### Tailwind Örnek
```jsx
// Standard light card, centered
<div className="flex flex-col items-center bg-white w-[230px]">
  <img className="w-full h-[231px] object-cover" src="..." />
  <div className="flex flex-col items-center p-[30px] gap-[10px]">
    <h5 className="text-base font-bold text-[#252B42] tracking-[0.1px]">Username</h5>
    <p className="text-xs text-[#737373] tracking-[0.2px]">Profession</p>
    <div className="flex gap-5">
      {/* Social icons - primary color */}
    </div>
  </div>
</div>
```

### ⭐ TESTIMONIAL CARD

**16 farklı kombinasyon:**
- `dark`: false / true
- `circle`: false / true
- `round`: false / true
- `horizontal`: false / true (image left, content right)
- `small`: false (with image) / true (no image, just content)
- `padding`: false / true

#### Vertical Standard
```
Width: 230px
Height: 456.01px (with image), 438.01px (circle), 317.01px (small)
Padding: 25px 25px 0px
Image: 180×146px (square) / 128×128 (circle)
Stars: 130.07px row, 5 × 22.01px stars, gap 5px
Star color: #F3CD03 ⭐
```

#### Horizontal
```
Width: 504-555px
Height: 252-302px
Image: 119px width (left side, full height)
Content padding: 25px 25px 35px, gap 10px
Round version: border-radius 20px
```

#### Small Variant (no image)
```
Width: 230px
Height: 317.01px
Avatar at bottom: 50×50px circle
Layout: stars → paragraph → avatar+name+role row
```

#### İçerik
```
Paragraph: 14px/400, color: #737373 (light) / #FFFFFF (dark), max 159px width
H5 user-title: 16px/700
H6 role/link: 14px/700, color: #23A6F0 (primary)
Stars: 5 yellow stars (#F3CD03)
```

### 🎬 VIDEO CARD
```
Width: 688px
Height: 363px
Background: #FFFFFF
Border-radius: 0 (round=false) / 20px (round=true)

Filter overlay: linear-gradient(180deg, rgba(0,0,0,0) 14.58%, rgba(56,56,56,0.84) 100%)

Play button:
  - Size: 92.6×92.6px
  - Background: #23A6F0 (primary)
  - Border-radius: 73.6px (full circle)
  - Padding: 34.8px 36.8px
  - Center horizontally + vertically
  - Icon: 19×23px white play triangle
```

### 📞 CONTACT FORM CARD

#### Horizontal Layout (default)
```
Width: 877px
Height: 610px
Layout: image left (267px wide) + form right (610px wide)

Image: 267×610px

Form:
  - Padding: 40px 50px
  - Gap: 40px
  - Background: #FFFFFF
  - Border-radius: 0 (Rounded=false) / 20px (Rounded=true)

H3 title: 24px/700, centered, color: #252B42

Form group: 510px wide, 84px height
  - Label (h6 style): 14px/700, color: #252B42
  - Input: 50px height, padding 0 21px
  - Input bg: #F9F9F9
  - Input border: 1px solid #E6E6E6
  - Input border-radius: 5px
  - Placeholder: 14px/400, color: #737373

Custom select:
  - Same styling as input
  - Border: 1px solid #DDDDDD
  - Dropdown arrow on right (8×14px, rotate 90deg)

Submit button:
  - Width: 510px (full)
  - Height: 52px
  - Padding: 15px 40px
  - Background: #23A6F0 (primary)
  - Border-radius: 5px
  - Text: 14px/700/white, "btn-text"
```

#### Vertical Layout (Horizontal=false)
```
Width: 657px (medium) / 328px (small)
Height: 566-610px
Padding: 40px 60px / 40px (small)
Form fields: 530px / 248px wide
Has subtitle (h5 + h3 together)
Two-column row for first/last name (gap 20px)
Textarea: 537×140px, 16px/700, muted color #BDBDBD
```

#### Small Variant
```
Width: 328px (single column)
Padding: 40px
Form fields: 248px wide
```

### 📧 SUBSCRIBE / NEWSLETTER

#### Standard (Lg=false)
```
Width: 450px
Height: 58px
Layout: input + button (right append)

Input:
  - Full width minus button
  - Background: #F9F9F9
  - Border: 1px solid #E6E6E6
  - Border-radius: 5px
  - Placeholder: 14px/400, color: #737373

Button (Subscribe):
  - Width: 117px (right append)
  - Background: #23A6F0
  - Border-radius: 0 5px 5px 0
  - Text: 14px/400/white, centered, "Subscribe"
```

#### Large (Lg=true)
```
Width: 450px
Height: 80px
Placeholder text: 20px (instead of 14px)
Same styling, just bigger
```

---

## 📄 SAYFA SPEC'LERİ

### Index (Cover) Sayfası
- Boyut: 1920 × 1483 px
- Bu kapak sayfası, projede kullanılmayacak (sadece referans)

### Tipografi Test Sayfaları
8 farklı font seti test sayfası mevcut. **Aktif:** Montserrat.

---

## 📝 EKLENEN SAYFALAR

✅ **Components - Cards Section** (Team, Testimonials, Video, Contact, Subscribe)

## 📝 HENÜZ EKLENMEMİŞ (TODO)

- [ ] Components - kalan kısım (Buttons, Inputs, Badges?)
- [ ] Home Page Desktop
- [ ] Home Page Mobile
- [ ] Shop Page Desktop
- [ ] Shop Page Mobile
- [ ] Product Detail Desktop
- [ ] Product Detail Mobile
- [ ] About Desktop + Mobile
- [ ] Team Desktop + Mobile
- [ ] Contact Desktop + Mobile
- [ ] Pricing Desktop + Mobile
- [ ] Stats
- [ ] Clients (Logo grid)
- [ ] Footer detail
- [ ] Blog

---

## 🎬 HERO COMPONENT (10 Varyasyon)

### Boyutlar
**Desktop:** `1440px × 747-852px`  
**Mobile:** `414px × 1109-2361px`

### Hero Slider Yapısı (Bandage'da kullanılacak)

#### Background
```
Image cover (full hero)
+ Filter overlay: rgba(0, 0, 0, 0.5) (Hero 1, 3, 4, 7)
   veya linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)) (Hero 3, 4)
```

#### Container
```
Padding: 112px 0px (desktop)
Gap: 80px between sections
Max-width: 1044px (desktop) / 414px (mobile)
```

#### İçerik Yapısı (vertical, gap 30-35px)
```
1. h5 tag-line: "SUMMER 2020"
   - Desktop: 16px/700, color: #FFFFFF
   - Letter-spacing: 0.1px
   
2. h1 headline: "NEW COLLECTION"
   - Desktop: 58px/700, line-height 80px
   - Mobile: 40px/700, line-height 50px
   - Color: #FFFFFF
   - Letter-spacing: 0.2px
   
3. h4 subheadline: "We know how large objects will act..."
   - Desktop: 20px/400, line-height 30px
   - Color: #FAFAFA (light-text-gray-1)
   - Letter-spacing: 0.2px
   
4. CTA Button (Hero 1 - SHOP NOW)
   - Desktop: 221×62px, padding 15px 40px
   - Mobile: 204×62px
   - Background: #2DC071 (success-color) ⭐
   - Text: 24px/700, color: #FFFFFF, "h3 style"
   - Border-radius: 5px
```

### Slider Controls

#### Indicators (Desktop bottom-center)
```
Width: 126px (mobile) / 1027px (desktop)
Active dot: 62px × 10px, white solid
Inactive dot: 63px × 10px, white opacity 0.5
Position: bottom 25-49px from hero bottom
```

#### Arrow Controls
```
Position:
  - Mobile: left/right 40px from edge
  - Desktop: left 40px / right 1381px (left/right pair)
  - Top: ~351-401px
  
Size: 24×44.47px (Chevron icon)
Color: #FFFFFF
Stroke: thin
```

### Bandage Hero için Önerilen Spec

```jsx
// Hero Slider container
<section className="relative w-full h-[716px] md:h-[852px] bg-cover bg-center"
  style={{ backgroundImage: "url(...)", }}>
  
  {/* Dark filter overlay */}
  <div className="absolute inset-0 bg-black/50" />
  
  {/* Content container */}
  <div className="relative max-w-[1044px] mx-auto pt-[112px] pb-[112px] px-4">
    <div className="flex flex-col items-start gap-[35px] py-12">
      {/* Tag */}
      <h5 className="text-base font-bold text-white tracking-[0.1px]">
        SUMMER 2020
      </h5>
      
      {/* Headline */}
      <h1 className="text-[40px] md:text-[58px] font-bold text-white tracking-[0.2px] leading-[50px] md:leading-[80px]">
        NEW COLLECTION
      </h1>
      
      {/* Subheadline */}
      <p className="text-xl font-normal text-[#FAFAFA] tracking-[0.2px] leading-[30px] max-w-[376px]">
        We know how large objects will act, but things on a small scale.
      </p>
      
      {/* CTA Button */}
      <button className="bg-[#2DC071] text-white px-10 py-[15px] rounded-[5px] text-2xl font-bold tracking-[0.1px]">
        SHOP NOW
      </button>
    </div>
  </div>
  
  {/* Slider arrows + indicators */}
</section>
```

### Mobile Adaptasyonu (Hero 1 mobile spec'inden)
```
Container width: 414px
Padding: 112px 0
Headline width: 268px (centered)
Headline font: 40px (h2 style, line-height 50px)
Subheadline width: 291px
Subheadline color: #FAFAFA
Button: 221×62px (same size, centered)
Arrows: 24×44.47px, left 40px / right 359px, top 351px
```


---

## 🗂️ CATEGORY (Editor's Pick) — Variant 1 KULLANILACAK

### Desktop Variant 1 (`desktop-shop-cards-1`)
```
Container: 1440 × 460px, bg #FAFAFA
Inner container: 1050px, padding 80px 0
Row: gap 30px, 2 cards yan yana
Card: 510 × 300px, bg #FFFFFF
```

#### Card 1 (light filter)
```
Filter overlay: rgba(255, 255, 255, 0.85)
Tag (h6): "5 Items", 14px/700, color #E77C40 (alert), left 49px, bottom 217.5px
Title (h2/h3 style): 24px/700, line-height 32px, color #252B42, left 49px, top 101.5px, width 158px
Subtitle (paragraph): 14px/400, color #737373, left 49px, bottom 84.5px
CTA Link: "Read More", 14px/700, color #252B42, left 49px, bottom 42.5px
Decorative image: right side, width 267px, height 445px
```

#### Card 2 (blue overlay)
```
Filter overlay: rgba(2, 130, 202, 0.88) ← Bandage'ın blue overlay
Tag: 14px/700, color #ECECEC (light-gray-2)
Title: 24px/700, color #FFFFFF, left 49px, top 103.5px, width 145px
Subtitle: 14px/400, color #FFFFFF
CTA Link: "Read More", 14px/600, color #FFFFFF, underlined
Decorative image: right side, width 207px, height 414px
```

### Mobile Variant 1
```
Container: 414 × 726px
Inner: 376px wide, top 43px
Row: column, gap 40px
Card: 376 × 300px, same content/colors as desktop
Decorative image: right -77px (taşan), 181 × 301px
```

### Tipografi & Renkler (Card 1+2 ortak)
- Tag color: `#E77C40` (alert-orange) ⭐ kategori sayısı
- Title color: `#252B42` (dark) veya `#FFFFFF` (over blue)
- Subtitle color: `#737373` veya `#FFFFFF`
- Filter overlay seçenekleri:
  - Beyaz: `rgba(255, 255, 255, 0.85)`
  - Mavi (Bandage): `rgba(2, 130, 202, 0.88)` ⭐
  - Karanlık: `rgba(33, 33, 33, 0.25)`


---

## ⭐ FEATURES (What we serve) — Variant 1 KULLANILACAK

### Desktop Features 1 (`desktop-features-1`)
```
Container: 1440 × 868px, bg #FFFFFF
Inner: 1050px wide, padding 160px 0, gap 96px between header and grid
```

#### Section Header (top, centered)
```
Section tag (h6): 14px/700, color #23A6F0 (primary), letter-spacing 0.2px
Section title (h2): 40px/700, line-height 50px, color #252B42, width 381px
Paragraph: 14px/400, line-height 20px, color #737373, width 469px
Gap between title elements: 10px
```

#### Features Grid (2x2 layout - 4 cards)
```
Row: gap 30px, 2 columns
Column: gap 24px, 2 cards per column
Card (horizontal): 501 × 147px, bg #FFFFFF, padding 25px
  Inner flex-row: gap 20px, width 440 × 97px
  
  Icon Box (left):
    Width: 70px × 76px
    Background: #E74040 (danger-color/red) ⭐
    Border-radius: 10px
    Padding: 22px 19px
    Icon: 32×32px, white (#FFFFFF)
  
  Content (right):
    Width: 350 × 97px, gap 5px
    Title (h3): 24px/700, line-height 32px, color #252B42, width 139px
    Description (paragraph): 14px/400, line-height 20px, color #737373, width 350px
```

### Mobile Features 1 (`mobile-features-1`)
```
Container: 414 × 1222px, padding 80px 0, gap 80px
Inner: 414px wide

Section Header:
  Width: 261px (centered, gap 10px)
  Tag (h6): 14px/700, color #23A6F0
  Title (h2): 40px/700, line-height 50px, color #252B42, width 239px, height 100px
  Paragraph: 14px/400, color #737373, width 261px, height 80px

Features Grid (single column - 4 cards stacked):
  Row: column, gap 30px, width 328px
  Card: 338 × 167px, padding 25px, bg #FFFFFF
    Inner flex-row: width 302 × 117px, gap 20px
    
    Icon Box: 70 × 76px, bg #E74040, border-radius 10px, padding 22px 19px
    Icon: 32×32, white
    
    Content: width 212 × 117px, gap 5px
      Title (h3): 24px/700, line-height 32px, color #252B42
      Description: 14px/400, line-height 20px, color #737373, width 212px, height 80px
```

### Tipografi & Renkler Özeti
- Section tag color: `#23A6F0` (primary) ⭐
- Section title: `#252B42` 40px/700
- Section paragraph: `#737373` 14px/400
- **Icon box bg: `#E74040` (danger-color/red) ⭐**
- Icon color: `#FFFFFF`
- Icon box border-radius: `10px`
- Card title: 24px/700, color `#252B42`
- Card description: 14px/400, color `#737373`


---

## 🛍️ PRODUCT CARDS — Variant 1 KULLANILACAK

### Desktop Product Cards 1 (`desktop-product-cards-1`)
```
Container: 1440 × 1140px, bg #FFFFFF, padding 48px 0
Layout: 2 column (col-md-5 left image + col-md-6 right products)

Left side:
  Hero image: 720 × 1044px

Right side:
  Container: 720 × 1044px, padding 80px 0, gap 30px
  
  Section Header (top, centered, gap 15px):
    Subtitle (h4): 20px/400, line-height 30px, color #737373, "Featured Products"
    Title (h2): 40px/700, line-height 50px, color #252B42, width 394px (single line)
    Paragraph: 14px/400, line-height 20px, color #737373, width 351px
  
  Products Grid: 2 cards yan yana, gap 30px
```

### Product Card (Single)
```
Card: 249 × 684px, bg #FFFFFF, column

Image Section: 249 × 300px (top)
  Background: image (cover)
  Sale Tag (absolute top-left):
    Position: left 20px, top 20px
    Size: 51 × 24px
    Padding: 0 10px
    Background: #E74040 (danger/red)
    Border-radius: 3px
    Box-shadow: 0px 2px 4px rgba(0,0,0,0.1)
    Text: "Sale", 14px/700, white, line-height 24px
  
  Product Actions (absolute bottom-center, hover):
    Position: bottom 24px, centered horizontally
    Width: 140 × 40px, gap 10px (3 buttons)
    
    Each button: 40 × 40px circle
      Background: #FFFFFF
      Border-radius: 44.7857px (full circle)
      Icons: 20×20px (heart, cart, eye)

Content Section: 249 × 384px, padding 25px 25px 35px, gap 10px
  
  Top Row: 199 × 26px, justify-content space-between
    Left:
      Category Link: 14px/700, color #23A6F0 (primary)
    Right (Star Badge):
      Width 50 × 26px, padding 5px, gap 5px
      Background: #252B42 (dark)
      Border-radius: 20px
      Star icon: 16×16, color #FFCE31 (yellow)
      Rating text: 12px/400, color #FFFFFF
  
  Title (h5): 16px/700, line-height 24px, color #252B42, "Graphic Design"
  Description (paragraph): 14px/400, line-height 20px, color #737373
  
  Sales Row: gap 10px
    Cart icon: 16×16, color #737373
    Sales count (h6): 14px/700, color #737373, "10 sales"
  
  Prices Row: gap 5px, padding 5px 3px
    Old price (h5): 16px/700, color #BDBDBD (muted, strikethrough)
    New price (h5): 16px/700, color #23856D (secondary green) ⭐
  
  Color Swatches: gap 6.08px, 16×16 circles
    #23A6F0 (primary blue)
    #23856D (secondary green)
    #E77C40 (alert orange)
    #252B42 (dark)
  
  Stats Row: 199 × 46px, padding 15px 0, justify-content space-between
    Each stat: gap 5px, icon + small text
    - Calendar icon: 16×16, color #23A6F0
    - Chart icon: 16×16, color #E77C40
    - Calendar icon: 16×16, color #23A6F0
    - Small text: 12px/400, color #737373
  
  Button: 141.14 × 44px, padding 10px 20px, gap 10px
    Border: 1px solid #23A6F0
    Border-radius: 37px (pill)
    Text: 14px/700, color #23A6F0, "Add to Card"
    Arrow icon: 9.14×16, color #23A6F0
```

### Mobile Product Cards 1 (`mobile-product-cards-1`)
```
Container: 414 × 2383px, padding 48px 0, gap 80px
Hero image: 408 × 499px (top)

Section Header (centered, gap 15px):
  Subtitle: 20px/400, color #737373, width 191px
  Title: 40px/700, color #252B42, width 196px, height 100px (2 lines)
  Paragraph: 14px/400, color #737373, width 246px, height 80px

Product Cards: column, 330 × 704px each
  Image: 330 × 300px
  Content: padding 25px 25px 35px, gap 10px
  Top row width: 280 × 26px (wider than desktop)
  Description width: 280 × 60px
  Stats row width: 280 × 46px (justify space-between)
  All other proportions same as desktop
```

### Tipografi & Renkler Özeti
- Sale tag bg: `#E74040` (danger/red)
- Category link: `#23A6F0` (primary blue)
- Star badge bg: `#252B42` (dark) + star color `#FFCE31` (yellow)
- Old price color: `#BDBDBD` (muted, strikethrough)
- New price color: `#23856D` (secondary green) ⭐
- Color swatches: `#23A6F0`, `#23856D`, `#E77C40`, `#252B42`
- Card border-radius: 0 (square card)
- Button border-radius: 37px (pill)
- Action buttons: 40×40 white circles
- Box-shadow on tag: `0px 2px 4px rgba(0,0,0,0.1)`


---

## 🛍️ PRODUCT CARDS — Ek Detaylar (Variant 1 onayı + extras)

### Variant 1 Tam Onay (önceki tur eklendi, bu turda doğrulandı)
Yukarıda eklenen Product Cards Variant 1 specleri TAMAMI doğru:
- Card 249×684, image 249×300, content 249×384 padding 25/25/35
- Sale tag #E74040, 51×24, top-left 20/20, box-shadow 0px 2px 4px rgba(0,0,0,0.1)
- Star badge #252B42 bg, star #FFCE31, rating 12px white
- Old price #BDBDBD strike, new price #23856D ⭐
- Color swatches #23A6F0/#23856D/#E77C40/#252B42
- Button 141.14×44, border 1px #23A6F0, radius 37px (pill)

### Mobile Variant 1 (Tam Detaylar)
```
Container: 414 × 2383px, padding 48px 0, gap 80px
Hero image (top): 408 × 499px

Section header: width 329 × 240px, gap 15px
  Subtitle h4: 20px/400 #737373, width 191px
  Title h2: 40px/700 #252B42, width 196px, height 100px
  Paragraph: 14px/400 #737373, width 246px, height 80px

Product Card: 330 × 704px (mobilede 81px daha uzun)
  Image: 330 × 300px
  Content: width 330, height 404px (desktop'tan 20px uzun)
  Padding: 25px 25px 35px, gap 10px
  
  Top row width: 280 × 26px (desktop'taki 199'a karşı)
  Description width: 280 × 60px (3 satır - desktop'ta 182 × 40)
  Stats row width: 280 × 46px, justify-content space-between (transform YOK)
  
  Stats inner widths (mobile):
    1. Calendar+text: 92×16 (small text width 71)
    2. Chart+text: 89×16 (small text width 68)
    3. Area-chart+text: 76×16 (small text width 55) ⭐ icon farklı: ant-design-area-chart-outlined, color #23856D (secondary-green)
  
  Button: 141.14 × 44px (aynı)
```

### Diğer Variantlar - Notlar (Variant 1 ana, ama referans için)

**Variant 2 (`desktop-product-cards-2`):**
- Aynı card, sadece sırası ters (col-md-6 önce, col-md-5 sonra)
- Hero image sağda

**Variant 3 (`desktop-product-cards-3`):**
- 2184px yüksekliğinde - 2 satır product cards
- Üst: image left + cards right
- Alt: cards left + image right (alternating)
- Toplam 8 ürün gösteriyor (2 satır × 4 ürün)

**Variant 4 (`desktop-product-cards-4`):**
- Featured Product + Numbered Stats listesi
- 1069 × 784px row + 1066 × 111px row alt
- Sol: hero image 720×784
- Sağ: bg `#FAFAFA` (light-gray-1), padding 80px 0, gap 30px
- Featured card: 348×604px centered, gap 19px
  - Title h3: 24px/700 #252B42, width 200px, height 32px
  - Description: 14px/400 #737373, width 280px, height 60px
  - Image: 348×300px (printed-summer-dress 348×226 inside)
  - Category link: 14px/700 **#252B42** (Variant 1'deki #23A6F0 değil!), width 146
  - Sales / prices / colors: aynı
- Numbered Stats Row (alt): 4 col-md-3 cards, her biri 265×111
  - Card padding 25px, bg white
  - Sol: Number "1." 40px/700 **#E74040** (red), width 28-36px
  - Sağ: h6 title 14px/700 #252B42 + small 12px/400 #737373

**Mobile Variant 4 (`mobile-product-cards-4`):**
- 414 × 1859px
- Hero: 414 × 505px
- Featured card section: 414 × 700px, padding 48px 0
- Numbered list: 4 cards stacked, 349×111 each

### Kritik Farklar Variant 1 vs Variant 4
| Detay | Variant 1 | Variant 4 |
|---|---|---|
| Category link color | #23A6F0 | #252B42 |
| Category align | left | center |
| Layout | 4-card grid | Featured + numbered list |
| Background | white | #FAFAFA |
| Card center | left-align | center-align |
| Title font | h5 16px | h3 24px |

### YENİ Renk Notu
- Variant 4 numbered text: `#E74040` 40px (h2 size, red color) - "danger-text-color" olarak isimlendirilmiş


---

## 📣 CTA (Call To Action) — Variant 1 KULLANILACAK

### Desktop CTA 1 (`desktop-cta-1`)
```
Container: 1440 × 534px, bg #FFFFFF
Inner: 1050px wide, padding 112px 0, gap 96px

Row (centered, gap 36px): 607 × 310px

Icon Circle (top):
  Width: 72 × 72px
  Background: #E74040 (danger/red) ⭐
  Border-radius: 200px (full circle)
  Icon inside: white, centered

Main Content (gap 30px, centered): 587 × 202px
  
  Title (h2): 40px/700, line-height 50px, color #252B42
    Width: 587px, single line
  
  CTA Buttons Row (gap 10px): 313 × 52px
    Primary Button (Md): 141 × 52px
      Padding: 15px 40px
      Background: #23A6F0 (primary)
      Border-radius: 5px
      Text: 14px/700, color #FFFFFF
    
    Secondary Button (Md, outline): 162 × 52px
      Padding: 15px 40px
      Background: transparent
      Border: 1px solid #23A6F0
      Border-radius: 5px
      Text: 14px/700, color #23A6F0
  
  Paragraph: 14px/400, line-height 20px, color #737373
    Width: 447px, height 40px
```

### Mobile CTA 1 (`mobile-cta-1`)
```
Container: 414 × 654px, bg #FFFFFF
Inner: 313px wide, padding 112px 0, gap 96px

Row: 313 × 430px, gap 36px
Icon Circle: 72×72 #E74040, border-radius 200px

Main Content: 313 × 322px, gap 30px
  Title (h2): 40px/700, color #252B42, width 230px, height 150px (3 lines)
  Buttons: same widths/styles, row layout (gap 10px), total 313 × 52px
  Paragraph: 14px/400 #737373, width 293px, height 60px (3 lines)
```

### Tipografi & Renkler Özeti
- Icon circle: 72×72, bg `#E74040` (danger/red), border-radius 200px (full circle)
- Title: h2 40px/700 #252B42, centered
- Primary button: bg `#23A6F0`, white text, padding 15px 40px, radius 5px
- Outline button: border 1px #23A6F0, #23A6F0 text, padding 15px 40px, radius 5px
- Paragraph: 14px/400 #737373, centered
- Container padding: desktop 112px 0, mobile 112px 0
- Inner gap: 96px (header to content)
- Row gap: 36px (icon to content)
- Content gap: 30px (title to buttons to paragraph)


---

## 📧 SUBSCRIPTION (Newsletter) — Variant 1 KULLANILACAK

### Desktop Subscription 1 (`desktop-subscription-1`)
```
Container: 1440 × 630px, bg #FFFFFF
Inner: 1050px wide, padding 112px 0, gap 96px

Row (centered, gap 36px): 607 × 386px

Icon Circle (top):
  Width: 72 × 72px
  Background: #E74040 (danger/red)
  Border-radius: 200px (full circle)
  Icon inside: white, centered

Main Content (gap 30px, centered): 600 × 278px
  
  Title (h2): 40px/700, line-height 50px, color #252B42
    Width: 587px, height 50px (single line), centered
  
  Paragraph: 14px/400, line-height 20px, color #737373
    Width: 399px, height 40px, centered
  
  Form Group (newsletter form): 600 × 58px
    Container position: relative, full width
    
    Input field (form-control):
      Position: absolute, full width minus button area
      Background: #F9F9F9 (input-bg)
      Border: 1px solid #E6E6E6
      Border-radius: 5px
      Placeholder "Your Email": 14px/400, line-height 28px, color #737373
      Padding: left 20px (placeholder offset)
    
    Submit Button (btn):
      Position: absolute right
      Width: 117px (right-aligned within form)
      Background: #23A6F0 (primary)
      Border: 1px solid #E6E6E6
      Border-radius: 0px 5px 5px 0px (right corners only) ⭐
      Text "Subscribe": 14px/400, line-height 28px, color #FFFFFF, centered
  
  Paragraph (privacy/info text): 14px/400, line-height 20px, color #737373
    Width: 447px, height 40px, centered
```

### Mobile Subscription 1 (`mobile-subscription-1`)
```
Container: 414 × 873px, bg #FFFFFF
Inner: 311px wide, padding 112px 0, gap 96px

Row: 311 × 589px, gap 36px
Icon Circle: 72 × 72px, bg #E74040, border-radius 200px

Main Content: 311 × 481px, gap 30px
  Title (h2): 40px/700, color #252B42, width 230px, height 150px (3 lines)
  Paragraph: 14px/400 #737373, width 287px, height 60px (3 lines)
  
  Form Group: 311 × 121px (input + button STACKED vertically) ⭐
    Input field: top 0, bottom 63px (input height ~58px)
      Background: #F9F9F9
      Border: 1px solid #E6E6E6
      Border-radius: 5px (FULL radius, all corners)
      Placeholder "Your Email": 14px/400 #737373
    
    Submit Button: top 63px, bottom 0 (full width below input)
      Background: #23A6F0
      Border: 1px solid #E6E6E6
      Border-radius: 5px (FULL radius, all corners) ⭐
      Text "Subscribe": 14px/400 #FFFFFF, centered
  
  Paragraph: 14px/400 #737373, width 293px, height 60px
```

### Tipografi & Renkler Özeti
- Icon circle: 72×72, bg `#E74040` (danger/red), border-radius 200px (full circle)
- Title: h2 40px/700 #252B42, centered
- Paragraph: 14px/400 #737373, centered
- Input bg: `#F9F9F9` (input-bg)
- Input border: 1px solid `#E6E6E6`
- Input border-radius: 5px (mobile full, desktop left side only)
- Input padding-left: 20px
- Placeholder: 14px/400 #737373
- Button bg: `#23A6F0` (primary)
- Button text: 14px/400 #FFFFFF
- Button border-radius desktop: `0px 5px 5px 0px` (right corners only) ⭐
- Button border-radius mobile: `5px` (all corners, stacked layout) ⭐
- Form layout desktop: input + button INLINE (horizontal)
- Form layout mobile: input + button STACKED (vertical)


---

## 📊 STATS — Variant 1 KULLANILACAK

### Desktop Stats 1 (`desktop-stats-1`)
```
Container: 1440 × 260px, bg #FFFFFF
Inner: 1050px wide, padding 80px 0, gap 80px

Row: 1045 × 100px, flex-row, justify-content center, gap 30px (3 cards)

Stat Card (horizontal layout - number + text yan yana):
  Width: 342/347/324px (~328px ortalama, col-md-4)
  Height: 100px
  Padding: 25px
  Background: #FFFFFF
  Border-radius: 2px
  Flex-direction: ROW (number left, text right) ⭐
  Gap: 16px
  Align-items: center
  
  Number (h2): 40px/700, line-height 50px, color #252B42
    Width: ~60-85px (number-dependent)
    Examples: "15K+", "150K+", "100+"
  
  Description (small): 12px/400, line-height 16px, color #737373
    Width: 197px, height 32px (2 lines)
```

### Mobile Stats 1 (`mobile-stats-1`)
```
Container: 414 × 530px, bg #FFFFFF (cover/filter hidden)
Inner: 329px wide, padding 80px 0, gap 80px

Row: 329 × 360px, COLUMN layout, gap 30px (3 cards stacked)

Stat Card: SAME as desktop (horizontal number+text inside card)
  Width: 342/347/324px
  Height: 100px
  Padding: 25px, gap 16px
  Background: #FFFFFF
  Border-radius: 2px
  Number (h2): 40px/700 #252B42
  Description (small): 12px/400 #737373, width 197px height 32px
```

### Tipografi & Renkler Özeti
- Card layout: horizontal (number + text yan yana), padding 25px, gap 16px
- Card bg: `#FFFFFF`
- Card border-radius: 2px (very subtle)
- Number: h2 40px/700, color `#252B42` (dark) - tek satır
- Description: small 12px/400, line-height 16px, color `#737373`
- Description width: 197px (2 satır)
- Card width: ~328px (3 cards across desktop, stacked mobile)
- Container padding: 80px 0
- Inner gap: 80px (header to content)
- Row gap desktop: 30px (between cards)
- Row gap mobile: 30px (between cards stacked)

### Önemli Detay (Variant 1 vs diğerleri)
**Variant 1**: Number ve text **YAN YANA** (flex-row), small description (12px)
**Variant 2**: Number ve text **ÜST ALT** (flex-column), h5 description (16px/700) - merkezli
**Variant 3-5**: Daha büyük varyasyonlar (sol başlık + sağ kartlar)


---

## 🎥 VIDEO — Variant 1 KULLANILACAK

### Desktop Video 1 (`desktop-video-1`)
```
Container: 1440 × 583px, bg #252B42 (dark)
Background image overlay: full size with linear-gradient(89.85deg, #000000, rgba(0,0,0,0)) opacity 0.75
Inner: 1050px wide, padding 160px 0, gap 96px

Row (centered, gap 30px): 607 × 262.6px

Main Content (centered, gap 30px): 607 × 262.6px

Play Button (Lg): 92.6 × 92.6px (centered top)
  Padding: 34.8px 36.8px
  Background: #23A6F0 (primary)
  Border-radius: 73.6px (full circle)
  Inner play icon: 19 × 23px, color #FFFFFF

Title (h2): 40px/700, line-height 50px, color #FFFFFF
  Width: 609px, height 50px (single line), centered

Paragraph (h4 size): 20px/400, line-height 30px, color #FFFFFF
  Width: 513px, height 60px (2 lines), centered
```

### Mobile Video 1 (`mobile-video-1`)
```
Container: 414 × 627px, bg #252B42 (dark)
Background overlay: same gradient, opacity 0.75
Inner: 414px wide, padding 112px 0, gap 96px

Row: 414 × 382.6px, gap 36px
Main Content: 454 × 382.6px (slightly wider than container), gap 40px

Play Button (Lg): 92.6 × 92.6px, bg #23A6F0, border-radius 73.6px
  Same as desktop (no mobile downsize)

Title (h2): 40px/700, color #FFFFFF
  Width: 236px, height 150px (3 lines, wraps)

Paragraph: 14px/500 ⭐ (font-weight 500, not 400!), line-height 20px, color #FFFFFF
  Width: 454px, height 60px (3 lines)
```

### Tipografi & Renkler Özeti
- Background: `#252B42` (dark) + image overlay
- Filter overlay: `linear-gradient(89.85deg, #000000 0.13%, #000000 0.14%, rgba(0,0,0,0) 99.56%)` opacity **0.75**
- Play button: 92.6 × 92.6px, bg `#23A6F0`, border-radius 73.6px (full circle), padding 34.8px 36.8px
- Play icon: 19 × 23px, white
- Title: h2 40px/700 #FFFFFF, centered
- Paragraph (desktop): h4 20px/400 #FFFFFF (larger paragraph)
- Paragraph (mobile): 14px/500 #FFFFFF (smaller, but heavier weight)
- Container padding desktop: 160px 0
- Container padding mobile: 112px 0

### Önemli Detaylar
- Variant 1 = Tek başına play button + başlık + açıklama (büyük play button öne çıkar)
- Variant 2-3 = Video card görseli + sol başlık (split layout, daha küçük play button içinde)
- Decorative ellipse (yeşil çember #2DC071): SADECE Variant 2-3'te kullanılır, Variant 1'de YOK


---

## 👥 TEAM — Variant 1 KULLANILACAK

### Desktop Team 1 (`desktop-team-1`)
```
Container: 1440 × 1266px, bg #FAFAFA (light-gray-1)
Inner: 1050px wide, padding 112px 0, gap 48px

Section Header: 864 × 100px, gap 10px (centered)
  Title (h2): 40px/700, line-height 50px, color #252B42
    Width: 316px, height 50px (single line)
  Paragraph: 14px/400, line-height 20px, color #737373
    Width: 469px, height 40px, centered

Team Grid: 2 rows × 4 cards = 8 team members total
  Row: flex-row, gap 30px, width 1049 × 423px

Team Card (col-md-3): 240 × 423px
  Border-radius: 5px
  Layout: flex-column, no padding (image full bleed)
  
  Media (image): 240 × 333px (top, full width)
    Background: url(.jpg), full cover
  
  Card Content: 237 × 90px
    Padding: 15px 0 (left aligned for first card, centered for others)
    Gap: 10px
    
    Name (h4 ⭐): 20px/400 ⭐ (NOT 700!), line-height 30px
      Color: #252B42
      Width: variable (~120-200px based on name length)
    
    Job Title (paragraph): 14px/400, line-height 20px
      Color: #737373 (second-text)
      Width: variable (~30-75px)
```

### Mobile Team 1 (`mobile-team-1`)
```
Container: 414 × 3994px, bg #FAFAFA
Inner: 361px wide, padding 45px 0, gap 60px (much taller!)

Section Header: 310 × 190px (centered)
  Title (h2): 40px/700 #252B42, width 315px height 100px (2 lines)
  Paragraph: 14px/400 #737373, width 289px height 80px (4 lines)

Team Cards: COLUMN layout (stacked), 8 cards in 2 rows of 4
  Each row: width 241 × 1782px, gap 30px
  Cards stacked vertically, all 240 × 423px
  
  Same card structure as desktop:
    Media: 240 × 333px (image)
    Card content: 237 × 90px, padding 15px 0 or 15px 50px 15px 0px (mixed)
    Name: 20px/400 #252B42
    Job title: 14px/400 #737373
```

### Tipografi & Renkler Özeti
- Container bg: `#FAFAFA` (light-gray-1) ⭐ (white DEĞİL!)
- Section title: h2 40px/700 #252B42, left-aligned (width 316px)
- Section paragraph: 14px/400 #737373, centered, width 469px
- Card border-radius: 5px
- Card image: 240 × 333px (no border-radius on image)
- Card content padding: 15px 0 (left-aligned text!)
- **Name: h4 20px/400 #252B42 ⭐ (font-weight 400, NOT bold!)**
- **Job title: paragraph 14px/400 #737373 ⭐ (NOT bold, NOT primary blue!)**
- Card layout: image top + text below (flex-column)
- Card alignment: align-items flex-start (left-aligned text)
- 8 team members: 2 rows × 4 cards (desktop)
- Mobile: 8 cards stacked column

### Önemli Detaylar (Variant 1 vs diğerleri)
- **Variant 1**: Image-card style (rectangle photo + name/job left-aligned), 8 members, 2 rows
- **Variant 2**: Compact horizontal cards (small circle pic + name/job inline), no extra padding
- **Variant 3**: Centered card with circular avatar 128×128, h5 name + h6 blue job + description
- **Variant 4**: Image card with social media icons (facebook/instagram/twitter), h5 name + h6 secondary job
- **Variant 5**: Compact card style with image top + name h5 center + job h6 primary blue

### Variant 1 Görsel Özellik
- En "minimal" tasarım: sadece foto + isim + iş, hiçbir extra (sosyal medya, açıklama, daire foto YOK)
- Sol hizalı text (centered DEĞİL)
- 4'lü grid 2 sıra olarak, toplam 8 ekip üyesi gösteriyor
- Renk olarak monochrome: hem isim hem iş başlığı koyu/gri, mavi vurgu YOK


---

## 🤝 CLIENTS (Brand Logos) — Variant 1 KULLANILACAK

### Desktop Clients 1 (`desktop-clients-1`)
```
Container: 1440 × 335px (or 175px standalone), bg #FAFAFA (light-gray-1) ⭐
Inner: 1050px wide, padding 80px 0

Row: 1054 × 175px
  Layout: flex-row, justify-content center, align-items center
  Padding: 50px 0
  Gap: 30px (between logos)
  6 logos in single row (col-md-2 each)

Each Brand Logo (col-md-2):
  Container: 151-153px wide, height varies (34-75px based on logo)
  Logo color: #737373 (second-text-color) - GRAYSCALE/MONOCHROMATIC ⭐
  
  Logo widths/heights (typical):
    - Brand 1 (hooli): 103 × 34px
    - Brand 2 (lyft): 83 × 59px
    - Brand 3 (pied-piper-hat): 102 × 75px
    - Brand 4 (stripe): 103 × 42px
    - Brand 5 (aws): 104 × 62px
    - Brand 6 (reddit): 76 × 72px
```

### Mobile Clients 1 (`mobile-clients-1`)
```
Container: 414 × 1173px, bg #FAFAFA
Inner: 414px wide, padding 0

Row: COLUMN layout (logos stacked vertically)
  Padding: 50px 0
  Gap: 60px (between logos)
  6 logos stacked
  
Each Brand Logo (col-md-3 mobile):
  Container: 146-153px wide
  Logo dimensions LARGER on mobile:
    - Brand 1 (hooli): 149 × 50px
    - Brand 2 (lyft): 139 × 99px
    - Brand 3 (pied-piper-hat): 149 × 109px
    - Brand 4 (stripe): 149 × 60px
    - Brand 5 (aws): 153 × 92px
    - Brand 6 (reddit): 149 × 142px
  Logo color: #737373 (grayscale)
```

### Tipografi & Renkler Özeti
- Background: `#FAFAFA` (light-gray-1) ⭐ - Beyaz değil!
- Logo color: `#737373` (second-text-color) - GRAYSCALE
- Layout desktop: flex-row, single line, gap 30px (6 logos)
- Layout mobile: flex-column, stacked, gap 60px (6 logos)
- Container padding: 80px 0 (desktop), 0 (mobile - row padding 50px 0)
- Row padding: 50px 0
- Brands kullanılan: hooli, lyft, pied-piper-hat, stripe, aws, reddit-alien (FontAwesome brand icons)

### Önemli Detay
- Variant 1 = SADECE logolar (başlık YOK)
- Variant 2 = Üstte küçük h4 başlık + logolar
- Variant 3 = Büyük h2 başlık + paragraf + logolar
- Variant 5-6 = Logo + altında açıklama metni (card formatında)


---

## 📰 BLOG — Variant 1 KULLANILACAK

### Desktop Blog 1 (`desktop-blog-1`)
```
Container: 1440 × 2298px, bg #FFFFFF
Inner: 1050px wide, padding 160px 0, gap 80px

Multiple Rows: Her satır 970 × 606px, gap 30px (3 rows × 2 cards = 6 blog posts toplam)
Row layout: flex-row, justify-content center, 2 cards yan yana
Each col-md-6: 470 × 606px
```

### Blog Card (Vertical Layout)
```
Card: 465 × 606px (or 464 - alternates)
Background: #FFFFFF
Box-shadow: 0px 2px 4px rgba(0,0,0,0.1) (light-drop-shadow)
Flex-direction: column

Image Section: 465 × 300px (top)
  Background: image (cover)
  
  Tag (absolute top-left "NEW"):
    Position: left 20px, top 20px
    Width: 56 × 24px
    Padding: 0 10px
    Background: #E74040 (danger/red)
    Border-radius: 3px
    Box-shadow: 0px 2px 4px rgba(0,0,0,0.1)
    Text: "NEW" 14px/700 line-height 24px, color #FFFFFF, centered
    (Width difference from "Sale" tag: 56 vs 51px)

Content Section: 465 × 306px, padding 25px 25px 35px, gap 10px
  
  Tags Row: 160 × 16px, gap 15px, 3 tags
    Tag 1: "Google" - 12px/400, color #8EC2F2 (disabled-blue) ⭐
    Tag 2: "Trending" - 12px/400, color #737373 (second-text)
    Tag 3: "New" - 12px/400, color #737373
  
  Title (h4 #post-title): 20px/400 ⭐ (font-weight 400, NOT 700!), line-height 30px, color #252B42
    Width: 247px, height 60px (2 lines)
  
  Description (paragraph): 14px/400, line-height 20px, color #737373
    Width: 280px, height 60px (3 lines)
  
  Stats Row: 415 × 46px, padding 15px 0, justify-content space-between
    Each stat: gap 5px, icon + small text
    
    Stat 1 (Date): 100 × 16px
      Calendar icon: 16×16, color #23A6F0 (primary)
      Text "22 April 2021": 12px/400 color #737373, width 79
    
    Stat 2 (Comments): 105 × 16px
      Chart icon: 16×16, color #23856D (secondary green)
      Text "10 comments": 12px/400 color #737373, width 84
  
  "Learn More" Link (a): 101 × 24px, gap 10px
    Text "Learn More": 14px/700, color #737373 (second-text)
    Arrow icon: 9 × 16px, color #23A6F0 (primary blue)
```

### Mobile Blog 1 (`mobile-blog-1`)
```
Container: 414 × 3946px (very long - 6 cards stacked), padding 80px 0, gap 80px
Inner: 329px wide

Row: column layout, gap 30px, 6 cards stacked

Blog Card (mobile): 330 × 606px (slightly wider container, same height)
  Image: 330 × 300px
  Content: 330 × 306px, padding 25px 25px 35px, gap 10px
    Same internal structure
    Stats row width: 280 × 46px (narrower than desktop 415)
  All other proportions same
```

### Tipografi & Renkler Özeti
- Card bg: `#FFFFFF`
- Card box-shadow: `0px 2px 4px rgba(0,0,0,0.1)` ⭐
- Tag bg: `#E74040` (danger/red) - "NEW" or "Sale"
- Tag text: 14px/700 white, padding 0 10px, border-radius 3px
- Tag width: 56px (NEW) vs 51px (Sale)
- Tag position: top-left absolute (left 20px, top 20px)
- Tag shadow: same drop-shadow as card
- First tag color: `#8EC2F2` (disabled-blue) ⭐ - usually category like "Google"
- Other tag colors: `#737373` (second-text)
- Title: h4 20px/400 ⭐ #252B42 (paragraph weight, NOT bold!)
- Description: 14px/400 #737373
- Date icon: `#23A6F0` (primary blue, calendar)
- Comments icon: `#23856D` (secondary green, chart)
- Stat text: 12px/400 #737373
- "Learn More" text: 14px/700 #737373 + arrow #23A6F0
- Card padding (content): 25px 25px 35px
- Image aspect: 465×300 (~1.55:1 ratio)
- Card aspect: ~0.77 (portrait-ish)

### Önemli Notlar (Variant 1 vs Variant 2)
**Variant 1**: Vertical card (image on top, content below) - 6 cards in 3 rows × 2 cols
**Variant 2**: Horizontal card (image left, content right) - similar to Product Card but blog-styled

**Common with Product Card**:
- Same Sale/NEW tag styling
- Same stats row pattern (icon + small text + space-between)

**Different from Product Card**:
- Title font-weight: 400 (NOT 700) ⭐ - more editorial feel
- Title font-size: 20px (h4) NOT 16px (h5)
- No price, no color swatches, no stars, no "Add to Card" button
- Has "Learn More" arrow link instead
- First tag has special color #8EC2F2


---

## 💰 PRICING — Variant 1 KULLANILACAK

### Desktop Pricing 1 (`desktop-pricing-1`)
```
Container: 1440 × 1098px, bg #FAFAFA (light-gray-1) ⭐
Inner: 1050px wide, padding 112px 0, gap 48px

Header Row (centered, 633 × 100px):
  Main content: 625 × 100px, gap 10px
  
  Title (h2): 40px/700, color #252B42
    Width: 144px, height 50px (single line: "Pricing")
  
  Paragraph: 14px/400, line-height 20px, color #737373, centered
    Width: 469px, height 40px (2 lines)

Switch Toggle (310 × 44px, gap 16px):
  Checkbox group (186 × 28px):
    Label "Monthly": h5 16px/700 #252B42 (left, 68×24)
    Toggle: 45 × 25px, bg #FFFFFF, border 1px #23A6F0, border-radius 16px
      Inner ellipse: 19 × 19px, bg #EBEBEB, border 1px #D0D0D0
    Label "Yearly": h5 16px/700 #252B42 (right, 51×24)
  
  Save Badge: 108 × 44px
    Background: #B3E3FF (faded-primary)
    Border-radius: 37px (pill)
    Padding: 10px 20px
    Text "Save 25%": h6 14px/700 #23A6F0

Pricing Cards Row (706 × 640px, flex-row, gap 30px):
  TWO cards (NOT 3 cards in Variant 1) ⭐
  
Each Pricing Card (337-339 × 640px):
  Container (pricing-style-1): 334-338 × 640px
  Background: #FFFFFF
  Border: 1px solid #23A6F0 (primary blue)
  Border-radius: 10px
  Padding: 50px 70px
  Gap: 35px
  Layout: flex-column, align-items center
  
  Title (h3): 24px/700 #252B42 ("FREE", "Standard", etc.)
  
  Description (h5): 16px/700 #737373
    Width: 269px, single line, centered
  
  Price Block (flex-row, gap 10px, 114-128 × 56px):
    Price (h2): 40px/700 color #23A6F0 (primary)
    Right column (76 × 56px, flex-col):
      Currency (h3): 24px/700 #23A6F0 (e.g. "$")
      Period (h6): 14px/700 #8EC2F2 (disabled-blue) (e.g. "Per Month")
  
  Features List (247 × 236px, gap 15px):
    Each feature (247 × 32px, gap 10px, flex-row align-center):
      Check icon circle: 32×32, bg #2DC071 (success green) ⭐, border-radius 200px (full)
        Inner check: 16×11px, white
      OR muted: 32×32, bg #BDBDBD (muted), border-radius 200px (cancelled features)
      Feature text (h6): 14px/700 #252B42, width 205px
  
  Button: 246-279 × 52px
    Background: #23A6F0 (primary blue)
    Border-radius: 5px
    Padding: 15px 40px
    Text "Try for free": 14px/700 #FFFFFF
```

### Mobile Pricing 1 (`mobile-pricing-1`)
```
Container: 414 × 1849px, bg #FAFAFA
Inner: 330px wide, padding 45px 0, gap 48px

Header Row (310 × 140px):
  Title (h2): 40px/700 #252B42, width 144 height 50 (centered)
  Paragraph: 14px/400 #737373, width 262 height 80 (4 lines, centered)

Switch Toggle: SAME as desktop

Pricing Cards Row (327 × 1358px, flex-COLUMN ⭐, gap 30px):
  TWO cards STACKED vertically (mobile)

Each Card (327 × 664px):
  Padding: 50px 40px
  Gap: 35px
  Background: #FFFFFF, border 1px #23A6F0, border-radius 10px
  Layout: flex-column, center
  
  Title (h3): 24px/700 #252B42
  Description (h5): 16px/700 #737373, centered, width 160 height 48
  Price Block: same as desktop
  Features List (247 × 236px): SAME structure
  Button: 246 × 52px, bg #23A6F0
```

### Tipografi & Renkler Özeti
- Section background: `#FAFAFA` (light-gray-1) ⭐
- Card background: `#FFFFFF`
- Card border: `1px solid #23A6F0` (primary blue) ⭐
- Card border-radius: 10px
- Card padding: 50px 70px (desktop), 50px 40px (mobile)
- Title (h3): 24px/700 #252B42
- Description (h5): 16px/700 #737373
- Price (h2): 40px/700 #23A6F0 (BLUE) ⭐
- Currency/Period stack on right side
- Period text color: #8EC2F2 (disabled-blue) ⭐
- Check icon: 32×32 circle, bg #2DC071 (success GREEN) ⭐ — NOT primary blue!
- Muted/cancelled feature icon: 32×32 circle, bg #BDBDBD
- Feature text (h6): 14px/700 #252B42
- Button: bg #23A6F0, text white, padding 15px 40px, radius 5px

### Switch Toggle Detayları
- Toggle bg: #FFFFFF, border 1px #23A6F0
- Toggle inner: bg #EBEBEB, border 1px #D0D0D0 (off state)
- "Save XX%" badge: bg #B3E3FF (faded-primary), text #23A6F0, pill radius 37px

### Önemli Detay (Variant 1 vs diğerleri)
- **Variant 1**: 2 kart yan yana (desktop), basic style
- **Variant 2**: 3 kart, ortada DARK card (#252B42 bg), white text — featured plan
- **Variant 3**: 3 kart, badge "Popular" (#E77C40 turuncu çember sağ üstte)
- **Variant 4**: 3 kart, gri border (#DEDEDE), middle card with orange badge
- **Variant 6**: Horizontal layout (title sol, price+button sağ)

### Pricing-Style-1 vs diğerleri
- **pricing-style-1**: Border 1px #23A6F0, radius 10px (Variant 1 default) ⭐
- **pricing-style-2**: Border 1px #23A6F0, radius 0 (no border-radius - sharp corners)
- **pricing-style-3**: Card-item with badge (#E77C40 orange circle top-right)
- **pricing-style-6**: Horizontal 2-column layout (title+desc sol, price+button sağ)


---

## 💬 TESTIMONIALS — Variant 1 KULLANILACAK

### Desktop Testimonials 1 (`desktop-testimonials-1`)
```
Container: 1440 × 620px, bg #252B42 (dark) + image overlay
Background filter: rgba(0,0,0,0.75) opacity 0.75 ⭐
Inner: 1050px wide, padding 80px 0, gap 96px

Card-item (915 × 460.01px, padding 30px 35px, gap 48px, radius 5px):
  Layout: flex-column, center
  
  Quote/Tagline (h2-styled): 40px/700, color #FFFFFF, centered
    Width: 613px, height 50px (single line)
    "Words From Our Customers"
  
  Card Content (845 × 302.01px, gap 20px):
    Avatar: 122 × 122px, border-radius full circle (250px or 50%)
      Border: 1px solid #BDBDBD
      Background: user image
    
    Stars row (130.07 × 22.01px, gap 5px):
      5 stars, each 22.01 × 22.01px
      Color: #F3CD03 (secondary yellow) ⭐
      4 filled (bxs-star) + 1 empty (bx-star)
    
    Testimonial text (h6): 14px/700, line-height 24px, color #FFFFFF, centered
      Width: 613px, height 48px (2 lines max)
    
    Name + Job (93 × 50px, flex-row, gap 15px):
      Name (link): 14px/700 #ECECEC (light-gray-2) ⭐ NOT pure white
      Job title (h6): 14px/700 #FFFFFF
```

### Mobile Testimonials 1 (`mobile-testimonials-1`)
```
Container: 414 × 701px, bg #252B42 + image overlay
Background filter: rgba(0,0,0,0.75) opacity 0.5 (mobile lighter)
Inner: 369px wide, padding 80px 0, gap 96px

Card-item (394 × 534.01px, padding 30px 35px, gap 48px):
  Title (h2-styled): 40px/700 #FFFFFF, width 324 height 100 (2 lines)
  
  Card Content (308 × 326.01px, gap 20px):
    Avatar: 122 × 122px (same as desktop)
    Stars: 130.07 × 22.01px (same)
    Testimonial text (h6): 14px/700 #FFFFFF, width 268 height 72 (3 lines)
    Name + Job: same structure
```

### Tipografi & Renkler Özeti
- Background: `#252B42` (dark) + image overlay + filter rgba(0,0,0,0.75) opacity 0.75 ⭐
- Card border-radius: 5px (subtle)
- Card padding: 30px 35px
- Card gap: 48px (between title and content)
- Avatar size: 122 × 122px (LARGE round)
- Avatar border: 1px solid #BDBDBD
- Stars color: `#F3CD03` (yellow secondary) ⭐
- Title (h2): 40px/700 #FFFFFF, centered
- Testimonial text (h6): 14px/700 #FFFFFF (white), line-height 24px, centered
- Name (link): 14px/700 `#ECECEC` (light-gray-2) ⭐ özel renk
- Job (h6): 14px/700 #FFFFFF
- Container padding: 80px 0
- Container gap: 96px

### Önemli Detay (Variant 1 vs diğerleri)
- **Variant 1**: Dark bg (#252B42) + image overlay + LARGE quote title üstte ⭐
- **Variant 2**: Solid blue bg (#2A7CC7 hover-color), no image, h3 size testimonial
- **Variant 3**: Green bg (#2DC071) + scattered floating avatars (10+ avatars decorative)
- **Variant 4**: 2-column layout, sol: quote/text, sağ: image
- **Variant 5**: White bg, 2-col with image left + h3 testimonial right
- **Variant 6**: White bg + grid of 9 photos (3x3 instagram-style)

### Stars Pattern
4 dolu yıldız + 1 boş yıldız tipik (4/5 rating)
Her yıldız: 22.01 × 22.01px
Gap: 5px
Color: #F3CD03 (yellow) - aynı testimonial card örneklerindeki gibi


---

## 🦶 FOOTER — Variant 1 KULLANILACAK

### Desktop Footer 1 (`desktop-footer-1`)
```
Container: 1440 × 414px
  - Top section (white): 1440 × 338px, bg #FFFFFF
  - Bottom bar: 1440 × 76px, bg #FAFAFA (light-gray-1) ⭐

TOP SECTION:
Inner: 1050px wide, padding 80px 0, gap 80px
Row: 1046 × 178px, flex-row, align-items flex-start, gap 30px (4 columns)

Column 1 (col-md-3): 238 × 146px, flex-col, gap 25px
  Title (h3): "Bandage" 24px/700 #252B42, width 154px
  Paragraph: 14px/400 #737373, width 211 height 40 (2 lines)
  Social Media row: 112 × 24px, gap 20px
    - Facebook: 24×24, color #23A6F0 (primary blue)
    - Instagram: 24×24, color #23A6F0
    - Twitter: 24×19.76, color #23A6F0
    All icons: ant-design icon set, color #23A6F0

Column 2-4 (col-md-3): 240-241 × 178px, flex-col, gap 20px each
  Title (h3): 24px/700 #252B42 ("Company Info", "Legal", "Features", "Resources" etc.)
  Links list (flex-col, gap 10px):
    Each link: 14px/700 (link style) #737373, line-height 24px
    Auto-width based on text

BOTTOM BAR:
Container: 1440 × 76px, bg #FAFAFA
Inner: 1050 × 74px, padding 25px 0
Row: 513 × 24px, flex-row, align-items center, gap 213px
Centered text:
  "Made With Love By Figmaland All Right Reserved"
  Style: h6 14px/700 #737373, line-height 24px
  Width: 359px
```

### Mobile Footer 1 (`mobile-footer-1`)
```
Container: 414 × 1005px, bg #FAFAFA
Top section: 414 × 907px, bg #FFFFFF
Bottom bar: 414 × 98px, bg #FAFAFA

TOP SECTION:
Inner: 1050px (overflow), padding 80px 0, gap 80px
Row: 241 × 770px, flex-COLUMN ⭐ (4 columns stacked)
  Gap: 30px between sections

Column 1 (Bandage + Social): 238 × 146px, gap 25px
  Title: h3 24px/700 #252B42
  Paragraph: 14px/400 #737373, width 211 height 40
  Social: 112×24, gap 20px (Facebook + Instagram + Twitter all #23A6F0)

Column 2-4 (Link sections): each gap 20px
  Title: h3 24px/700 #252B42
  Link list: gap 10px, each link 14px/700 #737373

BOTTOM BAR:
Container: 414 × 98px, bg #FAFAFA, padding 25px 0
Centered: "Made With Love By Figmaland All Right Reserved"
  216 × 48px, h6 14px/700 #737373 (2 lines on mobile)
```

### Tipografi & Renkler Özeti
- Top section bg: `#FFFFFF`
- Bottom bar bg: `#FAFAFA` (light-gray-1) ⭐
- Section title: h3 24px/700 #252B42
- Paragraph (under brand): 14px/400 #737373
- Links: 14px/700 (link style) #737373, line-height 24px ⭐ — bold, NOT regular
- Social icons: 24px, color `#23A6F0` (primary blue) ⭐
- Copyright text: h6 14px/700 #737373

### Layout Detayları
**Desktop:**
- 4 columns yan yana (Bandage info + 3 link sections)
- Inner width: 1046px, gap 30px
- Padding container: 80px 0
- Row gap: 80px (top section to bottom bar separation handled by section heights)

**Mobile:**
- 4 columns ÜST ALTA (stacked column layout)
- Width 241px center
- Gap between columns: 30px
- Padding: 80px 0

### Social Media Icons (Variant 1)
- 3 icons (Facebook, Instagram, Twitter)
- Set: ant-design (filled/outlined mix)
- Color: `#23A6F0` (primary) — NOT brand colors!
- Container: 112 × 24px, gap 20px
- Icon size: 24×24 (Twitter slightly shorter at 19.76)

### Önemli Detaylar (Variant 1 vs diğerleri)
- **Variant 1**: Tek section + 4 column, white bg + light gray bottom bar ⭐ DEFAULT
- **Variant 2**: Üstte CTA section ekli (h3 + button), aynı 4 column footer
- **Variant 3**: Üstte 4 feature card (kırmızı çember icon #E74040), copyright + social mobile
- **Variant 4**: 3 column (4 yerine), space-between layout
- **Variant 5**: Background #2A7CC7 (hover-blue), beyaz text, mavi linkler #8EC2F2
- **Variant 6**: Top bar = Brand + Social, divider line (#E6E6E6), then links + email subscribe form
  - Subscribe form (321×87): email input + Subscribe button
  - Input bg #F9F9F9, border #E6E6E6, radius 5px
  - Button bg #23A6F0, radius **0px 5px 5px 0px** (right corners only)

### Variant 6 Subscribe Form (eğer Variant 6 kullanılırsa)
- Form group: 321 × 87px (input height 58px)
- Input: bg #F9F9F9, border 1px #E6E6E6, radius 5px, placeholder "Your Email" 14px/400 #737373 padding-left 20px
- Button (right 117px): bg #23A6F0, "Subscribe" 14px/400 #FFFFFF, radius 0 5 5 0 ⭐
- Form-text below: 12px/400 #737373


---

## 📞 CONTACT — Variant 1 KULLANILACAK

### Desktop Contact 1 (`desktop-contact-1`)
```
Container: 1440 × 585px, bg #FFFFFF (white background)
Inner: 1050px wide, padding 112px 0, gap 96px

Row (centered, 607 × 352px, gap 36px):
Main Content (centered, 607 × 352px, gap 30px):
  
  Title (h2): 40px/700, line-height 50px, color #252B42
    Width: 479px, height 100px (2 lines), centered
  
  Paragraph (h4 size): 20px/400, line-height 30px, color #737373
    Width: 607px, height 60px (2 lines), centered
  
  Button (Md): 268 × 52px
    Background: #23A6F0 (primary)
    Border-radius: 5px
    Padding: 15px 40px
    Text "Contact Our Sales Team": 14px/700 #FFFFFF (188 × 22px)
  
  Social Icons Row (sm): 242 × 50px
    Padding: 10px
    Gap: 34px
    Layout: flex-row
    Icons: Twitter, Facebook, Instagram, LinkedIn
    Each icon: 30 × 30px (twitter 30×24.49)
    Icon color: #BDBDBD (muted-color, NOT primary blue!) ⭐
```

### Mobile Contact 1 (`mobile-contact-1`)
```
Container: 414 × 686px, bg #FFFFFF
Inner: 287px wide (centered), padding 112px 0, gap 96px

Row (287 × 462px, gap 36px):
Main Content (287 × 462px, gap 30px):
  
  Title (h2): 40px/700 #252B42
    Width: 264px, height 150px (3 lines), centered
  
  Paragraph: 20px/400 #737373
    Width: 287px, height 120px (4 lines), centered
  
  Button: SAME as desktop (268 × 52px, bg #23A6F0)
  
  Social Icons: SAME as desktop (4 icons, gap 34px, color #BDBDBD)
```

### Tipografi & Renkler Özeti
- Background: `#FFFFFF` (white) ⭐ — NOT dark!
- Title (h2): 40px/700 #252B42, centered
- Paragraph: h4 size 20px/400 #737373, centered (large paragraph)
- Button: bg #23A6F0, white text, padding 15px 40px, radius 5px
- Button width: 268px (longer text "Contact Our Sales Team")
- Social icons: 30 × 30px each, color `#BDBDBD` (muted gray) ⭐
- Social row gap: 34px, padding 10px
- Container padding desktop: 112px 0
- Container padding mobile: 112px 0
- Inner gap: 96px
- Section content gap: 30-36px

### Önemli Detay (Variant 1 vs diğerleri)
- **Variant 1**: White bg, large title + paragraph + button + social icons (vertical centered) ⭐
- **Variant 2**: White bg, smaller title (h2 50px), small paragraph, link "+ Read More" — minimal
- **Variant 3**: Dark bg (#252B42) + image overlay, sol başlık+button + sağ contact info cards (4 cards: Phone, Email, Address etc.)
- **Variant 15**: Blue bg (#2A7CC7), 2-column with image right, white text, outlined button

### Social Icons Detayı (Variant 1)
- Twitter: 30 × 24.49px
- Facebook: 30 × 30px (kare içinde)
- Instagram: 30 × 30px (outlined)
- LinkedIn: 30 × 29.88px
- Tümü gri (#BDBDBD), hover'da primary mavi olabilir
- Gap: 34px, Padding: 10px


---

## 📰 CONTENT — Variant 1 KULLANILACAK

### Desktop Content 1 (`desktop-content-1`)
```
Container: 1440 × 867px, bg #252B42 (dark) + image overlay
Filter overlay: linear-gradient(89.85deg, #000000, rgba(0,0,0,0)) opacity 0.75
Inner: 1050px wide, padding 112px 0, gap 96px

Row (centered, 607 × 597px, gap 30px):
Main Content (centered, 607 × 597px, gap 30px):
  
  Title (h2): 40px/700, line-height 50px, color #FFFFFF
    Width: 430px, height 100px (2 lines), centered
  
  Paragraph: 14px/400, line-height 20px, color #FFFFFF
    Width: 498px, height 40px (2 lines), centered
  
  Hero Image: 397 × 397px (square)
    Center placement, no border radius
    URL placeholder: blouse/product image
```

### Mobile Content 1 (`mobile-content-1`)
```
Container: 414 × 911px, bg #252B42 (dark) + image overlay
Filter: same gradient, opacity 0.75
Inner: 414px wide, padding 112px 0, gap 96px

Row (414 × 687px, gap 36px):
Main Content (316 × 687px, gap 30px):
  
  Title (h2): 40px/700 #FFFFFF
    Width: 230px, height 150px (3 lines), centered
  
  Paragraph: 14px/400 #FFFFFF
    Width: 232px, height 80px (4 lines), centered
  
  Hero Image: 316 × 397px (slightly narrower, full-bleed mobile)
```

### Tipografi & Renkler Özeti
- Background: `#252B42` (dark) + image overlay
- Filter overlay: `linear-gradient(89.85deg, #000000 0.13%, #000000 0.14%, rgba(0,0,0,0) 99.56%)` opacity **0.75**
- Title (h2): 40px/700 #FFFFFF, centered
- Paragraph: 14px/400 #FFFFFF, centered (NOT h4 size — basic paragraph)
- Hero Image: 397 × 397px (desktop square), 316 × 397 (mobile)
- Container padding: 112px 0
- Inner gap: 96px
- Section content gap: 30px (title-paragraph-image)

### Önemli Detay (Variant 1 vs diğerleri)
- **Variant 1**: Dark bg + büyük başlık + paragraf + ALT'TA büyük ürün görseli (397×397) — tipik "feature highlight" ⭐
- **Variant 2**: Image background overlay (rgba 0.5), centered subtitle (h5) + büyük h2 + paragraf + 2 button (primary + outline)
- **Variant 3**: White bg, sol başlık+paragraf+image, sağ büyük image (split layout, no buttons)
- **Variant 4**: White bg, sol h3 başlık+image, sağ "small label red #E74040" + 2 image collage + paragraf

### Variant 1 Özelliği
- ÜSTTE: title + paragraph (centered)
- ALTTA: large product image (square 397×397)
- Image NO border-radius (sharp edges)
- Tek sütun layout (split değil)
- Dark background (NOT white)


---

## 🏠 HOMEPAGE (Full E-Commerce) — Variant 1 KULLANILACAK

Bu, tüm Bandage homepage'inin TAM yapısıdır - tüm section'ların bir araya geldiği master layout.

### Desktop Homepage (`ecommerce-desktop-1`) - Toplam 1440 × 6197px

#### Section Order (Top to Bottom):
1. **Header + Hero Carousel** (1440 × 852px)
2. **Editor's Pick / Shop Cards** (1440 × 770px) - Variant 31
3. **Featured Products / Product Cards** (1440 × 1652px) - Variant 10
4. **Hero Carousel 2 / Vita Classic** (1440 × 709px) - Yeşil bg promotional
5. **Container-Fluid Section** (1440 × 682px) - Sol görsel + sağ başlık+button (2DC071 yeşil button)
6. **Blog 3** (1440 × 1044px)
7. **Footer 6** (1440 × 488px)

### Section 1: Header + Hero (`desktop-shop-header-1`) - 1440 × 852px

#### TopBar (Dark navbar): 1440 × 58px, bg #252B42
```
Padding: 24px (col-md-4 her biri)
3 columns:
  Sol (415 × 46px, gap 10px):
    - Phone icon + "+9 (110) 234 567 89" - 14px/700 white, padding 10px
    - Email icon + "michelle.rivera@example.com" - 14px/700 white, padding 10px
  Orta (332 × 44px, gap 10px):
    - "I am here to help you all day!" - 14px/700 white
  Sağ (233 × 46px, padding 10px, gap 10px):
    - "Follow Us and get a chance to win 80% off" - 14px/700 white (83×24)
    - Social icons (120×26): Facebook, Instagram, Twitter, YouTube
      Each: 26×26 button (padding 5px), icon 16×16 white
      Position: 0px / 31.5px / 61.5px / 93.5px (gap ~5px)
```

#### Main Navbar (Light): 1437 × 58px, bg #FFFFFF, top: 70px
```
Logo "Bandage": h3 24px/700 #252B42 (108×32px), left position
Nav menu (361×25, gap 15px):
  - "Home" (43×24): link 14px/700 #737373
  - "Shop ▼" (Category dropdown 63×25): h5 14px/500 #252B42 + chevron-down 5.71×10px
  - "About" (45×24): link
  - "Blog" (33×24): link
  - "Contact" (58×24): link
  - "Pages" (44×24): link

Right Auth/Actions (324×54, sağ taraf):
  - "Login / Register": Lock icon 12×12 #23A6F0 + 14px/700 #23A6F0 (166×54, padding 15px, radius 37px)
  - Search icon button: 46×46, padding 15px, radius 37px (icon 16×16 #23A6F0)
  - Cart icon button: 56×46, icon 16×16 + count "1" 12px/400 #23A6F0
  - Heart icon button: 56×46, icon 16×16 + count "1" 12px/400 #23A6F0
```

#### Shop Hero Carousel: 1440 × 716px, top 136px
```
Container: image bg with overlay (rgba(0,0,0,0.5))
Padding: 112px 0, gap 80px
Inner: 1044 × 651px

Row (flex-row, padding 48px 0, gap 30px, 1044×427):
  Left (col-md-8): 599 × 331px, gap 35px
    Subtitle (h5): 16px/700 #FFFFFF (122×24) — "SUMMER 2020"
    Headline (h1): 58px/700 #FFFFFF (548×80) — Big title
    Paragraph (h4): 20px/400 #FAFAFA (376×60) — Description
    CTA Button (lg): 221×62px, bg #2DC071 (success GREEN!) ⭐
      Padding: 15px 40px, radius 5px
      Text "SHOP NOW": h3 24px/700 #FFFFFF (141×32)
  Right (col-md-4): 415 × 280px (image area)

Indicators (carouselCaptions): 126×10px, bottom 49px center
  Active: 62×10 white solid
  Inactive: 63×10 white opacity 0.5

Arrow Controls: 24×44.47px each, white chevron
  Left: position 40px (top 283px)
  Right: position 1381px (top 283px)
```

### Section 2: Editor's Pick (`desktop-shop-cards-31`) - 1440 × 770px, bg #FAFAFA
```
Inner: 1050 × 770px, padding 80px 0, gap 48px

Header (607 × 62px, gap 10px center):
  Title (h3): 24px/700 #252B42 "EDITOR'S PICK" (181×32)
  Paragraph: 14px/400 #737373 "Problems trying to resolve..." (347×20)

Cards Row (1050 × 500px, flex-row, gap 30px):
  Card 1 (col-md-6): 510 × 500px (LARGE, sol)
    BG image with rgba(33,33,33,0.25) overlay
    Card-content (sol-alt): height 48px, left 31px, right 309px, bottom 26px
    Background: #FFFFFF
    Title (h5): 16px/700 #252B42 (40×24) e.g. "MEN"
  
  Card 2 (col-md-3): 240 × 500px
    Card-content: height 48px, left 21, right 83, bottom 18
    Padding 12px 48px, bg white
    Title: "WOMEN" 16px/700 #252B42 (69×24)
  
  Card 3 + 4 (col-md-3): 240 × 500px (gap 16px column)
    Each 240 × 242px (KISA cards, ÜST ÜSTE)
    Card 3: "ACCESSORIES" (118×24) - padding 12px 26px
    Card 4: "KIDS" (40×24) - padding 12px 40px
```

### Section 3: Featured Products (`desktop-product-cards-10`) - 1440 × 1652px
```
Inner: 1124 × 1652px, padding 80px 0, gap 80px

Header (692 × 102px, gap 10px center):
  Subtitle (h4): 20px/400 #737373 "Featured Products" (191×30)
  Title (h3): 24px/700 #252B42 "BESTSELLER PRODUCTS" (299×32)
  Paragraph: 14px/400 #737373 (347×20)

Products Grid: 2 ROWS × 4 COLUMNS = 8 products
Row layout: 1049 × 615px each, gap 30px (between rows)
  Per row: flex-row, gap 30px (4 cards)

Each Product Card (col-md-3): 238-241 × 615px
  Container: 239 × 615px, bg #FFFFFF
  
  Image (fixed-height): 239 × 427px, bg url
  
  Content (Frame 3): 239 × 188px, padding 25/25/35, gap 10px, center-aligned
    Title (h5): 16px/700 #252B42 (131×24) e.g. "Graphic Design"
    Category (link): 14px/700 #737373 (146×24) e.g. "English Department"
    Prices (108×34, padding 5px 3px, gap 5px):
      Old price (h5): 16px/700 #BDBDBD strikethrough (52×24) "$16.48"
      New price (h5): 16px/700 #23856D ⭐ (45×24) "$6.48"
    Color swatches (82.23 × 16, gap 6.08px):
      4 circles 16×16: #23A6F0 / #23856D / #E77C40 / #252B42
```

### Section 4: Hero Carousel 2 / Vita Classic (`carousel 2`) - 1440 × 709px
```
Background: #23856D (secondary green) ⭐
Inner: 1036 × 711px, padding 112px 0, gap 80px

Row (flex-row, gap 30px):
  Left (col-md-6): 509 × 432px, padding 60px 0 0 0, gap 30px
    Subtitle (h4): 20px/400 #FFFFFF "SUMMER 2020" (154×30)
    Headline (h1): 58px/700 #FFFFFF (509×160) "Vita Classic Product"
    Paragraph: 14px/400 #FFFFFF (341×40)
    CTA (292×52, gap 34px):
      Price (h3): 24px/700 #FFFFFF "$16.48" (77×32)
      Button: 181×52, bg #2DC071 (green!), radius 5px
        Text "ADD TO CART": 14px/700 white
  Right (col-md-6): 510 × 685px (PNG product image)

Indicators: same style (126×10, white solid + 0.5 opacity)
Arrows: 24×44.47px, position left 40, right 1381 (top 401)
```

### Section 5: Container-Fluid (`container-fluid`) - 1440 × 682px, bg #FFFFFF
```
Row: 1439 × 682px, justify-end, align-center, gap 30px

Left (col-md-6): 704 × 682px (large background image)
  Asian woman/man with winter clothes - 725×774px, position -137 / -211

Right (col-md-6): 573 × 326px, gap 30px
  Subtitle (h5): 16px/700 #BDBDBD "SUMMER 2020" (122×24)
  Headline (h2): 40px/700 #252B42 (375×100) "Part of the Neural Universe"
  Sub-headline (h4): 20px/400 #737373 (376×60)
  CTA Buttons (332 × 52, gap 10px):
    Button 1: 151×52, bg #2DC071 (green), white text "BUY NOW" 14px/700 (71×22)
    Button 2 (outline): 171×52, border 1px #2DC071, text #2DC071 "READ MORE" (91×22)
```

### Section 6: Blog 3 (`desktop-blog-3`) - 1440 × 1044px
```
Inner: 1050 × 1044px, padding 112px 0, gap 80px

Header (692 × 134px, gap 10px center):
  Tag (h6): 14px/700 #23A6F0 "Practice Advice" (114×24) ⭐
  Title (h2): 40px/700 #252B42 "Featured Posts" (309×50)
  Paragraph: 14px/400 #737373 (469×40)

Posts Row (1045 × 606px, flex-row gap 30px, 3 posts):
  Each Card (col-md-4): 328 × 606px
    Container: 348 × 606px, bg #FFFFFF, **box-shadow 0px 2px 4px rgba(0,0,0,0.1)** ⭐
    
    Image: 348 × 300px (fixed-height)
      "NEW" Tag: 56×24, bg #E74040, radius 3px, position top-left 20/20
        Padding 0 10px, "NEW" 14px/700 white (36×24)
    
    Content (348 × 306px, padding 25/25/35, gap 10px):
      Tags row (160×16, gap 15px):
        Tag1: 12px/400 #8EC2F2 (disabled-blue) ⭐ "Google" (45×16)
        Tag2: 12px/400 #737373 "Trending" (56×16)
        Tag3: 12px/400 #737373 "New" (29×16)
      
      Title (h4): 20px/400 #252B42 (247×60) ⭐ NOT 700!
      Description: 14px/400 #737373 (280×60)
      
      Stats Row (298×46, padding 15px 0, justify space-between):
        Date (100×16, gap 5px): calendar icon 16×16 #23A6F0 + "22 April 2021" 12px/400 #737373
        Comments (105×16, gap 5px): chart icon 16×14.67 #23856D + "10 comments" 12px/400 #737373
      
      "Learn More" link (101×24, gap 10px): 
        Text: h6 14px/700 #737373 (82×24)
        Arrow icon: 9×16 #23A6F0
```

### Section 7: Footer 6 (`desktop-footer-6`) - 1440 × 488px

#### Top Bar (Logo + Social): 1440 × 142px, bg #FAFAFA
```
Inner: 1050 × 138px, padding 40px 0
Row (flex-row, gap 577.5px, 1049.5 × 58):
  Left: Logo "Bandage" h3 24px/700 #252B42 (236×58)
  Right: Social icons row (236 × 24, justify-center)
    Container 112 × 24, gap 20px:
      Facebook: 24×24 #23A6F0
      Instagram: 24×24 #23A6F0
      Twitter: 24×19.76 #23A6F0
```

#### HR Divider: 1057 × 0px, border 1px #E6E6E6, top 138px

#### Middle (Links + Subscribe): 1440 × 272px, bg #FFFFFF
```
Inner: 1050 × 270px, padding 50px 0
Row (1041 × 170, flex-row, gap 30px):
  
  Col 1 "Company Info" (148 × 170, gap 20px):
    Title (h5): 16px/700 #252B42 (115×24)
    Links (97×126, gap 10px): 4 links, all 14px/700 #737373
      "About Us" / "Carrier" / "We are hiring" / "Blog"
  
  Col 2 "Legal" (152 × 170): 
    Title (h5): "Legal" 16px/700 #252B42 (45×24)
    Links: "About Us" / "Carrier" / "We are hiring" / "Blog"
  
  Col 3 "Features" (148 × 170): 
    Title: "Features" (72×24)
    Links: "Business Marketing" / "User Analytic" / "Live Chat" / "Unlimited Support"
  
  Col 4 "Resources" (152 × 170): 
    Title: "Resources" (86×24)
    Links: "IOS & Android" / "Watch a Demo" / "Customers" / "API"
  
  Col 5 "Get In Touch" (321 × 131, gap 20px):
    Title (h5): 16px/700 #252B42 (103×24)
    Subscribe Form (321 × 87):
      Input group (height 58):
        Input: bg #F9F9F9, border 1px #E6E6E6, radius 5px
          Placeholder "Your Email": 14px/400 #737373, padding-left 20px
        Submit (right 117px): bg #23A6F0, border-radius **0px 5px 5px 0px** (sağ köşeler) ⭐
          Text "Subscribe": 14px/400 white
      Form-text (155×28, bottom 0): 12px/400 #737373 (privacy text)
```

#### Bottom Bar (Copyright): 1440 × 74px, bg #FAFAFA, top 414px
```
Inner: 1050 × 74px, padding 25px 0
Row: 600 × 24px
  Text: "Made With Love By Finland All Right Reserved" 14px/700 #737373 (336×24)
```

### Tipografi & Renkler Özeti (Homepage Master)
- Hero CTA buttons: bg `#2DC071` (success GREEN) ⭐ — primary mavi DEĞİL!
- Hero secondary slide: bg `#23856D` (secondary green) ⭐
- Editor's Pick category overlay: rgba(33,33,33,0.25) on images
- Product card price (new): `#23856D` ⭐
- Product card price (old): `#BDBDBD` strikethrough
- Blog NEW tag: bg `#E74040`, white text, radius 3px (NOT Sale=51, NEW=56 width)
- Blog first tag color: `#8EC2F2` (disabled-blue) ⭐
- Blog title: 20px/400 (NOT 700!) ⭐
- Footer link color: `#737373`
- Subscribe button radius: `0px 5px 5px 0px` (sadece sağ köşeler) ⭐
- Box-shadow (blog/cards): `0px 2px 4px rgba(0, 0, 0, 0.1)`
- Section padding: 80px 0 (cards), 112px 0 (hero/blog/cta), 160px 0 (video)

### Section Order Summary (Variant 1 Homepage)
1. Top Bar (dark, contact info + social)
2. Main Navbar (white, logo + menu + auth)
3. Hero Carousel (image overlay, big headline + GREEN cta)
4. Editor's Pick (5 category cards, asymmetric layout)
5. Bestseller Products (2x4 grid = 8 products)
6. Vita Classic / Promotional (green bg + product image)
7. Container-Fluid Feature (winter clothes + 2 buttons)
8. Featured Posts / Blog (3 posts with NEW tags)
9. Footer (logo+social, links 4 cols + subscribe, copyright)

### Mobile Homepage (`ecommerce-mobile-1`) - 414 × 14518px
- Header: 414 × 532px - hamburger menu (no top bar visible), centered logo
- Mobile menu: 4 items, 30px/400 (mobile-menu typography)
- Hero: full-width carousel, button 221×62 #2DC071
- Editor's Pick: stacked column (324px wide cards)
- Products: 1 column (mobile cards 348×615 - same content)
- Vita Classic: same green bg, full-width
- Feature container: stacked
- Blog: 3 posts stacked (330×606)
- Footer: stacked layout, 4-col converts to single col


---

## 🛍️ SHOP PAGES (Full) — Variant 1 KULLANILACAK

Shop sayfası listeleme - filter, breadcrumb, kategori kartları ve ürün gridi içerir.

### Desktop Shop Page (`desktop-shop-1`) - 1440 × 3038px

#### Section Order:
1. **Header** (1440 × 136px) - Same as homepage TopBar (#23856D bg!) ⭐ + Main Navbar
2. **Breadcrumb Container** (1440 × 92px) - bg #FAFAFA, padding 24px 0
3. **Shop Cards 18** (1440 × 271px) - 5 kategori kartı yan yana
4. **Filter Row** (1440 × 98px) - bg #FFFFFF, padding 24px 0
5. **Product Cards 10** (1440 × 1778px) - 3 satır × 4 sütun = 12 ürün + Pagination
6. **Clients** (1440 × 175px)
7. **Footer 6** (1440 × 488px)

#### Header — TopBar Variant Farkı ⚠️
```
TopBar bg: #23856D (secondary green) ⭐ — Homepage'de #252B42 (dark) idi!
Shop sayfasındaki TopBar yeşil arka plana sahip.
Diğer her şey aynı (icons, text, social).
```

#### Breadcrumb Container - 1440 × 92px, bg #FAFAFA
```
Inner: 1033 × 44px, padding 24px 0, gap 30px
Row (flex-row, align-center):
  Left col-md-6 (510 × 32):
    Title (h3): 24px/700 #252B42 "Shop" (63×32)
  Right col-md-6 (509 × 44, align-end):
    Breadcrumb (119 × 44, padding 10px 0, gap 15px):
      "Home" link 14px/700 #252B42 (43×24)
      Arrow icon 9×16 #BDBDBD
      "Shop" h6 14px/700 #BDBDBD (37×24) ⭐ (current page muted)
```

#### Shop Cards 18 - 1440 × 271px, bg #FAFAFA
```
Inner: 1088 × 271px, padding 0 0 48px
Row (1088 × 223px, flex-row, gap 15px - 5 cards):

Each Card (col-md-4): 205 × 223px
  Container: 205 × 223px, bg #FFFFFF
  Background: image with rgba(33, 33, 33, 0.25) overlay
  
  Card Content (centered):
    Title (h5): 16px/700 #FFFFFF "CLOTHS" (67×24), top 87px
    Subtitle (paragraph): 14px/400 #FFFFFF "5 Items" (54×20), top 121px
```

#### Filter Row - 1440 × 98px, bg #FFFFFF, padding 24px 0
```
Inner: 1050 × 50px
Row (1049 × 50px, justify-space-between, flex-row):

Left "Showing 1-12 of 32 results" (168 × 24):
  Label: h6 14px/700 #737373 (166×24)

Middle "Views" toggle (177 × 46, gap 15px):
  Label: h6 14px/700 #737373 "Views:" (53×24)
  Frame 31 (107 × 46, gap 15px):
    Btn 1 (active): 46×46, border 1px #ECECEC, radius 5px, padding 15px
      Icon 16×16 #252B42 (grid icon - dark)
    Btn 2 (inactive): 46×46, border 1px #ECECEC, radius 5px, padding 15px
      Icon 16×16 #737373 (list icon - muted)

Right Sort + Filter (252 × 50, gap 15px):
  Custom Select (141 × 50):
    Box: 50px height, bg #F9F9F9, border 1px #DDDDDD, radius 5px
    Text "Popularity": 14px/400 #737373 (74×28), padding-left 18px
    Dropdown arrow 8×14 #737373 right 35px
  
  Filter Button (94 × 50): bg #23A6F0, radius 5px, padding 10px 20px
    Text: h6 14px/700 #FFFFFF "Filter" (40×24)
```

#### Product Cards 10 (Shop) - 1440 × 1778px
```
Inner: 1124 × 1778px, padding 48px 0, gap 48px
3 ROWS × 4 COLUMNS = 12 ürün

Each row: 1048 × 488px, gap 30px
Each Product Card (col-md-3): 238-241 × 488px
  Container: 239 × 488px, bg #FFFFFF
  
  Image: 239 × 300px (fixed-height) ⭐ (Homepage 427px idi, burada 300px!)
  
  Content (Frame 3): 239 × 188px, padding 25/25/35, gap 10px, center-aligned
    Title (h5): 16px/700 #252B42 (131×24)
    Category (link): 14px/700 #737373 (146×24)
    Prices (108×34, padding 5px 3px, gap 5px):
      Old: 16px/700 #BDBDBD strikethrough (52×24)
      New: 16px/700 #23856D (45×24) ⭐
    Color swatches (82.23 × 16, gap 6.08px):
      4 circles 16×16: #23A6F0 / #23856D / #E77C40 / #23856D
      ⚠️ Shop'ta son swatch farklı: #23856D (Homepage'de #252B42 idi)

Pagination (313 × 74px):
  Container: bg #FFFFFF, border 1.34552px #BDBDBD, radius 6.72761px, shadow 0 2 4 rgba(0,0,0,0.1)
  
  Buttons (flex-row, no gap):
    "First" prev (83 × 74): bg #F3F3F3, border 1px #BDBDBD, padding 25px
      Text: 14px/700 #BDBDBD (33×24, disabled)
    "1" (46 × 74): bg #FFFFFF, border 1px #E9E9E9, padding 25px 20px
      Text: 14px/700 #23A6F0 (6×24)
    "2" (49 × 74): bg #23A6F0 (active!) ⭐, border 1px #E9E9E9
      Text: 14px/700 #FFFFFF (9×24)
    "3" (49 × 74): bg #FFFFFF
      Text: 14px/700 #23A6F0
    "Next" (85 × 74): bg #FFFFFF, border 1px #E8E8E8, padding 25px
      Text: 14px/700 #23A6F0 (35×24)
```

### Mobile Shop (`mobile-shop-1`) - 414 × 8272px

#### Mobile Header (414 × 879px) - navbar-style-7
```
Logo + hamburger (top 23px)
Mobile Menu (122 × 420px, gap 30px, top 149px):
  6 items mobile-menu 30px/400:
    "Home" 30px/400 #252B42 (active, 93×45)
    "Product" 30px/400 #737373 (79×45)
    "Pricing" 30px/400 #737373 (94×45)
    "Contact" 30px/400 #737373 (71×45)
    "Categories" 30px/400 #737373 (122×45)
    "Pages" 30px/400 #737373 (93×45)

Auth/Actions (310 × 265px, top 590px):
  "Login / Register": 310×75px, lock icon 27×28 + 30px/400 #23A6F0 (248×45)
  Search: 64×64 button, icon 34×34 #23A6F0
  Cart: 77×67 button, icon 37×37 + count "1"
  Heart: 69×59 button, icon 29×29 + count "1"
```

#### Mobile Breadcrumb (414 × 202px, bg #FAFAFA)
```
Inner padding 24px 0, gap 30px
Row (414 × 154px, gap 30px):
  Title row (col-md-6, padding 24px 0, 414 × 80, centered):
    h3 24px/700 #252B42 "Shop" (63×32)
  Breadcrumb (col-md-10, 414 × 44, centered):
    "Home" 14px/700 #252B42 → arrow → "Shop" h6 14px/700 #737373
```

#### Mobile Shop Cards 18 (414 × 1628px, bg #FAFAFA)
```
Inner: 333 × 1615, padding 24px 0, gap 18px
Row 1 (333 × 930, gap 15px column - 3 STACKED cards):
  Each card 332-333 × 300px (büyük, mobile için)
  bg image with rgba(33,33,33,0.25)
  Title h5 16px/700 white (67×24)
  Subtitle h6 14px/700 white (54×24)

Row 2 (333 × 619, gap 19px - 2 cards stacked):
  card 332-333 × 300px each
```

#### Mobile Filter Row (412 × 216px, bg #FFFFFF)
```
Container padding 24px 0
Row (252 × 168, gap 24px STACKED):
  Sort top: "Showing 1-12 of 32 results" 14px/700 #737373 (166×24)
  Views row (177 × 46, gap 15px):
    "Views:" + 2 buttons (46×46 each)
  Sort + Filter (252 × 50):
    Custom Select 141 × 50
    Filter button 94 × 50 bg #23A6F0
```

#### Mobile Product Cards 10 (414 × 2832px)
- Inner: 328 × 2832, padding 80px 0, gap 48px
- Row: column stacked 4 cards (328 × 2550, gap 30px)
- Each card: 328 × 615px (mobile size), image 348 × 427px
- Pagination same: 313 × 74px (5 buttons)

#### Mobile Clients - 414 × 1173px
- Inner padding 50px 0, gap 60px (column)
- 6 logos stacked: hooli, lyft, pied-piper-hat, stripe, aws, reddit-alien
- Color: #737373 (grayscale)

#### Mobile Footer 6 - 414 × 1342px
- Same as homepage mobile footer (logo+social, links 4 cols, subscribe form)

### Tipografi & Renkler Özeti (Shop Page)
- **TopBar bg değişti**: `#23856D` ⭐ (Homepage'de `#252B42` idi)
- Card overlay: rgba(33,33,33,0.25)
- Filter button: bg #23A6F0
- Pagination active: bg #23A6F0 white
- Pagination inactive: bg white #23A6F0 text
- Pagination disabled "First": bg #F3F3F3 #BDBDBD text
- Sort dropdown: bg #F9F9F9 border #DDDDDD radius 5px
- Views toggle border: #ECECEC
- Section gap'ler: 80px (cards), 48px (products+filter)
- **Product image height değişti**: 300px (Homepage'de 427px) ⚠️
- **4. color swatch değişti**: #23856D (Homepage'de #252B42)


---

## 🛒 PRODUCT DETAIL PAGES — Variant 1 KULLANILACAK

Single product detail sayfası - image carousel, ürün bilgileri, description tabs, related products içerir.

### Desktop Product Detail (`desktop-product-1`) - 1440 × 3147px

#### Section Order:
1. **Header** (1440 × 136px) - Same as Shop (TopBar #23856D ⭐)
2. **Breadcrumb Container** (1440 × 92px) - bg #FAFAFA
3. **Product Cards 42** (1440 × 598px) - Image carousel + Product info (split layout)
4. **Description Section** (1440 × 572px) - Tabs + 3 column content
5. **Bestseller Products** (1440 × 1086px) - 2 ROW × 4 COLS = 8 ilgili ürünler
6. **Clients** (1440 × 175px)
7. **Footer 6** (1440 × 488px)

#### Breadcrumb Container - same structure as Shop
```
Inner: 1033 × 44px, padding 24px 0, gap 30px
"Home" → arrow → "Shop" (current breadcrumb only)
```

#### Product Cards 42 (Main Product Section) - 1440 × 598px, bg #FAFAFA ⭐
```
Inner: 1050 × 598px, padding 0 0 48px
Row (1050 × 550, flex-row, gap 30px - SPLIT LAYOUT):

LEFT col-md-6: 510 × 550px (Image Carousel)
  Carousel 2: 506 × 546px, radius 5px
  
  Carousel Inner (506 × 450):
    Item 1: full image (506 × 450)
    Item 2: full image (506 × 450)
  
  Carousel Indicators (Thumbnails) - position bottom 0:
    Container: 219 × 75px
    Thumb 1 (active): 100 × 75px, full opacity
    Gap 19px
    Thumb 2 (inactive): 100 × 75px, opacity 0.5
  
  Arrows: 24 × 44.47px white chevrons
    Left: position left 40px, top 258.53px
    Right: position right 0, top 259px

RIGHT col-md-6: 510 × 471px (Product Info)
  Title (h4): 20px/400 #252B42 "Floating Phone" (156×30)
    Position: left 24px, top 11px
  
  Rating Row (221.07 × 24, position left 24px, top 53px, gap 10px):
    5 Stars (130.07 × 22.01, gap 5px each):
      Each star: 22.01 × 22.01 #F3CD03 (gold)
    "10 Reviews": h6 14px/700 #737373 (81×24)
  
  Price (h3): 24px/700 #252B42 "$1,139.33" (108×32)
    Position: left 24px, top 97px
  
  Stock row (159 × 24, position left 24px, top 134px, gap 5px):
    "Availability:" h6 14px/700 #737373 (94×24)
    "In Stock" h6 14px/700 #23A6F0 (60×24) ⭐
  
  Description (paragraph): 14px/400 #858585 (464×60)
    Position: left 24px, top 190px
  
  HR Divider (445 × 0, position left 25px, top 277px):
    border 1px #BDBDBD
  
  Color Swatches (150 × 30, position left 24px, top 306px, gap 10px):
    4 circles 30 × 30 (LARGE!): ⭐
      #23A6F0 / #2DC071 (success NOT secondary!) / #E77C40 / #252B42
  
  Action Buttons (298 × 44, position left 24px, bottom 24px, gap 10px):
    "Select Options": 148 × 44, bg #23A6F0, padding 10px 20px, radius 5px
      Text: h6 14px/700 #FFFFFF (108×24)
    Heart (40 × 40 circle): bg white, border 1px #E8E8E8, radius 44.7857px
      Icon 20×20 #BDBDBD with border 0.625px #252B42 (heart outline)
    Basket (40 × 40 circle): same style
      Icon 20×20 #252B42
    More (40 × 40 circle): same style
      Icon 20×20 (3 dots / more icon)
```

#### Product Description Section - 1440 × 572px, bg #FFFFFF
```
Tab Navigation (navbar-style-3, 1440 × 91px):
  Position: width 1051px, top 10px, left 193px
  Inner padding: 0px (3 tabs, justify center)
  
  Tab 1 "Description" (134 × 72, padding 24px):
    Underline active: text-decoration underline ⭐
    Text: 14px/600 #737373 (86×24)
  Tab 2 "Additional Information" (220 × 72, padding 24px):
    Text: link 14px/700 #737373 (172×24)
  Tab 3 "Reviews" + count (138 × 72, padding 24px, gap 8px):
    "Reviews": link 14px/700 #737373 (62×24)
    "(0)": link 14px/700 #23856D (20×24) ⭐ secondary green count

Line divider: 1049 × 0px, top 86px, border 1px #ECECEC

Content Area (1440 × 499px, top 108px, gap 50px):
  Inner: 1056 × 499, padding 24px 0 48px, gap 30px
  Row (1056 × 427, flex-row gap 30px - 3 COLUMNS):
    
    Col 1 (col-md-4): 332 × 392px (Image)
      Card: 337 × 392, radius 9px
      Image overlay: 325 × 382 bg rgba(196, 196, 196, 0.2) radius 5.62px
      Actual image: 316 × 372 radius 5.38px
    
    Col 2 (col-md-4): 332 × 427px (Description Text)
      Card: padding 0 0 25px, gap 30px, radius 9px
      Title (h3): 24px/700 #252B42 "the quick fox jumps over" (304×32)
      Description: 14px/400 #737373 (332×340) - long paragraph
    
    Col 3 (col-md-4): 332 × 367px (Features Lists)
      Card 1 (332 × 188, gap 30px):
        Title (h3): 24px/700 #252B42 (304×32)
        List (303 × 126, gap 10px) - 4 rows:
          Each row (303 × 24, gap 20px):
            Arrow icon 9×16 #737373
            Text: h6 14px/700 #737373 (274×24)
      
      Card 2 (332 × 179, padding 25px 0 0, gap 30px):
        Title (h3): 24px/700 #252B42 (304×32)
        List (303 × 92, gap 10px) - 3 rows
```

#### Product Cards 15 (Bestseller / Related Products) - 1440 × 1086px, bg #FAFAFA ⭐
```
Inner: 1124 × 1086, padding 48px 0, gap 24px

Section header:
  Title (h3): 24px/700 #252B42 "BESTSELLER PRODUCTS" (299×32)
  Divider line: 1042 × 2px, bg #ECECEC

2 ROWS × 4 COLUMNS = 8 ürün
Each row: 1049 × 442px, gap 30px

Each Product Card (col-md-3): 238-241 × 442px ⭐ (DAHA KISA - no swatch + no category bottom)
  Container: 239 × 442px, bg #FFFFFF
  
  Image: 239 × 280px ⭐ (Shop'ta 300px, Detail'de 280px)
  
  Content (Frame 3): 239 × 162px, padding 25/25/35, gap 10px
    LEFT-ALIGNED (NOT center-aligned!) ⭐
    Title (h5): 16px/700 #252B42 (131×24)
    Category (link): 14px/700 #737373 (146×24)
    Prices (108×34, padding 5px 3px, gap 5px):
      Old: 16px/700 #BDBDBD strike (52×24)
      New: 16px/700 #23856D (45×24)
    
    NO COLOR SWATCHES! ⭐ (Detail page'de yok)
```

### Mobile Product Detail (`mobile-product-1`) - 414 × 8405px

#### Mobile Header (414 × 879px) - same as Shop mobile

#### Mobile Breadcrumb (414 × 92px, bg #FAFAFA)
```
Padding 24px 0
Row: 414 × 44, only breadcrumb (no title section)
"Home" → arrow → "Shop" h6 14px/700 #737373
```

#### Mobile Product Cards 42 - 414 × 991px, bg #FAFAFA
```
Inner: 348 × 991, padding 48px 0
Row (348 × 895, gap 30px - STACKED):

Image Carousel (col-md-6): 348 × 394px
  Carousel: 348 × 394, radius 5px
  Item: 348 × 277 (smaller image area)
  Indicators: 219 × 75 thumbs (same)
  Arrows: position left 40px / right 289px (top 119px)

Product Info (col-md-6): 348 × 471px
  Title h4 20px/400 #252B42 (156×30) at left 24, top 11
  Rating Row (221.07 × 24, position left 24, top 53)
  Price h3 24px/700 #252B42 (108×32) at left 24, top 97
  Stock row at left 24, top 134
  Description 14px/400 #858585 (271×100, mobile 5 satır) at left 24, top 190
  HR (283×0, left 29, top 306)
  Color swatches (150×30, left 24, top 325):
    4 circles 30×30: #23A6F0 / #2DC071 / #E77C40 / #252B42
  Action buttons same (left 24, bottom 24)
```

#### Mobile Product Description - 414 × 1306px, bg #FFFFFF
```
Tab nav (navbar-style-3, 414 × 91px):
  3 tabs (372 × 72, left 21, top 10):
    Tab 1: "Description" 86×24 (active)
    Tab 2: "Additional Information" 172×24
    Tab 3: "Reviews (0)" 62×24 + 20×24

Inner: 332 × 1275, padding 24px 0 80px, gap 80px
Row (332 × 1171, gap 30px STACKED):
  Col 1: 332 × 292 (image)
    Card 337 × 292 radius 9px
    Image 321 × 271 radius 5.38px
  Col 2: 332 × 452 (description)
    Card padding 25px 0, gap 30px
  Col 3: 332 × 367 (features lists - 2 cards)
```

#### Mobile Bestseller (Product Cards 15) - 414 × 2622px, bg #FAFAFA
```
Inner: 331 × 2622, padding 48px 0, gap 24px
Header (324 × 32):
  Title h3 24px/700 #252B42 "BESTSELLER PRODUCTS" centered (324×32)
  Line 1: 331×0 border 1px #ECECEC
Row (328 × 2446, gap 30px column):
  4 cards stacked
  Each: 328 × 589, image 348 × 427 ⚠️ (MOBILE'da büyüyor!)
  Content: 348 × 162 padding 25/25/35
```

#### Mobile Clients & Footer - same as homepage mobile

### Tipografi & Renkler Özeti (Product Detail)
- TopBar bg: #23856D (secondary green) ⭐ - same as Shop
- Product Cards 42 bg: #FAFAFA (gray)
- Title (h4): 20px/400 (NOT bold!) - product name
- Rating stars: #F3CD03 (gold)
- Stock "In Stock": #23A6F0 (primary blue)
- Price (h3): 24px/700 #252B42
- Description: 14px/400 #858585 (slightly different from #737373!) ⚠️
- HR border: 1px #BDBDBD (NOT #E6E6E6)
- **Color swatches BÜYÜK**: 30 × 30px (Homepage 16×16'dan FARKLI!) ⭐
- Color swatch 2: #2DC071 (success NOT #23856D secondary!) ⭐
- Action button "Select Options" bg: #23A6F0
- Action circles: 40×40, border 1px #E8E8E8, radius 44.7857px
- Heart icon: #BDBDBD with #252B42 border (outline)
- Basket icon: #252B42 (filled dark)
- Description tab active: text-decoration underline + 14px/600
- Description tab inactive: 14px/700 (no underline)
- Reviews count "(0)": #23856D (secondary green)
- Bestseller card: NO color swatches, LEFT-aligned content
- Bestseller card image height: 280px (DETAIL specific)
- Bestseller card height: 442px (KISA, swatch yok)
- Section divider line: 2px #ECECEC

### KRITIK DETAYLAR (Product Detail için)
1. ⭐ TopBar yeşil (#23856D) - shop ile aynı
2. ⭐ Product image carousel SOL, info SAĞ (split)
3. ⭐ Color swatches 30×30 BÜYÜK (homepage'de 16×16)
4. ⭐ Swatch sırası farklı: blue/GREEN(success)/orange/dark
5. ⭐ Action butonları: "Select Options" + 3 daire ikon
6. ⭐ Description sectionn'da 3 tab var
7. ⭐ Tab altında 3 column: Image + Description + Features Lists (2 sub-cards)
8. ⭐ Bestseller kartları KISA (442px) ve color swatch YOK
9. ⭐ Bestseller content LEFT-aligned (Homepage center-aligned)
10. ⭐ Description text rengi: #858585 (NOT #737373)


---

## 📖 ABOUT PAGE (Inner) — Variant 1 KULLANILACAK

### Desktop About (`desktop-about-1`) - 1440 × 4422px

#### Section Order:
1. **Header 24** (1440 × 729px) — Hero + Image with decorative shapes
2. **Content 9** (1440 × 236px) — Section subtitle + headline
3. **Stats 9** (1440 × 264px) — 4 numerik istatistik
4. **Video 3** (1440 × 764px) — Video card
5. **Team 4** (1440 × 826px) — 3 ekip üyesi
6. **Clients 3** (1440 × 479px) — 6 logo + heading
7. **Testimonials 4** (1440 × 636px) — Mavi bg + image split
8. **Footer 6** (1440 × 488px)

#### Header 24 (Hero) - 1440 × 729px, bg #FFFFFF
```
Background: hero-2-bg-shape-cover (decorative shapes container 632×612, position right 742px top 117px):
  - Big circle 484×484 #FFE9EA (pink)
  - Small circle 77×77 #FFE9EA top-left
  - Hero image 571×668 (technology illustration)
  - Decorative dots:
    - Circle 30×30 #FFE9EA (right area)
    - Circle 14.78×14.78 #977DF4 (purple, top right)
    - Circle 14.78×14.78 #977DF4 (left middle)

Navbar Style 2 (1322×91, top 0):
  Logo + 4 nav items (Home/Product/Pricing/Contact) + Right (Login + Become a member btn)

Container (1050×545, padding 112px 0, gap 80px, top 104px):
  Row (1044×321, gap 30px, flex-row align-center):
    Left col-md-8 (599×321, gap 35px column):
      Subtitle (h5): 16px/700 #252B42 (149×24)
      Headline (h1): 58px/700 #252B42 (542×80)
      Sub-headline (h4): 20px/400 #737373 (376×60)
      CTA Button: 193×52 bg #23A6F0 padding 15px 40px radius 5px
        Text "Get Quote Now": 14px/700 #FFFFFF (113×22)
    Right col-md-4: 415×280 (image area)
```

#### Content 9 - 1440 × 236px, bg #FFFFFF
```
Inner padding 24px 0
Row (1018×188, gap 60px, flex-row justify-center):
  Left Frame 1 (394×188, padding 24px 0, gap 80px):
    Tag: 14px/400 #E74040 (116×20) "Problems Trying"
    Title (h3): 24px/700 #252B42 (394×96)
  Right col-md-6 (529×40, gap 49px):
    Paragraph: 14px/400 #737373 (545×40)
```

#### Stats 9 - 1440 × 264px, bg #FFFFFF
```
Inner: 1050×264, padding 80px 0, gap 50px
Row (1049×104, gap 30px - 4 columns):
  Each col-md-3 (~238-240×104):
    Number (h1): 58px/700 #252B42 centered (e.g. "15K", "150K", "15", "100+")
    Title (h5): 16px/700 #737373 centered "Happy Customer" / "Monthly Visitor" / "Countries Worldwide" / "Top Partners"
```

#### Video 3 - 1440 × 764px, bg #FFFFFF
```
Inner: 1050×764
Video Card: 989×540, position left 31px top 112px, bg #FFFFFF, radius 20px
  Media bg-cover (image full)
  Filter overlay: linear-gradient(180deg, rgba(0,0,0,0) 14.58%, rgba(56,56,56,0.84) 100%)
  Play button (centered): 92.6×92.6, bg #23A6F0, radius 73.6px (full circle)
    Play icon 19×23 #FFFFFF
```

#### Team 4 - 1440 × 826px, bg #FFFFFF
```
Inner: 1050×819, padding 112px 0, gap 112px
Header (607×100, gap 10px):
  Title (h2): 40px/700 #252B42 (316×50) "Meet Our Team"
  Paragraph: 14px/400 #737373 (469×40)
3 cards (1034×383, gap 30px, flex-row):
  Each card (col-md-4 316-329×383, bg white):
    Image: 316×231
    Content padding 30px gap 10px:
      Name (h5): 16px/700 #252B42 (83×24)
      Job (h6): 14px/700 #737373 (77×24)
      Social row 112×24 gap 20px (Facebook/Instagram/Twitter all #23A6F0)
```

#### Clients 3 - 1440 × 479px, bg #FAFAFA ⭐ (Variant 1'in light gray bg'i)
```
Inner: 1050×479, padding 80px 0, gap 24px
Header (864×120, gap 30px):
  Title (h2): 40px/700 #252B42 (496×50) "Big Companies Are Here"
  Paragraph: 14px/400 #737373 (547×40)
Logos row (1054×175, padding 50px 0, gap 30px):
  6 logos, color #737373 (grayscale)
```

#### Testimonials 4 - 1440 × 636px, bg `#2A7CC7` (hover-color = mavi!) ⭐
```
Background: image at left 850px (right side of container)
Inner: 1050×636, padding 112px 0
Row (1050×412, justify-space-between, gap 225px):
  Left col-md-5 (438×238, gap 24px column):
    Subtitle (h5): 16px/700 #FFFFFF (128×24)
    Title (h2): 40px/700 #FFFFFF (440×50)
    Paragraph: 14px/400 #FFFFFF (440×40)
    Button "Learn More": 130×52, border 1px #FAFAFA, radius 5px, padding 15px 40px
      Text: 14px/700 #FAFAFA (50×22)
  Right col-md-6: 548×412 (testimonial image area)
```

### Mobile About (`mobile-about-1`) - 414 × 8532px

#### Mobile Header 24 - 414 × 1616px
```
Navbar Style 1 (height 532, bg #F7F7F7, hamburger menu)
Mobile menu (123×270, gap 30px): 4 items 30px/400

Container (418×1080, padding 80px 0, top 536px):
  Main Content (418×590, gap 40px column centered):
    Headline (h1=h2): 40px/700 #252B42 (213×50, centered)
    Subheadline: 20px/400 #737373 (277×120)
    CTA: 193×52 bg #23A6F0
  Decorative shapes (387×440):
    Circle 295.65×295.65 #FFE9EA (big)
    Circle 47.27×47.27 #FFE9EA (small)
    Hero image 375.73×439.19
    Decorative dots: 18.48 #FFE9EA + 9.02 #977DF4 (2x)
```

#### Mobile Content 9 - 414 × 500px
```
Inner: 381×500, padding 80px 0
Row (column, gap 60px):
  Tag: 14px/400 #E74040 (116×20)
  Title (h3): 24px/700 #252B42 (269×128) centered
  Paragraph: 14px/400 #737373 (353×60)
```

#### Mobile Stats 9 - 414 × 1006px
```
bg overlay rgba(0,0,0,0.5) on background image
Container padding 100px 0
Row (column, gap 100px - STACKED!):
  4 cards, each 238×104
```

#### Mobile Video 3 - 414 × 477px
```
Video card: 307×316, radius 20px, top 81px centered
Filter overlay same gradient
Play button SMALLER: 56.95×56.95 (Desktop 92.6'dan küçük) ⭐
```

#### Mobile Team 4 - 414 × 1627px
```
Container padding 30px 0
Row (329×1269, column gap 30px - 3 STACKED cards)
NOTE: Mobile social icons COLORED brand colors:
  Facebook #335BF5
  Instagram #E61F5A
  Twitter #21A6DF
```

#### Mobile Clients 3 - 414 × 1444px
```
bg overlay rgba(0,0,0,0.5)
Header (column, 287×150 title + 328×60 paragraph)
6 logos STACKED column, gap 60px
```

#### Mobile Testimonials 4 - 414 × 520px, bg `#2A7CC7`
```
Card item (414×388, padding 30px 0, gap 36px column):
  All content CENTERED column, gap 24px:
    Subtitle: 16px/700 white (128×24)
    Title (h2): 40px/700 white (274×100)
    Paragraph: 14px/400 white (257×80)
    Button "Learn More": 130×52 border 1px #FAFAFA white text
```

### KRITIK DETAYLAR (About Page)
1. ⭐ Testimonials 4 bg: `#2A7CC7` (hover-color, MAVİ - About'a özgü!)
2. ⭐ Decorative shapes: #FFE9EA (pink) + #977DF4 (purple) — About hero için
3. ⭐ Header 24 (NOT inner-header-3 like Team/Pricing!) - illustration based
4. ⭐ Stats 9: 4 büyük number h1 (58px/700) + h5 16/700 #737373 description
5. ⭐ Video 3: 92.6×92.6 play button (desktop), 56.95×56.95 (mobile)
6. ⭐ Clients 3 bg: #FAFAFA + heading (Variant 1 ekstra heading var!)
7. ⭐ Content 9: tag (#E74040) + h3 title + paragraph (split layout)
8. ⭐ Mobile Team 4 social icons: brand-colored (desktop primary blue)


---

## 📞 CONTACT PAGE (Inner) — Variant 1 KULLANILACAK

### Desktop Contact (`desktop-contact-1`) - 1440 × 2532px

#### Section Order:
1. **Header 24** (1440 × 882px) — Hero with image + contact info + social icons
2. **Contact 7** (1440 × 814px) — 3 contact method cards
3. **CTA 3** (1440 × 348px) — Phone number + button + arrow decoration
4. **Footer 6** (1440 × 488px)

#### Header 24 (Contact Hero) - 1440 × 882px, bg #FFFFFF
```
Background decorative shapes (same as About):
  Circle 484×484 #FFE9EA (pink)
  Circle 77×77 #FFE9EA
  Hero image 571×826 (technology illustration)
  Circle 30×30 #FFE9EA
  Circle 14.78 #977DF4 (purple, 2x)

Navbar Style 2 (1322×91): Logo + 4 nav + Login + Become a member btn

Container (1050×742, padding 112px 0, gap 80px):
  Row (1044×518, gap 30px, flex-row align-center):
    Left col-md-8 (599×518, gap 35px):
      Tag (h5): 16px/700 #252B42 (108×24) "CONTACT US"
      Headline (h1): 58px/700 #252B42 (378×160) "Get in touch today!"
      Sub-headline (h4): 20px/400 #737373 (376×60)
      
      Numbers (242×84) - phone numbers:
        Number 1 (h3): 24px/700 #252B42 (242×32) — top 0
        Number 2 (h3): 24px/700 #252B42 (207×32) — top 52px
      
      Social row "sm" (242×50, padding 10px, gap 34px):
        Twitter 30×24.49 (Vector #252B42 - DARK!) ⭐
        Facebook 30×30 (Vector #252B42 with #FFFFFF inner) ⭐
        Instagram 30×30 (#252B42)
        LinkedIn 30×29.88 (#252B42)
    Right col-md-4: 415×280 (image placeholder)
```

#### Contact 7 (3 Cards) - 1440 × 814px, bg #FFFFFF
```
Inner: 1050×841, padding 112px 0, gap 80px

Header (633×134, gap 10px):
  Tag (h6): 14px/700 #252B42 (132×24) "VISIT OUR OFFICE"
  Title (h2): 40px/700 #252B42 (531×100) "We help small businesses with big ideas"

Row (985×403, flex-row align-center - 3 CARDS, MIDDLE TALLER!):

Card 1 (col-md-4, 327×343):
  Card Item: 328×343, bg #FFFFFF, padding 50px 40px, gap 15px column centered
    Icon 72×72 #23A6F0 (chat/email icon)
    Div (216×48):
      Email Line 1: h6 14/700 #252B42 (216×24)
      Email Line 2: h6 14/700 #252B42 (176×24, indent 20px)
    h5 "georgia.young@example.com" 16/700 #252B42
    Subtitle "Get Support": h5 16/700 #252B42 (100×24)
    Outline Button (189×54, border 1px #23A6F0, radius 37px PILL ⭐, padding 15px 36px):
      Text "Submit Request" 14/700 #23A6F0 (117×24)

Card 2 MIDDLE (col-md-4, 329×403, DAHA YÜKSEK!) ⭐:
  Card Item: 328×403, bg `#252B42` DARK ⭐, padding 80px 40px, gap 15px:
    Icon 72×72 #23A6F0
    Address text (h6): white (216×24 + 176×24)
    Subtitle: h5 16/700 #FFFFFF
    Outline button: 189×54 border 1px #23A6F0 radius 37px
      Text: 14/700 #23A6F0

Card 3 (col-md-4, 329×343):
  Card Item: 328×343, bg #FFFFFF, padding 50px 40px
  Phone numbers (h6 white #252B42 in dark, but here #252B42)
  Same outline button
```

#### CTA 3 - 1440 × 348px, bg #FFFFFF
```
Inner: 1050×348, padding 80px 0, gap 96px
Row (607×188, gap 36px column centered):
  Main content (272×188, gap 16px):
    Subtitle (h5): 16/700 #252B42 (239×24) "We can't wait to meet you"
    Title (h1!): 58px/700 #252B42 (272×80) "Let's Talk" or phone number
  CTA Button (186×52, gap 10px row):
    Button Md: bg #23A6F0, padding 15px 40px, radius 5px
      Text "Try it free now": 14/700 #FFFFFF (106×22)

Decorative arrow: 72.56 × 21.84px, border 4px #23A6F0, transform rotate(45.56deg)
  Position: left 670.69px, top -6.1px (pointing to button)
```

### Mobile Contact (`mobile-contact-1`) - 414 × 4929px

#### Mobile Header 24 - 414 × 1616px
```
Navbar Style 1 (532px height, hamburger)
Container (418×1080, padding 80px 0, top 536px):
  Main Content (418×590, gap 40px centered):
    Tag (h5): 16/700 #252B42 (108×24)
    Headline (h1=h2): 40px/700 #252B42 (331×100) centered
    Sub-headline (h4): 20/400 #737373 (277×120)
    Numbers (242×84): same 2-line phone numbers
    Social row sm: 4 dark icons (#252B42)
  Decorative shapes (387×440): same as About mobile
```

#### Mobile Contact 7 - 414 × 1531px, bg `#FAFAFA` ⭐
```
bg overlay (with cover image + rgba(0,0,0,0.5))
Container (330×1453, padding 45px 0, gap 60px):
  Header (column gap 10px):
    Tag (h6): 14/700 #252B42 (132×24)
    Title (h2): 40/700 #252B42 (290×150) centered
  
  Row (329×1119, column gap 30px - 3 STACKED cards):
    Card 1 (327×333, padding 50px 40px white)
      Smaller button: 157×44, border 1px #23A6F0, radius 5px (NOT 37px pill!) ⭐
      Padding 10px 20px
    Card 2 MIDDLE (329×393, padding 80px 40px DARK #252B42, white text)
      Same smaller button style
    Card 3 (329×333, padding 50px 40px white)
```

#### Mobile CTA 3 - 414 × 440px
```
Inner (321×440, padding 112px 0, gap 96px):
  Subtitle (h5): 16/700 #252B42 (321×24)
  Title (h1): 58/700 #252B42 (272×80) centered
  Button: 186×52 bg #23A6F0
  Arrow decoration: 72.56×21.84 border 4px #23A6F0 rotate(45.56deg)
    Position left 160.41px top 33.9px
```

### KRITIK DETAYLAR (Contact Page)
1. ⭐ Header 24 hero with same decorative shapes as About (#FFE9EA + #977DF4)
2. ⭐ Tagline at top of hero (h5 small caps before headline)
3. ⭐ Hero social icons: DARK #252B42 (NOT primary blue like Team!)
4. ⭐ 2-line phone numbers in hero (numbers component, h3 24/700)
5. ⭐ Contact 7: 3 cards with MIDDLE one DARK (#252B42) and TALLER (403 vs 343)
6. ⭐ Card buttons: PILL shape (radius 37px) on desktop, regular (radius 5px) on mobile
7. ⭐ CTA 3: title is h1 (58px/700) - PHONE/EMAIL emphasis
8. ⭐ CTA arrow decoration: 4px border, rotated 45deg pointing to button (decorative element!)
9. ⭐ Mobile Contact 7 cards STACKED, button radius differs (5px not 37px)
10. ⭐ Header 24 (NOT inner-header-3) - illustration hero with content split


---

## 👥 TEAM PAGE (Inner) — Variant 1 KULLANILACAK

### Desktop Team (`desktop-team-1`) - 1440 × 3603px

#### Section Order:
1. **Inner Header 3** (1440 × 384px) — Background image + Navbar 2 + title/breadcrumb
2. **Hero Picture** (1440 × 530px) — 5 image grid layout
3. **Team 4** (1440 × 1759px) — 9 team members (3×3 grid)
4. **CTA 3** (1440 × 442px) — "Become a member" + social
5. **Footer 6** (1440 × 488px)

#### Inner Header 3 - 1440 × 384px, bg #FFFFFF
```
Background: image with filter rgba(255,255,255,0.5) light overlay (height 352px)
Container 91px height for navbar

Navbar Style 2 (1322×91px):
  Logo Bandage h3 24/700 #252B42 (187×58, left)
  Navbar Nav 4 items (275×24, gap 21px, center-left):
    Home / Product / Pricing / Contact - 14px/700 #737373 each
  Right Navbar (300×52, gap 45px):
    "Login" link: btn-text 14/700 #23A6F0 (41×22)
    "Become a member" button: 214×52, bg #23A6F0, padding 15px 25px, gap 15px, radius 5px
      Text: 14/700 #FFFFFF (137×22)
      Arrow icon: 12×10 #FFFFFF

Container Title (870×280, padding 50px 0, top 104px):
  Row col-md-10 (788×180, gap 16px column centered):
    Subtitle (h5): 16/700 #737373 (111×24) "WHAT WE DO"
    Title (h1 size!): 58px/700 #252B42 (788×80) ⭐ — h2 elementi ama h1 typography!
    Breadcrumb (122×44, padding 10px 0, gap 15px):
      "Home" link 14/700 #252B42 (43×24)
      Arrow icon 9×16 #BDBDBD
      "Team" h6 14/700 #737373 (40×24)
```

#### Hero Picture - 1440 × 530px, bg #FFFFFF
```
5 image grid layout:
  Big image LEFT: 700×530, position left 0, top 0
  4 smaller images (361×260 each):
    Top-left: position left 709, top 0
    Bottom-left: position left 709, top 270
    Top-right: position left 1079, top 0
    Bottom-right: position left 1079, top 270
  All small images: transform matrix(-1, 0, 0, 1, 0, 0) (mirrored)
```

#### Team 4 - 1440 × 1759px, bg #FFFFFF
```
Inner: 1050×1759, padding 112px 0, gap 112px

Section header (607×50, gap 10px column):
  Title (h2): 40/700 #252B42 (316×50) "Meet Our Team"

3 ROWS × 3 COLS = 9 team cards
Each row: 1034×383, gap 30px

Each Card (col-md-4): 316-329×383, bg #FFFFFF
  Media: 316×231 image
  Card content (padding 30px, gap 10px column centered):
    Name (h5): 16/700 #252B42 (83×24)
    Job (h6): 14/700 #737373 (77×24)
    Social row (112×24, gap 20px):
      Facebook 24×24 (#23A6F0)
      Instagram 24×24 (#23A6F0)
      Twitter 24×19.76 (#23A6F0)
```

#### CTA 3 - 1440 × 442px, bg #FFFFFF
```
Inner: 1050×442, padding 80px 0, gap 96px
Row (607×282, gap 36px column):
  Main content (547×282, gap 30px column centered):
    Title (h2): 40/700 #252B42 (547×50) "Become a member"
    Paragraph: 14/400 #737373 (411×40)
    CTA Button (186×52): bg #23A6F0, padding 15px 40px, radius 5px
      Text "Join Now": 14/700 #FFFFFF (106×22)
    Social row "sm" (242×50, padding 10px, gap 34px) - COLORED brand logos:
      Twitter 30×24.49 (#55ACEE)
      Facebook 30×30 (#395185 + #FFFFFF inner)
      Instagram 30×30 (#000000)
      LinkedIn 30×29.88 (#0A66C2)
```

### Mobile Team (`mobile-team-1`) - 414 × 8047px

#### Mobile Inner Header 3 - 414 × 869px
```
Background: image (414×814) with filter rgba(255,255,255,0.15)
Navbar Style 1 (532px height, bg #F7F7F7):
  Logo + Search/Cart/Menu icons (top 23-45px)
  Mobile menu (123×270, gap 30px column centered):
    4 items mobile-menu 30px/400 #737373
Container (414×200, padding 0, top 616px):
  Col-md-10 (414×200, gap 16px column centered):
    Subtitle (h5): 16/700 #737373 (111×24)
    Title (h2): 40/700 #252B42 (316×100) ⭐ MOBILE'da h2 size (NOT h1!)
    Breadcrumb (120×44)
```

#### Mobile Hero Picture - 413 × 1070px
```
1 big image TOP: 413×530 (top 0)
4 smaller images (204×260 each, 2x2 grid below):
  Bottom-left top: position left 0, top 540
  Bottom-left bottom: position left 0, top 810
  Bottom-right top: position left 209, top 540
  Bottom-right bottom: position left 209, top 810
  All mirrored matrix(-1, 0, 0, 1, 0, 0)
```

#### Mobile Team 4 - 414 × 4180px
```
Container padding 30px 0
Header (361×190, padding 45px 0):
  Title h2 40/700 #252B42 (302×100)
  Paragraph 14/400 #737373 (302×80)

9 cards STACKED column, gap 30px
Each card 316-329×403 (mobile boyutu)
NOTE: Mobile social icons COLORED brand colors ⭐:
  Facebook #335BF5
  Instagram #E61F5A
  Twitter #21A6DF
```

#### Mobile CTA 3 - 414 × 586px
```
Container (332×576, padding 112px 0, gap 96px):
  Title h2 40/700 #252B42 (332×100)
  Paragraph 14/400 #737373 (321×60)
  Button 186×52 bg #23A6F0
  Social row sm: same 4 colored brand logos
```

### KRITIK DETAYLAR (Team Inner Page)
1. ⭐ Inner Header 3 with light filter rgba(255,255,255,0.5)
2. ⭐ Title h1 size (58/700) on desktop, h2 size (40/700) on mobile
3. ⭐ Navbar Style 2 (NOT topbar+navbar like Shop)
4. ⭐ Hero Picture: 5 image asymmetric grid (1 big + 4 small mirrored)
5. ⭐ Team 4: 3×3 = 9 members
6. ⭐ Desktop social icons primary blue (#23A6F0), Mobile COLORED brand
7. ⭐ CTA 3 social icons COLORED brand logos (twitter/fb/ig/li)

---

## 💰 PRICING PAGE (Inner) — Variant 1 KULLANILACAK

### Desktop Pricing (`desktop-pricing-1`) - 1440 × 4018px

#### Section Order:
1. **Inner Header 3** (1440 × 384px) — Same as Team
2. **Pricing 3** (1440 × 1162px) — 3 pricing cards with switch
3. **Clients 2** (1440 × 365px) — 6 logos with heading
4. **FAQ 5** (1440 × 1037px) — 6 FAQ cards in grid
5. **CTA 3** (1440 × 582px) — "Try free now" with arrow
6. **Footer 6** (1440 × 488px)

#### Inner Header 3 - 1440 × 384px (Same structure as Team)
```
Container Title (870×280, padding 50px 0, top 104px):
  Row col-md-10 (427×180, gap 16px column centered):
    Subtitle (h5): 16/700 #737373 (71×24) "PRICING"
    Title (h1 size!): 58/700 #252B42 (427×80) "PRICING"
    Breadcrumb (134×44):
      "Home" 14/700 #252B42
      Arrow #BDBDBD
      "Pricing" h6 14/700 #737373 (52×24)
```

#### Pricing 3 - 1440 × 1162px, bg #FAFAFA
```
Inner: 1050×1168, padding 112px 0, gap 48px

Header (633×100, gap 10px column centered):
  Title (h2): 40/700 #252B42 (144×50) "Pricing"
  Paragraph: 14/400 #737373 (469×40)

Switch Toggle (310×44, gap 16px row):
  Checkbox (186×28):
    Label "Monthly" left: 16/700 #252B42 (68×24)
    Form check input (45×25, position left 80): bg #FFFFFF, border 1px #23A6F0, radius 16px
      Ellipse 4 (19×19, left 4 top 3): bg #EBEBEB, border 1px #D0D0D0
    Label "Yearly" right: 16/700 #252B42 (51×24, position left 135)
  "Save 25%" badge button (108×44, padding 10px 20px, gap 10px):
    bg `#B3E3FF` (faded-primary) ⭐, radius 37px (PILL)
    Text: 14/700 #23A6F0 (68×24)

Pricing Cards Row (985×704, flex-row align-items: flex-end ⭐):
  - 3 cards with MIDDLE TALLER!

Card 1 "FREE" (col-md-4, 327×664):
  Card: 327×664, bg #FFFFFF, border 1px #23A6F0, radius 10px
    padding 50px 40px, gap 35px column centered
    Title (h3): 24/700 #252B42 (64×32) "FREE"
    Description (h5): 16/700 #737373 (160×48) centered
    Price row (114×56, gap 10px):
      h2 "0": 40/700 #23A6F0 (28×50)
      Div (76×56):
        h3 "$": 24/700 #23A6F0 (16×32)
        h5 "Per Month": 14/700 `#8EC2F2` ⭐ (76×24, disabled-blue)
    Features list (247×236, gap 15px column) - 5 items:
      Items 1-3 (active green check):
        Icon-circle 32×32 bg `#2DC071` (success!) ⭐, radius 200px (full circle)
          Check icon 16×11 #FFFFFF
        h6: 14/700 #252B42 (205×29.25)
      Items 4-5 (disabled gray check):
        Icon-circle 32×32 bg #BDBDBD, radius 200px
          Check icon white
        h6: 14/700 #252B42 (same)
    Button "Try for free" (246×52):
      bg `#252B42 (DARK!)` ⭐ - FREE plan için DARK button
      padding 15px 40px, radius 5px
      Text: 14/700 #FFFFFF (82×22)

Card 2 MIDDLE "STANDARD" (col-md-4, 329×704, DAHA YÜKSEK!) ⭐:
  Card: 327×704, bg `#252B42 (DARK!)` ⭐, border 1px #23A6F0, radius 10px
    padding 70px 40px (DAHA UZUN!), gap 35px
    Title h3 white "STANDARD" (139×32)
    Description h5 white centered (160×48)
    Price (174×56): h2 "$9.99" 40/700 #23A6F0 + Per Month #8EC2F2
    Features list white text
    Button: 246×52 bg #23A6F0 white text

Card 3 "PREMIUM" (col-md-4, 329×664):
  Same as Card 1 but with $19.99 price
  Button: bg #23A6F0 (NOT dark like FREE!)
```

#### Clients 2 - 1440 × 365px, bg #FAFAFA
```
Inner: 1050×365, padding 80px 0
Header text: h4 20/400 #252B42 (385×30) centered "Big Companies Are Here"
Logos row (1054×175, padding 50px 0, gap 30px):
  6 logos color #737373 (grayscale)
```

#### FAQ 5 - 1440 × 1037px, bg #FFFFFF
```
Inner: 1056×1037, padding 80px 0, gap 50px

Header (651×120, padding 45px 0):
  Title (h2): 40/700 #252B42 (262×50) "Pricing FAQs"
  Paragraph (h4): 20/400 #737373 (552×60)

3 ROWS × 2 COLS = 6 FAQ cards
Each row: 1056×159, gap 30px

Each FAQ card (asymmetric col-md-6 + col-md-4):
  Col 1 (491×159, padding 25px, radius 9px):
    Flex row (437×109, gap 20px):
      Arrow icon 9×16 #23A6F0 (NOT muted!) ⭐
      Div (408×109, gap 5px column):
        Question (h5): 16/700 #252B42 (309×24)
        Answer (h6): 14/400 #737373 (408×80)
  Col 2 (535×139, padding 25px, radius 9px):
    Same structure but slightly shorter
    Flex row (493×89, gap 20px):
      Arrow + Div (464×89):
        Question h5 (309×24)
        Answer h6 (464×60) — daha az satır

Footer paragraph: h4 20/400 #737373 (552×30) centered
```

#### CTA 3 - 1440 × 582px, bg #FFFFFF
```
Inner: 1050×602, padding 160px 0, gap 96px (Team CTA'dan DAHA UZUN padding!) ⭐
Row (607×282, gap 36px):
  Main (547×282): 
    Title h2 (547×50) + Paragraph (411×40) + Button 186×52 bg #23A6F0 + Social brand logos
```

### Mobile Pricing (`mobile-pricing-1`) - 414 × 8315px

#### Mobile Inner Header 3 - 414 × 814px
Same structure as Team mobile (navbar 1 + container with title h2 size)

#### Mobile Pricing 3 - 414 × 2551px, bg #FAFAFA
```
Container (330×2482, padding 45px 0, gap 48px)
Header same column layout

Switch Toggle: same (310×44, gap 16px)
  Save badge: bg #B3E3FF, radius 37px, text #23A6F0

Cards Row (329×2112, column STACKED, gap 30px, align-items: flex-end ⭐):
  Card 1 "FREE" (327×664): bg white, border 1px #23A6F0
    NOTE: NO border-radius on mobile! ⭐ (only border)
  Card 2 MIDDLE (329×724): WIDER 335×724 ⭐, bg DARK #252B42, padding 80px 40px
    NOTE: WIDER than side cards (335 vs 327-328)
  Card 3 "PREMIUM" (329×664, 328×664): same as FREE
```

#### Mobile FAQ 1 - 414 × 1849px, bg #FFFFFF (ACCORDION style!) ⭐
```
Container (394×1849, padding 80px 0, gap 80px)

Header (372×125, gap 15px):
  Title h2: 40/700 #252B42 (262×50) "Pricing FAQs"
  Paragraph: 14/400 #252B42 (280×60)

Accordion (362×1344) - 6 items:
  Each accordion-item (362×220, padding 16px 0):
    Header (391×56):
      Button (391×56, padding 16px 24px):
        Question h5 16/700 #252B42 (176×24 to 247×24)
    Accordion-collapse (388×132):
      Body (388×132, padding 16px 24px, gap 16px):
        Answer 14/400 #737373 (316×100)

Footer paragraph: h4 20/400 #737373 (287×60) centered
```

### KRITIK DETAYLAR (Pricing Inner Page)
1. ⭐ Inner Header 3 same as Team (light filter, h1 size title)
2. ⭐ Pricing 3 cards: align-items: flex-end (MIDDLE card taller!)
3. ⭐ Pricing FREE card button DARK #252B42 (not blue like other cards!)
4. ⭐ "Per Month" text: #8EC2F2 (disabled-blue)
5. ⭐ "Save 25%" badge: #B3E3FF (faded-primary) bg, radius 37px pill
6. ⭐ Pricing check icons GREEN #2DC071 (NOT primary blue!)
7. ⭐ Disabled features check: #BDBDBD muted gray
8. ⭐ Middle pricing card: DARK bg #252B42, taller (704 vs 664), longer padding (70px vs 50px)
9. ⭐ Clients 2: extra heading text (h4 20/400 centered)
10. ⭐ FAQ 5 desktop: GRID layout (3 rows × 2 cols asymmetric)
11. ⭐ FAQ 1 mobile: ACCORDION style ⭐ (different element pattern!)
12. ⭐ CTA 3 in pricing: padding 160px 0 (longer, more spacious)
13. ⭐ Mobile pricing cards: NO border-radius (only border)
14. ⭐ Mobile pricing MIDDLE card: WIDER (335 vs 327-328)

