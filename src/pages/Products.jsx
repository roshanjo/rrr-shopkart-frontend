import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const category = params.get("cat") || "all";
  const minPrice = Number(params.get("min") || 0);
  const rating = Number(params.get("rating") || 0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL DUMMYJSON PRODUCTS
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    }
    load();
  }, []);

  // UNIQUE CATEGORIES
  const categories = useMemo(() => {
    return ["all", ...new Set(products.map(p => p.category))];
  }, [products]);

  // FILTER LOGIC
  const filtered = useMemo(() => {
    return products.filter(p => {
      if (category !== "all" && p.category !== category) return false;
      if (p.price < minPrice) return false;
      if (p.rating < rating) return false;
      return true;
    });
  }, [products, category, minPrice, rating]);

  const update = (obj) => {
  setParams({
    cat: obj.cat ?? (category !== "all" ? category : undefined),
    min: obj.min ?? minPrice,
    rating: obj.rating ?? rating
  });
};


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* FILTERS */}
      <aside className="hidden lg:block w-64 bg-gray-900 p-4 rounded text-white">
        <h3 className="font-bold mb-4">Category</h3>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => update({ cat: c })}
            className={`block w-full text-left px-3 py-2 rounded mb-1
              ${category === c ? "bg-yellow-400 text-black" : "hover:bg-gray-800"}`}
          >
            {c}
          </button>
        ))}

        <h3 className="font-bold mt-6 mb-2">Price</h3>
        {[0, 500, 1000, 2000].map(p => (
          <button
            key={p}
            onClick={() => update({ min: p })}
            className={`block w-full text-left px-3 py-2 rounded
              ${minPrice === p ? "bg-yellow-400 text-black" : "hover:bg-gray-800"}`}
          >
            ₹ {p}+
          </button>
        ))}

        <h3 className="font-bold mt-6 mb-2">Rating</h3>
        {[4, 3, 2].map(r => (
          <button
            key={r}
            onClick={() => update({ rating: r })}
            className={`block w-full text-left px-3 py-2 rounded
              ${rating === r ? "bg-yellow-400 text-black" : "hover:bg-gray-800"}`}
          >
            ⭐ {r} & up
          </button>
        ))}
      </aside>

      {/* PRODUCTS */}
      <main className="flex-1">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-gray-900 text-white p-3 rounded"
              >
                <img
                  src={p.thumbnail}
                  className="h-40 w-full object-contain cursor-pointer"
                  onClick={() => navigate(`/product/${p.id}`)}
                />
                <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-yellow-400 font-bold">
                  ₹ {Math.round(p.price * 83)}
                </p>
                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="mt-2 w-full bg-yellow-400 text-black py-2 rounded"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
