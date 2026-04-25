import ProductCard from './ProductCard'
import mockProducts from '../data/mockProducts'

function BestsellerProducts({ limit = 4, variant = 'home' }) {
  const isDetail = variant === 'detail'

  return (
    <section className={`${isDetail ? 'bg-light' : 'bg-white'} py-20`}>
      <div className="flex flex-col items-center gap-12 px-4 max-w-[1050px] mx-auto">
        <div className={`flex flex-col items-center gap-2 ${isDetail ? 'w-full' : 'text-center'}`}>
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

        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 w-full justify-center">
          {mockProducts.slice(0, limit).map((product) => (
            <div
              key={product.id}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
            >
              <ProductCard product={product} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestsellerProducts
