import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#1f2933] via-[#111827] to-black px-4">

      <div
        className="pt-[6px]
          bg-white/95 backdrop-blur
          rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          max-w-md w-full p-10 text-center
          animate-[fadeIn_0.6s_ease-out]
        ">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="
            w-22 h-22 rounded-full
            bg-gradient-to-br from-yellow-300 to-yellow-500
            flex items-center justify-center
            shadow-lg animate-[scaleUp_0.5s_ease-out]
          ">
            <CheckCircle size={56} className="text-white" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Order Confirmed
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-3 leading-relaxed text-sm">
          Thank you for choosing <span className="font-medium text-gray-800">
            OneGram Gold Fancy
          </span>.
          <br />
          Your order has been successfully placed and is now being prepared.
        </p>

        {/* INFO CARD */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          You will receive an order confirmation and tracking details
          shortly via WhatsApp or Email.
        </div>

        {/* ACTIONS */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r from-gray-900 to-gray-700
              text-white font-medium
              hover:opacity-90 transition
            "
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              w-full py-3 rounded-xl
              border border-gray-300
              font-medium text-gray-700
              hover:bg-gray-100 transition
            "
          >
            Continue Shopping
          </button>
        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-400 mt-6">
          You’ll be redirected to the homepage shortly.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
