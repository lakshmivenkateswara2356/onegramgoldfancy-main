import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // <-- for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // reset error on new attempt

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      // set error state instead of alert
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-500 mt-4 font-semibold text-lg">
            Logging in...
          </p>
        </div>
      )}

      {/* Login Form */}
      <div
        className={`w-full max-w-md bg-white rounded-2xl p-8 transition-opacity ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-black">Login</h2>

        {/* Error Popup */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4 relative animate-fadeIn">
            <span className="block">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-2 right-2 text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-xl focus:outline-yellow-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-3 rounded-xl focus:outline-yellow-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-black">
          New user?
          <Link to="/register" className="text-yellow-600 ml-1">
            Register
          </Link>
        </p>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}
