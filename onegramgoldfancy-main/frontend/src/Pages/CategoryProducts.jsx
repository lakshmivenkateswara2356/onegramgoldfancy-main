import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const CategoryProducts = () => {
  const { products } = useContext(AppContext);
  const location = useLocation();

  // 🔹 Get type from URL
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  // 🔹 Filter products
  const filteredProducts = type
    ? products.filter((product) =>
        product.name.toLowerCase().includes(type.toLowerCase())
      )
    : products;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        {type ? `${type} Products` : "All Products"}
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
