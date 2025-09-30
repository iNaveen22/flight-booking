"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FaGlobeAmericas, FaBolt, FaSuitcaseRolling } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

   

  const handleSearch = () => {
 
        

  }

   useUserId();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          ✈️ FlyBook
        </h1>
        <div className="space-x-6 font-medium text-gray-700 flex items-center">
          <Link href="/flights" className="hover:text-blue-600 transition">
            Flights
          </Link>
          <Link href="/book" className="hover:text-blue-600 transition">
            My Bookings
          </Link>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold cursor-pointer hover:scale-105 transition">
            U
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative flex flex-col items-center justify-center flex-1 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 py-32 px-6 max-w-3xl text-white space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Fly Smarter. Travel Better.
          </h1>
          <p className="text-lg md:text-xl mb-10 drop-shadow-md opacity-90">
            Find the best flight deals, book instantly, and make every trip unforgettable.
          </p>

          {/* Search Bar integrated as the CTA */}
          
            
            <div className="w-full max-w-2xl mx-auto mt-8 flex items-center gap-2">
            <input
             type="text"
              placeholder="Example: DEL-BLR 2025-10-01 2 travellers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             className="flex-1 px-6 py-3 rounded-full shadow-lg bg-white text-black focus:outline-none"
            />
          <button
             onClick={handleSearch}
             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
            >
               Search
            </button>
              </div>




          {/* My Bookings Button (optional secondary CTA) */}
          <Link href="/book">
            <button className="mt-4 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
              My Bookings
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="p-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[{
            title: "Global Flights",
            desc: "Access flights to destinations worldwide with real-time availability.",
            icon: <FaGlobeAmericas size={36} className="text-blue-500 mb-4" />,
          },
          {
            title: "Fast Booking",
            desc: "Book your flight in seconds with secure, smooth transactions.",
            icon: <FaBolt size={36} className="text-yellow-500 mb-4" />,
          },
          {
            title: "Manage Bookings",
            desc: "Easily view, cancel, or reschedule your bookings anytime.",
            icon: <FaSuitcaseRolling size={36} className="text-green-500 mb-4" />,
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
          >
            {feature.icon}
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="p-8 bg-gray-900 text-center text-gray-400 mt-auto space-y-4">
        <div className="flex justify-center gap-6 text-lg">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} FlyBook. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Custom Hook for User ID

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