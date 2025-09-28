"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  useUserId();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          ✈️ FlyBook
        </h1>
        <div className="space-x-6 font-semibold text-gray-700">
          <Link href="/flights" className="hover:text-blue-600 transition">
            Flights
          </Link>
          <Link href="/book" className="hover:text-blue-600 transition">
            My Bookings
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center flex-1 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1470&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 py-28 px-6 max-w-4xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Fly Smarter. Travel Better.
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
            Find the best flight deals, book instantly, and make every trip unforgettable.
          </p>
          <Link href="/flights">
            <button className="px-8 py-4 bg-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
              Search Flights
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "🌍 Global Flights",
            desc: "Access flights to destinations worldwide with real-time availability.",
          },
          {
            title: "⚡ Fast Booking",
            desc: "Book your flight in seconds with secure, smooth transactions.",
          },
          {
            title: "💼 Manage Bookings",
            desc: "Easily view, cancel, or reschedule your bookings anytime.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-200">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
          Ready for Your Next Adventure?
        </h2>
        <p className="mb-6 text-lg md:text-xl drop-shadow-md">
          Book today and travel with confidence and comfort.
        </p>
        <Link href="/flights">
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
            Search Flights
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-gray-900 text-center text-gray-300 mt-auto">
        © {new Date().getFullYear()} FlyBook. All rights reserved.
      </footer>
    </div>
  );
}

export function useUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("userId", id);
    }
    setUserId(id);
  }, []);

  return userId;
}
