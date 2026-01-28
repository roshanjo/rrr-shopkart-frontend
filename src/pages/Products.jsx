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
    <div className="min-h-screen bg-[#0b1220]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* MOBILE FILTER */}
        <div className="lg:hidden sticky top-16 z-30 bg-[#0b1220] py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                  ${
                    category === c
                      ? "bg-yellow-400 text-black"
                      : "bg-[#1e293b] text-gray-200"
                  }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {/* DESKTOP FILTER */}
          <aside className="hidden lg:block w-64">
            <div className="bg-[#111827] border border-[#1f2937] p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-100">Category</h3>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => changeCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded mb-1
                    ${
                      category === c
                        ? "bg-yellow-400 text-black"
                        : "text-gray-300 hover:bg-[#1e293b]"
                    }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <main className="flex-1">
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(product => (
                  <div
                    key={product.id}
                    className="relative bg-[#111827] border border-[#1f2937]
                               rounded-xl p-3 cursor-pointer
                               hover:bg-[#1e293b]
                               transition"
                    onClick={() =>
                      navigate(`/product/${product.id}?source=dummy`)
                    }
                  >
                    {/* ❤️ Wishlist */}
                    <div
                      className="absolute top-2 right-2 z-10"
                      onClick={e => e.stopPropagation()}
                    >
                      <WishlistButton product={product} />
                    </div>

                    {/* 🖼️ IMAGE CONTAINER (FIXED) */}
                    <div
                      className="h-40 w-full rounded-lg
                                 bg-gradient-to-br from-[#0b1220] to-[#111827]
                                 border border-[#1f2937]
                                 flex items-center justify-center p-3"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-gray-100 line-clamp-2">
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
                    className={`px-4 py-2 rounded border
                      ${
                        page === p
                          ? "bg-yellow-400 text-black"
                          : "border-[#1f2937] text-gray-300 hover:bg-[#1e293b]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
