function CategoryCard({ title, itemCount, image }) {
  return (
    <div
      className="relative flex-1 h-[223px] bg-cover bg-center cursor-pointer overflow-hidden"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-base font-bold">{itemCount} Items</span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  )
}

export default CategoryCard
