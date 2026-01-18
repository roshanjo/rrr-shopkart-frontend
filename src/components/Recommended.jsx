import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Recommended({ category, currentId }) {
  const navigate = useNavigate();

  const list = products.filter(
    p => p.category === category && p.id !== currentId
  ).slice(0, 4);

  return (
    <div className="mt-10">
      <h3 className="font-bold mb-4">Recommended for you</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {list.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-3 rounded shadow"
          >
            <img src={p.image} className="h-24 object-contain mx-auto" />
            <p className="text-sm line-clamp-2">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
