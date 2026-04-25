import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function Breadcrumb({ items = [] }) {
  return (
    <div className="flex items-center gap-[15px] text-sm font-bold">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-[15px]">
            {item.to && !isLast ? (
              <Link to={item.to} className="text-dark">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-muted' : 'text-dark'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={16} className="text-muted" />}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumb
