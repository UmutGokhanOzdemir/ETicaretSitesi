import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import Spinner from './Spinner'
import {
  fetchProducts,
  FETCH_STATES
} from '../store/actions/productActions'

function BestsellerProducts({ limit = 4, variant = 'home', excludeId }) {
  const dispatch = useDispatch()
  const isDetail = variant === 'detail'

  const { productList, fetchState } = useSelector((s) => s.product)

  useEffect(() => {
    if (productList.length === 0 && fetchState !== FETCH_STATES.FETCHING) {
      dispatch(fetchProducts({ limit: 8 }))
    }
  }, [dispatch, productList.length, fetchState])

  const items = (excludeId
    ? productList.filter((p) => String(p.id) !== String(excludeId))
    : productList
  ).slice(0, limit)

  return (
    <section className={`${isDetail ? 'bg-light' : 'bg-white'} py-20`}>
      <div className="flex flex-col items-center gap-12 max-w-[1200px] mx-auto px-4 lg:px-8 w-full">
        <div
          className={`flex flex-col items-center gap-2 ${
            isDetail ? 'w-full' : 'text-center'
          }`}
        >
          {!isDetail && (
            <p className="text-xl text-text font-normal">Featured Products</p>
          )}
          <h3 className="text-2xl font-bold text-dark">BESTSELLER PRODUCTS</h3>
          {!isDetail && (
            <p className="text-sm text-text max-w-sm">
              Problems trying to resolve the conflict between
            </p>
          )}
          {isDetail && <div className="h-[2px] w-full bg-[#ECECEC] mt-4" />}
        </div>

        {fetchState === FETCH_STATES.FETCHING && items.length === 0 && (
          <Spinner />
        )}

        {fetchState === FETCH_STATES.FAILED && items.length === 0 && (
          <p className="text-alert text-center">Ürünler yüklenemedi</p>
        )}

        {items.length > 0 && (
          <div className="flex flex-wrap gap-[30px] w-full justify-start">
            {items.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-22.5px)]"
              >
                <ProductCard product={product} variant={variant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BestsellerProducts
