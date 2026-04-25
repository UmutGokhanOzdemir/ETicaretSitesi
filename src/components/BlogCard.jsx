import { Link } from 'react-router-dom'
import { Calendar, BarChart2 } from 'lucide-react'

function BlogCard({ post }) {
  return (
    <div className="flex flex-col bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[300px] object-cover"
        />
        <span className="absolute top-5 left-5 bg-alert text-white text-sm font-bold leading-6 px-[10px] rounded-[3px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
          NEW
        </span>
      </div>

      <div className="flex flex-col gap-[10px] p-[25px_25px_35px]">
        <div className="flex items-center gap-[15px] text-xs font-normal">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className={i === 0 ? 'text-disabled-blue' : 'text-text'}
            >
              {tag}
            </span>
          ))}
        </div>

        <h4 className="text-xl text-dark font-normal">{post.title}</h4>
        <p className="text-sm text-text max-w-[280px]">{post.description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-[5px] text-xs text-text">
            <Calendar size={16} className="text-primary" />
            {post.date}
          </span>
          <span className="flex items-center gap-[5px] text-xs text-text">
            <BarChart2 size={16} className="text-secondary" />
            {post.comments}
          </span>
        </div>

        <Link
          to="/blog"
          className="flex items-center gap-[10px] text-sm font-bold text-text mt-2"
        >
          Learn More <span className="text-primary">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
