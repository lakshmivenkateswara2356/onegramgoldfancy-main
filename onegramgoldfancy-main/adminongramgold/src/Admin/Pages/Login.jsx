import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://onegramgoldfancy-main.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = res.data;

      // ✅ Only admin can login
      if (user.role !== "admin") {
        setError("You are not authorized as admin");
        setLoading(false);
        return;
      }

      // ✅ Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 md:p-10 animate-[fadeIn_0.6s_ease-out]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <div className="mb-5">
  <label htmlFor="admin-email" className="block mb-1 font-medium text-gray-700">
    Email
  </label>
  <input
    id="admin-email"
    name="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="admin@example.com"
    className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
    required
  />
</div>

<div className="mb-6">
  <label htmlFor="admin-password" className="block mb-1 font-medium text-gray-700">
    Password
  </label>
  <input
    id="admin-password"
    name="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
    required
  />
</div>


        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#C9A227] to-[#D4AF37] hover:opacity-90"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
