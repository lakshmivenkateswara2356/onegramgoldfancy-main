import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, user } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [guest, setGuest] = useState({ name: "", phone: "", address: "" });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = "https://onegramgoldfancy-main.onrender.com/api";

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ============================
     FETCH USER ADDRESS
  ============================ */
  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      try {
        const res = await axios.get(`${API}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setGuest({
            name: res.data.name || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
          });
        }
      } catch (err) {
        console.warn("Failed to fetch address:", err);
      }
    };

    fetchAddress();
  }, [user]);

  /* ============================
     SAVE ADDRESS
  ============================ */
  const saveAddress = async () => {
    if (!guest.name || !guest.phone || !guest.address) {
      return toast.error("Please fill all delivery details");
    }

    const token = localStorage.getItem("token");
    if (!token || !user) return toast.error("Please login to save address");

    try {
      await axios.put(
        `${API}/users/address`,
        {
          name: guest.name,
          phone: guest.phone,
          address: guest.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address saved to DB ✅");
      setIsEditingAddress(false);
    } catch (err) {
      toast.error("Failed to save address ❌");
    }
  };

  /* ============================
     SEND WHATSAPP TO ADMIN
  ============================ */
  const sendWhatsAppToAdmin = () => {
    const adminNumber = "917842802368"; // +91 7842802368

    const productDetails = cart
      .map(
        (item, index) => `
${index + 1}. ${item.name}
Qty: ${item.quantity}
Price: ₹${item.price}
Image: ${item.image || "N/A"}
`
      )
      .join("\n");

    const message = `
🛒 *NEW ORDER RECEIVED*

👤 Name: ${guest.name}
📞 Phone: ${guest.phone}
📍 Address: ${guest.address}

📦 *Products*
${productDetails}

💰 *Total Amount*: ₹${subtotal}
`

;


    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  /* ============================
     PLACE ORDER
  ============================ */
  const confirmOrder = async () => {
    if (!guest.name || !guest.phone || !guest.address)
      return toast.error("Please fill delivery details");
    if (cart.length === 0) return toast.error("Your cart is empty");

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to place order");

    setLoading(true);

    try {
      // Save address
      await axios.put(
        `${API}/users/address`,
        {
          name: guest.name,
          phone: guest.phone,
          address: guest.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Place order
      await axios.post(
        `${API}/orders`,
        {
          grams: cart.reduce((sum, item) => sum + item.quantity, 0),
          total_amount: subtotal,
          customer_name: guest.name,
          phone: guest.phone,
          address: guest.address,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image || "https://via.placeholder.com/120",
            quantity: item.quantity,
            price: item.price,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ WhatsApp Admin
      sendWhatsAppToAdmin();

      clearCart();
      toast.success("Order placed successfully 🎉");
      navigate("/order-success");
    } catch (err) {
      toast.error("Order failed ❌");
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
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white rounded-lg"
              >
                Back to Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 shadow-sm flex gap-5"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/120"}
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
                          updateQuantity(
                            item.id,
                            Math.max(1, Number(e.target.value))
                          )
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
                    className="text-gray-400 hover:text-red-500"
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

          {!guest.address || isEditingAddress ? (
            <div className="space-y-3">
              <input
                placeholder="Full Name"
                value={guest.name}
                onChange={(e) =>
                  setGuest({ ...guest, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <PhoneInput
                country={"in"}
                value={guest.phone}
                onChange={(phone) =>
                  setGuest({ ...guest, phone })
                }
                inputClass="w-full border rounded-lg px-3 py-2"
              />

              <textarea
                placeholder="Full Address"
                value={guest.address}
                onChange={(e) =>
                  setGuest({ ...guest, address: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <button
                onClick={saveAddress}
                className="text-indigo-500 text-sm font-medium"
              >
                Save Address
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              <p>{guest.address}</p>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-indigo-500 text-sm font-medium mt-1"
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
            className={`w-full mt-6 py-3 rounded-xl text-white ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
