import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WishlistButton from "../components/WishlistButton";

const PAGE_SIZE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") || 1);
  const category = params.get("cat") || "all";
  const search = (params.get("search") || "").trim().toLowerCase();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  /* ===============================
     FETCH (SEARCH OR NORMAL)
     =============================== */
  useEffect(() => {
    async function load() {
      setLoading(true);

      let url = "";

      if (search) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          search
        )}&limit=100`;
      } else {
        url = `https://dummyjson.com/products?limit=100`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setAllProducts(data.products || []);
      setLoading(false);
    }

    load();
  }, [search]);

  /* ===============================
     CATEGORY FILTER (CLIENT SIDE)
     =============================== */
  const filtered = useMemo(() => {
    if (category === "all") return allProducts;
    return allProducts.filter((p) => p.category === category);
  }, [allProducts, category]);

  /* ===============================
     PAGINATION (WORKS FOR SEARCH TOO)
     =============================== */
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
  }, [filtered]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* ===============================
     HELPERS (PRESERVE PARAMS)
     =============================== */
  const updateParams = (next) => {
    const obj = Object.fromEntries(params.entries());
    setParams({ ...obj, ...next });
  };

  const changeCategory = (c) => {
    updateParams({ cat: c, page: 1 });
  };

  const changePage = (p) => {
    updateParams({ page: p });
  };

  /* ===============================
     CATEGORIES
     =============================== */
  const categories = [
    "all",
    "beauty",
    "fragrances",
    "skin-care",
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
    "groceries",
    "home-decoration",
    "furniture",
    "kitchen-accessories",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "tops",
    "sunglasses",
    "sports-accessories",
    "vehicle",
    "motorcycle",
  ];

  /* ===============================
     UI
     =============================== */
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220]">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* MOBILE CATEGORY */}
        <div className="lg:hidden sticky top-16 z-30 bg-white dark:bg-[#0b1220] py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => changeCategory(c)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  category === c
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 dark:bg-[#1e293b]"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-6">

          {/* DESKTOP CATEGORY */}
          <aside className="hidden lg:block w-64">
            <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Category</h3>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => changeCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                    category === c
                      ? "bg-yellow-400 text-black"
                      : "hover:bg-gray-100 dark:hover:bg-[#1e293b]"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1">
            {loading ? (
              <p>Loading...</p>
            ) : paginated.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginated.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      navigate(`/product/${product.id}?source=dummy`)
                    }
                    className="relative rounded-xl p-3 cursor-pointer border hover:shadow-md dark:bg-[#111827]"
                  >
                    <div
                      className="absolute top-2 right-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WishlistButton product={product} />
                    </div>

                    <img
                      src={product.thumbnail}
                      className="h-40 w-full object-contain"
                    />

                    <h3 className="mt-2 text-sm line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="font-bold text-yellow-500">
                      ₹ {Math.round(product.price * 80)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION (ALWAYS WORKS) */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => changePage(p)}
                    className={`px-4 py-2 rounded border ${
                      page === p ? "bg-yellow-400" : ""
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
