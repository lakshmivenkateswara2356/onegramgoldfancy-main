import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const fallbackImage =
  "https://via.placeholder.com/300x300?text=One+Gram+Gold";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  if (!product) return null;

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
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

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
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#B08A2E]">
          ₹ {product.price}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 VERY IMPORTANT
            addToCart(product);
          }}
          className="
            mt-4 w-full py-2
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

export default ProductCard;
