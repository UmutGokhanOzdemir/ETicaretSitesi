import { Link } from 'react-router-dom'
import { Calendar, BarChart2 } from 'lucide-react'

function BlogCard({ post }) {
  return (
    <div className="flex flex-col bg-white shadow-sm">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[300px] object-cover"
        />
        <span className="absolute top-4 left-4 bg-alert text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </span>
      </div>

      <div className="flex flex-col gap-2 p-[25px_25px_35px]">
        <div className="flex items-center gap-1 text-sm">
          {post.tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className={i === 0 ? 'text-disabled-blue' : 'text-text'}>
                {tag}
              </span>
              {i < post.tags.length - 1 && <span className="text-text">,</span>}
            </span>
          ))}
        </div>

        <h3 className="text-xl text-dark">{post.title}</h3>
        <p className="text-sm text-text max-w-[280px]">{post.description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1 text-xs text-text">
            <Calendar size={13} className="text-primary" />
            {post.date}
          </span>
          <span className="flex items-center gap-1 text-xs text-text">
            <BarChart2 size={13} className="text-success" />
            {post.comments}
          </span>
        </div>

        <Link
          to="/blog"
          className="flex items-center gap-2 text-sm font-bold text-text mt-2"
        >
          Learn More <span>&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
