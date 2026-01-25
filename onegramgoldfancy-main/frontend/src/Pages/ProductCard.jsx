import React from "react";

const fallbackImage =
  "https://via.placeholder.com/300x300?text=One+Gram+Gold";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div
      className="
        group
        bg-white rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
        transition-all duration-300
        overflow-hidden
        min-w-[170px] sm:min-w-[210px]
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 sm:h-52 bg-gray-100 overflow-hidden">
        <img
          src={product.image || fallbackImage}
          alt={product.name || "Jewellery"}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* PREMIUM BADGE */}
        <span
          className="
            absolute top-3 left-3
            px-2 py-0.5 text-[10px]
            font-semibold tracking-wide
            bg-gradient-to-r from-yellow-400 to-yellow-600
            text-white rounded-full shadow
          "
        >
          PREMIUM
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3
          className="
            text-sm font-medium text-gray-800
            leading-snug line-clamp-2
          "
        >
          {product.name || "One Gram Gold Jewellery"}
        </h3>

        {/* PRICE */}
        {product.price && (
          <p
            className="
              mt-2 text-sm font-semibold
              bg-clip-text text-transparent
              bg-gradient-to-r from-yellow-500 to-yellow-700
            "
          >
            ₹ {product.price}
          </p>
        )}

        {/* BUTTON */}
        <button
          className="
            mt-4 w-full py-2
            rounded-full
            bg-black text-white
            text-xs font-semibold tracking-wide
            transition-all duration-300
            hover:bg-gray-900
            hover:ring-2 hover:ring-yellow-500/40
          "
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
