export default function Filters({ brands, price, setPrice }) {
  return (
    <div className="bg-slate-900 p-4 rounded-lg space-y-6">
      <h3 className="font-bold text-white">Filters</h3>

      {/* PRICE */}
      <div>
        <p className="text-sm text-gray-300 mb-2">Max Price</p>
        <input
          type="range"
          min={0}
          max={100000}
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-yellow-400">₹{price}</p>
      </div>

      {/* BRAND (future-ready) */}
      <div>
        <p className="text-sm text-gray-300 mb-2">Brand</p>
        {brands.map(b => (
          <label key={b} className="block text-white text-sm">
            <input type="checkbox" className="mr-2" /> {b}
          </label>
        ))}
      </div>
    </div>
  );
}
