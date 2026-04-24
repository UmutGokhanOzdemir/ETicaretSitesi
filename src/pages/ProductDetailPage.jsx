import { Link } from 'react-router-dom'
import { ChevronRight, Star, Heart, Eye, ShoppingCart } from 'lucide-react'
import BestsellerProducts from '../components/BestsellerProducts'

const product = {
  id: 1,
  title: "Floating Phone",
  rating: 4.5,
  ratingCount: 10,
  price: 1139.33,
  stock: "In Stock",
  brand: "Gucci",
  seller: "gogo",
  description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
  colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42'],
  images: [
    "https://picsum.photos/seed/prod1/500/500",
    "https://picsum.photos/seed/prod2/500/500",
    "https://picsum.photos/seed/prod3/500/500",
    "https://picsum.photos/seed/prod4/500/500"
  ]
}

function RatingStars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating)
    stars.push(
      <Star
        key={i}
        size={20}
        className={filled ? 'text-yellow-400' : 'text-muted'}
        fill={filled ? 'currentColor' : 'none'}
      />
    )
  }
  return <div className="flex items-center gap-1">{stars}</div>
}

function ProductDetailPage() {
  return (
    <div className="flex flex-col">
      {/* A. BREADCRUMB */}
      <section className="bg-light py-6">
        <div className="flex items-center gap-2 max-w-[1050px] mx-auto px-4 text-sm font-bold">
          <Link to="/" className="text-dark">Home</Link>
          <ChevronRight size={16} className="text-muted" />
          <Link to="/shop" className="text-muted">Shop</Link>
        </div>
      </section>

      {/* B. MAIN PRODUCT */}
      <section className="bg-white py-12">
        <div className="flex flex-col md:flex-row gap-8 max-w-[1050px] mx-auto px-4">
          {/* Sol: görseller */}
          <div className="flex flex-col flex-1 gap-4">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="flex gap-4">
              {product.images.slice(1, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  className="w-[100px] h-[75px] object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Sağ: bilgiler */}
          <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-2xl text-dark font-normal">{product.title}</h1>

            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-text font-bold">
                {product.ratingCount} Reviews
              </span>
            </div>

            <p className="text-2xl font-bold text-dark">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-sm font-bold text-dark">
              Availability : <span className="text-primary">{product.stock}</span>
            </p>

            <hr className="border-border" />

            <p className="text-sm text-text">{product.description}</p>

            <hr className="border-border" />

            <div className="flex items-center gap-2">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded">
                Select Options
              </button>
              <button
                aria-label="Add to favorites"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white text-dark"
              >
                <Heart size={16} />
              </button>
              <button
                aria-label="Quick view"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white text-dark"
              >
                <Eye size={16} />
              </button>
              <button
                aria-label="Add to cart"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white text-dark"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* C. DESCRIPTION TABS */}
      <section className="bg-white py-12">
        <div className="flex flex-col gap-8 max-w-[1050px] mx-auto px-4">
          <div className="flex items-center gap-8 border-b border-border">
            <button className="pb-4 text-sm font-bold text-dark border-b-2 border-dark -mb-[1px]">
              Description
            </button>
            <button className="pb-4 text-sm font-bold text-text">
              Additional Information
            </button>
            <button className="pb-4 text-sm font-bold text-text">
              Reviews <span className="text-muted">(0)</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col flex-1 gap-4">
              <h3 className="text-xl font-bold text-dark">
                the quick fox jumps over
              </h3>
              <p className="text-sm text-text">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-sm text-text">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.
              </p>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <h3 className="text-xl font-bold text-dark">
                the quick fox jumps over
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-text">
                <li>the quick fox jumps over the lazy dog</li>
                <li>the quick fox jumps over the lazy dog</li>
                <li>the quick fox jumps over the lazy dog</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D. BESTSELLER PRODUCTS */}
      <BestsellerProducts limit={8} />
    </div>
  )
}

export default ProductDetailPage
