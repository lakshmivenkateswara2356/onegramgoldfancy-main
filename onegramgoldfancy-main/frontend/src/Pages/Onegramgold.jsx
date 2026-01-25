import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Category from "../Pages/CategoryChips";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footernavigations from "../Footernavigations";

const OneGramGold = () => {
  const context = useContext(AppContext); // Always at the top
  const navigate = useNavigate();

  const { products, addToCart, wishlist, toggleWishlist, loadingProducts } = context;

  const oneGramGoldProducts = products["one-gram-gold"] || [];

  if (loadingProducts) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading collection...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FAFAFA] to-[#F2F2F2] min-h-screen">
      <Navbar />

      <div className="pt-[75px] px-4 max-w-7xl mx-auto">
        {/* Back Button */}
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

        {/* Category Chips */}
        <Category />

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            One Gram Gold Collection
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Pure gold · Elegant designs
          </p>
        </div>

        {/* Grid */}
        {oneGramGoldProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {oneGramGoldProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 sm:h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition"
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
                <div className="p-3 space-y-1.5">
                  <h2 className="text-xs font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-sm font-bold text-[#B08A2E]">
                    ₹{product.price}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 py-1.5 text-[11px] font-semibold rounded-lg border border-[#C9A24D] text-[#C9A24D] hover:bg-[#FAF3E0] transition"
                    >
                      Cart
                    </button>

                    <button
                      className="flex-1 py-1.5 text-[11px] font-semibold rounded-lg bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white hover:opacity-90 transition"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          ✨ Authentic One Gram Gold · Premium Finish
        </div>
      </div>
      <Footernavigations/>
    </div>
  );
};

export default OneGramGold;
