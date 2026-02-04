import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    guest,
    updateGuest,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "https://onegramgoldfancy-main.onrender.com/api";

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to place order");
    if (!guest.name || !guest.phone || !guest.address)
      return alert("Please fill delivery details");
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);

    try {
      // ✅ Save address to backend user profile
      await axios.put(
        `${API}/users/address`,
        {
          name: guest.name,
          phone: guest.phone,
          address: guest.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Place order
      await axios.post(
        `${API}/orders`,
        {
          grams: cart.reduce((sum, item) => sum + item.quantity, 0),
          total_amount: subtotal,
          customer_name: guest.name,
          phone: guest.phone,
          address: guest.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      clearCart();
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

      <div className="pt-24 px-5 max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr] gap-10">
        {/* CART ITEMS */}
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            Shopping Cart
            <span className="ml-2 text-sm text-gray-500">
              ({cart.length} items)
            </span>
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 shadow-sm flex gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>

                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="text-gray-500">Quantity</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(1, +e.target.value))
                        }
                        className="w-16 border rounded-md px-2 py-1"
                      />
                    </div>

                    <p className="mt-3 font-semibold text-[#B08A2E]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Delivery Address
          </p>

          {!guest.address || isEditingAddress ? (
            <div className="space-y-3">
              <input
                placeholder="Full Name"
                value={guest.name}
                onChange={(e) =>
                  updateGuest({ name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                placeholder="WhatsApp Number"
                value={guest.phone}
                onChange={(e) =>
                  updateGuest({ phone: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Full Address"
                value={guest.address}
                onChange={(e) =>
                  updateGuest({ address: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => setIsEditingAddress(false)}
                className="text-sm text-indigo-500"
              >
                Save Address
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              <p>{guest.address}</p>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-indigo-500 text-sm mt-1"
              >
                Change
              </button>
            </div>
          )}

          <hr className="my-5" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-[#B08A2E]">₹{subtotal}</span>
          </div>

          <button
            onClick={confirmOrder}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] hover:opacity-90"
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
