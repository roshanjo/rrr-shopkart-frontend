import { useEffect, useState } from "react";

const LIMIT = 12;

export default function useProducts(page, category) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      // ---- DummyJSON (main pagination source)
      const skip = (page - 1) * LIMIT;
      const dummyUrl = category && category !== "all"
        ? `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

      const dummyRes = await fetch(dummyUrl).then(r => r.json());

      const dummyProducts = dummyRes.products.map(p => ({
        id: `d-${p.id}`,
        title: p.title,
        price: p.price,
        image: p.thumbnail,
        category: p.category,
        rating: p.rating,
        source: "dummy"
      }));

      setProducts(dummyProducts);
      setTotalPages(Math.ceil(dummyRes.total / LIMIT));
      setLoading(false);
    }

    fetchProducts();
  }, [page, category]);

  return { products, totalPages, loading };
}
