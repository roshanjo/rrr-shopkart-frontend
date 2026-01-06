export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">₹ {product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
