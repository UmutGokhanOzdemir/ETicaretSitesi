import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, ShoppingCart, User, Menu, X,
  Phone, Mail, Heart
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex flex-col">
      {/* ÜST BAR — sadece desktop */}
      <div className="hidden md:flex bg-dark text-white text-sm py-2 px-6">
        <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
          {/* Sol: telefon + email */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={16} /> (225) 555-0118
            </span>
            <span className="flex items-center gap-1">
              <Mail size={16} /> michelle.rivera@example.com
            </span>
          </div>

          {/* Orta: slogan */}
          <p className="font-bold">Follow Us and get a chance to win 80% off</p>

          {/* Sağ: sosyal medya placeholder */}
          <div className="flex items-center gap-2">
            <span className="font-bold">Follow Us :</span>
            <FaInstagram size={16} />
            <FaYoutube size={16} />
            <FaFacebook size={16} />
            <FaTwitter size={16} />
          </div>
        </div>
      </div>

      {/* ANA NAV BAR */}
      <div className="bg-white flex justify-between items-center px-4 md:px-6 py-4 md:py-0 md:h-[58px]">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-dark">
          Bandage
        </Link>

        {/* Desktop menü */}
        <nav className="hidden md:flex items-center gap-4 text-text text-sm font-bold">
          <Link to="/" className="hover:text-dark">Home</Link>
          <Link to="/shop" className="hover:text-dark text-dark">Shop</Link>
          <Link to="/about" className="hover:text-dark">About</Link>
          <Link to="/team" className="hover:text-dark">Team</Link>
          <Link to="/contact" className="hover:text-dark">Contact</Link>
          <Link to="/blog" className="hover:text-dark">Blog</Link>
          <Link to="/pages" className="hover:text-dark">Pages</Link>
        </nav>

        {/* Desktop sağ ikonlar */}
        <div className="hidden md:flex items-center gap-4 text-primary text-sm font-bold">
          <Link to="/login" className="flex items-center gap-1">
            <User size={16} /> Login / Register
          </Link>
          <Search size={16} />
          <span className="flex items-center gap-1">
            <ShoppingCart size={16} /> 1
          </span>
          <span className="flex items-center gap-1">
            <Heart size={16} /> 1
          </span>
        </div>

        {/* Mobile ikonlar */}
        <div className="flex md:hidden items-center gap-4 text-dark">
          <Search size={24} />
          <ShoppingCart size={24} />
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
          <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  )
}

export default Header
