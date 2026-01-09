import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id == id);

  if (!product) return <p>Not found</p>;

  return (
    <div className="p-6">
      <img src={product.image} className="h-60" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>₹ {product.price}</p>
      <p>High quality product with best price.</p>
    </div>
  );
}
