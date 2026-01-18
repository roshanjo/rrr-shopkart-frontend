export default function EmptyState({ title, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[50vh]">
      <p className="text-gray-500 mb-6">{title}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
