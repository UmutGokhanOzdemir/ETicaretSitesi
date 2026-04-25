import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const team = [
  { name: 'Gökhan Özdemir', title: 'Project Manager', image: 'https://i.pravatar.cc/316?img=60' },
  { name: 'Umut Gökhan Özdemir', title: 'Full Stack Developer', image: 'https://i.pravatar.cc/316?img=33' },
  { name: 'John Doe', title: 'UI/UX Designer', image: 'https://i.pravatar.cc/316?img=12' },
  { name: 'Jane Smith', title: 'UI Developer', image: 'https://i.pravatar.cc/316?img=47' },
  { name: 'Chris Evans', title: 'QA Engineer', image: 'https://i.pravatar.cc/316?img=52' },
  { name: 'Sarah Lee', title: 'Marketing Lead', image: 'https://i.pravatar.cc/316?img=23' },
  { name: 'Michael Brown', title: 'Backend Developer', image: 'https://i.pravatar.cc/316?img=11' },
  { name: 'Emma Wilson', title: 'Product Designer', image: 'https://i.pravatar.cc/316?img=44' },
  { name: 'David Kim', title: 'DevOps Engineer', image: 'https://i.pravatar.cc/316?img=15' }
]

const heroImages = [
  'https://picsum.photos/seed/team-hero1/700/530',
  'https://picsum.photos/seed/team-hero2/361/260',
  'https://picsum.photos/seed/team-hero3/361/260',
  'https://picsum.photos/seed/team-hero4/361/260',
  'https://picsum.photos/seed/team-hero5/361/260'
]

function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: INNER HEADER 3 (image bg + filter + title + breadcrumb) */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/team-bg/1440/352')"
        }}
      >
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative flex flex-col items-center gap-4 text-center max-w-[1050px] mx-auto px-4 py-20 z-10">
          <h5 className="text-base text-text font-bold">WHAT WE DO</h5>
          <h2 className="text-4xl md:text-[58px] font-bold text-dark md:leading-[80px]">
            Innovation tailored for you
          </h2>
          <div className="flex items-center gap-[15px] text-sm font-bold mt-2 py-[10px]">
            <Link to="/" className="text-dark">Home</Link>
            <ChevronRight size={16} className="text-muted" />
            <span className="text-text">Team</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: HERO PICTURE (5-image asymmetric grid) */}
      <section className="bg-white">
        <div className="flex flex-col md:flex-row gap-[9px]">
          {/* Big left image */}
          <div className="md:flex-[2]">
            <img
              src={heroImages[0]}
              alt="Team big"
              className="w-full h-[300px] md:h-[530px] object-cover"
            />
          </div>
          {/* 2x2 right grid */}
          <div className="md:flex-1 flex flex-col gap-[9px]">
            <div className="flex gap-[9px]">
              <img src={heroImages[1]} alt="Team 2" className="flex-1 h-[150px] md:h-[260px] object-cover" />
              <img src={heroImages[2]} alt="Team 3" className="flex-1 h-[150px] md:h-[260px] object-cover" />
            </div>
            <div className="flex gap-[9px]">
              <img src={heroImages[3]} alt="Team 4" className="flex-1 h-[150px] md:h-[260px] object-cover" />
              <img src={heroImages[4]} alt="Team 5" className="flex-1 h-[150px] md:h-[260px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TEAM 4 (3×3 grid = 9 members) */}
      <section className="bg-white py-28">
        <div className="flex flex-col items-center gap-28 max-w-[1050px] mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-[10px]">
            <h2 className="text-4xl md:text-[40px] font-bold text-dark md:leading-[50px]">Meet Our Team</h2>
            <p className="text-sm text-text max-w-[469px]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-[30px] w-full">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-[10px] w-full md:w-[316px] bg-white p-[30px]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full md:w-[316px] h-[231px] object-cover"
                />
                <h5 className="text-base font-bold text-dark">{member.name}</h5>
                <p className="text-sm font-bold text-text">{member.title}</p>
                <div className="flex items-center gap-5 text-primary">
                  <FaFacebook size={24} />
                  <FaInstagram size={24} />
                  <FaTwitter size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA 3 (Become a member) */}
      <section className="bg-white py-20">
        <div className="flex flex-col items-center gap-[30px] text-center max-w-[1050px] mx-auto px-4">
          <h2 className="text-4xl md:text-[40px] font-bold text-dark md:leading-[50px]">
            Become a member
          </h2>
          <p className="text-sm text-text max-w-[411px]">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
          </p>
          <button className="bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] py-[15px]">
            Join Now
          </button>
          {/* Social: COLORED brand */}
          <div className="flex items-center gap-[34px] py-[10px]">
            <FaTwitter size={30} style={{ color: '#55ACEE' }} />
            <FaFacebook size={30} style={{ color: '#395185' }} />
            <FaInstagram size={30} style={{ color: '#000000' }} />
            <FaLinkedin size={30} style={{ color: '#0A66C2' }} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamPage
