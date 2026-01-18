import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg font-semibold mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          <p className="text-xl font-semibold text-green-600 mb-3">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            High quality product with best price. Carefully selected for the
            best shopping experience.
          </p>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
