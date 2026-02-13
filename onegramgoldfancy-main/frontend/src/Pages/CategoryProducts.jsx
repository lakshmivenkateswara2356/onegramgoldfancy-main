import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const CategoryProducts = () => {
  const { products = [], loadingProducts } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------- Get type from URL ---------------- */
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  /* ---------------- Filter Products (Optimized) ---------------- */
  const filteredProducts = useMemo(() => {
    if (!type) return products;

    return products.filter((product) =>
      product.name?.toLowerCase().includes(type.toLowerCase())
    );
  }, [products, type]);

  /* ---------------- Loading Skeleton ---------------- */
  if (loadingProducts) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 animate-pulse"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-3" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-poppins pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-[19px] font-semibold text-slate-800 capitalize">
            {type ? `${type} Products` : "All Products"}
          </h2>
          <p className="text-slate-600 text-[13px]">
            Handpicked premium collections
          </p>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group bg-white rounded-xl border
                shadow-sm hover:shadow-xl
                hover:-translate-y-1 transition-all duration-300
                cursor-pointer"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-40 w-full object-cover
                    group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-medium line-clamp-2 text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 capitalize">
                    {product.category}
                  </p>

                  <p className="text-[15px] font-semibold text-[#B08A2E]">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
