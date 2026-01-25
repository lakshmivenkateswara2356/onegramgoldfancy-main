import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Optional auto-redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center
                      animate-[fadeIn_0.6s_ease-out]">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <CheckCircle
            size={88}
            className="text-green-500 animate-[scaleUp_0.6s_ease-out]"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-500 mt-2 leading-relaxed">
          Thank you for your order. We’ve received your request and will start
          processing it right away.
        </p>

        {/* ACTIONS */}
        <div className="mt-7 space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 transition-all duration-200"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl border border-gray-300 font-medium
                       hover:bg-gray-100 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Redirecting to home shortly…
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
