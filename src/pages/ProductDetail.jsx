import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source"); // fs | dj
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Variants (mocked like Amazon)
  const colors = ["Black", "Blue", "Silver"];
  const storages = ["128GB", "256GB", "512GB"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(storages[0]);
  const [qty, setQty] = useState(1);

  /* ============================
     FETCH PRODUCT
     ============================ */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        let data;

        if (source === "fs") {
          const res = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          data = await res.json();

          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            images: [data.image],
            rating: data.rating?.rate || 4,
          });

          setActiveImage(data.image);
        }

        if (source === "dj") {
          const res = await fetch(
            `https://dummyjson.com/products/${id}`
          );
          data = await res.json();

          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            images: data.images,
            rating: data.rating || 4,
          });

          setActiveImage(data.images[0]);
        }

        if (!source) throw new Error("Invalid source");

      } catch (err) {
        toast.error("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, source, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading product...
      </div>
    );
  }

  if (!product) return null;

  const priceINR = Math.round(product.price * 80);

  /* ============================
     CART
     ============================ */
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      title: product.title,
      price: priceINR,
      image: activeImage,
      qty,
      color: selectedColor,
      storage: selectedStorage,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  };

  /* ============================
     UI
     ============================ */
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT – IMAGE GALLERY */}
        <div className="lg:col-span-4 flex gap-4">
          <div className="flex flex-col gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 object-contain border cursor-pointer ${
                  activeImage === img ? "border-yellow-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <img
            src={activeImage}
            className="w-full h-96 object-contain bg-white p-4"
          />
        </div>

        {/* CENTER – PRODUCT INFO */}
        <div className="lg:col-span-5 space-y-4">
          <h1 className="text-2xl font-semibold text-white">
            {product.title}
          </h1>

          <p className="text-yellow-400">⭐ {product.rating} / 5</p>

          <p className="text-2xl font-bold text-green-400">
            ₹ {priceINR}
          </p>

          <p className="text-gray-300">{product.description}</p>

          {/* VARIANTS */}
          <div className="space-y-3">
            <div>
              <p className="font-medium text-white">Colour</p>
              <div className="flex gap-2 mt-1">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`border px-3 py-1 rounded ${
                      selectedColor === c
                        ? "border-yellow-500 text-yellow-400"
                        : "border-gray-500 text-gray-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-white">Storage</p>
              <div className="flex gap-2 mt-1">
                {storages.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(s)}
                    className={`border px-3 py-1 rounded ${
                      selectedStorage === s
                        ? "border-yellow-500 text-yellow-400"
                        : "border-gray-500 text-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – STICKY BUY BOX */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
            <p className="text-2xl font-bold text-green-600">
              ₹ {priceINR}
            </p>

            <div>
              <label className="text-sm">Quantity</label>
              <select
                value={qty}
                onChange={e => setQty(+e.target.value)}
                className="w-full border p-2 mt-1 rounded"
              >
                {[1, 2, 3, 4].map(n => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>

            <button
              onClick={addToCart}
              className="w-full bg-yellow-400 text-black py-3 rounded font-medium"
            >
              Add to Cart
            </button>

            <button
              className="w-full bg-orange-500 text-white py-3 rounded font-medium"
            >
              Buy Now
            </button>

            <button className="w-full border py-2 rounded">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 flex gap-4">
        <button
          onClick={addToCart}
          className="flex-1 bg-yellow-400 text-black py-3 rounded"
        >
          Add to Cart
        </button>
        <button className="flex-1 bg-orange-500 text-white py-3 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
}
