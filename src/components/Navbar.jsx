import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center text-2xl font-bold text-white font-sans"
          >
            <div className="rounded-full bg-white h-10 w-10 flex justify-center items-center mr-2">
              <img src="/logo.png" alt="logo" className="h-10 w-10" />
            </div>
            MusicMeet
          </Link>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {isLoggedIn ? (
              <>
                <Link to="/events">
                  <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                    Events
                  </button>
                </Link>

                <button
                  onClick={logOutUser}
                  className="text-purple-700 hover:underline font-medium"
                >
                  Logout
                </button>

                <Link to="/profile" className="text-white font-medium">
                    {user?.name}'s Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                    Sign Up
                  </button>
                </Link>

                <Link to="/login">
                  <button className="text-purple-700 hover:underline font-medium">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-700 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {/* Hamburger icon */}
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  // X icon when open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggled */}
      {isOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-1 border-t border-gray-200">
          {isLoggedIn ? (
            <>
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-white bg-purple-700 hover:bg-purple-800"
              >
                Events
              </Link>

              <button
                onClick={() => {
                  logOutUser();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-blue-100"
              >
                Logout
              </button>

              <Link to="/profile">
                <button className="text-white font-medium">
                  {user?.name}'s Profile
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md bg-purple-700 text-white font-semibold hover:bg-purple-800"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-purple-700 font-medium hover:bg-purple-100"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
