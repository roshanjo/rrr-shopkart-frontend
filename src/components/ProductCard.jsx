export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-purple-600">
            ₹{product.price}
          </span>

          <button
            onClick={() => onAdd(product)}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
