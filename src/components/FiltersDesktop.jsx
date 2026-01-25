export default function FiltersDesktop({ active, onChange }) {
  const categories = [
    "all",
    "smartphones",
    "laptops",
    "fragrances",
    "groceries",
    "home-decoration",
    "mens-shirts",
    "womens-dresses"
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-xl p-4 space-y-2">
        <h3 className="font-semibold mb-2">Category</h3>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm
              ${active === cat
                ? "bg-yellow-400 text-black"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
          >
            {cat.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>
    </aside>
  );
}
