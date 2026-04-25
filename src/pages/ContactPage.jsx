import { Phone, Mail, MapPin } from 'lucide-react'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO (Header 24) */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="hidden md:block absolute top-32 right-32 w-[484px] h-[484px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute top-12 right-[600px] w-[77px] h-[77px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute bottom-20 right-20 w-[30px] h-[30px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute top-40 right-[80px] w-[15px] h-[15px] rounded-full bg-[#977DF4] -z-0" />
        <div className="hidden md:block absolute bottom-40 right-[700px] w-[15px] h-[15px] rounded-full bg-[#977DF4] -z-0" />

        <div className="relative flex flex-col md:flex-row items-center gap-12 max-w-[1050px] mx-auto px-4 z-10">
          <div className="flex flex-col gap-[35px] flex-1">
            <h5 className="text-base text-dark font-bold">CONTACT US</h5>
            <h1 className="text-4xl md:text-[58px] font-bold text-dark leading-tight md:leading-[80px]">
              Get in touch<br />today!
            </h1>
            <p className="text-xl text-text font-normal leading-[30px] max-w-md">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            <div className="flex flex-col gap-[10px]">
              <p className="text-2xl font-bold text-dark">Phone : +451 215 215</p>
              <p className="text-2xl font-bold text-dark">Fax : +451 215 215</p>
            </div>
            <div className="flex items-center gap-[34px] py-[10px]">
              <FaTwitter size={30} className="text-dark" />
              <FaFacebook size={30} className="text-dark" />
              <FaInstagram size={30} className="text-dark" />
              <FaLinkedin size={30} className="text-dark" />
            </div>
          </div>

          <div className="flex-1">
            <img
              src="https://picsum.photos/seed/contact-hero/500/500"
              alt="Contact"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFO CARDS (Contact 7) */}
      <section className="bg-white py-28">
        <div className="flex flex-col items-center gap-20 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col items-center gap-[10px] text-center">
            <p className="text-sm text-dark font-bold">VISIT OUR OFFICE</p>
            <h2 className="text-3xl md:text-[40px] font-bold text-dark md:leading-[50px] max-w-[531px]">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-8 w-full">
            {/* Card 1 */}
            <div className="flex flex-col items-center gap-[15px] bg-white p-[50px_40px] flex-1 text-center">
              <Phone size={72} className="text-primary" />
              <p className="text-sm font-bold text-dark">georgia.young@example.com</p>
              <p className="text-sm font-bold text-dark">georgia.young@ba.co</p>
              <h5 className="text-base font-bold text-dark">Get Support</h5>
              <button className="text-sm font-bold text-primary border border-primary rounded-[37px] px-9 py-[15px] hover:bg-primary hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* Card 2 - featured (DARK + TALLER) */}
            <div className="flex flex-col items-center gap-[15px] bg-dark text-white p-[80px_40px] flex-1 text-center md:-my-8">
              <Mail size={72} className="text-primary" />
              <p className="text-sm font-bold">georgia.young@example.com</p>
              <p className="text-sm font-bold">georgia.young@ba.co</p>
              <h5 className="text-base font-bold">Get Support</h5>
              <button className="text-sm font-bold text-white border border-white rounded-[37px] px-9 py-[15px] hover:bg-white hover:text-dark transition-colors">
                Submit Request
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center gap-[15px] bg-white p-[50px_40px] flex-1 text-center">
              <MapPin size={72} className="text-primary" />
              <p className="text-sm font-bold text-dark">georgia.young@example.com</p>
              <p className="text-sm font-bold text-dark">georgia.young@ba.co</p>
              <h5 className="text-base font-bold text-dark">Get Support</h5>
              <button className="text-sm font-bold text-primary border border-primary rounded-[37px] px-9 py-[15px] hover:bg-primary hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA 3 */}
      <section className="relative bg-white py-20">
        <div className="relative flex flex-col items-center gap-[30px] text-center max-w-[1050px] mx-auto px-4">
          <h5 className="text-base text-dark font-bold">we can't wait to meet you</h5>
          <h1 className="text-4xl md:text-[58px] font-bold text-dark leading-tight md:leading-[80px]">Let's Talk</h1>
          <div className="relative">
            <button className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] py-[15px]">
              Try it free now
            </button>
            {/* Decorative arrow */}
            <div
              className="hidden md:block absolute -top-2 -right-32 w-[72px] h-[22px] border-t-[4px] border-r-[4px] border-primary"
              style={{ transform: 'rotate(45.56deg)' }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
