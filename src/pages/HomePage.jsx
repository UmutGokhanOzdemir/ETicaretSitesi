import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BlogCard from '../components/BlogCard'
import BestsellerProducts from '../components/BestsellerProducts'
import { slugify } from '../utils/slugify'

const FALLBACK_PICKS = [
  { title: 'MEN', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80' },
  { title: 'WOMEN', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80' },
  { title: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80' },
  { title: 'KIDS', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80' }
]

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
  const categories = useSelector((s) => s.product.categories)
  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  const picks = topCategories.length >= 4
    ? topCategories.slice(0, 4).map((c) => ({
        title: (c.title || c.code || '').toUpperCase(),
        image: c.img || c.image,
        gender: c.gender,
        slug: slugify(c.title || c.code || ''),
        id: c.id
      }))
    : FALLBACK_PICKS

  const linkFor = (p) =>
    p.id
      ? `/shop/${p.gender === 'k' ? 'kadin' : 'erkek'}/${p.slug}/${p.id}`
      : '/shop'

  return (
    <div className="flex flex-col">
      {/* HERO SLIDER */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
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
                <button className="bg-success hover:opacity-90 text-white text-2xl font-bold px-[40px] py-[15px] rounded-[5px]">
                  SHOP NOW
                </button>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </section>

      {/* EDITOR'S PICK */}
      <section className="bg-light py-20 max-w-[1050px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">

          {/* Başlık */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-dark">EDITOR'S PICK</h2>
            <p className="text-text text-sm max-w-sm">
              Problems trying to resolve the conflict between
            </p>
          </div>

          {/* Kartlar grid */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Büyük kart */}
            <Link
              to={linkFor(picks[0])}
              className="relative h-[500px] md:flex-[2] bg-cover bg-center group cursor-pointer overflow-hidden"
              style={{ backgroundImage: `url('${picks[0].image}')` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-8 bg-white px-8 py-3">
                <h3 className="text-dark font-bold text-base">{picks[0].title}</h3>
              </div>
            </Link>

            {/* Orta */}
            <Link
              to={linkFor(picks[1])}
              className="relative h-[500px] md:flex-1 bg-cover bg-center group cursor-pointer overflow-hidden"
              style={{ backgroundImage: `url('${picks[1].image}')` }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white px-10 py-3">
                <h3 className="text-dark font-bold text-base">{picks[1].title}</h3>
              </div>
            </Link>

            {/* Sağ: 2 küçük kart */}
            <div className="flex flex-col gap-4 md:flex-1">
              <Link
                to={linkFor(picks[2])}
                className="relative h-[242px] bg-cover bg-center group cursor-pointer overflow-hidden"
                style={{ backgroundImage: `url('${picks[2].image}')` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-5 left-4 bg-white px-6 py-3">
                  <h3 className="text-dark font-bold text-base">{picks[2].title}</h3>
                </div>
              </Link>

              <Link
                to={linkFor(picks[3])}
                className="relative h-[242px] bg-cover bg-center group cursor-pointer overflow-hidden"
                style={{ backgroundImage: `url('${picks[3].image}')` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-5 left-8 bg-white px-10 py-3">
                  <h3 className="text-dark font-bold text-base">{picks[3].title}</h3>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* BESTSELLER PRODUCTS — 8 ürün (2 row × 4 col) */}
      <BestsellerProducts limit={8} />

      {/* VITA CLASSIC — yeşil promotional section */}
      <section className="bg-secondary max-w-[1050px] mx-auto my-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-28 gap-8 px-4 md:px-8">
          {/* Sol: Metin */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 max-w-[500px]">
            <h4 className="text-white text-xl font-normal">SUMMER 2020</h4>
            <h1 className="text-white text-4xl md:text-[58px] font-bold leading-tight md:leading-[80px]">
              Vita Classic<br />Product
            </h1>
            <p className="text-white text-sm leading-relaxed max-w-[341px]">
              We know how large objects will act, We know how are objects will act.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[34px]">
              <span className="text-white text-2xl font-bold">$16.48</span>
              <button className="bg-success hover:opacity-90 text-white text-sm font-bold px-[40px] py-[15px] rounded-[5px]">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Sağ: Görsel - sadece desktop */}
          <div className="hidden md:block relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80"
              alt="Vita Classic Product"
              className="h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CONTAINER-FLUID — Part of the Neural Universe */}
      <section className="bg-white max-w-[1050px] mx-auto px-4 my-12">
        <div className="flex flex-col md:flex-row w-full">
          {/* Sol: Kadın fotoğrafı */}
          <div
            className="w-full md:w-1/2 h-[400px] md:h-[682px] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://picsum.photos/seed/bandage-cta/800/682')"
            }}
          />

          {/* Sağ: Metin bloğu */}
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-start gap-[30px] px-8 md:px-20 py-16 md:py-0">
            <h5 className="text-base text-muted font-bold tracking-wider">SUMMER 2020</h5>
            <h2 className="text-4xl md:text-[40px] font-bold text-dark leading-tight md:leading-[50px]">
              Part of the Neural<br />Universe
            </h2>
            <p className="text-text text-xl font-normal leading-[30px] max-w-md">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex items-center gap-[10px]">
              <button className="bg-success hover:opacity-90 text-white text-sm font-bold px-[40px] py-[15px] rounded-[5px]">
                BUY NOW
              </button>
              <button className="border border-success text-success hover:bg-success hover:text-white transition-colors text-sm font-bold px-[40px] py-[15px] rounded-[5px]">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="bg-white py-28 max-w-[1050px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
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
