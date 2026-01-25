import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import toast from "react-hot-toast";

const PAGE_SIZE = 12;

/* DummyJSON categories (REAL ones) */
const CATEGORIES = [
  "all",
  "smartphones",
  "laptops",
  "fragrances",
  "groceries",
  "home-decoration",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-dresses",
  "womens-shoes",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH (DummyJSON ONLY) ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const skip = (page - 1) * PAGE_SIZE;

        const url =
          category === "all"
            ? `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
            : `https://dummyjson.com/products/category/${category}?limit=${PAGE_SIZE}&skip=${skip}`;

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.products || []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, category]);

  const changePage = p => {
    setParams({
      page: p,
      ...(category !== "all" && { cat: category }),
    });
  };

  const changeCategory = c => {
    setParams({
      page: 1,
      ...(c !== "all" && { cat: c }),
    });
  };

  return (
    <>
      <Seo title="Products | AIKart" />

      <div className="max-w-7xl mx-auto px-3 py-6">
        {/* MOBILE CATEGORY BAR */}
        <div className="lg:hidden sticky top-0 z-20 bg-slate-900 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`px-4 py-2 rounded-full text-xs whitespace-nowrap
                ${
                  category === c
                    ? "bg-yellow-400 text-black"
                    : "bg-slate-800 text-white"
                }`}
              >
                {c.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {/* DESKTOP CATEGORY */}
          <aside className="hidden lg:block w-64">
            <div className="bg-slate-900 p-4 rounded">
              <h3 className="font-bold mb-4 text-white">Category</h3>
              <div className="space-y-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => changeCategory(c)}
                    className={`block w-full text-left px-3 py-2 rounded text-sm
                    ${
                      category === c
                        ? "bg-yellow-400 text-black"
                        : "text-gray-300 hover:bg-slate-800"
                    }`}
                  >
                    {c.replace("-", " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <main className="flex-1">
            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-400">No products found.</p>
            ) : (
              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
              >
                {products.map(p => (
                  <div
                    key={p.id}
                    className="bg-slate-900 rounded-lg p-4 shadow hover:shadow-lg transition"
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-48 w-full object-contain cursor-pointer"
                      onClick={() => navigate(`/product/${p.id}`)}
                    />

                    <h3 className="mt-3 text-sm font-semibold text-white line-clamp-2">
                      {p.title}
                    </h3>

                    <p className="font-bold mt-1 text-yellow-400">
                      ₹ {Math.round(p.price * 80)}
                    </p>

                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-10">
              {[1, 2, 3, 4].map(p => (
                <button
                  key={p}
                  onClick={() => changePage(p)}
                  className={`px-4 py-2 rounded border
                  ${
                    page === p
                      ? "bg-white text-black"
                      : "text-white border-gray-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
