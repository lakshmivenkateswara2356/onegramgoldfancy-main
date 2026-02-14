import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, User } from "lucide-react";

const Footernavigations = () => {
  const linkClasses = ({ isActive }) =>
    `
    relative flex flex-col items-center justify-center
    text-xs transition-all duration-300
    ${isActive ? "font-semibold" : "text-gray-400"}
  `;

 const iconWrapper = (isActive) =>
  `
  relative flex items-center justify-center
  w-12 h-12 transition-all duration-300
  ${
    isActive
      ? `
        bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
        rounded-full text-black
        shadow-[0_0_12px_rgba(201,162,77,0.8)]
        before:content-['']
        before:absolute before:-inset-1
        before:rounded-full
        before:bg-white
        before:-z-10
        font-bold
      `
      : "text-gray-400"
  }
`;


  return (
    <footer className="fixed bottom-0 w-full h-[72px] bg-black flex justify-around items-center border-t border-gray-800 overflow-hidden z-50 lg:hidden">
      
      <NavLink to="/" className={linkClasses}>
        {({ isActive }) => (
          <>
            <div className={iconWrapper(isActive)}>
              <Home size={22} />
            </div>
           
          </>
        )}
      </NavLink>

      <NavLink to="/products" className={linkClasses}>
        {({ isActive }) => (
          <>
            <div className={iconWrapper(isActive)}>
              <ShoppingBag size={22} />
            </div>
           
          </>
        )}
      </NavLink>

      <NavLink to="/favorites" className={linkClasses}>
        {({ isActive }) => (
          <>
            <div className={iconWrapper(isActive)}>
              <Heart size={22} />
            </div>
            
          </>
        )}
      </NavLink>

      <NavLink to="/account" className={linkClasses}>
        {({ isActive }) => (
          <>
            <div className={iconWrapper(isActive)}>
              <User size={22} />
            </div>
            
          </>
        )}
      </NavLink>

    </footer>
  );
};

export default Footernavigations;
