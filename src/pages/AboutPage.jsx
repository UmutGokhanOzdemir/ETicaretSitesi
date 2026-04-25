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
      {/* SECTION 1: HEADER 24 (Hero with decorative shapes) */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Decorative shapes */}
        <div className="hidden md:block absolute top-32 right-32 w-[484px] h-[484px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute top-12 right-[600px] w-[77px] h-[77px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute bottom-20 right-20 w-[30px] h-[30px] rounded-full bg-[#FFE9EA] -z-0" />
        <div className="hidden md:block absolute top-40 right-[80px] w-[15px] h-[15px] rounded-full bg-[#977DF4] -z-0" />
        <div className="hidden md:block absolute bottom-40 right-[700px] w-[15px] h-[15px] rounded-full bg-[#977DF4] -z-0" />

        <div className="relative flex flex-col md:flex-row items-center gap-12 max-w-[1050px] mx-auto px-4 z-10">
          <div className="flex flex-col gap-[35px] flex-1">
            <h5 className="text-base font-bold text-dark">ABOUT COMPANY</h5>
            <h1 className="text-5xl md:text-[58px] font-bold text-dark leading-tight md:leading-[80px]">
              About us
            </h1>
            <p className="text-xl text-text font-normal leading-[30px] max-w-md">
              We know how large objects will act, but things on a small scale just do not act that way.
            </p>
            <button className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] py-[15px] w-fit">
              Get Quote Now
            </button>
          </div>

          <div className="flex-1">
            <img
              src="https://picsum.photos/seed/about-hero/500/500"
              alt="About"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT 9 (split tag + heading + paragraph) */}
      <section className="bg-white py-12">
        <div className="flex flex-col md:flex-row gap-12 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col gap-20 flex-1">
            <p className="text-sm text-alert font-normal">Problems Trying</p>
            <h3 className="text-2xl font-bold text-dark md:leading-[32px] max-w-[394px]">
              Met minimum mollie non desert Alamo est sit cliquey dolor do.
            </h3>
          </div>

          <div className="flex flex-col gap-4 flex-1 justify-end">
            <p className="text-sm text-text">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS 9 (4 big numbers) */}
      <section className="bg-white py-20">
        <div className="flex flex-col md:flex-row justify-around gap-8 max-w-[1050px] mx-auto px-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <h1 className="text-5xl md:text-[58px] font-bold text-dark md:leading-[80px]">{stat.value}</h1>
              <h5 className="text-base font-bold text-text">{stat.label}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: VIDEO 3 (large video card) */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="relative rounded-[20px] overflow-hidden">
            <img
              src="https://picsum.photos/seed/about-video/1050/540"
              alt="Video"
              className="w-full h-[540px] object-cover"
            />
            {/* Filter overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 14.58%, rgba(56,56,56,0.84) 100%)'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play video"
                className="flex items-center justify-center w-[92.6px] h-[92.6px] rounded-full bg-primary text-white"
              >
                <Play size={32} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLIENTS 3 (Big Companies + heading) */}
      <section className="bg-light py-20">
        <div className="flex flex-col items-center gap-6 max-w-[1050px] mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-[30px]">
            <h2 className="text-4xl md:text-[40px] font-bold text-dark md:leading-[50px] max-w-[496px]">
              Big Companies Are Here
            </h2>
            <p className="text-sm text-text max-w-[547px]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-[30px] w-full py-[50px]">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-text text-2xl font-bold"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS 4 (BLUE bg #2A7CC7) */}
      <section className="bg-[#2A7CC7] py-28">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col gap-6 flex-1">
            <h5 className="text-base font-bold text-white">WORK WITH US</h5>
            <h2 className="text-4xl md:text-[40px] font-bold text-white md:leading-[50px]">
              Now Let's grow Yours
            </h2>
            <p className="text-sm text-white max-w-[440px]">
              The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th century.
            </p>
            <button className="border border-light text-light text-sm font-bold rounded-[5px] px-[40px] py-[15px] w-fit hover:bg-white hover:text-[#2A7CC7] transition-colors">
              Button
            </button>
          </div>
          <div className="flex-1">
            <img
              src="https://picsum.photos/seed/about-testimonial/548/412"
              alt="Testimonial"
              className="w-full h-[412px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
