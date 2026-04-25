import { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Gravatar from 'react-gravatar'
import {
  Search, ShoppingCart, User, Menu, X,
  Phone, Mail, Heart, ChevronDown
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { setUser } from '../store/actions/clientActions'
import { slugify } from '../utils/slugify'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector((s) => s.client.user)
  const categories = useSelector((s) => s.product.categories)
  const cart = useSelector((s) => s.shoppingCart.cart)

  const womenCategories = categories.filter((c) => c.gender === 'k')
  const menCategories = categories.filter((c) => c.gender === 'e')

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(setUser({}))
    setIsUserOpen(false)
    setIsMenuOpen(false)
    history.push('/')
  }

  const isShopOrDetail =
    location.pathname.startsWith('/shop') ||
    location.pathname.startsWith('/product')

  const topBarBg = isShopOrDetail ? 'bg-secondary' : 'bg-dark'

  const isLoggedIn = user && user.email

  return (
    <header className="flex flex-col">
      {/* ÜST BAR — desktop, 3 sütun */}
      <div className={`hidden md:flex ${topBarBg} text-white text-sm py-[10px] px-6`}>
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-[10px] font-bold">
            <span className="flex items-center gap-[5px]">
              <Phone size={16} /> +9 (110) 234 567 89
            </span>
            <span className="flex items-center gap-[5px]">
              <Mail size={16} /> michelle.rivera@example.com
            </span>
          </div>

          <p className="font-bold">I am here to help you all day!</p>

          <div className="flex items-center gap-[10px]">
            <p className="font-bold">Follow Us and get a chance to win 80% off</p>
            <div className="flex items-center gap-[5px]">
              <span className="font-bold ml-1">Follow Us :</span>
              <FaFacebook size={16} />
              <FaInstagram size={16} />
              <FaTwitter size={16} />
              <FaYoutube size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* ANA NAV BAR */}
      <div className="bg-white flex justify-between items-center px-4 md:px-6 py-4 md:py-0 md:h-[58px] relative">
        <Link to="/" className="text-2xl font-bold text-dark">
          Bandage
        </Link>

        <nav className="hidden md:flex items-center gap-[15px] text-text text-sm font-bold">
          <Link to="/" className="hover:text-dark">Home</Link>

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <Link
              to="/shop"
              className="flex items-center gap-1 font-medium text-dark"
            >
              Shop <ChevronDown size={12} />
            </Link>

            {isShopOpen && (womenCategories.length > 0 || menCategories.length > 0) && (
              <div className="absolute left-0 top-full bg-white shadow-lg p-8 min-w-[400px] flex flex-row gap-12 z-50">
                {womenCategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h5 className="font-bold text-dark mb-2">Kadın</h5>
                    {womenCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop/kadin/${slugify(cat.title || cat.code || '')}/${cat.id}`}
                        className="text-text hover:text-dark capitalize"
                      >
                        {cat.title || cat.code}
                      </Link>
                    ))}
                  </div>
                )}

                {menCategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h5 className="font-bold text-dark mb-2">Erkek</h5>
                    {menCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop/erkek/${slugify(cat.title || cat.code || '')}/${cat.id}`}
                        className="text-text hover:text-dark capitalize"
                      >
                        {cat.title || cat.code}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-dark">About</Link>
          <Link to="/blog" className="hover:text-dark">Blog</Link>
          <Link to="/contact" className="hover:text-dark">Contact</Link>
          <Link to="/pages" className="hover:text-dark">Pages</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 text-primary text-sm font-bold">
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setIsUserOpen(true)}
              onMouseLeave={() => setIsUserOpen(false)}
            >
              <button className="flex items-center gap-2">
                <Gravatar
                  email={user.email || ''}
                  size={30}
                  default="mp"
                  className="rounded-full"
                />
                <span className="text-primary font-bold text-sm">
                  {user.name || user.email}
                </span>
                <ChevronDown size={14} />
              </button>

              {isUserOpen && (
                <div className="absolute right-0 top-full bg-white shadow-lg flex flex-col min-w-[220px] z-50">
                  <Link
                    to="/previous-orders"
                    className="px-4 py-3 hover:bg-light text-text"
                    onClick={() => setIsUserOpen(false)}
                  >
                    Geçmiş Siparişlerim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 hover:bg-light text-left text-text"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <User size={16} /> Login / Register
            </Link>
          )}
          <Search size={16} />

          {/* Cart Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link to="/cart" className="flex items-center gap-1">
              <ShoppingCart size={16} />
              <span className="text-xs font-normal">{cartCount}</span>
            </Link>

            {isCartOpen && cart.length > 0 && (
              <div className="absolute right-0 top-full bg-white shadow-lg p-4 min-w-[320px] flex flex-col gap-3 z-50">
                <h5 className="font-bold text-dark">
                  Sepetim ({cartCount} Ürün)
                </h5>
                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                  {cart.slice(0, 5).map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 items-center border-b border-border pb-2"
                    >
                      <img
                        src={
                          item.product.images?.[0]?.url ||
                          item.product.image ||
                          'https://picsum.photos/seed/p/64/64'
                        }
                        alt={item.product.name || item.product.title}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-dark truncate">
                          {item.product.name || item.product.title}
                        </p>
                        <p className="text-xs text-text">Adet: {item.count}</p>
                        <p className="text-sm text-secondary font-bold">
                          ${Number(item.product.price ?? item.product.newPrice ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 bg-primary text-white text-center py-2 rounded-[5px] text-sm font-bold"
                  >
                    Sepete Git
                  </Link>
                  <Link
                    to="/order"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 bg-success text-white text-center py-2 rounded-[5px] text-sm font-bold"
                  >
                    Siparişi Tamamla
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="flex items-center gap-1">
            <Heart size={16} />
            <span className="text-xs font-normal">1</span>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4 text-dark">
          <Search size={24} />
          <Link to="/cart" className="flex items-center gap-1 text-dark">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="text-xs font-bold text-primary">{cartCount}</span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <nav className="flex md:hidden flex-col items-center gap-6 py-8 bg-white text-text text-3xl font-normal">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          {/* Mobile categories */}
          {(womenCategories.length > 0 || menCategories.length > 0) && (
            <div className="flex flex-col items-center gap-3 text-base text-text mt-4">
              {womenCategories.length > 0 && (
                <>
                  <span className="font-bold text-dark">Kadın</span>
                  {womenCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop/kadin/${slugify(cat.title || cat.code || '')}/${cat.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="capitalize"
                    >
                      {cat.title || cat.code}
                    </Link>
                  ))}
                </>
              )}
              {menCategories.length > 0 && (
                <>
                  <span className="font-bold text-dark mt-3">Erkek</span>
                  {menCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop/erkek/${slugify(cat.title || cat.code || '')}/${cat.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="capitalize"
                    >
                      {cat.title || cat.code}
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-base">
                <Gravatar
                  email={user.email || ''}
                  size={30}
                  default="mp"
                  className="rounded-full"
                />
                <span className="text-primary font-bold">
                  {user.name || user.email}
                </span>
              </div>
              <Link
                to="/previous-orders"
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text"
              >
                Geçmiş Siparişlerim
              </Link>
              <button
                onClick={handleLogout}
                className="text-base text-text"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login / Register
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
