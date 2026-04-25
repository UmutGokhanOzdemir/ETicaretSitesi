import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import {
  updateCartCount,
  removeFromCart,
  toggleCartChecked
} from '../store/actions/cartActions'
import OrderSummary from '../components/OrderSummary'

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((s) => s.shoppingCart.cart)

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
      {/* Sol: Cart Items */}
      <div className="flex-[2] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-dark">
          Sepetim ({cart.length} Ürün)
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-text">Sepetiniz boş.</p>
            <Link
              to="/shop"
              className="bg-primary text-white text-sm font-bold px-[40px] py-[15px] rounded-[5px]"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          cart.map((item) => {
            const title = item.product.name || item.product.title || ''
            const description = item.product.description || ''
            const image =
              item.product.images?.[0]?.url ||
              item.product.image ||
              'https://picsum.photos/seed/p/80/80'
            const price = Number(item.product.price ?? item.product.newPrice ?? 0)

            return (
              <div
                key={item.product.id}
                className="flex flex-col md:flex-row md:items-center gap-4 border border-border p-4 rounded-[5px] bg-white"
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      dispatch(toggleCartChecked(item.product.id))
                    }
                    className="w-5 h-5 accent-primary"
                  />
                  <img
                    src={image}
                    alt={title}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-dark truncate">{title}</p>
                    <p className="text-sm text-text line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 md:gap-6">
                  {/* Count controls */}
                  <div className="flex items-center gap-2 border border-border rounded-[5px]">
                    <button
                      onClick={() =>
                        dispatch(updateCartCount(item.product.id, -1))
                      }
                      className="px-3 py-2 text-dark hover:bg-light"
                      aria-label="Azalt"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2 min-w-[24px] text-center font-bold">
                      {item.count}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(updateCartCount(item.product.id, 1))
                      }
                      className="px-3 py-2 text-dark hover:bg-light"
                      aria-label="Arttır"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="font-bold text-dark w-24 text-right">
                    ${(price * item.count).toFixed(2)}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-alert hover:opacity-80"
                    aria-label="Kaldır"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Sağ: Order Summary */}
      {cart.length > 0 && (
        <div className="flex-1">
          <OrderSummary cart={cart} showCheckoutLink />
        </div>
      )}
    </div>
  )
}

export default CartPage
