import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Seo from "../components/Seo";

export default function ProductDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const source = params.get("source"); // 👈 THIS WAS MISSING
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cart"))?.length || 0
  );

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        // 🟡 FakeStore
        if (source === "fake") {
          const res = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          const data = await res.json();
          setProduct(data);
        }

        // 🔵 DummyJSON
        else if (source === "dummy") {
          const res = await fetch(
            `https://dummyjson.com/products/${id}`
          );
          const data = await res.json();

          // normalize to FakeStore shape
          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            image: data.thumbnail,
            rating: { rate: data.rating },
          });
        }

        else {
          throw new Error("Invalid source");
        }

      } catch (err) {
        toast.error("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, source, navigate]);

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
        Product not found
      </div>
    );
  }

  const productId = `${source}-${id}`;
  const name = product.title;
  const price = Math.round(product.price * 80);

  /* ================= CART ================= */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: productId,
      name,
      price,
      image: product.image,
      qty: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
    toast.success("Added to cart");
  };

  /* ================= WISHLIST ================= */
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

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 pb-32">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">

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
                ⭐ {product.rating?.rate || 4} / 5
              </p>

              <p className="text-2xl text-green-600 font-bold mt-3">
                ₹ {price}
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

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

      {/* MOBILE STICKY BAR */}
      <div className="md:hidden sticky bottom-0 z-40 bg-white dark:bg-gray-800 border-t">
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-lg font-bold text-green-600">₹ {price}</p>
          <button
            onClick={addToCart}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* FLOATING CART */}
      {cartCount > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="md:hidden fixed bottom-24 right-4 z-50
                     bg-green-600 text-white w-14 h-14 rounded-full
                     flex items-center justify-center shadow-lg"
        >
          🛒
          <span className="absolute -top-1 -right-1 bg-red-600 text-white
                           text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}
    </>
  );
}
