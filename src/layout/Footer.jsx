import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="flex flex-col">
      {/* BÖLÜM 1 — ÜST (Logo + Social) */}
      <div className="bg-light">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 max-w-[1050px] mx-auto px-4 py-10">
          <Link to="/" className="text-2xl font-bold text-dark">
            Bandage
          </Link>
          <div className="flex items-center gap-5 text-primary">
            <FaFacebook size={24} />
            <FaInstagram size={24} />
            <FaTwitter size={24} />
          </div>
        </div>
      </div>

      {/* HR DIVIDER */}
      <div className="border-t border-border" />

      {/* BÖLÜM 2 — ORTA (Linkler + Subscribe) */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row gap-8 max-w-[1050px] mx-auto px-4 py-[50px]">
          {/* Company Info */}
          <div className="flex flex-col gap-5 md:flex-1">
            <h5 className="text-base font-bold text-dark">Company Info</h5>
            <div className="flex flex-col gap-[10px] text-sm font-bold text-text">
              <Link to="/about">About Us</Link>
              <Link to="/carrier">Carrier</Link>
              <Link to="/hiring">We are hiring</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5 md:flex-1">
            <h5 className="text-base font-bold text-dark">Legal</h5>
            <div className="flex flex-col gap-[10px] text-sm font-bold text-text">
              <Link to="/about">About Us</Link>
              <Link to="/carrier">Carrier</Link>
              <Link to="/hiring">We are hiring</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-5 md:flex-1">
            <h5 className="text-base font-bold text-dark">Features</h5>
            <div className="flex flex-col gap-[10px] text-sm font-bold text-text">
              <Link to="/features/marketing">Business Marketing</Link>
              <Link to="/features/analytic">User Analytic</Link>
              <Link to="/features/chat">Live Chat</Link>
              <Link to="/features/support">Unlimited Support</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-5 md:flex-1">
            <h5 className="text-base font-bold text-dark">Resources</h5>
            <div className="flex flex-col gap-[10px] text-sm font-bold text-text">
              <Link to="/resources/apps">IOS &amp; Android</Link>
              <Link to="/resources/demo">Watch a Demo</Link>
              <Link to="/resources/customers">Customers</Link>
              <Link to="/resources/api">API</Link>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="flex flex-col gap-5 md:flex-1">
            <h5 className="text-base font-bold text-dark">Get In Touch</h5>
            <form
              className="flex items-stretch h-[58px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your Email"
                className="bg-input-bg border border-border rounded-[5px] pl-5 text-sm w-full outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white text-sm font-normal px-4 rounded-r-[5px] -ml-[5px]"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-text">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      {/* BÖLÜM 3 — ALT (Copyright) */}
      <div className="bg-light">
        <div className="max-w-[1050px] mx-auto px-4 py-[25px]">
          <p className="text-sm font-bold text-text">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
