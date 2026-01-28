import { useContext } from "react";
import Navbar from "../Components/Navbar";

import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OneGramGold = () => {
  const { products, wishlist, toggleWishlist, addToCart, loadingProducts } =
    useContext(AppContext);
  const navigate = useNavigate();

  const oneGramGoldProducts = products?.["one-gram-gold"] || [];

  if (loadingProducts) {
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
            One Gram Gold Collection
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Pure gold · Elegant craftsmanship
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {oneGramGoldProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group bg-white rounded-xl border shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-44 w-full object-cover group-hover:scale-105 transition duration-500"
                />

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

              <div className="p-3">
                <h2 className="text-sm font-medium line-clamp-2">
                  {product.name}
                </h2>

                <p className="text-lg font-semibold text-[#B08A2E] mt-1">
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-3 w-full py-1.5 text-xs border border-[#C9A24D] text-[#C9A24D] hover:bg-[#FAF3E0] transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
          ✨ Authentic One Gram Gold · Premium Finish
        </div>
      </div>
    </div>
  );
};

export default OneGramGold;
