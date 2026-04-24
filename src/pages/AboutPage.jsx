import { Play } from 'lucide-react'

const stats = [
  { value: '15K', label: 'Happy Customers' },
  { value: '150K', label: 'Monthly Visitors' },
  { value: '15', label: 'Countries Worldwide' },
  { value: '100+', label: 'Top Partners' }
]

const brands = ['BRAND 1', 'BRAND 2', 'BRAND 3', 'BRAND 4', 'BRAND 5', 'BRAND 6']

function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO */}
      <section className="bg-light py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col gap-6 flex-1">
            <p className="text-sm font-bold text-text">ABOUT COMPANY</p>
            <h1 className="text-5xl md:text-6xl font-bold text-dark leading-tight">
              About us
            </h1>
            <p className="text-sm text-text max-w-md">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            <button className="bg-primary text-white text-sm font-bold rounded px-10 py-4 w-fit">
              Get Quote Now
            </button>
          </div>

          <div className="flex-1">
            <img
              src="https://picsum.photos/seed/about-hero/500/500"
              alt="About"
              className="w-full h-[450px] object-cover rounded"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS */}
      <section className="bg-white py-16">
        <div className="flex flex-col md:flex-row justify-around gap-8 max-w-[1050px] mx-auto px-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <h2 className="text-4xl font-bold text-dark">{stat.value}</h2>
              <p className="text-sm font-bold text-text">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: VIDEO/IMAGE */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/about-video/1050/500"
              alt="Video"
              className="w-full h-[500px] object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play video"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white"
              >
                <Play size={32} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TEXT BLOCK */}
      <section className="bg-white py-12">
        <div className="flex flex-col md:flex-row gap-12 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-sm text-text font-bold">Problems trying</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Met minimum mollie non desert Alamo est sit cliquey dolor do.
            </h2>
          </div>

          <div className="flex flex-col gap-4 flex-1 justify-end">
            <p className="text-sm text-text">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
            <button className="bg-primary text-white text-sm font-bold rounded px-10 py-4 w-fit">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: BIG COMPANIES */}
      <section className="bg-light py-20">
        <div className="flex flex-col items-center gap-12 max-w-[1050px] mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Big Companies Are Here
            </h2>
            <p className="text-sm text-text max-w-xl">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 w-full">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-muted text-2xl font-bold"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="bg-primary py-16">
        <div className="flex flex-col items-center gap-6 text-center text-white max-w-[1050px] mx-auto px-4">
          <p className="text-sm font-bold">WORK WITH US</p>
          <h2 className="text-4xl md:text-5xl font-bold">Now Let's grow Yours</h2>
          <p className="text-sm max-w-xl">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th century.
          </p>
          <button className="border border-white text-white text-sm font-bold rounded px-10 py-4 hover:bg-white hover:text-primary transition-colors">
            Button
          </button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
