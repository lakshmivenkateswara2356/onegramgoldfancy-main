import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-1">
          OneGram Gold Fancy Store
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-500 outline-none"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-500 outline-none"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-500 outline-none"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-yellow-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?
          <Link
            to="/login"
            className="text-yellow-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
