import { Link } from 'react-router-dom'

function OrderSummary({ cart = [], showCheckoutLink = true, onCheckout }) {
  const selected = cart.filter((i) => i.checked)
  const subtotal = selected.reduce(
    (sum, i) => sum + Number(i.product.price ?? 0) * i.count,
    0
  )
  const shipping = subtotal > 100 ? 0 : 30
  const total = subtotal + shipping

  return (
    <div className="flex flex-col gap-4 border border-border rounded-[5px] p-6 bg-white h-fit">
      <h2 className="text-xl font-bold text-dark">Sipariş Özeti</h2>

      <div className="flex justify-between text-sm">
        <span className="text-text">Ürünler Toplamı</span>
        <span className="font-bold text-dark">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-text">Kargo Toplamı</span>
        <span className="font-bold text-dark">${shipping.toFixed(2)}</span>
      </div>

      {shipping === 0 && subtotal > 0 && (
        <p className="text-xs text-success">
          ✓ 100$+ alışverişte kargo bedava!
        </p>
      )}

      <hr className="border-border" />

      <div className="flex justify-between text-lg font-bold">
        <span>Toplam</span>
        <span className="text-secondary">${total.toFixed(2)}</span>
      </div>

      {showCheckoutLink && (
        <Link
          to="/order"
          className="bg-primary text-white text-center py-3 rounded-[5px] font-bold hover:opacity-90"
        >
          Sepeti Onayla
        </Link>
      )}

      {onCheckout && (
        <button
          onClick={onCheckout}
          disabled={selected.length === 0}
          className="bg-primary text-white py-3 rounded-[5px] font-bold hover:opacity-90 disabled:opacity-50"
        >
          Sipariş Tamamla
        </button>
      )}
    </div>
  )
}

export default OrderSummary
