import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSkeleton from "../components/ProductSkeleton";
import Seo from "../components/Seo";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] =
    useState(localStorage.getItem("category") || "all");
  const [cart, setCart] =
    useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSearch(localStorage.getItem("search") || "");
  }, [location.key]);

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  let filtered =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  if (search) {
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  const addToCart = p => {
    const updated = [
      ...cart,
      {
        name: p.title,
        price: Math.round(p.price * 80),
        image: p.image,
        qty: 1
      }
    ];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Added to cart");
  };

  const totalItems = cart.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <>
      <Seo
        title="Products | AIKart"
        description="Browse and buy the best products online at AIKart"
      />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : filtered.map(p => (
                <div
                  key={p.id}
                  onClick={() =>
                    navigate(`/product/${p.id}`, { state: p })
                  }
                  className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-44 w-full object-contain my-4"
                  />

                  <h3 className="font-semibold text-sm line-clamp-2">
                    {p.title}
                  </h3>

                  <p className="text-lg font-bold mt-2">
                    ₹ {Math.round(p.price * 80)}
                  </p>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => navigate("/cart")}
            className="fixed bottom-6 right-6 bg-purple-600 text-white px-5 py-3 rounded-full"
          >
            🛒 {totalItems}
          </button>
        )}
      </div>
    </>
  );
}
