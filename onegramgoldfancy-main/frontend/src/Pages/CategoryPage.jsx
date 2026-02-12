import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    products,
    wishlist,
    toggleWishlist,
    user,
    loadingProducts,
  } = useContext(AppContext);

  const categoryProducts = products?.[slug] || [];

  if (loadingProducts) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading collection...
      </div>
    );
  }

  const handleWishlist = (e, productId) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to use wishlist ❤️");
      return;
    }
    toggleWishlist(productId);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-poppins">
      <Navbar />

      <div className="pt-[68px] px-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-3 py-1.5 mb-6 bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all"
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

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-800 capitalize">
            {slug} Collection
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Handcrafted premium products
          </p>
        </div>

        {categoryProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoryProducts.map((product) => (
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

                  {/* Wishlist */}
                  <button
                    onClick={(e) => handleWishlist(e, product.id)}
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
                  <h2 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-lg font-semibold text-[#B08A2E] mt-1">
                    ₹{product.price}
                  </p>

                  {product.discount > 0 && (
                    <span className="text-green-600 text-xs">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-xs text-gray-500">
          ✨ Premium quality · Trusted craftsmanship
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
