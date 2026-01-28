import React from "react";
import { Link } from "react-router-dom";
import Onegramgold from "../Assets/ss.jpg";
import Panchalohalu from "../Assets/firstminifirstcard.jpg";

const QuickAccessCards = () => {
  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-2 gap-4">

        {/* Panchalohalu */}
        <Link
          to="/category/panchalohalu"
          className="
            relative h-28 sm:h-32
            rounded-xl overflow-hidden
            shadow-md hover:shadow-lg transition
          "
        >
          <img
            src={Panchalohalu}
            alt="Panchalohalu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <h3 className="p-3 text-sm sm:text-base font-semibold text-yellow-400">
              Panchalohalu
            </h3>
          </div>
        </Link>

        {/* One Gram Gold */}
        <Link
          to="/category/one-gram-gold"
          className="
            relative h-28 sm:h-32
            rounded-xl overflow-hidden
            shadow-md hover:shadow-lg transition
          "
        >
          <img
            src={Onegramgold}
            alt="One Gram Gold"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <h3 className="p-3 text-sm sm:text-base font-semibold text-yellow-400">
              One Gram Gold
            </h3>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default QuickAccessCards;
