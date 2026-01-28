import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const { products, loadingProducts } = useContext(AppContext);
  const navigate = useNavigate();

  const allProducts = useMemo(() => {
    return Object.values(products || {}).flat();
  }, [products]);

  const featuredProducts = allProducts.slice(0, 6);

  const showSkeleton =
    loadingProducts || featuredProducts.length === 0;

  return (
    <section className="mt-8 px-4">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Featured Jewellery
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="text-sm text-yellow-500 font-medium hover:underline"
        >
          View All
        </button>
      </div>

      {/* SHIMMER / LOADING */}
      {showSkeleton && (
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* PRODUCTS */}
      {!showSkeleton && (
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
