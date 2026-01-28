import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, buyNow } = useContext(AppContext);

  const product = Object.values(products || {})
    .flat()
    .find((p) => p.id.toString() === id);

  const images =
    product?.images?.length > 0
      ? product.images
      : [product?.image || ""];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          ← Back to products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* IMAGE SECTION */}
          <div>
            {/* MAIN IMAGE */}
            <div
              className="bg-white rounded-2xl shadow-lg p-4 cursor-zoom-in"
              onClick={() => setIsPreviewOpen(true)}
            >
              <img
                src={images[activeIndex]}
                alt={product.name}
                className="w-full h-[420px] object-cover rounded-xl"
              />
            </div>

            {/* THUMBNAIL SLIDER */}
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
              {images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-[72px] h-[72px] rounded-xl overflow-hidden border
                    ${
                      index === activeIndex
                        ? "border-[#C9A227] ring-2 ring-[#C9A227]/40"
                        : "border-gray-200"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>

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

            {/* TRUST */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Trust icon={<ShieldCheck />} text="Premium Quality" />
              <Trust icon={<Truck />} text="Fast Delivery" />
              <Trust icon={<RotateCcw />} text="Easy Returns" />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-2">
                Product Highlights
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {(product.description || [
                  "Premium gold polish",
                  "Handcrafted jewellery",
                  "Long lasting shine",
                ]).map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product)}
                className="py-3 rounded-xl border border-[#C9A227] text-[#C9A227]
                hover:bg-[#FFF6D8] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="py-3 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#D4AF37]
                text-white hover:opacity-90 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN IMAGE PREVIEW */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={30} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={images[activeIndex]}
            alt=""
            className="h-[90vh] w-[90vw] rounded-xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}

/* TRUST BADGE COMPONENT */
const Trust = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
    <span className="text-[#C9A227]">{icon}</span>
    <span className="text-xs text-gray-600">{text}</span>
  </div>
);
