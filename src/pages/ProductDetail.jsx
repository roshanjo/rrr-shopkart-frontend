import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  /* FETCH PRODUCT FROM FAKESTORE */
  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/products");
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const productId = String(product.id);
  const name = product.title;
  const price = Math.round(product.price * 80);

  /* ADD TO CART */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      name,
      price,
      image: product.image,
      qty: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  /* TOGGLE WISHLIST */
  const toggleWishlist = () => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(i => i !== productId);
      toast("Removed from wishlist");
    } else {
      updated = [...wishlist, productId];
      toast.success("Added to wishlist ❤️");
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <>
      <Seo title={`${name} | AIKart`} description={product.description} />

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 pb-32">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm text-blue-600"
          >
            ← Back
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            <img
              src={product.image}
              alt={name}
              className="h-72 object-contain mx-auto"
            />

            <div>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {product.category}
              </span>

              <h1 className="text-2xl font-bold mt-2">{name}</h1>

              <p className="text-yellow-500 mt-1">
                ⭐ {product.rating?.rate} / 5
              </p>

              <p className="text-2xl text-green-600 font-bold mt-3">
                ₹ {price}
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

              {/* DESKTOP ACTIONS (UNCHANGED) */}
              <div className="hidden md:flex gap-4 mt-6">
                <button
                  onClick={addToCart}
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`border px-6 py-2 rounded ${
                    wishlist.includes(productId)
                      ? "border-red-500 text-red-500"
                      : ""
                  }`}
                >
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ OLD-STYLE MOBILE STICKY (WORKING LIKE EARLY BUILD) */}
      <div className="md:hidden sticky bottom-0 z-40 bg-white dark:bg-gray-800 border-t">
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-lg font-bold text-green-600">
            ₹ {price}
          </p>

          <button
            onClick={addToCart}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
