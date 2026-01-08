import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment was not completed.
          You can try again or continue shopping.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/cart"
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
          >
            Retry Payment
          </Link>

          <Link
            to="/products"
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
