import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://onegramgoldfancy-main.onrender.com/api/auth/login",
        { email, password }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
  <label htmlFor="admin-email" className="block mb-1 font-medium">
    Email
  </label>
  <input
    id="admin-email"
    name="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border px-3 py-2 rounded"
    required
  />
</div>

<div className="mb-6">
  <label htmlFor="admin-password" className="block mb-1 font-medium">
    Password
  </label>
  <input
    id="admin-password"
    name="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border px-3 py-2 rounded"
    required
  />
</div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
