import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Plus, Edit2, Trash2, CreditCard } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import OrderSummary from '../components/OrderSummary'
import Spinner from '../components/Spinner'
import { setCart } from '../store/actions/cartActions'

const TR_CITIES = [
  'Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin',
  'Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa',
  'Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan',
  'Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Isparta',
  'Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir',
  'Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla',
  'Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas',
  'Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak'
]

// ─── ADDRESS STEP ─────────────────────────────────────────────────────────────
function AddressStep({
  addresses,
  loading,
  onCreate,
  onUpdate,
  onDelete,
  selectedAddress,
  setSelectedAddress,
  onNext
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const openCreate = () => {
    setEditingAddress(null)
    reset({
      title: '', name: '', surname: '', phone: '',
      city: '', district: '', neighborhood: '', address: ''
    })
    setShowForm(true)
  }

  const openEdit = (addr) => {
    setEditingAddress(addr)
    reset(addr)
    setShowForm(true)
  }

  const onSubmit = async (data) => {
    if (editingAddress) {
      await onUpdate({ ...data, id: editingAddress.id })
    } else {
      await onCreate(data)
    }
    setShowForm(false)
    setEditingAddress(null)
  }

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-dark">Adres Bilgileri</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-[5px]"
        >
          <Plus size={16} /> Yeni Adres Ekle
        </button>
      </div>

      {/* Address list */}
      {addresses.length === 0 && !showForm && (
        <p className="text-text">Kayıtlı adresiniz yok. Yeni adres ekleyin.</p>
      )}

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className={`flex items-start gap-3 border p-4 rounded-[5px] cursor-pointer ${
              selectedAddress?.id === addr.id
                ? 'border-primary bg-light'
                : 'border-border bg-white'
            }`}
          >
            <input
              type="radio"
              name="selected-address"
              checked={selectedAddress?.id === addr.id}
              onChange={() => setSelectedAddress(addr)}
              className="mt-1 accent-primary"
            />
            <div className="flex-1">
              <p className="font-bold text-dark">
                {addr.title} — {addr.name} {addr.surname}
              </p>
              <p className="text-sm text-text">{addr.phone}</p>
              <p className="text-sm text-text">
                {addr.neighborhood}, {addr.district} / {addr.city}
              </p>
              <p className="text-sm text-text">{addr.address}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  openEdit(addr)
                }}
                className="text-primary hover:opacity-80"
                aria-label="Düzenle"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
                    onDelete(addr.id)
                  }
                }}
                className="text-alert hover:opacity-80"
                aria-label="Sil"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </label>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border border-border p-6 rounded-[5px] bg-white"
        >
          <h3 className="text-lg font-bold text-dark">
            {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres'}
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Adres Başlığı</label>
            <input
              {...register('title', { required: 'Başlık gerekli' })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
              placeholder="Ev, İş, vb."
            />
            {errors.title && (
              <span className="text-xs text-alert">{errors.title.message}</span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">Ad</label>
              <input
                {...register('name', {
                  required: 'Ad gerekli',
                  minLength: { value: 2, message: 'En az 2 karakter' }
                })}
                className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
              />
              {errors.name && (
                <span className="text-xs text-alert">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">Soyad</label>
              <input
                {...register('surname', {
                  required: 'Soyad gerekli',
                  minLength: { value: 2, message: 'En az 2 karakter' }
                })}
                className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
              />
              {errors.surname && (
                <span className="text-xs text-alert">{errors.surname.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Telefon</label>
            <input
              {...register('phone', {
                required: 'Telefon gerekli',
                pattern: {
                  value: /^\d{10,11}$/,
                  message: '10-11 hane (ör: 5XXXXXXXXX)'
                }
              })}
              placeholder="5XXXXXXXXX"
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
            />
            {errors.phone && (
              <span className="text-xs text-alert">{errors.phone.message}</span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">İl</label>
              <select
                {...register('city', { required: 'İl seçin' })}
                className="bg-input-bg border border-select-border rounded-[5px] px-[21px] h-[50px] text-sm"
              >
                <option value="">İl seçin</option>
                {TR_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.city && (
                <span className="text-xs text-alert">{errors.city.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">İlçe</label>
              <input
                {...register('district', { required: 'İlçe gerekli' })}
                className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
              />
              {errors.district && (
                <span className="text-xs text-alert">
                  {errors.district.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Mahalle</label>
            <input
              {...register('neighborhood', { required: 'Mahalle gerekli' })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
            />
            {errors.neighborhood && (
              <span className="text-xs text-alert">
                {errors.neighborhood.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">
              Adres Detayı
            </label>
            <textarea
              {...register('address', {
                required: 'Adres gerekli',
                minLength: { value: 10, message: 'En az 10 karakter' }
              })}
              rows={3}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] py-3 text-sm outline-none"
            />
            {errors.address && (
              <span className="text-xs text-alert">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-primary text-white text-sm font-bold px-[40px] h-[52px] rounded-[5px]"
            >
              {editingAddress ? 'Güncelle' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingAddress(null)
              }}
              className="bg-white border border-border text-text text-sm font-bold px-[40px] h-[52px] rounded-[5px]"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      <button
        onClick={onNext}
        disabled={!selectedAddress}
        className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] h-[52px] w-fit disabled:opacity-50"
      >
        Devam Et
      </button>
    </div>
  )
}

// ─── CARD STEP ────────────────────────────────────────────────────────────────
function CardStep({
  cards,
  loading,
  onCreate,
  onUpdate,
  onDelete,
  selectedCard,
  setSelectedCard,
  ccv,
  setCcv,
  onPlaceOrder,
  placing
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => 2026 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const openCreate = () => {
    setEditingCard(null)
    reset({
      card_no: '', name_on_card: '', expire_month: '', expire_year: ''
    })
    setShowForm(true)
  }

  const openEdit = (card) => {
    setEditingCard(card)
    reset({
      card_no: card.card_no,
      name_on_card: card.name_on_card,
      expire_month: card.expire_month,
      expire_year: card.expire_year
    })
    setShowForm(true)
  }

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      card_no: String(data.card_no).replace(/\s+/g, ''),
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year)
    }
    if (editingCard) {
      await onUpdate({ ...payload, id: editingCard.id })
    } else {
      await onCreate(payload)
    }
    setShowForm(false)
    setEditingCard(null)
  }

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-dark">Ödeme Bilgileri</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded-[5px]"
        >
          <Plus size={16} /> Yeni Kart Ekle
        </button>
      </div>

      {cards.length === 0 && !showForm && (
        <p className="text-text">Kayıtlı kartınız yok. Yeni kart ekleyin.</p>
      )}

      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <label
            key={card.id}
            className={`flex items-center gap-3 border p-4 rounded-[5px] cursor-pointer ${
              selectedCard?.id === card.id
                ? 'border-primary bg-light'
                : 'border-border bg-white'
            }`}
          >
            <input
              type="radio"
              name="selected-card"
              checked={selectedCard?.id === card.id}
              onChange={() => setSelectedCard(card)}
              className="accent-primary"
            />
            <CreditCard size={28} className="text-primary" />
            <div className="flex-1">
              <p className="font-bold text-dark">
                **** **** **** {String(card.card_no).slice(-4)}
              </p>
              <p className="text-sm text-text">
                {card.name_on_card} • {String(card.expire_month).padStart(2, '0')}/
                {card.expire_year}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  openEdit(card)
                }}
                className="text-primary"
                aria-label="Düzenle"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
                    onDelete(card.id)
                  }
                }}
                className="text-alert"
                aria-label="Sil"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </label>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border border-border p-6 rounded-[5px] bg-white"
        >
          <h3 className="text-lg font-bold text-dark">
            {editingCard ? 'Kartı Düzenle' : 'Yeni Kart'}
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Kart Numarası</label>
            <input
              {...register('card_no', {
                required: 'Kart numarası gerekli',
                validate: (v) =>
                  /^\d{16}$/.test(String(v).replace(/\s+/g, '')) ||
                  '16 haneli olmalı'
              })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
            />
            {errors.card_no && (
              <span className="text-xs text-alert">
                {errors.card_no.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Kart Üzerindeki İsim</label>
            <input
              {...register('name_on_card', {
                required: 'İsim gerekli',
                minLength: { value: 3, message: 'En az 3 karakter' }
              })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
            />
            {errors.name_on_card && (
              <span className="text-xs text-alert">
                {errors.name_on_card.message}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">Ay</label>
              <select
                {...register('expire_month', { required: 'Ay seçin' })}
                className="bg-input-bg border border-select-border rounded-[5px] px-[21px] h-[50px] text-sm"
              >
                <option value="">Ay</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, '0')}
                  </option>
                ))}
              </select>
              {errors.expire_month && (
                <span className="text-xs text-alert">
                  {errors.expire_month.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-dark">Yıl</label>
              <select
                {...register('expire_year', { required: 'Yıl seçin' })}
                className="bg-input-bg border border-select-border rounded-[5px] px-[21px] h-[50px] text-sm"
              >
                <option value="">Yıl</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.expire_year && (
                <span className="text-xs text-alert">
                  {errors.expire_year.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-primary text-white text-sm font-bold px-[40px] h-[52px] rounded-[5px]"
            >
              {editingCard ? 'Güncelle' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingCard(null)
              }}
              className="bg-white border border-border text-text text-sm font-bold px-[40px] h-[52px] rounded-[5px]"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      {/* CCV input (kayıt edilmez, sadece order'a gider) */}
      {selectedCard && (
        <div className="flex flex-col gap-1 max-w-xs">
          <label className="text-sm font-bold text-dark">CCV (3 hane)</label>
          <input
            type="password"
            value={ccv}
            onChange={(e) =>
              setCcv(e.target.value.replace(/\D/g, '').slice(0, 3))
            }
            maxLength={3}
            placeholder="123"
            className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none"
          />
        </div>
      )}

      <button
        onClick={onPlaceOrder}
        disabled={!selectedCard || ccv.length !== 3 || placing}
        className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] h-[52px] w-fit disabled:opacity-50 flex items-center gap-2"
      >
        {placing ? 'Sipariş Oluşturuluyor...' : 'Sipariş Tamamla'}
      </button>
    </div>
  )
}

// ─── ORDER PAGE ───────────────────────────────────────────────────────────────
function OrderPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((s) => s.shoppingCart.cart)

  const [step, setStep] = useState(1)

  const [addresses, setAddresses] = useState([])
  const [addressLoading, setAddressLoading] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [cards, setCards] = useState([])
  const [cardLoading, setCardLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [ccv, setCcv] = useState('')

  const [placing, setPlacing] = useState(false)

  // Address fetch
  const refreshAddresses = async () => {
    setAddressLoading(true)
    try {
      const res = await axiosInstance.get('/user/address')
      setAddresses(res.data || [])
    } catch (err) {
      console.error(err)
      toast.error('Adresler yüklenemedi')
    } finally {
      setAddressLoading(false)
    }
  }

  useEffect(() => {
    refreshAddresses()
  }, [])

  const refreshCards = async () => {
    setCardLoading(true)
    try {
      const res = await axiosInstance.get('/user/card')
      setCards(res.data || [])
    } catch (err) {
      console.error(err)
      toast.error('Kartlar yüklenemedi')
    } finally {
      setCardLoading(false)
    }
  }

  useEffect(() => {
    if (step === 2) refreshCards()
  }, [step])

  // Address CRUD
  const createAddress = async (data) => {
    try {
      await axiosInstance.post('/user/address', data)
      toast.success('Adres eklendi')
      refreshAddresses()
    } catch {
      toast.error('Adres eklenemedi')
    }
  }
  const updateAddress = async (data) => {
    try {
      await axiosInstance.put('/user/address', data)
      toast.success('Adres güncellendi')
      refreshAddresses()
    } catch {
      toast.error('Adres güncellenemedi')
    }
  }
  const deleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/user/address/${id}`)
      toast.success('Adres silindi')
      if (selectedAddress?.id === id) setSelectedAddress(null)
      refreshAddresses()
    } catch {
      toast.error('Adres silinemedi')
    }
  }

  // Card CRUD
  const createCard = async (data) => {
    try {
      await axiosInstance.post('/user/card', data)
      toast.success('Kart eklendi')
      refreshCards()
    } catch {
      toast.error('Kart eklenemedi')
    }
  }
  const updateCard = async (data) => {
    try {
      await axiosInstance.put('/user/card', data)
      toast.success('Kart güncellendi')
      refreshCards()
    } catch {
      toast.error('Kart güncellenemedi')
    }
  }
  const deleteCard = async (id) => {
    try {
      await axiosInstance.delete(`/user/card/${id}`)
      toast.success('Kart silindi')
      if (selectedCard?.id === id) setSelectedCard(null)
      refreshCards()
    } catch {
      toast.error('Kart silinemedi')
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedCard || ccv.length !== 3) return
    const selected = cart.filter((i) => i.checked)
    if (selected.length === 0) {
      toast.error('Sepette seçili ürün yok')
      return
    }

    const price = selected.reduce(
      (sum, i) => sum + Number(i.product.price ?? 0) * i.count,
      0
    )

    const payload = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: Number(String(selectedCard.card_no).replace(/\s+/g, '')),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: Number(ccv),
      price,
      products: selected.map((i) => ({
        product_id: i.product.id,
        count: i.count,
        detail: 'standard'
      }))
    }

    setPlacing(true)
    try {
      await axiosInstance.post('/order', payload)
      dispatch(setCart([]))
      toast.success('Sipariş başarıyla oluşturuldu')
      history.push('/previous-orders')
    } catch (err) {
      console.error(err)
      toast.error('Sipariş oluşturulamadı')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Step indicator */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setStep(1)}
          className={`flex-1 py-4 border-b-4 text-sm md:text-base ${
            step === 1
              ? 'border-primary text-primary font-bold'
              : 'border-border text-text'
          }`}
        >
          1. Adres Bilgileri
        </button>
        <button
          onClick={() => selectedAddress && setStep(2)}
          disabled={!selectedAddress}
          className={`flex-1 py-4 border-b-4 text-sm md:text-base disabled:opacity-50 ${
            step === 2
              ? 'border-primary text-primary font-bold'
              : 'border-border text-text'
          }`}
        >
          2. Ödeme Seçenekleri
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[2]">
          {step === 1 && (
            <AddressStep
              addresses={addresses}
              loading={addressLoading}
              onCreate={createAddress}
              onUpdate={updateAddress}
              onDelete={deleteAddress}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <CardStep
              cards={cards}
              loading={cardLoading}
              onCreate={createCard}
              onUpdate={updateCard}
              onDelete={deleteCard}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              ccv={ccv}
              setCcv={setCcv}
              onPlaceOrder={handlePlaceOrder}
              placing={placing}
            />
          )}
        </div>

        <div className="flex-1">
          <OrderSummary cart={cart} showCheckoutLink={false} />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
