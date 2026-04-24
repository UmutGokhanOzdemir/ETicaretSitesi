import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const team = [
  {
    name: 'Gökhan Özdemir',
    title: 'Project Manager',
    image: 'https://i.pravatar.cc/316?img=60'
  },
  {
    name: 'Umut Gökhan Özdemir',
    title: 'Full Stack Developer',
    image: 'https://i.pravatar.cc/316?img=33'
  },
  {
    name: 'John Doe',
    title: 'UI/UX Designer',
    image: 'https://i.pravatar.cc/316?img=12'
  },
  {
    name: 'Jane Smith',
    title: 'UI Developer',
    image: 'https://i.pravatar.cc/316?img=47'
  },
  {
    name: 'Chris Evans',
    title: 'QA Engineer',
    image: 'https://i.pravatar.cc/316?img=52'
  }
]

function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: BREADCRUMB */}
      <section className="bg-light py-6">
        <div className="flex items-center gap-2 max-w-[1050px] mx-auto px-4 text-sm font-bold">
          <Link to="/" className="text-dark">Home</Link>
          <ChevronRight size={16} className="text-muted" />
          <span className="text-muted">Team</span>
        </div>
      </section>

      {/* SECTION 2: HERO TITLE */}
      <section className="bg-white py-16">
        <div className="flex flex-col items-center gap-4 text-center max-w-[1050px] mx-auto px-4">
          <p className="text-sm text-primary font-bold">WHAT WE DO</p>
          <h1 className="text-4xl md:text-5xl font-bold text-dark">
            Innovation tailored for you
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold mt-2">
            <Link to="/" className="text-dark">Home</Link>
            <ChevronRight size={16} className="text-muted" />
            <span className="text-muted">Team</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: MEET OUR TEAM */}
      <section className="bg-white py-20">
        <div className="flex flex-col items-center gap-12 max-w-[1050px] mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-dark">Meet Our Team</h2>
            <p className="text-sm text-text max-w-xl">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 w-full">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-3 w-full md:w-[316px]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full md:w-[316px] h-[231px] object-cover"
                />
                <h3 className="text-base font-bold text-dark">{member.name}</h3>
                <p className="text-sm font-bold text-text">{member.title}</p>
                <div className="flex items-center gap-4 text-primary">
                  <FaFacebook size={20} />
                  <FaInstagram size={20} />
                  <FaTwitter size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamPage
