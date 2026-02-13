import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import ProductCard from "../Pages/ProductCard";
import { Search } from "lucide-react";
import ProductGridSkeleton from "../Pages/ProductGridSkeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { products = {}, wishlist = [], toggleWishlist, loadingProducts, user } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Flatten all products
  const allProducts = useMemo(() => Object.values(products).flat(), [products]);

  // Filter based on search
  const filteredProducts = useMemo(
    () =>
      allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allProducts, search]
  );

  const showSkeleton = loadingProducts || allProducts.length === 0;

  // Handle wishlist click
  const handleWishlistClick = (e, productId) => {
    e.stopPropagation(); // prevent navigating to product page
    if (!user) {
      toast.error("Please login to use wishlist ❤️");
      return;
    }
    toggleWishlist(productId);
  };

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
          transition-all duration-300 mb-4"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-[19px] font-semibold text-gray-900">
            All Jewellery
          </h1>
          <p className="text-[13px] text-gray-500">
            Explore our complete collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-sm mx-auto">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search jewellery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>

        {/* Skeleton Loader */}
        {showSkeleton && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <ProductGridSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products */}
        {!showSkeleton && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onHeartClick={(e) => handleWishlistClick(e, product.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!showSkeleton && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
