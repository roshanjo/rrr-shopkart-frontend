import { ShoppingBag } from "lucide-react";

export default function EmptyState({ title, actionText, onAction, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-soft max-w-md mx-auto my-8 w-full">
      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 mb-2">
        {Icon ? <Icon className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
      </div>
      
      <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="mt-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/10 transition-all flex items-center gap-2 text-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}