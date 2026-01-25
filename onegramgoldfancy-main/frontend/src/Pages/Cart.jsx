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
      await axios.post("http://localhost:5000/api/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* ---------------- CART ITEMS ---------------- */}
        <div className="flex-1">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-indigo-500">
              {cart.length} Items
            </span>
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
                <p>Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Action</p>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr] items-center pt-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      className="w-24 h-24 object-cover border rounded"
                      alt={item.name}
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          Qty:
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Math.max(1, +e.target.value)
                              )
                            }
                            className="w-14 border px-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-center font-medium">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mx-auto text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ---------------- ORDER SUMMARY ---------------- */}
        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <hr className="my-4" />

          <p className="text-sm font-medium uppercase">Delivery Address</p>

          {!guest.address || isEditingAddress ? (
            <div className="space-y-2 mt-2">
              <input
                placeholder="Name"
                value={guest.name}
                onChange={(e) =>
                  setGuest({ ...guest, name: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              <input
                placeholder="WhatsApp Number"
                value={guest.phone}
                onChange={(e) =>
                  setGuest({ ...guest, phone: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              <textarea
                placeholder="Full Address"
                value={guest.address}
                onChange={(e) =>
                  setGuest({ ...guest, address: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              {guest.address && (
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="text-indigo-500 text-sm"
                >
                  Save Address
                </button>
              )}
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-gray-600">{guest.address}</p>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-indigo-500 text-sm mt-1"
              >
                Change
              </button>
            </div>
          )}

          <hr className="my-4" />

          <p className="flex justify-between text-gray-700">
            <span>Total</span>
            <span className="font-semibold">₹{subtotal}</span>
          </p>

          <button
            onClick={confirmOrder}
            disabled={loading}
            className={`w-full py-3 mt-6 text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}
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
