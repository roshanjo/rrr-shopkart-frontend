import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import toast from "react-hot-toast";

const PAGE_SIZE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // PAGE 1 → FakeStore
        if (page === 1) {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();

          setProducts(
            data.map(p => ({
              id: `fs-${p.id}`,
              title: p.title,
              price: p.price,
              image: p.image,
              category: p.category
            }))
          );
        }

        // PAGE 2+ → DummyJSON
        else {
          const skip = (page - 2) * PAGE_SIZE;
          const res = await fetch(
            `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
          );
          const data = await res.json();

          setProducts(
            data.products.map(p => ({
              id: `dj-${p.id}`,
              title: p.title,
              price: p.price,
              image: p.thumbnail,
              category: p.category
            }))
          );
        }
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page]);

  /* ================= FILTERS ================= */
  const ALL_CATEGORIES = [
    "all",
    "electronics",
    "men's clothing",
    "women's clothing",
    "smartphones",
    "laptops",
    "fragrances",
    "groceries",
    "home-decoration"
  ];

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  }, [products, category]);

  const changePage = p => {
    setParams({ page: p, cat: category !== "all" ? category : undefined });
  };

  const changeCategory = c => {
    setParams({ page: 1, cat: c !== "all" ? c : undefined });
  };

  return (
    <>
      <Seo title="Products | AIKart" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* MOBILE FILTER BAR */}
        <div className="lg:hidden sticky top-0 z-20 bg-gray-100 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {ALL_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                ${category === c ? "bg-yellow-400" : "bg-white border"}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {/* DESKTOP FILTER */}
          <aside className="hidden lg:block w-64">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-4">Category</h3>
              <div className="space-y-2">
                {ALL_CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => changeCategory(c)}
                    className={`block w-full text-left px-3 py-2 rounded
                    ${category === c ? "bg-yellow-300" : "hover:bg-gray-100"}`}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                  <div
                    key={p.id}
                    className="bg-white p-4 rounded shadow"
                  >
                    <img
                      src={p.image}
                      className="h-44 mx-auto object-contain cursor-pointer"
                      onClick={() => navigate(`/product/${p.id}`)}
                    />
                    <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="font-bold mt-1">₹ {Math.round(p.price * 80)}</p>
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="mt-3 w-full bg-yellow-400 py-2 rounded"
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
                  className={`px-4 py-2 border rounded
                  ${page === p ? "bg-black text-white" : ""}`}
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
