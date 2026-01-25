import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Category from "../Pages/CategoryChips";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footernavigations from "../Footernavigations";

const Panchalohalu = () => {
  const { products, addToCart, wishlist, toggleWishlist } =
    useContext(AppContext);
  const navigate = useNavigate();

  const panchalohaluProducts = products?.panchalohalu || [];

  if (!products) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading collection...
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-poppins">
      <Navbar />

      <div className="pt-[68px] px-6 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto mb-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-yellow-400 hover:text-yellow-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium ml-1">Back</span>
          </button>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-800">
            Panchalohalu Collection
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Divine metals · Temple craftsmanship
          </p>
        </div>

        {/* Grid */}
        {panchalohaluProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {panchalohaluProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow"
                  >
                    <Heart
                      size={16}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h2 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-lg font-semibold text-[#B08A2E] mt-1">
                    ₹{product.price}
                  </p>

                  
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-xs text-gray-500">
          ✨ Authentic Panchalohalu · Premium Finish
        </div>
      </div>
      <Footernavigations/>
    </div>
  );
};

export default Panchalohalu;
