
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaRupeeSign,
} from "react-icons/fa";


const flight_backend = process.env.NEXT_PUBLIC_FLIGHTS_API;
const booking_backend = process.env.NEXT_PUBLIC_BOOKINGS_API;

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

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
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ✈️ Searching Flights...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-xl p-6 h-64"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Available Flights
        </h1>
        <button
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          onClick={() => (window.location.href = "/book")}
        >
          My Bookings
        </button>
      </div>

      {flights.length === 0 ? (
        <p className="text-center text-gray-500">
          No flights available ✈️
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3">
        <h2 className="text-xl font-semibold">{flight.airline}</h2>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Airports */}
        <div className="flex items-center justify-between mb-4 text-gray-700">
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
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4">
          <p>
            <strong>Departure:</strong> {formatDateTime(flight.departureTime)}
          </p>
          <p>
            <strong>Arrival:</strong> {formatDateTime(flight.arrivalTime)}
          </p>
           <p>
            <strong>Boarding:</strong> {formatDateTime(flight.boardingGate)}
          </p>
        </div>

        {/* Seats + Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Seats:
            </label>
            <input
              type="number"
              min="1"
              value={noOfSeats}
              onChange={(e) => setNoOfSeats(Number(e.target.value))}
              className="w-20 border rounded-lg p-2 text-center"
            />
          </div>
          <div className="flex items-center text-lg font-bold text-gray-800">
            <FaRupeeSign className="mr-1" /> {flight.price * noOfSeats}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={() => onBook(flight.id, noOfSeats)}
          className="w-full mt-auto bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

