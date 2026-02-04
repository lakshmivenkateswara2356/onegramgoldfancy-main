import React from "react";

const WelcomeModal = ({ userName, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-lg animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#B08A2E]">
          Welcome, {userName}!
        </h2>
        <p className="text-gray-700 mb-6">
          Explore our premium collections. <br />
          Thanks for choosing <span className="font-semibold">OneGram Gold Fancy</span>! ✨
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-[#C9A24D] to-[#B08A2E] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
