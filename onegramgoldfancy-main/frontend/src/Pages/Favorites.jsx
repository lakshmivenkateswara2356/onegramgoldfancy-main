import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Favorites = () => {
  const { products, wishlist, toggleWishlist, addToCart } =
    useContext(AppContext);
  const navigate = useNavigate();
    

  // merge all products into one array
  const allProducts = [
    ...(products?.panchalohalu || []),
    ...(products?.onegramgold || []),
  ];

  // get only favorite products
  const favoriteProducts = allProducts.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto mb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  text-yellow-400 hover:text-yellow-500 transition"
        >
          {/* Back Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

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

                  {/* Remove from favorites */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
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
    </div>
  );
};

export default Favorites;
