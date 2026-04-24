import { Phone, Mail, MapPin } from 'lucide-react'

function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO */}
      <section className="bg-light py-12">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-sm text-primary font-bold">CONTACT US</p>
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              Get in touch<br />today!
            </h1>
            <p className="text-sm text-text max-w-md">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            <p className="text-lg font-bold text-dark">Phone : +451 215 215</p>
            <p className="text-lg font-bold text-dark">Fax : +451 215 215</p>
          </div>

          <div className="flex-1">
            <img
              src="https://picsum.photos/seed/contact-hero/500/500"
              alt="Contact"
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFO CARDS */}
      <section className="bg-white py-20">
        <div className="flex flex-col items-center gap-12 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-text font-bold">VISIT OUR OFFICE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Card 1 */}
            <div className="flex flex-col items-center gap-4 bg-white border border-border p-12 flex-1 text-center">
              <Phone size={56} className="text-dark" />
              <p className="text-sm font-bold text-dark">georgia.young@example.com</p>
              <p className="text-sm font-bold text-dark">georgia.young@ba.co</p>
              <h3 className="text-lg font-bold text-dark">Get Support</h3>
              <button className="text-sm font-bold text-primary border border-primary rounded-full px-8 py-3 hover:bg-primary hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* Card 2 - featured */}
            <div className="flex flex-col items-center gap-4 bg-dark text-white p-12 flex-1 text-center md:-my-8">
              <Mail size={56} />
              <p className="text-sm font-bold">georgia.young@example.com</p>
              <p className="text-sm font-bold">georgia.young@ba.co</p>
              <h3 className="text-lg font-bold">Get Support</h3>
              <button className="text-sm font-bold text-primary border border-primary rounded-full px-8 py-3 bg-white hover:bg-primary hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center gap-4 bg-white border border-border p-12 flex-1 text-center">
              <MapPin size={56} className="text-dark" />
              <p className="text-sm font-bold text-dark">georgia.young@example.com</p>
              <p className="text-sm font-bold text-dark">georgia.young@ba.co</p>
              <h3 className="text-lg font-bold text-dark">Get Support</h3>
              <button className="text-sm font-bold text-primary border border-primary rounded-full px-8 py-3 hover:bg-primary hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className="bg-white py-20">
        <div className="flex flex-col items-center gap-6 text-center max-w-[1050px] mx-auto px-4">
          <p className="text-sm text-text font-bold">We Can't Wait To Meet You</p>
          <h2 className="text-4xl md:text-5xl font-bold text-dark">Let's Talk</h2>
          <button className="bg-primary text-white text-sm font-bold rounded px-10 py-4">
            Try it free now
          </button>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
