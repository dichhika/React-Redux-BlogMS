import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../../store/searchSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token: user } = useSelector((state) => state.auth);
  const searchQuery = useSelector((state) => state.search.query); // ✅ From store
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token || !!user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value)); // ✅ Dispatch change
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-green-500 dark:text-white hover:underline"
        >
          MyBlog
        </NavLink>

        {/* Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search Bar (Desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title or author..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-white hover:text-black border border-transparent hover:border-gray-400 transition duration-200">
              Search
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-4">
          <NavLink
            to="/"
            className="text-lg font-semibold text-gray-700 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition"
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/blog/add"
              className="text-lg font-semibold text-gray-700 hover:text-green-500 dark:text-white dark:hover:text-green-400 transition"
            >
              AddBlog
            </NavLink>
          )}
          {isLoggedIn ? (
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="text-lg text-green-500 border border-green-600 hover:bg-green-500 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or author..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <NavLink
            to="/"
            className="block text-lg font-semibold text-gray-700 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition"
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/blog/add"
              className="block text-lg font-semibold text-gray-700 hover:text-green-600 dark:text-white dark:hover:text-green-400 transition"
            >
              AddBlog
            </NavLink>
          )}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="block text-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block text-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="block text-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg px-4 py-2 transition dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Logout
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
