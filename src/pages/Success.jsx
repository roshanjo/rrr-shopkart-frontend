export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="mb-6">Thank you for your purchase.</p>
        <a
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
