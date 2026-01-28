import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, buyNow } = useContext(AppContext);

  /* 🔥 FIND PRODUCT FROM ALL CATEGORIES */
  const product = Object.values(products || {})
    .flat()
    .find((p) => p.id.toString() === id);

  /* ✅ HOOKS MUST BE ABOVE RETURN */
  const images = product?.images || [product?.image || ""];
  const [thumbnail, setThumbnail] = useState(images[0]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6]">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-500 mb-6">
          Home / Products /
          <span className="text-[#D4AF37] font-medium"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT - Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`w-20 h-20 border rounded-lg overflow-hidden ${
                    thumbnail === img
                      ? "border-[#D4AF37]"
                      : "border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-white border rounded-xl overflow-hidden">
              <img
                src={thumbnail}
                alt={product.name}
                className="w-[360px] h-[360px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT - Details */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>

            <div className="mt-4">
              <p className="text-gray-400 line-through text-sm">
                ₹{product.oldPrice || product.price + 500}
              </p>
              <p className="text-3xl font-semibold text-[#D4AF37]">
                ₹{product.price}
              </p>
              <p className="text-xs text-gray-500">
                Inclusive of all taxes
              </p>
            </div>

            <div className="mt-6">
              <p className="font-medium mb-2">Product Details</p>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                {(product.description || [
                  "Premium gold polish",
                  "Traditional handcrafted design",
                  "Long lasting shine",
                ]).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#FFF1C1] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="w-full py-3 bg-[#D4AF37] text-white hover:bg-[#C9A227] transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
