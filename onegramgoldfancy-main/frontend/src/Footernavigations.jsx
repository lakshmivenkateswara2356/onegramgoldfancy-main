import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, User } from "lucide-react";

const Footernavigations = () => {
  const linkClasses = ({ isActive }) =>
    `
    flex flex-col items-center gap-0.5 text-xs
    transition-all duration-300 ease-out
    ${
      isActive
        ? "text-yellow-400 font-semibold -translate-y-2"
        : "text-gray-400"
    }
  `;

  const iconClasses = (isActive) =>
    `
    transition-all duration-300
    ${
      isActive
        ? "fill-[#C9A24D] to-[#B08A2E] text-[#E6C873] scale-110"
        : "text-gray-400"
    }
  `;

  return (
    <footer className="fixed bottom-0 w-full h-[60px] bg-black flex justify-around items-center border-t border-gray-800 z-50 lg:hidden">
      <NavLink to="/" className={linkClasses}>
        {({ isActive }) => (
          <>
            <Home size={22} className={iconClasses(isActive)} />
            <span>Home</span>
          </>
        )}
      </NavLink>

      <NavLink to="/products" className={linkClasses}>
        {({ isActive }) => (
          <>
            <ShoppingBag size={22} className={iconClasses(isActive)} />
            <span>Products</span>
          </>
        )}
      </NavLink>

      <NavLink to="/favorites" className={linkClasses}>
        {({ isActive }) => (
          <>
            <Heart size={22} className={iconClasses(isActive)} />
            <span>Wishlist</span>
          </>
        )}
      </NavLink>

      <NavLink to="/account" className={linkClasses}>
        {({ isActive }) => (
          <>
            <User size={22} className={iconClasses(isActive)} />
            <span>Profile</span>
          </>
        )}
      </NavLink>
    </footer>
  );
};

export default Footernavigations;
