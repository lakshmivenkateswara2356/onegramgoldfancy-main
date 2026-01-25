import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footernavigations from "../../Footernavigations";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-[22px] px-4">
      <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#B08A2E] hover:text-[#C9A24D] transition mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-medium">Back</span>
        </button>
      <div className="max-w-md mx-auto bg-black/60 border border-yellow-500/30 rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          My Account
        </h1>

        {user ? (
          <>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400">{user.phone}</p>
            </div>

            <button
              onClick={() => navigate("/favorites")}
              className="w-full py-3 border border-yellow-500/30 rounded-xl text-yellow-400"
            >
              My Favorites
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="w-full py-3 border border-yellow-500/30 rounded-xl text-yellow-400"
            >
              Order History
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 rounded-xl font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-yellow-500 rounded-xl font-semibold"
          >
            Login / Register
          </button>
        )}
      </div>
      <Footernavigations/>
    </div>
  );
};

export default Account;
