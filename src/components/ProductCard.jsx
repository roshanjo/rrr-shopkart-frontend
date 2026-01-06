import { motion } from "framer-motion";

export default function ProductCard({ product, addToCart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-lg p-4 shadow-sm bg-white"
    >
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">₹ {product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
