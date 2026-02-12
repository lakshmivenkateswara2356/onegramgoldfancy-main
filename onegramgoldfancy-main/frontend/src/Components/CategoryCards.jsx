import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CategoryCards = () => {
  const { miniProducts = [], loadingProducts } = useContext(AppContext);
  const navigate = useNavigate();

  if (loadingProducts) return <p>Loading categories...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {miniProducts.map((cat) => (
        <div
          key={cat.id}
          onClick={() => navigate(`/category/${cat.category}`)}
          className="cursor-pointer bg-white rounded-xl p-4 text-center hover:shadow-lg transition"
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-24 h-24 mx-auto object-cover rounded-full"
          />
          <p className="mt-2 font-semibold">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
