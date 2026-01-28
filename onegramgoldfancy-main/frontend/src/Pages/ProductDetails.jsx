import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, buyNow } = useContext(AppContext);

  const product = Object.values(products || {})
    .flat()
    .find((p) => p.id.toString() === id);

  const images = product?.images || [product?.image || ""];
  const [thumbnail, setThumbnail] = useState(images[0]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* BACK + BREADCRUMB */}
        <div className="mb-6 pt-[15px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition"
          >
            ← Back to products
          </button>

          <p className="text-xs text-gray-400 mt-2">
            Home / Jewellery /
            <span className="text-[#C9A227] font-medium"> {product.name}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* IMAGE GALLERY */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`
                    w-20 h-20 rounded-xl overflow-hidden border
                    transition-all duration-200
                    ${thumbnail === img
                      ? "border-[#C9A227] ring-2 ring-[#C9A227]/40"
                      : "border-gray-200 hover:border-gray-400"}
                  `}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-lg p-4">
              <img
                src={thumbnail}
                alt={product.name}
                className="w-full h-[420px] object-cover rounded-xl"
              />
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 line-through">
                ₹{product.oldPrice || product.price + 500}
              </p>
              <p className="text-4xl font-semibold text-[#C9A227]">
                ₹{product.price}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <ShieldCheck size={18} className="text-[#C9A227]" />
                <span className="text-xs text-gray-600">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <Truck size={18} className="text-[#C9A227]" />
                <span className="text-xs text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <RotateCcw size={18} className="text-[#C9A227]" />
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-2">
                Product Highlights
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {(product.description || [
                  "Premium gold polish with long-lasting shine",
                  "Handcrafted traditional jewellery design",
                  "Skin-friendly and lightweight finish",
                ]).map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C9A227] mt-1">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product)}
                className="
                  py-3 rounded-xl border border-[#C9A227]
                  text-[#C9A227] font-medium
                  hover:bg-[#FFF6D8] transition
                "
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="
                  py-3 rounded-xl
                  bg-gradient-to-r from-[#C9A227] to-[#D4AF37]
                  text-white font-medium
                  hover:opacity-90 transition
                "
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
