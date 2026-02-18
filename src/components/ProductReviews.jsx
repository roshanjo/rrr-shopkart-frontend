// ==================================================
// IMPORTS
// ==================================================

import { useState } from "react";
import toast from "react-hot-toast";


// ==================================================
// PRODUCT REVIEWS COMPONENT
// ==================================================

export default function ProductReviews({ productId }) {

  // ------------------------------------------------
  // LocalStorage Key
  // ------------------------------------------------

  const key = `reviews-${productId}`;

  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem(key)) || []
  );

  const [text, setText] = useState("");


  // ==================================================
  // ADD REVIEW FUNCTION
  // ==================================================

  const addReview = () => {

    // Prevent empty reviews
    if (!text.trim()) return;

    const updated = [...reviews, text];

    setReviews(updated);
    localStorage.setItem(key, JSON.stringify(updated));

    setText("");

    toast.success("Review added");
  };


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="mt-8">

      {/* Heading */}
      <h3 className="font-bold mb-2">
        Customer Reviews
      </h3>


      {/* Reviews List */}
      {reviews.map((review, index) => (
        <p
          key={index}
          className="
            text-sm
            bg-gray-100 dark:bg-gray-700
            p-2 rounded mb-2
          "
        >
          {review}
        </p>
      ))}


      {/* Review Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Write a review..."
      />


      {/* Submit Button */}
      <button
        onClick={addReview}
        className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
      >
        Submit
      </button>

    </div>
  );
}