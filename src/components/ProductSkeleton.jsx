// ==================================================
// PRODUCT SKELETON (LOADING PLACEHOLDER)
// ==================================================

export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-soft animate-pulse flex flex-col gap-4">
      
      {/* Image Placeholder */}
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl mb-2" />

      {/* Meta Placeholder */}
      <div className="space-y-2 flex-1">
        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md mt-2" />
      </div>

      {/* Button Placeholder */}
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mt-2" />

    </div>
  );
}