export default function FiltersMobile({ onOpen }) {
  return (
    <div className="lg:hidden sticky top-16 z-40 bg-white dark:bg-zinc-900 border-b">
      <div className="flex gap-2 p-2 overflow-x-auto">
        <button
          onClick={onOpen}
          className="px-4 py-2 border rounded-full text-sm whitespace-nowrap"
        >
          ☰ Filter
        </button>
        <span className="px-4 py-2 border rounded-full text-sm">⭐ 4★ & up</span>
        <span className="px-4 py-2 border rounded-full text-sm">Popular</span>
        <span className="px-4 py-2 border rounded-full text-sm">Price</span>
      </div>
    </div>
  );
}
