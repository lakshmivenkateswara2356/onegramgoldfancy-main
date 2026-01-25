import React, { useState } from "react";

const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Rings" },
  { id: 3, name: "Chains" },
  { id: 4, name: "Bangles" },
  { id: 5, name: "Bridal" },
  { id: 6, name: "Panchalohalu" },
  { id: 7, name: "New Arrivals" },
];

const CategoryChips = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full mt-4 px-4">
      <div
        className="
          flex gap-3 overflow-x-auto no-scrollbar
          py-2
        "
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.name)}
            className={`
              whitespace-nowrap
              px-5 py-2
              rounded-full
              text-sm font-medium
              transition-all duration-300
              ${
                active === cat.name
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
