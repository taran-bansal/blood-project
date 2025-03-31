'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-red-600 font-bold text-xl">
                Blood Network
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/find-donor" className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                Find Donor
              </Link>
              <Link href="/emergency-request" className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                Emergency Request
              </Link>
              <Link href="/blood-banks" className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                Blood Banks
              </Link>
              <Link href="/community" className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                Community
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 text-sm font-medium">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 