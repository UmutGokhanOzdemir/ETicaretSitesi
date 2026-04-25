import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import ReactPaginateModule from 'react-paginate'

// react-paginate v8 UMD/CJS interop fix (Vite ESM)
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule
import { LayoutGrid, List } from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
import Breadcrumb from '../components/Breadcrumb'
import {
  fetchProducts,
  setOffset,
  FETCH_STATES
} from '../store/actions/productActions'
import { slugify } from '../utils/slugify'

function ShopPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { gender, categoryName, categoryId } = useParams()

  const { productList, total, fetchState, limit, offset } = useSelector(
    (s) => s.product
  )
  const categories = useSelector((s) => s.product.categories)

  const [filterInput, setFilterInput] = useState('')
  const [sortValue, setSortValue] = useState('')

  // URL → state senkronu + fetch
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlFilter = params.get('filter') || ''
    const urlSort = params.get('sort') || ''
    setFilterInput(urlFilter)
    setSortValue(urlSort)

    dispatch(
      fetchProducts({
        category: categoryId,
        limit,
        offset,
        filter: urlFilter,
        sort: urlSort
      })
    )
  }, [dispatch, categoryId, limit, offset, location.search])

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (filterInput) params.set('filter', filterInput)
    if (sortValue) params.set('sort', sortValue)
    dispatch(setOffset(0))
    history.push(`${location.pathname}${params.toString() ? '?' + params.toString() : ''}`)
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected * limit
    dispatch(setOffset(newOffset))
  }

  // Top 5 categories for category cards (rating sort)
  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  const categoryCards = topCategories.length >= 5
    ? topCategories.map((c) => ({
        title: (c.title || c.code || '').toUpperCase(),
        itemCount: 5,
        image: c.img || c.image,
        gender: c.gender === 'k' ? 'kadin' : 'erkek',
        slug: slugify(c.title || c.code || ''),
        id: c.id
      }))
    : [
        { title: 'CLOTHS', itemCount: 5, image: 'https://picsum.photos/seed/cloths/210/223' },
        { title: 'BAGS', itemCount: 5, image: 'https://picsum.photos/seed/bags/210/223' },
        { title: 'SHOES', itemCount: 5, image: 'https://picsum.photos/seed/shoes/210/223' },
        { title: 'ACCESSORIES', itemCount: 5, image: 'https://picsum.photos/seed/accessories/210/223' },
        { title: 'WATCHES', itemCount: 5, image: 'https://picsum.photos/seed/watches/210/223' }
      ]

  // Breadcrumb
  const currentCategory = categories.find((c) => String(c.id) === String(categoryId))
  const breadcrumbItems = categoryId
    ? [
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: currentCategory?.title || categoryName || 'Category' }
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Shop' }
      ]

  const pageCount = limit > 0 ? Math.ceil(total / limit) : 0
  const currentPage = limit > 0 ? offset / limit : 0

  return (
    <div className="flex flex-col">
      {/* A. BREADCRUMB */}
      <section className="bg-light py-6">
        <div className="flex justify-between items-center max-w-[1050px] mx-auto px-4">
          <h3 className="text-2xl font-bold text-dark">Shop</h3>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/* B. CATEGORY CARDS */}
      <section className="bg-light pb-12">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-[15px]">
            {categoryCards.map((cat) => (
              <Link
                key={cat.id || cat.title}
                to={cat.id ? `/shop/${cat.gender}/${cat.slug}/${cat.id}` : '/shop'}
                className="flex-1"
              >
                <CategoryCard
                  title={cat.title}
                  itemCount={cat.itemCount}
                  image={cat.image}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* C. FILTER BAR */}
      <section className="bg-white py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1050px] mx-auto px-4">
          <p className="text-sm text-text font-bold">
            Showing all {total} results
          </p>

          <div className="flex items-center gap-[15px]">
            <span className="text-sm text-text font-bold">Views:</span>
            <button className="flex items-center justify-center w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] text-dark bg-white">
              <LayoutGrid size={16} />
            </button>
            <button className="flex items-center justify-center w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] text-text bg-white">
              <List size={16} />
            </button>
          </div>

          <div className="flex items-center gap-[15px]">
            <input
              type="text"
              placeholder="Search..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="bg-input-bg border border-select-border text-sm text-text px-[18px] h-[50px] rounded-[5px] outline-none"
            />
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="bg-input-bg border border-select-border text-sm text-text px-[18px] h-[50px] rounded-[5px]"
            >
              <option value="">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
            <button
              onClick={handleFilter}
              className="bg-primary text-white text-sm font-bold px-5 h-[50px] rounded-[5px]"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* D. PRODUCTS GRID */}
      <section className="bg-white py-12">
        <div className="max-w-[1050px] mx-auto px-4">
          {fetchState === FETCH_STATES.FETCHING && <Spinner />}
          {fetchState === FETCH_STATES.FAILED && (
            <p className="text-alert text-center py-12">Failed to load products</p>
          )}
          {fetchState === FETCH_STATES.FETCHED && productList.length === 0 && (
            <p className="text-text text-center py-12">No products found</p>
          )}
          {fetchState === FETCH_STATES.FETCHED && productList.length > 0 && (
            <div className="flex flex-wrap gap-8 justify-center">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
                >
                  <ProductCard product={product} variant="shop" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* E. PAGINATION */}
      {pageCount > 1 && (
        <section className="bg-white py-12">
          <div className="flex justify-center max-w-[1050px] mx-auto px-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="First"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              forcePage={currentPage}
              renderOnZeroPageCount={null}
              containerClassName="flex shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-[6.72px] overflow-hidden border border-muted"
              pageClassName=""
              pageLinkClassName="px-6 py-4 border-l border-[#E9E9E9] bg-white text-primary font-bold text-sm block"
              activeLinkClassName="!bg-primary !text-white"
              previousClassName=""
              previousLinkClassName="px-6 py-4 bg-[#F3F3F3] text-muted font-bold text-sm block"
              nextClassName=""
              nextLinkClassName="px-6 py-4 border-l border-[#E8E8E8] bg-white text-primary font-bold text-sm block"
              breakClassName=""
              breakLinkClassName="px-6 py-4 border-l border-[#E9E9E9] bg-white text-primary font-bold text-sm block"
              disabledLinkClassName="opacity-60 cursor-not-allowed"
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default ShopPage
