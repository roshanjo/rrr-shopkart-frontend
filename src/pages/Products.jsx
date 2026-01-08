import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { requireAuth } from "../utils/auth";

export default function Products() {
  requireAuth();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Product grid */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
          />
        ))}
      </div>

      {/* Cart sidebar */}
      <CartSidebar cart={cart} />
    </div>
  );
}
