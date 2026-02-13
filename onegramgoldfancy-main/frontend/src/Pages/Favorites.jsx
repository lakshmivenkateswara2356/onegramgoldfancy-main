import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { wishlist = [], toggleWishlist, addToCart, products = {} } =
    useContext(AppContext);

  const navigate = useNavigate();

  // Flatten all products and filter favorites
  const allProducts = Object.values(products).flat();
  const favoriteProducts = allProducts.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-poppins">
      <Navbar />

      <div className="pt-[75px] px-4 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 px-3 py-1.5
          bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
          text-white text-xs font-medium rounded-full
          shadow hover:shadow-md hover:scale-[1.03]
          transition-all duration-300"
        >
          ← Back
        </button>

        <h1 className="text-[19px] font-semibold mb-2 text-center text-slate-800">
          My Favorites
        </h1>

        {favoriteProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No favorite products yet
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl border shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-[134px] w-full object-cover
                    group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      size={18}
                      className="fill-red-500 text-red-500"
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-1">
                  <h2 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-[15px] font-semibold text-[#B08A2E]">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="
            mt-1 w-full py-2
            rounded-md
            border border-[#D4AF37]
            text-[#D4AF37]
            text-xs font-semibold
            hover:bg-[#FFF1C1]
            transition
            active:scale-95
          "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
