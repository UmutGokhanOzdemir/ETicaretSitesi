import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ArrowLeft, Star, Heart, MoreHorizontal, ShoppingCart } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import BestsellerProducts from '../components/BestsellerProducts'
import Spinner from '../components/Spinner'
import Breadcrumb from '../components/Breadcrumb'
import { addToCart } from '../store/actions/cartActions'

const FALLBACK_COLORS = ['#23A6F0', '#2DC071', '#E77C40', '#252B42']

function RatingStars({ rating = 0 }) {
  const stars = []
  const rounded = Math.round(rating)
  for (let i = 1; i <= 5; i++) {
    const filled = i <= rounded
    stars.push(
      <Star
        key={i}
        size={20}
        className={filled ? 'text-star' : 'text-muted'}
        fill={filled ? 'currentColor' : 'none'}
      />
    )
  }
  return <div className="flex items-center gap-[5px]">{stars}</div>
}

function ProductDetailPage() {
  const { productId, id, gender, categoryName, categoryId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  const categories = useSelector((s) => s.product.categories)
  const realProductId = productId || id

  const handleAddToCart = () => {
    if (!product) return
    dispatch(addToCart(product))
    toast.success(`${product.name || product.title} sepete eklendi!`)
  }

  useEffect(() => {
    if (!realProductId) {
      setLoading(false)
      return
    }
    setLoading(true)
    axiosInstance
      .get(`/products/${realProductId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Failed to fetch product:', err))
      .finally(() => setLoading(false))
  }, [realProductId])

  if (loading) {
    return (
      <div className="bg-white min-h-[600px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-white min-h-[600px] flex flex-col items-center justify-center gap-4">
        <p className="text-text text-center">Product not found</p>
        <button
          onClick={() => history.goBack()}
          className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] py-[15px]"
        >
          Go Back
        </button>
      </div>
    )
  }

  const title = product.name || product.title || ''
  const description = product.description || ''
  const price = product.price ?? 0
  const rating = product.rating ?? 0
  const ratingCount = product.sell_count ?? product.ratingCount ?? 0
  const stock = product.stock > 0 || product.stock === undefined ? 'In Stock' : 'Out of Stock'
  const images = product.images?.length
    ? product.images.map((i) => (typeof i === 'string' ? i : i.url))
    : [product.image || 'https://picsum.photos/seed/prod1/500/500']

  const cat = categories.find((c) => c.id === product.category_id)
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    ...(cat
      ? [
          {
            label: cat.title || cat.code || categoryName,
            to: `/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${categoryName || ''}/${cat.id}`
          }
        ]
      : []),
    { label: title }
  ]

  return (
    <div className="flex flex-col">
      {/* A. BREADCRUMB */}
      <section className="bg-light py-6">
        <div className="flex items-center justify-between max-w-[1050px] mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          <button
            onClick={() => history.goBack()}
            className="flex items-center gap-2 text-primary text-sm font-bold"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </section>

      {/* B. MAIN PRODUCT */}
      <section className="bg-light py-12">
        <div className="flex flex-col md:flex-row gap-8 max-w-[1050px] mx-auto px-4">
          {/* Sol: görseller */}
          <div className="flex flex-col flex-1 gap-4">
            <img
              src={images[activeImage]}
              alt={title}
              className="w-full h-[450px] object-cover rounded-[5px]"
            />
            {images.length > 1 && (
              <div className="flex gap-[19px]">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${title} thumbnail ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`w-[100px] h-[75px] object-cover cursor-pointer ${
                      activeImage === i ? 'opacity-100' : 'opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sağ: bilgiler */}
          <div className="flex flex-col flex-1 gap-5">
            <h4 className="text-xl text-dark font-normal">{title}</h4>

            <div className="flex items-center gap-[10px]">
              <RatingStars rating={rating} />
              <span className="text-sm text-text font-bold">
                {ratingCount} Reviews
              </span>
            </div>

            <p className="text-2xl font-bold text-dark">
              ${Number(price).toFixed(2)}
            </p>

            <p className="text-sm font-bold text-text">
              Availability : <span className="text-primary">{stock}</span>
            </p>

            <p className="text-sm text-[#858585]">{description}</p>

            <hr className="border-muted" />

            <div className="flex items-center gap-[10px]">
              {FALLBACK_COLORS.map((color, i) => (
                <span
                  key={i}
                  className="w-[30px] h-[30px] rounded-full cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="flex items-center gap-[10px] mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white text-sm font-bold px-5 py-[10px] rounded-[5px] hover:opacity-90"
              >
                Sepete Ekle
              </button>
              <button
                aria-label="Add to favorites"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8E8E8] bg-white text-muted"
              >
                <Heart size={20} />
              </button>
              <button
                aria-label="Add to cart"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8E8E8] bg-white text-dark"
              >
                <ShoppingCart size={20} />
              </button>
              <button
                aria-label="More"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8E8E8] bg-white text-dark"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* C. DESCRIPTION TABS */}
      <section className="bg-white py-12">
        <div className="flex flex-col gap-8 max-w-[1050px] mx-auto px-4">
          <div className="flex items-center justify-center gap-8 border-b border-[#ECECEC]">
            <button className="pb-4 text-sm font-semibold text-text underline underline-offset-8 decoration-1">
              Description
            </button>
            <button className="pb-4 text-sm font-bold text-text">
              Additional Information
            </button>
            <button className="pb-4 text-sm font-bold text-text">
              Reviews <span className="text-secondary">(0)</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col flex-1 gap-4">
              <h3 className="text-xl font-bold text-dark">{title}</h3>
              <p className="text-sm text-text">{description}</p>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <h3 className="text-xl font-bold text-dark">
                Product Specifications
              </h3>
              <ul className="flex flex-col gap-[10px] text-sm text-text font-bold">
                <li>Stock: {product.stock ?? '—'}</li>
                <li>Rating: {rating}</li>
                <li>Sales: {product.sell_count ?? '—'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D. BESTSELLER PRODUCTS */}
      <BestsellerProducts limit={8} variant="detail" excludeId={realProductId} />
    </div>
  )
}

export default ProductDetailPage
