import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, buyNow } = useContext(AppContext);

  const product = products?.panchalohalu?.find(
    (p) => p.id.toString() === id
  );

  /* ✅ HOOKS MUST BE ABOVE CONDITIONAL RETURN */
  const safeImages = product?.images || [product?.image || ""];
  const [thumbnail, setThumbnail] = useState(safeImages[0]);

  /* ✅ CONDITIONAL RETURN AFTER HOOKS */
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFF9E6] flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9E6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-500 mb-6">
          Home / Panchalohalu /
          <span className="text-[#D4AF37] font-medium"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT - Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {safeImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`border rounded-lg overflow-hidden w-20 h-20 flex items-center justify-center ${
                    thumbnail === img
                      ? "border-[#D4AF37]"
                      : "border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
              <img
                src={thumbnail}
                alt={product.name}
                className="w-[360px] h-[360px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT - Details */}
          <div className="flex-1 text-sm text-[#2C2C2C]">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {product.name}
            </h1>

            <div className="mt-4">
              <p className="text-gray-400 line-through text-sm">
                ₹{product.mrp || product.price + 500}
              </p>
              <p className="text-3xl font-semibold text-[#D4AF37]">
                ₹{product.price}
              </p>
              <span className="text-xs text-gray-500">
                Inclusive of all taxes
              </span>
            </div>

            <div className="mt-6">
              <p className="font-medium text-base mb-2">Product Details</p>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                {(product.description || [
                  "Premium quality gold polish",
                  "Traditional handcrafted design",
                  "Long-lasting shine & durability",
                ]).map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 rounded-xsm border border-[#D4AF37] text-[#D4AF37] font-medium hover:bg-[#FFF1C1] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="w-full py-3 rounded-xsm bg-[#D4AF37] text-white font-medium hover:bg-[#C9A227] transition"
              >
                Buy Now
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              ✔ 100% quality checked • ✔ Secure payment • ✔ Easy returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
