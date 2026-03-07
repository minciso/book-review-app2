"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenIcon,
  BellIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [{ href: "/", label: "Home" }];

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } shadow-md sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 tracking-wide"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center"
          >
            <BookOpenIcon className="w-8 h-8" />
          </motion.div>
          BookReview
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className={`pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-blue-600"
                  : darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              } hover:text-blue-700`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="relative flex items-center gap-4">
              {/* Notification bell */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative focus:outline-none hover:text-blue-600"
              >
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-1 text-xs animate-pulse">
                  3
                </span>
              </motion.button>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:text-blue-600 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                        darkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border"
                      }`}
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-3 py-2 font-medium ${
                  pathname === "/login"
                    ? "text-blue-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-blue-700`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`px-3 py-2 font-medium ${
                  pathname === "/register"
                    ? "text-blue-600"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                } hover:text-blue-700`}
              >
                Register
              </Link>
            </>
          )}

          {/* Dark Mode Toggle at far right */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="focus:outline-none text-gray-700 text-2xl"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}

