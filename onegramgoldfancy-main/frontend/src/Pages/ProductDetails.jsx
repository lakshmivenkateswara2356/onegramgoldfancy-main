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
          className="mt-[29px] inline-flex items-center gap-1 px-3 py-1.5
          bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
          text-white text-xs font-medium rounded-full
          shadow hover:shadow-md hover:scale-[1.03]
          transition-all duration-300"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* IMAGE SECTION */}
          <div>
            {/* MAIN IMAGE */}
            <div
              className="m-3 rounded-md shadow-lg  cursor-zoom-in"
              onClick={() => setIsPreviewOpen(true)}
            >
              <img
                src={images[activeIndex]}
                alt={product.name}
                className="rounded-xl"
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
            <h1 className="text-[29px] mt-[-33px] font-semibold">{product.name}</h1>

            <div className="mt-1">
              
              {/* Price & Discount Row-wise */}
                      <div className="mt-2 space-y-1">
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
              <p className="text-xs text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* TRUST */}
            <div className="mt-1 grid grid-cols-3 gap-3">
              <Trust icon={<ShieldCheck />} text="Premium Quality" />
              <Trust icon={<Truck />} text="Fast Delivery" />
              <Trust icon={<RotateCcw />} text="Easy Returns" />
            </div>

            {/* DESCRIPTION */}
            

            {/* CTA */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product)}
                className="py-3 rounded-xl border border-[#C9A227] text-[#C9A227]
                hover:bg-[#FFF6D8] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="py-3 rounded-xl bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
                text-white font-bold hover:opacity-90 transition"
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
            className=" w-[90%] rounded-xl"
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
