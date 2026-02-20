import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Businesslogo from "../Assets/logob.png";
import { Home, ShoppingBag, Heart, User } from "lucide-react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { cartCount } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Mobile Menu */}
        

        {/* Logo */}
        <div
          onClick={() => goTo("/")}
          className="cursor-pointer text-xl font-extrabold tracking-wider bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] bg-clip-text text-transparent"
        >
         <div className="flex items-center">
  <img src={Businesslogo} alt="Logo" className="h-10 w-10 object-contain rounded-full" />
 <h1 className="ml-2 text-lg font-semibold bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] bg-clip-text text-transparent">
    ONE GRAM Gold
  </h1>
</div>

        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
          <li onClick={() => goTo("/")} className="hover:text-[red] cursor-pointer">Home</li>
          <li onClick={() => goTo("/products")} className="hover:text-[#B08A2E] cursor-pointer">Products</li>
          <li onClick={() => goTo("/favorites")} className="hover:text-[#B08A2E] cursor-pointer">Favorites</li>
          <li onClick={() => goTo("/about")} className="hover:text-[#B08A2E] cursor-pointer">About</li>
          <li onClick={() => goTo("/account")} className="hover:text-[#B08A2E] cursor-pointer">Account</li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          {/* Account */}
         
          {/* Cart */}
          <button
            onClick={() => goTo("/cart")}
            className="relative text-yellow-400 hover:scale-110 transition"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4
                M7 13l-1.5 7h13
                M9 21a1 1 0 100-2
                M17 21a1 1 0 100-2"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 h-full w-[70vw] bg-black/95 px-6 py-6 space-y-6 shadow-xl md:hidden"
        >
          <button
            className="text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <ul className="space-y-5 text-lg font-medium text-white">
          <li onClick={() => goTo("/")} className="hover:text-[red] cursor-pointer">Home</li>
          <li onClick={() => goTo("/products")} className="hover:text-[#B08A2E] cursor-pointer">Products</li>
          <li onClick={() => goTo("/favorites")} className="hover:text-[#B08A2E] cursor-pointer">Favorites</li>
          <li onClick={() => goTo("/about")} className="hover:text-[#B08A2E] cursor-pointer">About</li>
          <li onClick={() => goTo("/account")} className="hover:text-[#B08A2E] cursor-pointer">Account</li>
          </ul>

          <button
            onClick={() => goTo("/account")}
            className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold"
          >
            My Account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
