export default function ProductCard({ product, onAdd, onView }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain cursor-pointer"
        onClick={() => onView(product.id)}
      />

      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          {product.category}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-purple-600">
            ₹ {Math.round(product.price * 80)}
          </span>

          <button
            onClick={() => onAdd(product)}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
