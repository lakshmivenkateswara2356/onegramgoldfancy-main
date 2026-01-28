import React from "react";
import ProductCard from "./ProductCard";
import smallcrdone from "../Assets/featureimageas.webp";
import smallcrdtwo from "../Assets/featuretwo.jpg";
import smallcrdtre from "../Assets/featursthree.jpg";

const dummyProducts = [
  {
    id: 1,
    name: "One Gram Gold Ring",
    price: "1,299",
    image:
      smallcrdone,
  },
  {
    id: 2,
    name: "Traditional Gold Chain",
    price: "2,499",
    image:
      smallcrdtwo,
  },
  {
    id: 3,
    name: "Designer Bangles",
    price: "3,199",
    image:
      smallcrdtre,
  },
  {
    id: 4,
    name: "Bridal Necklace Set",
    price: "5,499",
    image:
      smallcrdtre,
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
