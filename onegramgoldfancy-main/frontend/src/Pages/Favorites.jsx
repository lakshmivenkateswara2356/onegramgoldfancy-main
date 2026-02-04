import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footernavigations from "../Footernavigations";
import toast from "react-hot-toast";

const Favorites = () => {
  const { products, wishlist, toggleWishlist, addToCart, user } =
    useContext(AppContext);
  const navigate = useNavigate();

  const allProducts = [
    ...(products?.panchalohalu || []),
    ...(products?.onegramgold || []),
  ];

  const favoriteProducts = allProducts.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <button
  onClick={() => navigate(-1)}
  className="flex items-center px-3 py-1.5 bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back
</button>


        <h1 className="text-2xl font-bold mb-6">My Favorites ❤️</h1>

        {favoriteProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No favorite products yet
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover"
                  />
                  <button
                    onClick={() => {
                      if (!user) {
                        toast.error("Login to manage wishlist ❤️");
                        return;
                      }
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <Heart
                      size={18}
                      className="fill-red-500 text-red-500"
                    />
                  </button>
                </div>

                <div className="p-3">
                  <h2 className="text-sm font-semibold truncate">
                    {product.name}
                  </h2>

                  <p className="text-lg font-bold text-yellow-600">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full py-2 text-xs rounded-xl bg-yellow-500 text-black font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footernavigations />
    </div>
  );
};

export default Favorites;
