import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        let items = [];

        // FakeStore
        if (page === 1) {
          const fsRes = await fetch("https://fakestoreapi.com/products");
          const fsData = await fsRes.json();

          items = fsData.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category,
            source: "fs" // ✅ FIXED
          }));
        }

        // DummyJSON
        const skip = (page - 1) * PAGE_SIZE;
        const djRes = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
        );
        const djData = await djRes.json();

        const dummyItems = djData.products.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.thumbnail,
          category: p.category,
          source: "dj" // ✅ FIXED
        }));

        setProducts([...items, ...dummyItems]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page]);

  /* ================= FILTER ================= */
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

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6 mt-6">
        <main className="flex-1">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div
                  key={`${product.source}-${product.id}`}
                  className="bg-gray-900 text-white p-3 rounded shadow"
                >
                  <img
                    src={product.image}
                    className="h-40 w-full object-contain cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/product/${product.id}?source=${product.source}`
                      )
                    }
                  />

                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="font-bold mt-1 text-yellow-400">
                    ₹ {Math.round(product.price * 80)}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/product/${product.id}?source=${product.source}`
                      )
                    }
                    className="mt-3 w-full bg-yellow-400 text-black py-2 rounded"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
