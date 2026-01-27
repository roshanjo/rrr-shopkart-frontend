import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WishlistButton from "../components/WishlistButton";

const PAGE_SIZE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== FETCH DUMMYJSON ===== */
  useEffect(() => {
    async function load() {
      setLoading(true);

      const skip = (page - 1) * PAGE_SIZE;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
      );
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    }

    load();
  }, [page]);

  /* ===== CATEGORIES ===== */
  const categories = [
    "all",
    "beauty",
    "smartphones",
    "laptops",
    "groceries",
    "home-decoration"
  ];

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  }, [products, category]);

  const changeCategory = c => {
    setParams(c === "all" ? {} : { cat: c });
  };

  const changePage = p => {
    setParams(category === "all" ? { page: p } : { cat: category });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* MOBILE FILTER */}
      <div className="lg:hidden sticky top-16 z-30 bg-black py-3">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => changeCategory(c)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
              ${category === c
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-white"}`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-64">
          <div className="bg-gray-900 text-white p-4 rounded">
            <h3 className="font-bold mb-4">Category</h3>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`block w-full text-left px-3 py-2 rounded mb-1
                ${category === c
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-800"}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="bg-gray-900 text-white p-3 rounded cursor-pointer relative"
                  onClick={() =>
                    navigate(`/product/${product.id}?source=dummy`)
                  }
                >
                  {/* ❤️ WISHLIST */}
                  <div
                    className="absolute top-2 right-2"
                    onClick={e => e.stopPropagation()}
                  >
                    <WishlistButton product={product} />
                  </div>

                  <img
                    src={product.thumbnail}
                    className="h-40 w-full object-contain"
                  />

                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="font-bold mt-1 text-yellow-400">
                    ₹ {Math.round(product.price * 80)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {category === "all" && (
            <div className="flex justify-center gap-2 mt-10">
              {[1, 2, 3, 4].map(p => (
                <button
                  key={p}
                  onClick={() => changePage(p)}
                  className={`px-4 py-2 border rounded
                  ${page === p
                    ? "bg-yellow-400 text-black"
                    : "text-white"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
