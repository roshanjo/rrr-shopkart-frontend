import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useCart } from "../context/CartContext";

export default function Products() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(100000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res =
        page === 1
          ? await fetch("https://fakestoreapi.com/products")
          : await fetch(
              `https://dummyjson.com/products?limit=12&skip=${(page - 2) * 12}`
            );

      const data = await res.json();
      const items = page === 1 ? data : data.products;

      setProducts(prev =>
        page === 1
          ? items.map(p => normalize(p))
          : [...prev, ...items.map(p => normalize(p))]
      );

      setLoading(false);
    }

    load();
  }, [page]);

  const normalize = p => ({
    id: p.id,
    title: p.title,
    price: p.price * 80 || p.price,
    image: p.image || p.thumbnail
  });

  const filtered = products.filter(p => p.price <= price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* DESKTOP FILTER */}
      <aside className="hidden lg:block w-64">
        <Filters brands={[]} price={price} setPrice={setPrice} />
      </aside>

      {/* PRODUCTS */}
      <main className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => addToCart(p)}
            onOpen={() => navigate(`/product/${p.id}`)}
          />
        ))}

        {loading && <p className="text-white">Loading...</p>}
      </main>

      {/* LOAD MORE */}
      <div className="w-full text-center mt-6">
        <button
          onClick={() => setPage(p => p + 1)}
          className="bg-slate-800 text-white px-6 py-2 rounded"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
