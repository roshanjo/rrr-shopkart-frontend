import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";
  const sort = params.get("sort") || "relevance";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const skip = (page - 1) * PAGE_SIZE;
        const res = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
        );
        const data = await res.json();
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter(p => p.category === category);
    }

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, category, sort]);

  const change = (obj) => {
    setParams({
      page: obj.page ?? page,
      cat: obj.cat ?? category,
      sort: obj.sort ?? sort
    });
  };

  const categories = [
    "all",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration"
  ];

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* MOBILE FILTER BAR */}
      <div className="lg:hidden sticky top-0 z-30 bg-gray-900 py-3 flex gap-2 overflow-x-auto">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => change({ cat: c, page: 1 })}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
              ${category === c ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="flex justify-end mt-4">
        <select
          value={sort}
          onChange={e => change({ sort: e.target.value })}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      <div className="flex gap-6 mt-6">

        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-64">
          <div className="bg-gray-900 p-4 rounded text-white">
            <h3 className="font-bold mb-3">Category</h3>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => change({ cat: c, page: 1 })}
                className={`block w-full text-left px-3 py-2 rounded
                  ${category === c ? "bg-yellow-400 text-black" : "hover:bg-gray-800"}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1">
          {loading ? (
            <p className="text-white">Loading…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(p => (
                <div key={p.id} className="bg-gray-900 text-white p-3 rounded">
                  <img
                    src={p.thumbnail}
                    className="h-40 w-full object-contain cursor-pointer"
                    onClick={() => navigate(`/product/${p.id}`)}
                  />
                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-yellow-400 font-bold mt-1">
                    ₹ {Math.round(p.price * 80)}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="mt-3 w-full bg-yellow-400 text-black py-2 rounded"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-10">
            {[1,2,3,4].map(p => (
              <button
                key={p}
                onClick={() => change({ page: p })}
                className={`px-4 py-2 border rounded
                  ${page === p ? "bg-yellow-400 text-black" : "text-white"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
