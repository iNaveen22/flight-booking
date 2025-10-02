"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const flight_backend = process.env.NEXT_PUBLIC_FLIGHTS_API;

export default function HeroSection() {
  const [airports, setAirports] = useState([]);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [trevellers, setTrevellers] = useState(1);

  const router = useRouter();

  // Fetch airports dynamically
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await axios.get(`${flight_backend}/api/v1/airports`);
        // Map airports to react-select format
        
        const options = res.data.data.map((a) => ({
          value: a.code,
          label: `${a.name} (${a.code})`,
        }));
        setAirports(options);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };
    fetchAirports();
  }, []);
  console.log({
  trips: `${departure.value}-${arrival.value}`,
  tripDate,
  trevellers
});

  useUserId()

  // Handle search
  const handleSearch = async () => {
    if (!departure || !arrival || !tripDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.get(`${flight_backend}/api/v1/flights`, {
        params: {
          trips: `${departure.value}-${arrival.value}`,
          tripDate,
          trevellers: trevellers,
        },
      });

      console.log("Flights:", res.data.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
    router.push(`/flights?trips=${departure.value}-${arrival.value}&tripDate=${tripDate}&trevellers=${trevellers}`);

  };
  

  return (
    <>
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

      {/* Optional decorative plane illustration */}
      <div className="absolute inset-0 bg-[url('https://img.icons8.com/ios/500/ffffff/airplane-take-off.png')] bg-no-repeat bg-right-top bg-contain opacity-10"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Fly Smarter. Travel Better.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-sm">
          Find the best flight deals, book instantly, and make every trip unforgettable.
        </p>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-full shadow-lg px-4 py-4 items-center backdrop-blur-sm">
          {/* From */}
          <Select
            className="flex-1 text-gray-700"
            options={airports}
            value={departure}
            onChange={setDeparture}
            placeholder="From"
            isSearchable
          />

          {/* To */}
          <Select
            className="flex-1 text-gray-700"
            options={airports}
            value={arrival}
            onChange={setArrival}
            placeholder="To"
            isSearchable
          />

          {/* Date */}
          <input
            type="date"
            className="flex-1 px-4 py-3 rounded-full text-gray-700 focus:outline-none"
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
          />

          {/* Travellers */}
          <input
            type="number"
            min="1"
            className="w-24 px-4 py-3 rounded-full text-gray-700 focus:outline-none"
            value={trevellers}
            onChange={(e) => setTrevellers(e.target.value)}
            placeholder="Trav"
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>
    <div className="absolute top-4 right-4">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold"
        
        onClick={() =>{ router.push('/book')}}
      >
        My Bookings
      </button>
    </div>
  </>
)};

export function useUserId() {
   const [userId, setUserId] = useState(null);
   useEffect(() => {
      let storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
         storedUserId = uuidv4();
         localStorage.setItem("userId", storedUserId);
      }
      setUserId(storedUserId);
   }, []);
   return userId;
}