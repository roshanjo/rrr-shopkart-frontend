import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);
  const { addToCart } = useCart();
  const [img, setImg] = useState(product.images[0]);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="grid grid-cols-3 gap-6 min-h-screen p-6">
      {/* Gallery */}
      <div>
        <img src={img} className="w-full" />
        <div className="flex gap-2 mt-2">
          {product.images.map((i) => (
            <img
              key={i}
              src={i}
              className="w-16 cursor-pointer"
              onClick={() => setImg(i)}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl">{product.title}</h1>
        <p>⭐ {product.rating}</p>
        <p>{product.description}</p>

        <h4 className="mt-4 font-bold">Offers</h4>
        {product.offers.map((o) => (
          <p key={o}>✔ {o}</p>
        ))}

        <h4 className="mt-4 font-bold">Reviews</h4>
        {product.reviews.map((r, i) => (
          <p key={i}>
            {r.user}: {r.comment}
          </p>
        ))}
      </div>

      {/* STICKY BUY BOX */}
      <div className="sticky top-20 border p-4 h-fit">
        <p className="text-xl">₹ {product.price}</p>
        <button
          className="w-full bg-yellow-400 py-2 mt-2"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button className="w-full bg-orange-500 py-2 mt-2">
          Buy Now
        </button>
      </div>
    </div>
  );
}
