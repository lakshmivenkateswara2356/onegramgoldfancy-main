import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footernavigations from "../Footernavigations";

const Favorites = () => {
  const { wishlist, toggleWishlist, addToCart, products } =
    useContext(AppContext);

  const navigate = useNavigate();

  // Convert wishlist IDs → product objects
  const allProducts = Object.values(products).flat();
  const favoriteProducts = allProducts.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-yellow-600"
        >
          ← Back
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
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <Heart size={18} className="fill-red-500 text-red-500" />
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
                    className="mt-2 w-full py-2 text-xs rounded-xl bg-yellow-500 font-semibold"
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
