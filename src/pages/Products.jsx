return (
  <div className="h-screen flex flex-col overflow-hidden">
    {/* ⭐ prevent page scroll */}

    {/* 🔒 FIXED TOP AREA */}
    <div className="sticky top-0 z-40 bg-gray-100 dark:bg-gray-900 p-6 space-y-4">
      <div className="flex gap-3 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              localStorage.removeItem("search");
              setSearch("");
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              category === c
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {search && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing results for <b>"{search}"</b>
        </p>
      )}
    </div>

    {/* 🔽 ONLY THIS SCROLLS */}
    <div className="flex-1 overflow-y-auto p-6 pb-20">
      {/* ⭐ pb-20 = space for footer */}

      <div className="flex gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow
                         hover:shadow-xl hover:-translate-y-1 transition"
            >
              <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">
                {p.category}
              </span>

              <img
                src={p.image}
                alt={p.title}
                className="h-44 w-full object-contain my-4"
              />

              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {p.title}
              </h3>

              <p className="text-yellow-500 text-sm mb-1">
                ⭐ {p.rating?.rate} / 5
              </p>

              <p className="text-lg font-bold mb-3">
                ₹ {Math.round(p.price * 80)}
              </p>

              <button
                onClick={() => addToCart(p)}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="w-72 sticky top-32 h-fit bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
            <h3 className="font-bold mb-3">🛒 Cart</h3>
            <p className="text-sm mb-3">
              Items: <b>{totalItems}</b>
            </p>
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>

    {/* 🔒 FIXED FOOTER */}
    <div className="fixed bottom-0 w-full text-center text-sm text-gray-400 bg-gray-100 dark:bg-gray-900 py-2 z-50">
      Designed by Roshan © 2026
    </div>
  </div>
);
