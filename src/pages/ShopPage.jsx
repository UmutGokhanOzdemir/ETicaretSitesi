import { Link } from 'react-router-dom'
import { ChevronRight, LayoutGrid, List } from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import mockProducts from '../data/mockProducts'

const categories = [
  { title: 'CLOTHS', itemCount: 5, image: 'https://picsum.photos/seed/cloths/210/223' },
  { title: 'BAGS', itemCount: 5, image: 'https://picsum.photos/seed/bags/210/223' },
  { title: 'SHOES', itemCount: 5, image: 'https://picsum.photos/seed/shoes/210/223' },
  { title: 'ACCESSORIES', itemCount: 5, image: 'https://picsum.photos/seed/accessories/210/223' },
  { title: 'WATCHES', itemCount: 5, image: 'https://picsum.photos/seed/watches/210/223' }
]

function ShopPage() {
  return (
    <div className="flex flex-col">
      {/* A. BREADCRUMB */}
      <section className="bg-light py-6">
        <div className="flex justify-between items-center max-w-[1050px] mx-auto px-4">
          <h1 className="text-2xl font-bold text-dark">Shop</h1>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-dark">Home</Link>
            <ChevronRight size={16} className="text-muted" />
            <span className="text-muted">Shop</span>
          </div>
        </div>
      </section>

      {/* B. CATEGORY CARDS */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.title}
                title={cat.title}
                itemCount={cat.itemCount}
                image={cat.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* C. FILTER BAR */}
      <section className="bg-light py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1050px] mx-auto px-4">
          <p className="text-sm text-text font-bold">Showing all 12 results</p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-text font-bold">Views:</span>
            <button className="flex items-center justify-center w-12 h-12 border border-border rounded text-dark bg-white">
              <LayoutGrid size={16} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 border border-border rounded text-dark bg-white">
              <List size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select className="bg-input-bg border border-border text-sm text-text px-4 py-2 rounded">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <select className="bg-input-bg border border-border text-sm text-text px-4 py-2 rounded">
              <option>Filter</option>
            </select>
            <button className="bg-primary text-white text-sm font-bold px-6 py-2 rounded">
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* D. PRODUCTS GRID */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex flex-wrap gap-8 justify-center">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. PAGINATION */}
      <section className="bg-white py-12">
        <div className="flex justify-center max-w-[1050px] mx-auto px-4">
          <div className="flex">
            <button
              disabled
              className="px-6 py-4 border border-border text-muted bg-white font-bold text-sm cursor-not-allowed"
            >
              First
            </button>
            <button className="px-6 py-4 border border-border border-l-0 bg-white text-primary font-bold text-sm">
              1
            </button>
            <button className="px-6 py-4 border border-border border-l-0 bg-primary text-white font-bold text-sm">
              2
            </button>
            <button className="px-6 py-4 border border-border border-l-0 bg-white text-primary font-bold text-sm">
              3
            </button>
            <button className="px-6 py-4 border border-border border-l-0 bg-primary text-white font-bold text-sm">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
