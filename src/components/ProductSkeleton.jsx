export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow animate-pulse">
      <div className="h-4 w-24 bg-gray-300 rounded mb-3" />
      <div className="h-40 bg-gray-300 rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-3" />
      <div className="h-10 bg-gray-300 rounded" />
    </div>
  );
}
