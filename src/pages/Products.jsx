import { useEffect, useState } from "react";

const items = [
  "Smart Phone",
  "Laptop",
  "Headphones",
  "Shoes",
  "Burger",
  "Pizza",
  "Camera",
  "Watch",
  "Backpack",
  "Keyboard",
];

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const randomProducts = Array.from({ length: 6 }).map(() => {
      const name = items[Math.floor(Math.random() * items.length)];
      return {
        name,
        price: Math.floor(Math.random() * 5000) + 500,
        image: `https://source.unsplash.com/400x300/?${name}`,
      };
    });
    setProducts(randomProducts);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <img src={p.image} className="h-40 w-full object-cover rounded" />
          <h3 className="mt-2 font-bold">{p.name}</h3>
          <p className="text-green-600">₹ {p.price}</p>
          <button className="mt-2 w-full bg-green-600 text-white py-1 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
