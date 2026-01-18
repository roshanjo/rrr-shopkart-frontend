import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductReviews({ productId }) {
  const key = `reviews-${productId}`;
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem(key)) || []
  );
  const [text, setText] = useState("");

  const addReview = () => {
    if (!text.trim()) return;
    const updated = [...reviews, text];
    setReviews(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setText("");
    toast.success("Review added");
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-2">Customer Reviews</h3>

      {reviews.map((r, i) => (
        <p key={i} className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
          {r}
        </p>
      ))}

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Write a review..."
      />

      <button
        onClick={addReview}
        className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
}
