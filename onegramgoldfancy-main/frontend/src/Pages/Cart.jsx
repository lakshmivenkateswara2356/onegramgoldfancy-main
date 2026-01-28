import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    address: "",
  });

  /* ---------------- LOAD SAVED ADDRESS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("deliveryAddress");
    if (saved) {
      setGuest(JSON.parse(saved));
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- CONFIRM ORDER ---------------- */
  const confirmOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");
      return;
    }

    if (!guest.name || !guest.phone || !guest.address) {
      alert("Please fill delivery details");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    // ✅ Save address permanently
    localStorage.setItem("deliveryAddress", JSON.stringify(guest));

    const orderPayload = {
      grams: cart.reduce((sum, item) => sum + item.quantity, 0),
      total_amount: subtotal,
      customer_name: guest.name,
      phone: guest.phone,
      address: guest.address,
    };

    try {
      await axios.post(
        "https://onegramgoldfancy-main.onrender.com/api/orders",
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();

      // ✅ PREMIUM FLOW
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ---------------- CART ITEMS ---------------- */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            Shopping Cart
            <span className="ml-2 text-sm text-[#C9A227]">
              ({cart.length} items)
            </span>
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <p className="text-gray-500 mb-4">Your cart is currently empty</p>
              <button
                onClick={() => navigate("/")}
                className="text-[#C9A227] font-medium hover:underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white rounded-2xl p-5 shadow-sm
                    flex flex-col sm:flex-row gap-5
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-xl object-cover border"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <span className="text-gray-500">Quantity</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(1, +e.target.value))
                        }
                        className="
                          w-16 px-2 py-1 rounded-lg border
                          focus:ring-1 focus:ring-[#C9A227]
                          outline-none
                        "
                      />
                    </div>

                    {/* PRICE */}
                    <p className="mt-4 font-semibold text-gray-800">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- ORDER SUMMARY ---------------- */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

          <hr className="my-4" />

          {/* ADDRESS */}
          <p className="text-sm font-medium text-gray-700 mb-2">Delivery Address</p>

          {!guest.address || isEditingAddress ? (
            <div className="space-y-3">
              <input
                placeholder="Full Name"
                value={guest.name}
                onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#C9A227]"
              />
              <input
                placeholder="WhatsApp Number"
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#C9A227]"
              />
              <textarea
                placeholder="Complete Address"
                value={guest.address}
                onChange={(e) =>
                  setGuest({ ...guest, address: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-[#C9A227]"
              />
              {guest.address && (
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="text-[#C9A227] text-sm font-medium"
                >
                  Save Address
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 text-sm">{guest.address}</p>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-[#C9A227] text-sm font-medium mt-1"
              >
                Change
              </button>
            </div>
          )}

          <hr className="my-4" />

          {/* TOTAL */}
          <div className="flex justify-between text-gray-800 font-medium">
            <span>Total Amount</span>
            <span className="text-lg">₹{subtotal}</span>
          </div>

          {/* PLACE ORDER */}
          <button
            onClick={confirmOrder}
            disabled={loading}
            className={`
              w-full py-3 mt-6 rounded-xl text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] hover:opacity-90"
              }
            `}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
