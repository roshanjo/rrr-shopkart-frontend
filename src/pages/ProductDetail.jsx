import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";

export default function ProductDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const source = params.get("source");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (source !== "dummy") {
      navigate("/products");
      return;
    }

    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id, source, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center
                      text-gray-900 dark:text-gray-200
                      bg-white dark:bg-[#0b1220]">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220]">
      <div className="max-w-7xl mx-auto p-6 pb-32 grid lg:grid-cols-3 gap-8">

        {/* IMAGE + DETAILS */}
        <div className="lg:col-span-2">
          <img
            src={product.thumbnail}
            className="
              w-full h-96 object-contain rounded

              /* LIGHT */
              bg-white border border-gray-200

              /* DARK */
              dark:bg-[#111827]
              dark:border-[#1f2937]
            "
          />

          <div className="flex gap-2 mt-4">
            {product.images.map(img => (
              <img
                key={img}
                src={img}
                className="
                  w-20 h-20 object-contain rounded border

                  /* LIGHT */
                  bg-white border-gray-200

                  /* DARK */
                  dark:bg-[#0b1220]
                  dark:border-[#1f2937]
                "
              />
            ))}
          </div>

          {/* PRICE + WISHLIST */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-2xl font-bold text-green-600">
              ₹ {Math.round(product.price * 80)}
            </p>
            <WishlistButton product={product} />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              About this item
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>
        </div>

        {/* BUY BOX */}
        <div
          className="
            sticky top-24 h-fit p-6 rounded border

            /* LIGHT */
            bg-white border-gray-200

            /* DARK */
            dark:bg-[#111827]
            dark:border-[#1f2937]
          "
        >
          <p className="text-2xl font-bold text-green-600">
            ₹ {Math.round(product.price * 80)}
          </p>

          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Inclusive of all taxes
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-yellow-400 py-3 mt-4 rounded font-bold text-black"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/address")}
            className="w-full bg-orange-500 py-3 mt-2 rounded text-white font-bold"
          >
            Buy Now
          </button>

          {/* OFFERS */}
          <div className="mt-4 text-sm">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Offers
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>No Cost EMI available</li>
              <li>10% Instant Discount</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
