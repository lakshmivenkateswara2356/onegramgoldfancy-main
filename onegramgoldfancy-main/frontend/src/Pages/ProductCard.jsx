import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const fallbackImage =
  "https://via.placeholder.com/400x400?text=One+Gram+Gold";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  // ✅ IMAGE RESOLUTION LOGIC
  const imageSrc =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : fallbackImage;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        cursor-pointer
        group bg-white rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
        transition-all duration-300
        overflow-hidden
        min-w-[160px]
        flex-shrink-0
        h-55
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative h-[114px] bg-gray-100 overflow-hidden">
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"              // ✅ LAZY LOAD
          decoding="async"            // ✅ ASYNC DECODE
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className={`
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* PREMIUM TAG */}
        <span
          className="
            absolute top-3 left-3
            px-2 py-0.5 text-[10px] font-semibold
            bg-gradient-to-r from-yellow-400 to-yellow-600
            text-white rounded-full
          "
        >
          PREMIUM
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        {/* Price & Discount Row-wise */}
                      <div className=" ">
                        
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

        {/* ADD TO CART */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 IMPORTANT
            addToCart(product);
          }}
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
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard); // ✅ PERFORMANCE BOOST
