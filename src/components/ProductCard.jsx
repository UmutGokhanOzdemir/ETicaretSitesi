function ProductCard({ product }) {
  return (
    <div className="flex flex-col bg-white hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[427px] object-cover"
      />

      <div className="flex flex-col items-center gap-2 p-[25px_25px_35px]">
        <h3 className="text-base font-bold text-dark">{product.title}</h3>
        <p className="text-sm font-bold text-text">{product.department}</p>

        <div className="flex items-center gap-1">
          <span className="text-muted font-bold line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
          <span className="text-secondary font-bold">
            ${product.newPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
