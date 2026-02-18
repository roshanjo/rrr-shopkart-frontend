// ==================================================
// IMPORTS
// ==================================================

import { products } from "../data/products";
import { useNavigate } from "react-router-dom";


// ==================================================
// RECOMMENDED PRODUCTS COMPONENT
// ==================================================

export default function Recommended({ category, currentId }) {

  // ------------------------------------------------
  // Navigation Hook
  // ------------------------------------------------

  const navigate = useNavigate();


  // ------------------------------------------------
  // Filter Products (Same Category, Exclude Current)
  // ------------------------------------------------

  const list = products
    .filter(
      (product) =>
        product.category === category &&
        product.id !== currentId
    )
    .slice(0, 4);


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="mt-10">

      {/* Section Title */}
      <h3 className="font-bold mb-4">
        Recommended for you
      </h3>


      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        {list.map((product) => (

          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="
              cursor-pointer
              bg-white dark:bg-gray-800
              p-3 rounded shadow
            "
          >

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-24 object-contain mx-auto"
            />

            {/* Product Name */}
            <p className="text-sm line-clamp-2">
              {product.name}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}