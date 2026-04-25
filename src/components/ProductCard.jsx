import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '../store/actions/cartActions'
import { slugify } from '../utils/slugify'

const VARIANT_STYLES = {
  home: {
    imageHeight: 'h-[427px]',
    align: 'items-center',
    showSwatches: true,
    swatchSize: 'w-4 h-4',
    swatchColors: ['#23A6F0', '#23856D', '#E77C40', '#252B42'],
  },
  shop: {
    imageHeight: 'h-[300px]',
    align: 'items-center',
    showSwatches: true,
    swatchSize: 'w-4 h-4',
    swatchColors: ['#23A6F0', '#23856D', '#E77C40', '#23856D'],
  },
  detail: {
    imageHeight: 'h-[280px]',
    align: 'items-start',
    showSwatches: false,
    swatchSize: 'w-[30px] h-[30px]',
    swatchColors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
  },
}

function ProductCard({ product, variant = 'home' }) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.home
  const dispatch = useDispatch()

  // API ↔ mock field uyumu
  const title = product.name || product.title || ''
  const department = product.description || product.department || ''
  const image =
    product.images?.[0]?.url ||
    product.image ||
    'https://picsum.photos/seed/placeholder/350/400'
  const newPrice = product.price ?? product.newPrice ?? 0
  const oldPrice = product.oldPrice ?? null
  const productId = product.id

  // Kategoriden gender + slug bul (Redux'tan)
  const categories = useSelector((s) => s.product.categories)
  const cat = categories.find((c) => c.id === product.category_id)
  const gender = cat?.gender === 'k' ? 'kadin' : cat?.gender === 'e' ? 'erkek' : 'kadin'
  const categorySlug = slugify(cat?.title || cat?.code || 'kategori')
  const categoryId = product.category_id || cat?.id || 1
  const productSlug = slugify(title)

  const detailLink = `/shop/${gender}/${categorySlug}/${categoryId}/${productSlug}/${productId}`

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
    toast.success(`${title} sepete eklendi!`)
  }

  return (
    <Link
      to={detailLink}
      className="flex flex-col bg-white hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className={`w-full ${v.imageHeight} object-cover`}
      />

      <div className={`flex flex-col gap-[10px] p-[25px_25px_35px] ${v.align}`}>
        <h5 className="text-base font-bold text-dark">{title}</h5>
        <p className="text-sm font-bold text-text">{department}</p>

        <div className="flex items-center gap-[5px]">
          {oldPrice != null && (
            <span className="text-base font-bold text-muted line-through">
              ${Number(oldPrice).toFixed(2)}
            </span>
          )}
          <span className="text-base font-bold text-secondary">
            ${Number(newPrice).toFixed(2)}
          </span>
        </div>

        {v.showSwatches && (
          <div className="flex items-center gap-[6px]">
            {v.swatchColors.map((color, i) => (
              <span
                key={i}
                className={`${v.swatchSize} rounded-full`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-[5px] hover:opacity-90 mt-2"
        >
          <ShoppingCart size={16} /> Sepete Ekle
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
