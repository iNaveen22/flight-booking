
"use client";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Loading Flights...
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>

            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>

            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

            <div className="h-10 bg-blue-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

