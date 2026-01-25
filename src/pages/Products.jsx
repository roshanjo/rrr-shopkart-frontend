import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const PAGE_SIZE = 12;

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

export default function Products() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const category = params.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        let mapped = [];

        // PAGE 1 → FakeStore
        if (page === 1) {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();

          mapped = data.map(p => ({
            id: `fs-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category
          }));
        }

        // PAGE 2+ → DummyJSON
        else {
          const skip = (page - 2) * PAGE_SIZE;
          const res = await fetch(
            `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
          );
          const data = await res.json();

          mapped = data.products.map(p => ({
            id: `dj-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail,
            category: p.category
          }));
        }

        setProducts(mapped);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page]);

  /* ================= FILTER ================= */
  const filteredProducts = useMemo(() => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  }, [products, category]);

  const changeCategory = c => {
    setParams({
      page: 1,
      ...(c !== "all" && { cat: c })
    });
  };

  const changePage = p => {
    setParams({
      page: p,
      ...(category !== "all" && { cat: category })
    });
  };

  return (
    <>
      <Seo title="Products | AIKart" />

      {/* MOBILE FILTER BAR (AMAZON STYLE) */}
      <div className="lg:hidden sticky top-0 z-20 bg-white border-b">
        <div className="flex gap-2 px-3 py-3 overflow-x-auto">
          {ALL_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => changeCategory(c)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
                ${category === c
                  ? "bg-yellow-400"
                  : "border bg-gray-50"}`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow sticky top-24">
            <h3 className="font-bold mb-4">Category</h3>
            <div className="space-y-2">
              {ALL_CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => changeCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded
                    ${category === c
                      ? "bg-yellow-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
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
          ) : filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={() => toast.success("Added to cart")}
                  onView={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-12">
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
    </>
  );
}