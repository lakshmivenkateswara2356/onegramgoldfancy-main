import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MiniProductCards = () => {
  const { miniProducts, loading } = useContext(AppContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="px-4 mt-6 text-gray-400">
        Loading collections...
      </div>
    );
  }

  return (
    <div className="w-full mt-6 px-4">
      <h2 className="text-lg font-semibold text-black mb-3">
        Explore Collections
      </h2>

      {/* Scrollable Cards */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth snap-x snap-mandatory">
        {miniProducts.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              navigate(`/category/${product.category}`)
            }
            className="flex-shrink-0 w-36 sm:w-40 md:w-44 cursor-pointer snap-start"
          >
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-black h-[60px] transition-transform duration-300 hover:scale-105">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-28 sm:h-32 md:h-36 object-cover"
              />
            </div>

            {/* Name */}
            <div className="text-center mt-1">
              <h3 className="text-sm sm:text-base font-semibold text-black truncate">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniProductCards;
