"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKINGS_API || "http://localhost:4000";

const statusPriority = {
 BOOKED:1,
  booked: 3,
  initiated: 2,
  cancelled: 4,
};

function paymentId() {
  return uuid();
}

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d) ? value : d.toLocaleString();
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return setLoading(false);

      const res = await axios.get(`${BOOKING_URL}/api/v1/bookings?userId=${userId}`);
      setBookings(res.data.detailedBookings || []);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const sortedBookings = [...bookings].sort(
    (a, b) => (statusPriority[a.status] || 4) - (statusPriority[b.status] || 4)
  );
console.log("bookings", sortedBookings)
  const handleBook = async (booking) => {
    const userId = localStorage.getItem("userId");
    const idempotencyKey = paymentId();

    console.log(booking.status)

    if(booking.status === "booked" || booking.status === "BOOKED") {
      alert("This booking is already paid.");
      return;
    }else if(booking.status === "cancelled" || booking.status === "CANCELLED") {
      alert("This booking has been cancelled.");
      return;
    }

    await axios.post(
      `${BOOKING_URL}/api/v1/bookings/payments`,
      { bookingId: booking.id, userId, totalCost: booking.totalCost },
      { headers: { "x-idempotency-key": idempotencyKey } }
    );

    // update status locally
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: "BOOKED" } : b))
    );

  };
  

  if (loading)
    return <p className="text-center mt-20 text-lg text-gray-600 animate-pulse">Loading your bookings...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 md:p-10">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800 drop-shadow-md">🧾 My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">You don’t have any bookings yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedBookings.map((booking) => {
            const flight = booking.flight.data || {};
            const departureName = booking.flight.departureAirport || "—";
            const arrivalName = booking.flight.arrivalAirport || "—";
            const departureTime = flight.departureTime || booking.departureTime;
            const arrivalTime = flight.arrivalTime || booking.arrivalTime;

            const statusColors = {
              BOOKED: "bg-green-100 text-green-800",
              CANCELLED: "bg-red-100 text-red-800",
              INITIATED: "bg-yellow-100 text-yellow-800",
              DEFAULT: "bg-gray-100 text-gray-700",
            };

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                      ✈️ {flight.airline || `Flight #${booking.flightId}`}
                    </h2>

                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                        statusColors[booking.status] || statusColors.DEFAULT
                      }`}
                    >
                      
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col items-center text-gray-700 text-sm">
                      <span className="text-xl">🛫</span>
                      <p className="font-semibold">{departureName}</p>
                      <p>{formatDateTime(departureTime)}</p>
                    </div>

                    <div className="flex-1 h-1 bg-gray-300 mx-4 rounded-full relative">
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-lg"></span>
                    </div>

                    <div className="flex flex-col items-center text-gray-700 text-sm">
                      <span className="text-xl">🛬</span>
                      <p className="font-semibold">{arrivalName}</p>
                      <p>{formatDateTime(arrivalTime)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-gray-700 text-sm mt-4 font-medium">
                    <p>Seats: {booking.noOfSeats}</p>
                    <p>Total: ₹{booking.totalCost}</p>
                  </div>

                  <button
                    className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105"
                    onClick={() => handleBook(booking)}
                  >
                    {booking.status === "initiated" || booking.status === "INITIATED" ? "Pay Now" : "BOOKED"}
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



