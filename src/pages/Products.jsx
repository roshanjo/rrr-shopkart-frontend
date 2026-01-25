import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const FAKESTORE_URL = "https://fakestoreapi.com/products";
const DUMMY_URL = "https://dummyjson.com/products";

const CATEGORY_MAP = {
  electronics: "electronics",
  "men's clothing": "men's clothing",
  "women's clothing": "women's clothing",
  jewelery: "jewelery",

  smartphones: "smartphones",
  laptops: "laptops",
  fragrances: "fragrances",
  groceries: "groceries",
  "home-decoration": "home-decoration",
};

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        if (page === 1) {
          const res = await fetch(FAKESTORE_URL);
          const data = await res.json();
          setProducts(data);
        } else {
          const res = await fetch(
            `${DUMMY_URL}?limit=20&skip=${(page - 2) * 20}`
          );
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page]);

  /* ---------------- FILTER PRODUCTS ---------------- */

  const filteredProducts = useMemo(() => {
    if (category === "all") return products;

    return products.filter((p) => {
      const cat =
        page === 1 ? p.category : p.category?.toLowerCase();

      return cat === category.toLowerCase();
    });
  }, [products, category, page]);

  /* ---------------- AUTO RESET INVALID FILTER ---------------- */

  useEffect(() => {
    if (category !== "all" && filteredProducts.length === 0) {
      setParams({ page });
    }
  }, [filteredProducts, category, page, setParams]);

  /* ---------------- ADD TO CART ---------------- */

  function addToCart(product) {
    const updated = [...cart, { ...product, qty: 1 }];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Added to cart");
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="flex gap-6 px-4 lg:px-10 pt-6">

      {/* ---------- LEFT FILTER (DESKTOP) ---------- */}
      <aside className="hidden lg:block w-64 shrink-0">
        <h3 className="font-semibold mb-4">Category</h3>

        <ul className="space-y-2">
          {Object.keys(CATEGORY_MAP).map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setParams({ page, cat })}
                className={`w-full text-left px-3 py-2 rounded
                  ${
                    category === cat
                      ? "bg-yellow-400 text-black"
                      : "hover:bg-gray-700"
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1">

        {/* MOBILE FILTER BAR */}
        <div className="lg:hidden flex gap-2 overflow-x-auto mb-4">
          {Object.keys(CATEGORY_MAP).map((cat) => (
            <button
              key={cat}
              onClick={() => setParams({ page, cat })}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                ${
                  category === cat
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center py-10">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-900 rounded p-3 flex flex-col"
              >
                <img
                  src={p.thumbnail || p.image}
                  alt={p.title}
                  className="h-40 object-contain mb-2"
                />

                <h4 className="text-sm line-clamp-2">{p.title}</h4>

                <p className="mt-auto font-semibold">
                  ₹{p.price}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-2 bg-green-600 hover:bg-green-700 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 my-8">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setParams({ page: p })}
              className={`px-4 py-2 border rounded
                ${page === p ? "bg-white text-black" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      </main>

      {/* ---------- STICKY CART ---------- */}
      {cart.length > 0 && (
        <>
          {/* MOBILE */}
          <button
            onClick={() => navigate("/cart")}
            className="lg:hidden fixed bottom-20 right-4 z-50
                       bg-green-600 text-white w-14 h-14 rounded-full
                       flex items-center justify-center shadow-xl"
          >
            🛒
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs
                             w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </button>

          {/* DESKTOP */}
          <button
            onClick={() => navigate("/cart")}
            className="hidden lg:flex fixed bottom-10 right-10 z-50
                       bg-green-600 text-white w-16 h-16 rounded-full
                       items-center justify-center shadow-xl"
          >
            🛒
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs
                             w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
