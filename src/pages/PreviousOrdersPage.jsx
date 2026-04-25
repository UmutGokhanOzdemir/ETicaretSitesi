import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import Spinner from '../components/Spinner'

function PreviousOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    axiosInstance
      .get('/order')
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white min-h-[600px] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-dark mb-6">Geçmiş Siparişlerim</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <Package size={48} className="text-muted" />
          <p className="text-text">Henüz siparişiniz bulunmuyor.</p>
          <Link
            to="/shop"
            className="bg-primary text-white text-sm font-bold px-[40px] py-[15px] rounded-[5px]"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const expanded = expandedId === order.id
            return (
              <div
                key={order.id}
                className="border border-border rounded-[5px] bg-white"
              >
                <button
                  onClick={() => setExpandedId(expanded ? null : order.id)}
                  className="w-full flex justify-between items-center p-4 hover:bg-light"
                >
                  <div className="flex-1 text-left">
                    <p className="font-bold text-dark">Sipariş #{order.id}</p>
                    <p className="text-sm text-text">
                      {order.order_date
                        ? new Date(order.order_date).toLocaleDateString('tr-TR')
                        : '—'}
                    </p>
                  </div>
                  <p className="font-bold text-secondary text-lg mr-4">
                    ${Number(order.price ?? 0).toFixed(2)}
                  </p>
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>

                {expanded && (
                  <div className="p-4 border-t border-border flex flex-col gap-3 bg-light">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-dark mb-1">Ödeme</p>
                        <p className="text-sm text-text">
                          Kart: **** **** ****{' '}
                          {String(order.card_no || '').slice(-4)}
                        </p>
                        <p className="text-sm text-text">
                          {order.card_name || '—'}
                        </p>
                        <p className="text-sm text-text">
                          Son Kullanma:{' '}
                          {String(order.card_expire_month || '').padStart(2, '0')}/
                          {order.card_expire_year || '—'}
                        </p>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-dark mb-1">Ürünler</p>
                        {(order.products || []).map((p, idx) => (
                          <p key={idx} className="text-sm text-text">
                            • Ürün #{p.product_id} × {p.count}{' '}
                            {p.detail ? `(${p.detail})` : ''}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PreviousOrdersPage
