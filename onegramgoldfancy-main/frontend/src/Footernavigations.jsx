import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, User } from "lucide-react";

const Footernavigations = () => {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center text-xs transition-all duration-300
     ${isActive ? "text-yellow-400" : "text-gray-400"}`;

  return (
    <footer className="fixed bottom-0 w-full h-[60px] bg-black flex justify-around items-center border-t border-gray-800 z-50">
      <NavLink to="/" className={linkClasses}>
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/products" className={linkClasses}>
        <ShoppingBag size={22} />
        <span>Products</span>
      </NavLink>

      <NavLink to="/favorites" className={linkClasses}>
        <Heart size={22} />
        <span>Wishlist</span>
      </NavLink>

      <NavLink to="/account" className={linkClasses}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </footer>
  );
};

export default Footernavigations;
