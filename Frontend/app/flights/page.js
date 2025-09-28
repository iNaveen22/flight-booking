"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaRupeeSign } from "react-icons/fa";
import { useUserId } from "../page";
  

const flight_backend = process.env.NEXT_PUBLIC_FLIGHTS_API;
const Booking_backend = process.env.NEXT_PUBLIC_BOOKINGS_API;

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useUserId()

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get(`${flight_backend}/api/v1/flights`);
        setFlights(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch flights.");
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  async function handleClick(flightId) {
    try {
      const res = await axios.post(`${Booking_backend}/api/v1/bookings`,{flightId:flightId,userId:userId,noOfSeats:1});
      alert("Flight booked successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to book flight.");
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading flights...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Available Flights</h1>

      {flights.length === 0 ? (
        <p className="text-center text-gray-500">No flights available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">{flight.airline}</h2>
              
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

              <div className="flex items-center justify-between mb-4 text-gray-600">
                <div>
                  <strong>Departure:</strong> {flight.departureTime}
                </div>
                <div>
                  <strong>Arrival:</strong> {flight.arrivalTime}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 font-semibold text-gray-700">
                <FaRupeeSign /> {flight.price}
              </div>

              <button
                onClick={() => handleClick(flight.id)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

