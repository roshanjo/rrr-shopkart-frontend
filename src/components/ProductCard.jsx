export default function ProductCard({ product }) {
  const image =
    product.images && product.images.length > 0
      ? product.images[0]
      : null;

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-[#0f172a] text-white hover:border-yellow-400 transition">
      {image && (
        <img
          src={image}
          alt={product.title}
          className="w-full h-40 object-contain mb-3"
        />
      )}

      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
        {product.title}
      </h3>

      <p className="text-yellow-400 font-bold mb-3">
        ₹ {product.price}
      </p>

      <button className="w-full bg-yellow-400 text-black py-2 rounded">
        View
      </button>
    </div>
  );
}
