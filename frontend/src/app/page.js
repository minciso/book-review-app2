"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Header */}
      <header className="text-center p-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
          Book Review App
        </h1>
        <p className="text-gray-600 text-lg">
          Discover and review your favorite books
        </p>
      </header>


      {/* Content */}
      <main className="flex-grow p-8">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No books available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`} passHref>
                <div className="relative bg-white p-6 rounded-xl shadow-md 
                                hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105
                                transition duration-300 cursor-pointer overflow-hidden 
                                group border border-transparent hover:border-blue-300">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 
                                  opacity-0 group-hover:opacity-30 transition duration-300 rounded-xl"></div>

                  {/* Card content */}
                  <h2 className="relative text-2xl font-semibold text-gray-900 mb-1 
                                 transform transition-transform duration-300 group-hover:-translate-y-1">
                    {book.title}
                  </h2>
                  <p className="relative text-gray-700 mb-2">by {book.author}</p>
                  <p className="relative text-yellow-500 font-semibold 
                                transform transition-transform duration-300 
                                group-hover:scale-110">
                    ⭐ {book.rating}/5
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 text-center p-4">
        &copy; {new Date().getFullYear()} Book Review App. All rights reserved.
      </footer>
    </motion.div>
  );
}
