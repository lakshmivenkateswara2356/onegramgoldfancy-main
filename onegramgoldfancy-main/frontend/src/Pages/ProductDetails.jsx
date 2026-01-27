import  { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, buyNow } = useContext(AppContext);

  const product = products.panchalohalu.find(
    (p) => p.id.toString() === id
  );

  // ✅ HOOK MUST BE BEFORE CONDITIONAL RETURN
  const images = product?.images || [product?.image];
  

  const [thumbnail, setThumbnail] = useState(images[0]);

  // ✅ CONDITIONAL RETURN AFTER HOOKS
  if (!product) {
    return <div className=" text-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-[18px]">
        <p className="text-sm text-gray-500">
          Home / Products / Panchalohalu /
          <span className="text-indigo-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-6">
          {/* LEFT - Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`border max-w-24 rounded overflow-hidden cursor-pointer ${
                    thumbnail === img
                      ? "border-indigo-500"
                      : "border-gray-300"
                  }`}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt={product.name}
                className="w-96 h-96 object-cover"
              />
            </div>
          </div>

          {/* RIGHT - Details */}
          <div className="w-full md:w-1/2 text-sm">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            {/* Rating */}
            {/* <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  rating > i ? (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="#615fff"
                    >
                      <path d="M9 0.75l2.6 4.9 5.4.8-3.9 3.8.9 5.4L9 13.2l-4.9 2.6.9-5.4L1 6.45l5.4-.8L9 .75z" />
                    </svg>
                  ) : (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="#615fff"
                      opacity="0.35"
                    >
                      <path d="M9 0.75l2.6 4.9 5.4.8-3.9 3.8.9 5.4L9 13.2l-4.9 2.6.9-5.4L1 6.45l5.4-.8L9 .75z" />
                    </svg>
                  )
                )}
             
            </div> */}

            {/* Price */}
            <div className="mt-6">
              <p className="text-gray-500 line-through">
                ₹{product.mrp || product.price + 500}
              </p>
              <p className="text-2xl font-medium text-indigo-600">
                ₹{product.price}
              </p>
              <span className="text-gray-500 text-xs">
                (inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500">
              {(product.description || [
                "Premium quality material",
                "Handcrafted temple design",
                "Long-lasting shine",
              ]).map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 font-medium transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => buyNow(product, navigate)}
                className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
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