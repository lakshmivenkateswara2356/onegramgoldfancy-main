import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Heart,
  ShoppingBag,
  
} from "lucide-react";
import Footernavigations from "../../Footernavigations";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-6">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#C9A24D] hover:text-[#E6C873] transition mb-6"
      >
        <ArrowLeft size={18} />
        <span className="text-sm tracking-wide">Back</span>
      </button>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md mx-auto bg-[#0C0C0C] border border-[#2A2A2A] rounded-3xl p-7 shadow-2xl"
      >
        <h1 className="text-xl font-semibold text-center tracking-wide text-[#E6C873]">
          Account
        </h1>

        {user ? (
          <>
            {/* Profile */}
            <div className="flex flex-col items-center mt-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E6C873] to-[#B08A2E] flex items-center justify-center shadow-lg">
                <User size={38} className="text-black" />
              </div>

              <p className="mt-4 text-lg font-medium">
                {user.name}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {user.phone}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 space-y-4">

              <ActionItem
                icon={<Heart size={18} />}
                label="Favorites"
                onClick={() => navigate("/favorites")}
              />

              <ActionItem
                icon={<ShoppingBag size={18} />}
                label="Orders"
                onClick={() => navigate("/orders")}
              />

              <button
                onClick={handleLogout}
                className="w-full mt-6 py-3 rounded-xl bg-[#1A1A1A] text-red-400 hover:bg-red-500 hover:text-white transition font-medium"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-10 py-3 rounded-xl bg-gradient-to-r from-[#E6C873] to-[#B08A2E] text-black font-semibold"
          >
            Login / Register
          </button>
        )}
      </motion.div>

      <Footernavigations />
    </div>
  );
};

/* Clean Professional Action Row */
const ActionItem = ({ icon, label, onClick }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="cursor-pointer flex items-center justify-between p-4 rounded-xl bg-[#121212] border border-[#2A2A2A] hover:border-[#E6C873]/60 transition"
  >
    <div className="flex items-center gap-3 text-[#E6C873]">
      {icon}
      <span className="font-medium tracking-wide">{label}</span>
    </div>
    <span className="text-gray-500 text-sm">›</span>
  </motion.div>
);

export default Account;
