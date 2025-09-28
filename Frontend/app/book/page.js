"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKINGS_API || "http://localhost:4000";

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleString();
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId =
          typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        if (!userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${BOOKING_URL}/api/v1/bookings?userId=${userId}`
        );
        setBookings(res.data.detailedBookings || []);
      } catch (err) {
        console.error("fetchBookings error:", err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-600 animate-pulse">
        Loading your bookings...
      </p>
    );

  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 md:p-10">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800 drop-shadow-md">
        🧾 My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          You don’t have any bookings yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const flight = booking.flight.data || {};
            const departureName = booking.flight.departureAirport || "—";
            const arrivalName = booking.flight.arrivalAirport || "—";
            const departureTime = flight.departureTime || booking.departureTime;
            const arrivalTime = flight.arrivalTime || booking.arrivalTime;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                      ✈️ {flight.airline || `Flight #${booking.flightId}`}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "BOOKED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : booking.status === "INITIATED"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Flight timeline */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col items-center text-gray-700 text-sm">
                      <span className="text-xl">🛫</span>
                      <p className="font-semibold">{departureName}</p>
                      <p>{formatDateTime(departureTime)}</p>
                    </div>

                    <div className="flex-1 h-1 bg-gray-300 mx-4 rounded-full relative">
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow"></span>
                    </div>

                    <div className="flex flex-col items-center text-gray-700 text-sm">
                      <span className="text-xl">🛬</span>
                      <p className="font-semibold">{arrivalName}</p>
                      <p>{formatDateTime(arrivalTime)}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex justify-between text-gray-700 text-sm mt-4">
                    <p>
                      <span className="font-semibold">Seats:</span> {booking.noOfSeats}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> ₹{booking.totalCost}
                    </p>
                  </div>

                  {/* Action */}
                  <button
                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
                    onClick={() => alert("View booking details (TODO)")}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
