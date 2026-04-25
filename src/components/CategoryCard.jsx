function CategoryCard({ title, itemCount, image }) {
  return (
    <div
      className="relative flex-1 h-[223px] bg-cover bg-center cursor-pointer overflow-hidden"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-[rgba(33,33,33,0.25)] hover:bg-[rgba(33,33,33,0.4)] transition-colors" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h5 className="text-base font-bold">{title}</h5>
        <p className="text-sm font-normal">{itemCount} Items</p>
      </div>
    </div>
  )
}

export default CategoryCard
