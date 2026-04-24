import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProductCard from '../components/ProductCard'
import BlogCard from '../components/BlogCard'
import mockProducts from '../data/mockProducts'

const posts = [
  {
    image: "https://picsum.photos/seed/blog1/348/300",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments"
  },
  {
    image: "https://picsum.photos/seed/blog2/348/300",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments"
  },
  {
    image: "https://picsum.photos/seed/blog3/348/300",
    tags: ["Google", "Trending", "New"],
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments"
  }
]

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO SLIDER */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="hero-swiper"
        >
          {/* SLIDE 1 */}
          <SwiperSlide>
            <div
              className="relative flex items-center justify-center md:justify-start h-[600px] md:h-[716px] bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1440&q=80')"
              }}
            >
              {/* Koyu filter */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* İçerik */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 px-4 md:px-24 max-w-[600px]">
                <h5 className="text-white text-base font-bold tracking-wider">
                  SUMMER 2020
                </h5>
                <h1 className="text-white text-5xl md:text-[58px] font-bold leading-tight md:leading-[80px]">
                  NEW COLLECTION
                </h1>
                <p className="text-white text-lg md:text-xl leading-relaxed max-w-md">
                  We know how large objects will act,<br />
                  but things on a small scale.
                </p>
                <button className="bg-success hover:opacity-90 text-white text-xl font-bold px-10 py-4 rounded-md">
                  SHOP NOW
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 2 */}
          <SwiperSlide>
            <div className="relative flex flex-col md:flex-row items-center justify-between h-[600px] md:h-[716px] bg-secondary overflow-hidden px-4 md:px-24">
              {/* Sol: Metin */}
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 max-w-[500px] pt-8 md:pt-0">
                <h5 className="text-white text-base md:text-xl font-normal">
                  SUMMER 2020
                </h5>
                <h1 className="text-white text-4xl md:text-[58px] font-bold leading-tight md:leading-[80px]">
                  Vita Classic<br />Product
                </h1>
                <p className="text-white text-sm md:text-base leading-relaxed max-w-sm">
                  We know how large objects will act, We know how are objects will act.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <span className="text-white text-2xl font-bold">$16.48</span>
                  <button className="bg-success hover:opacity-90 text-white text-sm font-bold px-10 py-4 rounded-md">
                    ADD TO CART
                  </button>
                </div>
              </div>

              {/* Sağ: Görsel - sadece desktop */}
              <div className="hidden md:block relative z-10 h-full">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80"
                  alt="Product"
                  className="h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* EDITOR'S PICK */}
      <section className="bg-light py-20">
        <div className="flex flex-col items-center gap-12 px-4 max-w-[1050px] mx-auto">

          {/* Başlık */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-dark">EDITOR'S PICK</h2>
            <p className="text-text text-sm max-w-sm">
              Problems trying to resolve the conflict between
            </p>
          </div>

          {/* Kartlar grid */}
          <div className="flex flex-col md:flex-row gap-8 w-full">

            {/* Büyük kart - MEN */}
            <div
              className="relative h-[500px] md:flex-[2] bg-cover bg-center group cursor-pointer overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80')"
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-8 bg-white px-8 py-3">
                <h3 className="text-dark font-bold text-base">MEN</h3>
              </div>
            </div>

            {/* Orta tall kart - WOMEN */}
            <div
              className="relative h-[500px] md:flex-1 bg-cover bg-center group cursor-pointer overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80')"
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white px-10 py-3">
                <h3 className="text-dark font-bold text-base">WOMEN</h3>
              </div>
            </div>

            {/* Sağ: 2 küçük kart üst üste */}
            <div className="flex flex-col gap-4 md:flex-1">

              {/* ACCESSORIES */}
              <div
                className="relative h-[242px] bg-cover bg-center group cursor-pointer overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-5 left-4 bg-white px-6 py-3">
                  <h3 className="text-dark font-bold text-base">ACCESSORIES</h3>
                </div>
              </div>

              {/* KIDS */}
              <div
                className="relative h-[242px] bg-cover bg-center group cursor-pointer overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80')"
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-5 left-8 bg-white px-10 py-3">
                  <h3 className="text-dark font-bold text-base">KIDS</h3>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BESTSELLER PRODUCTS */}
      <section className="bg-white py-20">
        <div className="flex flex-col items-center gap-12 px-4 max-w-[1050px] mx-auto">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xl text-text font-normal">Featured Products</p>
            <h2 className="text-2xl font-bold text-dark">BESTSELLER PRODUCTS</h2>
            <p className="text-sm text-text max-w-sm">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap gap-8 w-full justify-center">
            {mockProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YEŞİL CTA BANNER - VITA CLASSIC */}
      <section className="bg-white">
        <div className="flex flex-col md:flex-row w-full">
          {/* Sol: Kadın fotoğrafı */}
          <div
            className="w-full md:w-1/2 h-[400px] md:h-[682px] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://picsum.photos/seed/bandage-cta/800/682')"
            }}
          />

          {/* Sağ: Metin bloğu */}
          <div className="w-full md:w-1/2 bg-success flex flex-col justify-center items-start gap-6 px-8 md:px-20 py-16 md:py-0">
            <p className="text-sm text-muted font-bold tracking-wider">SUMMER 2020</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Part of the Urban<br />oddities 2020
            </h2>
            <p className="text-white text-base max-w-md">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-success hover:opacity-90 text-white text-sm font-bold px-8 py-3 rounded border border-white">
                BUY NOW
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-success transition-colors text-sm font-bold px-8 py-3 rounded">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="bg-white py-28">
        <div className="flex flex-col items-center gap-12 px-4 max-w-[1050px] mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-primary font-bold">Practice Advice</p>
            <h2 className="text-3xl md:text-5xl font-bold text-dark">Featured Posts</h2>
            <p className="text-sm text-text max-w-xl">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:flex-nowrap gap-8 w-full">
            {posts.map((post, i) => (
              <div key={i} className="w-full md:w-1/3">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
