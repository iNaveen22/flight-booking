"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaRupeeSign } from "react-icons/fa";
import { useUserId } from "../page";

const flight_backend = process.env.NEXT_PUBLIC_FLIGHTS_API;
const booking_backend = process.env.NEXT_PUBLIC_BOOKINGS_API;

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleString();
}

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useUserId();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get(`${flight_backend}/api/v1/flights`);
        setFlights(res.data.data);
      } catch (err) {
        setError("⚠️ Failed to fetch flights.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  async function handleBooking(flightId, noOfSeats) {
    try {
      await axios.post(`${booking_backend}/api/v1/bookings`, {
        flightId,
        userId,
        noOfSeats,
      });
      alert(`🎉 Booked ${noOfSeats} seat(s) successfully!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to book flight.");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✈️ Searching Flights...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-xl p-6 h-60"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Available Flights
      </h1>

      {flights.length === 0 ? (
        <p className="text-center text-gray-500">No flights available ✈️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onBook={handleBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FlightCard({ flight, onBook }) {
  const [noOfSeats, setNoOfSeats] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {flight.airline}
      </h2>

      {/* Airports */}
      <div className="flex items-center justify-between mb-2 text-gray-600">
        <div className="flex items-center gap-2">
          <FaPlaneDeparture className="text-blue-500" />
          <span>{flight.Departure_Airport?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPlaneArrival className="text-green-500" />
          <span>{flight.Arrival_Airport?.name}</span>
        </div>
      </div>

      {/* Times */}
      <div className="flex justify-between text-gray-600 text-sm mb-4">
        <span><strong>Departure:</strong> {formatDateTime(flight.departureTime)}</span>
        <span><strong>Arrival:</strong> {formatDateTime(flight.arrivalTime)}</span>
      </div>

      {/* Seat Count */}
      <label className="block mb-1 text-gray-700 font-semibold">
        Number of Seats:
      </label>
      <input
        type="number"
        min="1"
        value={noOfSeats}
        onChange={(e) => setNoOfSeats(Number(e.target.value))}
        className="w-full border rounded-lg p-2 mb-4"
      />

      {/* Price */}
      <div className="flex items-center font-bold text-gray-800 mb-4">
        <FaRupeeSign /> {flight.price * noOfSeats}
      </div>

      {/* Book Button */}
      <button
        onClick={() => onBook(flight.id, noOfSeats)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Book Now
      </button>
    </div>
  );
}
