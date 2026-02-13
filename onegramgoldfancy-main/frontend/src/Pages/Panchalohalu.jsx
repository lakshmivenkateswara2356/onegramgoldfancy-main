import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Panchalohalu = () => {
  const {
    products,
    wishlist = [],
    toggleWishlist,
    user,
    loadingProducts,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const panchalohaluProducts = products?.panchalohalu || [];

  /* ---------------- Loading Skeleton ---------------- */
  if (loadingProducts) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen pt-24 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 animate-pulse"
            >
              <div className="h-44 bg-gray-200 rounded-lg mb-3" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Wishlist Handler ---------------- */
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
          className="inline-flex items-center gap-1 px-3 py-1.5
          bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
          text-white text-xs font-medium rounded-full
          shadow hover:shadow-md hover:scale-[1.03]
          transition-all duration-300"
        >
          ← Back
        </button>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-[19px] font-semibold text-slate-800">
            Panchalohalu Collection
          </h1>
          <p className="text-slate-600 text-[13px]">
            Divine metals craftsmanship
          </p>
        </div>

        {/* Empty State */}
        {panchalohaluProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {panchalohaluProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group bg-white rounded-xl border
                  shadow-sm hover:shadow-xl
                  hover:-translate-y-1 transition-all duration-300
                  cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-44 w-full object-cover
                      group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Wishlist */}
                    <button
                      onClick={(e) => handleWishlist(e, product.id)}
                      className="absolute top-2 right-2 bg-white/90
                      p-1.5 rounded-full shadow
                      hover:scale-110 transition"
                    >
                      <Heart
                        size={16}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3 space-y-1">
                    <h2 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {product.name}
                    </h2>

                   {/* Price & Discount Row-wise */}
                      <div className="mt-2 space-y-1">
                        <p className="text-[15px] font-semibold text-[#B08A2E]">
                          Price: ₹{product.price}
                        </p>
                       <div className="flex items-center gap-2">
  <p className="text-sm text-gray-400 line-through">
    ₹{product.oldPrice || product.price + 500}
  </p>
  {product.discount > 0 && (
    <p className="text-green-600 text-xs font-medium">
      {product.discount}% OFF
    </p>
  )}
</div>

                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Panchalohalu;
