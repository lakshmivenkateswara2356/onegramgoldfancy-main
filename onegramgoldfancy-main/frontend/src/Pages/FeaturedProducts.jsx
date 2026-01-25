import React from "react";
import ProductCard from "./ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "One Gram Gold Ring",
    price: "1,299",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    id: 2,
    name: "Traditional Gold Chain",
    price: "2,499",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca7",
  },
  {
    id: 3,
    name: "Designer Bangles",
    price: "3,199",
    image:
      "https://images.unsplash.com/photo-1589987607627-616cac6cbb9c",
  },
  {
    id: 4,
    name: "Bridal Necklace Set",
    price: "5,499",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="mt-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Featured Jewellery
        </h2>
        <button className="text-sm text-yellow-500 font-medium">
          View All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
